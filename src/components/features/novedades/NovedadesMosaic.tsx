// components/features/novedades/ProjectFeatureCard.tsx — versión grande, columna derecha
import Image from "next/image";
import type { NovedadProyecto } from "@/lib/data/novedades";
import { statusLabel } from "@/lib/data/novedades";
import { services } from "@/lib/data/site";

export default function ProjectFeatureCard({ novedad }: { novedad: NovedadProyecto }) {
  const service = services.find((s) => s.slug === novedad.project.category);
  const image = novedad.project.images?.[0];

  return (
    <div className="border border-steel-light bg-white overflow-hidden hover:shadow-[6px_6px_0_var(--color-red)] hover:border-red transition-all">
      {image && (
        <div className="relative h-56 w-full">
          <Image src={image} alt={novedad.project.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className="font-mono-data text-[10px] text-white bg-red px-2 py-1 uppercase tracking-wide">
            {statusLabel(novedad.status)}
          </span>
          {service && (
            <span className="font-mono-data text-[10px] text-steel uppercase tracking-wide">
              {service.name}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-xl text-ink normal-case leading-snug">
          {novedad.project.title}
        </h3>
        <ul className="mt-3 space-y-1.5">
          {novedad.project.details.slice(0, 3).map((d, j) => (
            <li key={j} className="flex gap-2 text-sm text-steel normal-case">
              <span className="text-red mt-0.5 shrink-0">›</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}