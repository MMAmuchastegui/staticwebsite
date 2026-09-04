import Image from "next/image";
import type { NovedadEvento } from "@/lib/data/novedades";

export default function NovedadEventoCard({
  novedad,
  compact = false,
}: {
  novedad: NovedadEvento;
  compact?: boolean;
}) {
  const cover = novedad.images[0];

  return (
    <div className="border border-steel-light bg-white overflow-hidden hover:border-red transition-all">
      {cover && (
        <div className={`relative w-full ${compact ? "h-28" : "h-40"}`}>
          <Image src={cover} alt={novedad.title} fill className="object-cover" />
        </div>
      )}
      <div className={compact ? "p-3" : "p-5"}>
        <span className="inline-block font-mono-data text-[9px] text-white bg-ink px-1.5 py-0.5 uppercase tracking-wide">
          {novedad.eventType}
        </span>
        <h3 className={`mt-2 text-ink normal-case leading-snug ${compact ? "text-[14px]" : "text-[17px]"}`}>
          {novedad.title}
        </h3>
        {!compact && (
          <p className="mt-2 text-sm text-steel normal-case">{novedad.description}</p>
        )}
      </div>
    </div>
  );
}