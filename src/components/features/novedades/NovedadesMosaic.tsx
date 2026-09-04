import type { NovedadProyecto, NovedadEvento } from "@/lib/data/novedades";
import NovedadEventoCard from "./NovedadEventoCard";
import ProjectFeatureCard from "./ProjectFeatureCard";

export default function NovedadesMosaic({
  proyectos,
  eventos,
}: {
  proyectos: NovedadProyecto[];
  eventos: NovedadEvento[];
}) {
  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
      <div>
        <div className="font-mono-data text-xs text-steel uppercase tracking-wide mb-4">
          Novedades
        </div>
        <div className="space-y-4">
          {eventos.map((n) => (
            <NovedadEventoCard key={n.id} novedad={n} compact />
          ))}
        </div>
      </div>

      <div>
        <div className="font-mono-data text-xs text-steel uppercase tracking-wide mb-4">
          Proyectos
        </div>
        <div className="space-y-6">
          {proyectos.map((n) => (
            <ProjectFeatureCard key={n.id} novedad={n} />
          ))}
        </div>
      </div>
    </div>
  );
}