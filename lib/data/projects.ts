import raw from "./projects-raw.json";
import type { ServiceSlug } from "./site";

export interface Project {
  title: string;
  year: string;
  sortYear: number;
  category: ServiceSlug;
  details: string[];
}

export const projects = raw as Project[];

export const projectsByCategory: Record<ServiceSlug, Project[]> = {
  "energia-electrica": [],
  saneamiento: [],
  "industria-oil-gas": [],
  "edificios-inteligentes": [],
};

for (const p of projects) {
  projectsByCategory[p.category].push(p);
}

export const projectCount = projects.length;

export interface YearGroup {
  year: number;
  projects: Project[];
}

export function groupByYear(list: Project[]): YearGroup[] {
  const map = new Map<number, Project[]>();
  for (const p of list) {
    const key = p.sortYear || 0;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, projects]) => ({ year, projects }));
}
