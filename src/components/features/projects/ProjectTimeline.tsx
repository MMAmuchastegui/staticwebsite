"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/data/projects";
import { groupByYear } from "@/lib/data/projects";
import { services } from "@/lib/data/site";
import ProjectCard from "./ProjectCard";

export default function ProjectTimeline({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  const groups = useMemo(() => groupByYear(filtered), [filtered]);

  return (
    <>

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
                    <ProjectCard
                      key={key}
                      project={project}
                      service={service}
                      isOpen={isOpen}
                      onToggle={() => setExpanded(isOpen ? null : key)}
                    />
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