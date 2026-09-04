import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/data/site";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/servicios/${service.slug}`}
      className="group relative flex flex-col overflow-hidden border border-steel-light bg-white transition-shadow hover:shadow-[6px_6px_0_var(--color-red)]"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/10" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl text-ink group-hover:text-red transition-colors">
          {service.name}
        </h3>
        <p className="mt-2 text-sm text-steel flex-1">{service.short}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-mono-data text-red">
          LEER MÁS
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}