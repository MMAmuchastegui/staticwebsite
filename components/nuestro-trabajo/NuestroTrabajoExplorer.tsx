"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/data/projects";
import { groupByYear } from "@/lib/data/projects";
import { services } from "@/lib/data/site";

const filters = [{ slug: "all" as const, name: "Todos" }, ...services.map((s) => ({ slug: s.slug, name: s.name }))];

export default function NuestroTrabajoExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  const groups = useMemo(() => groupByYear(filtered), [filtered]);

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-12">
        {filters.map((f) => (
          <button
            key={f.slug}
            onClick={() => {
              setActive(f.slug);
              setExpanded(null);
            }}
            className={`font-mono-data text-xs px-4 py-2 border transition-colors ${
              active === f.slug
                ? "bg-red text-white border-red"
                : "border-steel-light text-ink hover:border-red hover:text-red"
            }`}
          >
            {f.name.toUpperCase()}
          </button>
        ))}
        <span className="self-center font-mono-data text-xs text-steel ml-2">
          {filtered.length} proyecto{filtered.length !== 1 && "s"}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div
          className="absolute left-[3px] sm:left-[7px] top-2 bottom-2 w-[2px] bg-steel-light"
          aria-hidden="true"
        />
        <div className="space-y-12">
          {groups.map((group) => (
            <div key={group.year} className="relative pl-8 sm:pl-12">
              <div
                className="absolute left-0 top-0 h-4 w-4 rounded-full bg-red border-2 border-white ring-2 ring-red"
                aria-hidden="true"
              />
              <div className="font-display text-3xl text-ink leading-none mb-4">
                {group.year || "S/D"}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {group.projects.map((project, i) => {
                  const key = `${group.year}-${i}`;
                  const isOpen = expanded === key;
                  const service = services.find((s) => s.slug === project.category);
                  return (
                    <button
                      key={key}
                      onClick={() => setExpanded(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className={`group text-left border bg-white p-4 transition-all duration-200 ${
                        isOpen
                          ? "sm:col-span-2 border-red shadow-[6px_6px_0_var(--color-red)]"
                          : "border-steel-light hover:border-red hover:shadow-[4px_4px_0_var(--color-red)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          {service && (
                            <span className="font-mono-data text-[10px] text-red uppercase tracking-wide">
                              {service.name}
                            </span>
                          )}
                          <div
                            className={`text-[15px] text-ink mt-1 leading-snug normal-case transition-colors ${
                              isOpen ? "text-red" : "group-hover:text-red"
                            }`}
                          >
                            {project.title}
                          </div>
                        </div>
                        <span
                          className={`shrink-0 mt-0.5 font-mono-data text-steel transition-transform ${
                            isOpen ? "rotate-45 text-red" : ""
                          }`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </div>

                      {!isOpen && (
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-mono-data text-steel">
                          VER DETALLE
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      )}

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-paper-dim">
                          <div className="font-mono-data text-[10px] text-steel mb-3 uppercase tracking-wide">
                            Alcance del proyecto
                          </div>
                          <ul className="space-y-2">
                            {project.details.map((d, j) => (
                              <li
                                key={j}
                                className="flex gap-2.5 text-sm text-ink-soft normal-case"
                              >
                                <span className="text-red mt-0.5 shrink-0">›</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
