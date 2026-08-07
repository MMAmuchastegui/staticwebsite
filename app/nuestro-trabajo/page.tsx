import type { Metadata } from "next";
import { clients, site } from "@/lib/data/site";
import { projects, projectCount } from "@/lib/data/projects";
import NuestroTrabajoExplorer from "@/components/nuestro-trabajo/NuestroTrabajoExplorer";
import BusDivider from "@/components/ui/BusDivider";

export const metadata: Metadata = {
  title: "Nuestro trabajo | GEDING",
  description: `Más de ${projectCount} proyectos ejecutados desde ${site.foundedYear}: subestaciones, plantas de tratamiento, edificios inteligentes y sistemas industriales.`,
};

const yearsActive = new Date().getFullYear() - site.foundedYear;

export default function NuestroTrabajo() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20 grid md:grid-cols-[1.3fr_1fr] gap-10 items-end">
          <div>
            <div className="font-mono-data text-xs text-red mb-2">NUESTRO TRABAJO</div>
            <h1 className="text-4xl md:text-5xl text-white leading-[1.05]">
              Más de {projectCount} proyectos ejecutados desde {site.foundedYear}
            </h1>
            <p className="mt-5 text-steel-light text-[15px] max-w-xl normal-case">
              Durante más de dos décadas acompañamos a empresas de energía,
              industria, saneamiento y edificios inteligentes en todo el
              país.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {[
              { value: `${yearsActive}+`, label: "Años" },
              { value: `${projectCount}+`, label: "Proyectos" },
              { value: `${clients.length}+`, label: "Clientes" },
              { value: "4", label: "Áreas" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl text-red">{s.value}</div>
                <div className="text-xs font-mono-data text-steel-light uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BusDivider />

      {/* CLIENT WALL */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="font-mono-data text-xs text-steel mb-6 text-center uppercase tracking-wide">
          Empresas y organismos que confiaron en GEDING
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {clients.map((c) => (
            <span
              key={c}
              className="font-display text-lg sm:text-xl text-steel-light hover:text-red transition-colors cursor-default"
              style={{ color: "var(--color-steel)" }}
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <BusDivider />

      {/* TIMELINE */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl text-ink mb-2">Línea de tiempo de proyectos</h2>
        <p className="text-steel text-[15px] normal-case mb-8 max-w-xl">
          Filtrá por área y hacé click en cualquier proyecto para ver el
          detalle técnico completo.
        </p>
        <NuestroTrabajoExplorer projects={projects} />
      </section>
    </>
  );
}
