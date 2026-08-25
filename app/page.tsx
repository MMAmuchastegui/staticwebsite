import Link from "next/link";
import { services, site } from "@/lib/data/site";
import { projectCount } from "@/lib/data/projects";
import ServiceCard from "@/components/home/ServiceCard";
import BusDivider from "@/components/ui/BusDivider";
import HeroCarousel from "@/components/home/HeroCarousel";
import HeroVideo from "@/components/home/HeroVideo";

export default function Home() {
  const yearsActive = new Date().getFullYear() - site.foundedYear;

  return (
    <>
      <HeroCarousel />

      <HeroVideo />

      <BusDivider />

      {/* STATS STRIP */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-10 flex justify-center gap-12 text-center">
          {[
            { value: `${yearsActive}+`, label: "Años de trayectoria" },
            { value: `${projectCount}+`, label: "Proyectos ejecutados" },
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
            La solución técnica y económica apropiada para su proyecto
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
          Desarrollemos la solución adecuada para su proyecto
        </h2>

        <p className="mt-4 text-steel max-w-2xl mx-auto normal-case">
          Nuestro equipo de ingeniería está preparado para analizar sus
          requerimientos y ofrecer una propuesta técnica adaptada a las
          necesidades de su empresa, garantizando calidad, eficiencia y
          confiabilidad en cada etapa del proceso.
        </p>

        <Link
          href="/contacto"
          className="mt-8 inline-block bg-ink hover:bg-red transition-colors text-white font-display tracking-wide px-8 py-4"
        >
          SOLICITAR ASESORAMIENTO
        </Link>
      </section>
    </>
  );
}
