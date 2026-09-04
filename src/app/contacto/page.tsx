import type { Metadata } from "next";
import { site } from "@/lib/data/site";
import ContactForm from "@/src/components/features/contact/ContactForm";
import StatusDot from "@/src/components/ui/StatusDot";

export const metadata: Metadata = {
  title: "Contacto | GEDING",
  description: "Haga su consulta y le respondemos a la brevedad.",
};

export default function Contacto() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="max-w-2xl">
        <div className="font-mono-data text-xs text-red mb-2">CONTACTO</div>
        <h1 className="text-4xl md:text-5xl text-ink">Hablemos de su proyecto</h1>
        <p className="mt-4 text-steel text-[15px] normal-case">
          Haga su consulta a través del formulario y le responderemos a la
          brevedad.
        </p>
      </div>

      <div className="mt-14 grid lg:grid-cols-[1fr_380px] gap-12">
        <div className="border border-steel-light bg-white p-6 md:p-8">
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 font-mono-data text-xs text-steel mb-3">
              <StatusDot color="red" />
              INFORMACIÓN DE CONTACTO
            </div>
            <ul className="space-y-3 text-[15px]">
              <li>
                <span className="block text-xs text-steel font-mono-data">TELÉFONO</span>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-red">
                  {site.phone}
                </a>
              </li>
              <li>
                <span className="block text-xs text-steel font-mono-data">EMAIL</span>
                <a href={`mailto:${site.email}`} className="hover:text-red">
                  {site.email}
                </a>
              </li>
              <li>
                <span className="block text-xs text-steel font-mono-data">DIRECCIÓN</span>
                {site.address}
              </li>
            </ul>
          </div>

          <div className="border-t border-steel-light pt-6">
            <div className="font-mono-data text-xs text-steel mb-2">ASISTENCIA TÉCNICA</div>
            <p className="text-sm text-steel normal-case">
              Atención personalizada al cliente, con personal in situ,
              telefónicamente, vía e-mail y on-line.
            </p>
          </div>

          <div className="border-t border-steel-light pt-6">
            <div className="font-mono-data text-xs text-steel mb-2">
              ¿QUERÉS FORMAR PARTE DE GEDING?
            </div>
            <a href={`mailto:${site.email}`} className="text-sm text-red hover:underline">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}