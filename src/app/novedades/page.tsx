import type { Metadata } from "next";
import { getActiveNovedades, getFeaturedProjects } from "@/lib/data/novedades";
import NovedadesGrid from "@/src/components/features/novedades/NovedadesGrid";
import NovedadesEmptyState from "@/src/components/features/novedades/NovedadesEmptyState";
import BusDivider from "@/src/components/ui/BusDivider";

export const metadata: Metadata = {
  title: "Novedades | GEDING",
  description: "Los proyectos más recientes incorporados por GEDING.",
};

export default function Novedades() {
  const novedades = getActiveNovedades();

  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="font-mono-data text-xs text-red mb-2">NOVEDADES</div>
          <h1 className="text-4xl md:text-5xl text-white">Lo último en GEDING</h1>
        </div>
      </section>

      <BusDivider />

      <section className="mx-auto max-w-6xl px-5 py-16">
        {novedades.length > 0 ? (
          <NovedadesGrid novedades={novedades} />
        ) : (
          <NovedadesEmptyState featured={getFeaturedProjects()} />
        )}
      </section>
    </>
  );
}