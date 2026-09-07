import type { Metadata } from "next";
import { getActiveNovedades, getFeaturedProjects, splitNovedades } from "@/lib/data/novedades";
import NovedadFeatured from "@/src/components/features/novedades/NovedadFeatured";
import NovedadesMosaic from "@/src/components/features/novedades/NovedadesMosaic";
import ProjectsStackedList from "@/src/components/features/novedades/ProjectsStackedList";
import NovedadesEmptyState from "@/src/components/features/novedades/NovedadesEmptyState";
import BusDivider from "@/src/components/ui/BusDivider";

export const metadata: Metadata = {
  title: "Novedades | GEDING",
  description: "Los proyectos y novedades más recientes de GEDING.",
};

export default function Novedades() {
  const novedades = getActiveNovedades();
  const { proyectos, eventos } = splitNovedades(novedades);

  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="font-mono-data text-[50px] text-white mb-2">NOVEDADES</div>
        </div>
      </section>

      <BusDivider />

      <section className="mx-auto max-w-6xl px-5 py-16">
        {novedades.length === 0 && (
          <NovedadesEmptyState featured={getFeaturedProjects()} />
        )}
        {novedades.length === 1 && <NovedadFeatured novedad={novedades[0]} />}
        {novedades.length > 1 && eventos.length === 0 && (
          <ProjectsStackedList proyectos={proyectos} />
        )}
        {novedades.length > 1 && eventos.length > 0 && (
          <NovedadesMosaic proyectos={proyectos} eventos={eventos} />
        )}
      </section>
    </>
  );
}