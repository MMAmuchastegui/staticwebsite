import Link from "next/link";
import { site, mainNav } from "@/lib/data/site";
import StatusDot from "../ui/StatusDot";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl tracking-wide text-white">
            GEDING <span className="text-red">·</span> Automatismos y Control
          </div>
          <p className="mt-3 text-sm text-steel-light max-w-xs">
            Ingeniería especializada en integración de sistemas de control desde {site.foundedYear}.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs font-mono-data text-steel-light">
            <StatusDot color="red" />
            SISTEMA EN LÍNEA
          </div>
        </div>

        <div>
          <div className="font-display text-sm tracking-widest text-steel-light mb-3">
            NAVEGACIÓN
          </div>
          <ul className="space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-red transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-sm tracking-widest text-steel-light mb-3">
            CONTACTO
          </div>
          <ul className="space-y-2 text-sm">
            <li>{site.address}</li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-red transition-colors">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-red transition-colors">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-steel-light flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} GEDING. Todos los derechos reservados.</span>
          <span className="font-mono-data">CBA · AR</span>
        </div>
      </div>
    </footer>
  );
}