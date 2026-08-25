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
            <div className="font-mono-data text-xs text-red mb-2">
              NUESTRA TRAYECTORIA
            </div>

            <h1 className="text-4xl md:text-5xl text-white leading-[1.05]">
              Brindando soluciones de ingeniería desde {site.foundedYear}
            </h1>

            <p className="mt-5 text-steel-light text-[15px] max-w-xl normal-case">
              Desde {site.foundedYear}, desarrollamos e integramos sistemas de
              control para proyectos de infraestructura e industria, acompañando a
              empresas de los sectores energético, saneamiento, oil & gas y
              edificios inteligentes con soluciones confiables, eficientes y
              adaptadas a los requerimientos de cada proyecto.
            </p>
          </div>
        </div>
      </section>

      <BusDivider />

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
