import type { NovedadProyecto } from "@/lib/data/novedades";
import ProjectListItem from "./ProjectListItem";

export default function ProjectsStackedList({ proyectos }: { proyectos: NovedadProyecto[] }) {
  return (
    <div className="divide-y divide-steel-light border-t border-b border-steel-light">
      {proyectos.map((n) => (
        <ProjectListItem key={n.id} novedad={n} />
      ))}
    </div>
  );
}