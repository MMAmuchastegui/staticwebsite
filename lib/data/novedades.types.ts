import type { Project } from "./projects";

export type NovedadStatus = "nuevo" | "en-ejecucion" | "finalizado";
export type EventoTipo =
  | "Feria"
  | "Exposición"
  | "Capacitación"
  | "Reconocimiento"
  | "Otro";

interface NovedadBase {
  id: string;
  dateAdded: string;
  expiresInDays?: number;
}

export interface NovedadProyectoEntry extends NovedadBase {
  type: "proyecto";
  projectId: string;
  status: NovedadStatus;
}

export interface NovedadEventoEntry extends NovedadBase {
  type: "evento";
  title: string;
  eventType: EventoTipo;
  description: string;
  location?: string;
  images: string[];
}

export type NovedadEntry =
  | NovedadProyectoEntry
  | NovedadEventoEntry;

export type Novedad =
  | (NovedadProyectoEntry & { project: Project })
  | NovedadEventoEntry;