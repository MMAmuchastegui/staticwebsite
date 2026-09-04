import Image from "next/image";
import type { NovedadEventoEntry } from "@/lib/data/novedades.types";

const EVENT_BADGE_COLOR: Record<string, string> = {
  Feria: "bg-ink",
  Exposición: "bg-ink",
  Capacitación: "bg-red",
  Reconocimiento: "bg-red",
  Otro: "bg-steel",
};

export default function NovedadEventoCard({ novedad }: { novedad: NovedadEventoEntry }) {
  const cover = novedad.images[0];

  return (
    <div className="border border-steel-light bg-white overflow-hidden hover:shadow-[6px_6px_0_var(--color-red)] hover:border-red transition-all">
      {cover && (
        <div className="relative h-40 w-full">
          <Image src={cover} alt={novedad.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-5">
        <span
          className={`inline-block font-mono-data text-[10px] text-white px-2 py-1 uppercase tracking-wide ${
            EVENT_BADGE_COLOR[novedad.eventType] ?? "bg-steel"
          }`}
        >
          {novedad.eventType}
        </span>
        {novedad.location && (
          <div className="font-mono-data text-[10px] text-steel mt-3 uppercase tracking-wide">
            {novedad.location}
          </div>
        )}
        <h3 className="text-[17px] text-ink mt-1 normal-case leading-snug">
          {novedad.title}
        </h3>
        <p className="mt-2 text-sm text-steel normal-case">{novedad.description}</p>

        {novedad.images.length > 1 && (
          <div className="mt-3 flex gap-1.5">
            {novedad.images.slice(1, 4).map((src) => (
              <div key={src} className="relative h-12 w-12 border border-steel-light overflow-hidden">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}