import type { Metadata } from "next";
import { services } from "@/lib/data/site";
import ServiceCard from "@/src/components/features/services/ServiceCard";

export const metadata: Metadata = {
  title: "Servicios | GEDING",
  description:
    "Energía eléctrica, saneamiento, industria oil & gas y edificios inteligentes: automatización y control a medida.",
};

export default function Servicios() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="max-w-2xl">
        <div className="font-mono-data text-xs text-red mb-2">SERVICIOS</div>
        <h1 className="text-4xl md:text-5xl text-ink">
          La solución técnica y económica apropiada
        </h1>
        <p className="mt-4 text-steel text-[15px] normal-case">
          Somos una empresa que provee la solución técnica y económica
          apropiada para su emprendimiento. El mayor atributo que nos
          distingue es una estructura ágil y eficiente para grandes
          soluciones.
        </p>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </section>
  );
}