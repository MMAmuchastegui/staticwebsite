import type { Novedad } from "@/lib/data/novedades.types";
import { statusLabel } from "@/lib/data/novedades";
import { services } from "@/lib/data/site";
import NovedadEventoCard from "./NovedadEventoCard";

export default function NovedadCard({ novedad }: { novedad: Novedad }) {
  if (novedad.type === "evento") {
    return <NovedadEventoCard novedad={novedad} />;
  }

  const service = services.find((s) => s.slug === novedad.project.category);
  return (
    <div className="border border-steel-light bg-white p-5 hover:shadow-[6px_6px_0_var(--color-red)] hover:border-red transition-all">
      <span className="inline-block font-mono-data text-[10px] text-white bg-red px-2 py-1 uppercase tracking-wide">
        {statusLabel(novedad.status)}
      </span>
      {service && (
        <div className="font-mono-data text-[10px] text-steel mt-3 uppercase tracking-wide">
          {service.name}
        </div>
      )}
      <h3 className="text-[17px] text-ink mt-1 normal-case leading-snug">
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
  );
}