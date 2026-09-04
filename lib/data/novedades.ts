import novedadesRaw from "./novedades-raw.json";
import { projects, type Project } from "./projects";
import type { NovedadEntry, Novedad, NovedadStatus } from "./novedades.types.ts"; 

const DEFAULT_LIFESPAN_DAYS = 60;

const STATUS_LABEL: Record<NovedadStatus, string> = {
  nuevo: "Proyecto incorporado",
  "en-ejecucion": "Proyecto en ejecución",
  finalizado: "Nuevo caso de éxito",
};

export function statusLabel(status: NovedadStatus) {
  return STATUS_LABEL[status];
}

function isExpired(entry: NovedadEntry): boolean {
  const lifespan = entry.expiresInDays ?? DEFAULT_LIFESPAN_DAYS;
  const cutoff = Date.now() - lifespan * 24 * 60 * 60 * 1000;
  return new Date(entry.dateAdded).getTime() < cutoff;
}

export function getActiveNovedades(): Novedad[] {
  return (novedadesRaw as NovedadEntry[])
    .filter((entry) => !isExpired(entry))
    .map((entry): Novedad | null => {
      if (entry.type === "evento") return entry;
      const project = projects.find((p) => p.id === entry.projectId);
      return project ? { ...entry, project } : null;
    })
    .filter((n): n is Novedad => n !== null)
    .sort((a, b) => (b.dateAdded > a.dateAdded ? 1 : -1));
}

export function getFeaturedProjects(count = 4): Project[] {
  return [...projects].sort((a, b) => b.sortYear - a.sortYear).slice(0, count);
}