import type { Metadata } from "next";
import { site } from "@/lib/data/site";
import Image from "next/image";
import BusDivider from "@/src/components/ui/BusDivider";

export const metadata: Metadata = {
  title: "Quiénes somos | GEDING",
  description: "Geding nace en 1999 como una empresa de ingeniería en energía eléctrica y sistemas de control.",
};

const pillars = [
  { label: "Producto", text: "Tener un buen producto." },
  { label: "Capacidad", text: "Capacidad técnica." },
  { label: "Cliente", text: "Soluciones que complacen 100% al cliente." },
];

const mission = [
  "Prestar servicios y asesoramientos especializados en el área de la ingeniería, automatización, integración de sistemas, protecciones y mediciones.",
  "Crear soluciones en sistemas nuevos y existentes.",
];

const vision = [
  "Referentes de soluciones confiables.",
  "Líderes en Sistemas de Control y Automatismos.",
  "Desarrollar cadenas de alianzas en el país.",
  "Asistencia on-line.",
];

const quality = [
  "Ofrecer servicios y productos de calidad, con soluciones que complacen al cliente.",
  "Optimizar nuestros procesos para una mayor productividad, con una estructura ágil y eficiente para grandes soluciones.",
  "Lograr un ambiente laboral adecuado.",
];

export default function QuienesSomos() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="font-mono-data text-xs text-red mb-2">DESDE {site.foundedYear}</div>
          <h1 className="text-4xl md:text-5xl text-ink">Quiénes somos</h1>
          <p className="mt-6 text-steel text-[15px] leading-relaxed normal-case">
            Geding nace en el año {site.foundedYear} como una empresa de ingeniería en energía eléctrica y sistemas de control. Hoy somos referentes en servicios de ingeniería especializada y servicios para la integración de Sistemas de Control, con importantes clientes y sistemas que lo avalan.
          </p>
          <p className="mt-4 text-steel text-[15px] leading-relaxed normal-case">
            En todo proyecto que nos confían, nuestros clientes tienen la seguridad de contar con la solución técnica y económica apropiada, acompañada de todos los cálculos, planos, documentos, manuales y capacitación que respaldan nuestros proyectos.
          </p>
        </div>
        <div className="relative aspect-[3/4] border border-steel-light">
          <Image
            src="/images/quienes-somos.png"
            alt="Equipo técnico GEDING en planta"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <BusDivider />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="font-mono-data text-xs text-red mb-2">NUESTRO ÉXITO</div>
        <h2 className="text-3xl text-ink mb-8">
          Estructura ágil y eficiente para grandes soluciones
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div key={p.label} className="border border-steel-light bg-white p-6">
              <div className="font-display text-lg text-red mb-2">{p.label}</div>
              <p className="text-sm text-steel normal-case">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl text-white mb-4">Misión</h3>
            <ul className="space-y-3 text-sm text-steel-light normal-case">
              {mission.map((m, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red">—</span> {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl text-white mb-4">Visión</h3>
            <ul className="space-y-3 text-sm text-steel-light normal-case">
              {vision.map((v, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red">—</span> {v}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl text-white mb-4">Política de calidad</h3>
            <p className="text-sm text-steel-light normal-case mb-3">
              En GEDING, calidad es sinónimo de satisfacción de clientes, usuarios, empleados y proveedores.
            </p>
            <ul className="space-y-3 text-sm text-steel-light normal-case">
              {quality.map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red">—</span> {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}