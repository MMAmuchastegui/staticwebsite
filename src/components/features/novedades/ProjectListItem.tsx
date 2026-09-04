import Image from "next/image";
import type { NovedadProyecto } from "@/lib/data/novedades";
import { statusLabel } from "@/lib/data/novedades";
import { services } from "@/lib/data/site";

export default function ProjectListItem({ novedad }: { novedad: NovedadProyecto }) {
  const service = services.find((s) => s.slug === novedad.project.category);
  const image = novedad.project.images?.[0];

  return (
    <div className="flex gap-5 py-5">
      {image && (
        <div className="relative h-24 w-32 shrink-0 border border-steel-light overflow-hidden">
          <Image src={image} alt={novedad.project.title} fill className="object-cover" />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono-data text-[10px] text-white bg-red px-2 py-0.5 uppercase tracking-wide">
            {statusLabel(novedad.status)}
          </span>
          {service && (
            <span className="font-mono-data text-[10px] text-steel uppercase tracking-wide">
              {service.name}
            </span>
          )}
        </div>
        <h3 className="mt-2 text-[17px] text-ink normal-case leading-snug">
          {novedad.project.title}
        </h3>
        {novedad.project.details[0] && (
          <p className="mt-1 text-sm text-steel normal-case">{novedad.project.details[0]}</p>
        )}
      </div>
    </div>
  );
}