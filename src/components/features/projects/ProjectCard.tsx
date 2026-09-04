import type { Project } from "@/lib/data/projects";
import type { Service } from "@/lib/data/site";

export default function ProjectCard({
  project,
  service,
  isOpen,
  onToggle,
}: {
  project: Project;
  service?: Service;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
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
              <li key={j} className="flex gap-2.5 text-sm text-ink-soft normal-case">
                <span className="text-red mt-0.5 shrink-0">›</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
}