"use client";

import { useState, type FormEvent } from "react";
import { business } from "@/lib/site-data";

type Status = "idle" | "submitting" | "sent" | "fallback" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Either location",
    message: "",
  });

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Website inquiry from ${values.name || "a guest"}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nPreferred location: ${values.location}\n\n${values.message}`
    );
    return `mailto:${business.email}?subject=${subject}&body=${body}`;
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok && data.ok && data.forwarded) {
        setStatus("sent");
      } else if (res.ok && data.ok) {
        // API accepted the request but no CRM is wired up yet (or the forward failed) —
        // fall back to mailto so the message still reaches the business.
        setStatus("fallback");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-brass/40 bg-cream px-8 py-10 text-center">
        <h3 className="font-display text-2xl text-ink">Thank you, {values.name.split(" ")[0] || "friend"}.</h3>
        <p className="mt-3 text-ink/65">We&apos;ve received your message and will get back to you soon.</p>
      </div>
    );
  }

  if (status === "fallback" || status === "error") {
    return (
      <div className="rounded-2xl border border-rust/30 bg-cream px-8 py-10 text-center">
        <h3 className="font-display text-2xl text-ink">Let&apos;s finish this by email.</h3>
        <p className="mt-3 text-ink/65">
          We couldn&apos;t submit the form automatically just now, but your message is
          saved below — click to send it directly to us.
        </p>
        <a
          href={mailtoHref()}
          className="mt-6 inline-block rounded-full bg-rust px-7 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-cream transition-colors hover:bg-rustDark"
        >
          Email {business.email}
        </a>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 block w-full text-xs font-semibold uppercase tracking-widest2 text-ink/40 underline underline-offset-4 hover:text-rust"
        >
          ← Back to the form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest2 text-ink/50">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="border-b border-ink/20 bg-transparent py-2.5 text-ink outline-none transition-colors focus:border-rust"
            placeholder="Jane Doe"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest2 text-ink/50">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="border-b border-ink/20 bg-transparent py-2.5 text-ink outline-none transition-colors focus:border-rust"
            placeholder="jane@email.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest2 text-ink/50">
            Phone <span className="normal-case text-ink/30">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className="border-b border-ink/20 bg-transparent py-2.5 text-ink outline-none transition-colors focus:border-rust"
            placeholder="(805) 555-0100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="text-xs font-semibold uppercase tracking-widest2 text-ink/50">
            Preferred location
          </label>
          <select
            id="location"
            name="location"
            value={values.location}
            onChange={(e) => setValues((v) => ({ ...v, location: e.target.value }))}
            className="border-b border-ink/20 bg-transparent py-2.5 text-ink outline-none transition-colors focus:border-rust"
          >
            <option>Either location</option>
            <option>Paso Robles</option>
            <option>Atascadero</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest2 text-ink/50">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="resize-none border-b border-ink/20 bg-transparent py-2.5 text-ink outline-none transition-colors focus:border-rust"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-full bg-rust px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-cream transition-colors hover:bg-rustDark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
