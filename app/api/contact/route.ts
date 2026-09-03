import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const location = (body.location ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  // No CRM webhook configured yet — tell the client so it can fall back to mailto.
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: true, forwarded: false, reason: "not_configured" },
      { status: 200 }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "amstrdm-coffee-house-website",
        submittedAt: new Date().toISOString(),
        name,
        email,
        phone: phone || undefined,
        preferredLocation: location || undefined,
        message,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { ok: true, forwarded: false, reason: "webhook_error" },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true, forwarded: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: true, forwarded: false, reason: "webhook_error" }, { status: 200 });
  }
}
