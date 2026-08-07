import Link from "next/link";
import { services, site } from "@/lib/data/site";
import { projectCount } from "@/lib/data/projects";
import ServiceCard from "@/components/home/ServiceCard";
import BusDivider from "@/components/ui/BusDivider";
import HeroCarousel from "@/components/home/HeroCarousel";

export default function Home() {
  const yearsActive = new Date().getFullYear() - site.foundedYear;

  return (
    <>
      <HeroCarousel />

      <BusDivider />

      {/* STATS STRIP */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: `${yearsActive}+`, label: "Años de trayectoria" },
            { value: `${projectCount}+`, label: "Proyectos ejecutados" },
            { value: "4", label: "Áreas de especialización" },
            { value: "24/7", label: "Monitoreo y soporte" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl text-red">{s.value}</div>
              <div className="text-xs font-mono-data text-steel-light mt-1 uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <div className="font-mono-data text-xs text-red mb-2">NUESTROS SERVICIOS</div>
          <h2 className="text-3xl md:text-4xl text-ink">
            La solución técnica y económica apropiada para su emprendimiento
          </h2>
          <p className="mt-4 text-steel text-[15px] normal-case">
            Proveemos la solución apropiada para cada proyecto. El mayor
            atributo que nos distingue es una estructura ágil y eficiente
            para grandes soluciones.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <BusDivider />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="text-3xl md:text-4xl text-ink">
          ¿Tiene un proyecto de automatización en mente?
        </h2>
        <p className="mt-4 text-steel max-w-xl mx-auto normal-case">
          Cuéntenos qué necesita y le respondemos a la brevedad con la
          solución técnica adecuada.
        </p>
        <Link
          href="/contacto"
          className="mt-8 inline-block bg-ink hover:bg-red transition-colors text-white font-display tracking-wide px-8 py-4"
        >
          HABLEMOS DE SU PROYECTO
        </Link>
      </section>
    </>
  );
}
