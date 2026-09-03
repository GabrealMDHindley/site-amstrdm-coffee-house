import Image from "next/image";

export default function HeroFallback() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/subjects/paso-robles/07.jpeg"
        alt="Espresso with latte art at AMSTRDM Coffee House"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
    </div>
  );
}
