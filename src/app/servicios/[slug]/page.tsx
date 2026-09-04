import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/lib/data/site";
import { projectsByCategory } from "@/lib/data/projects";
import BusDivider from "@/src/components/ui/BusDivider";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} | GEDING`,
    description: service.short,
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedCount = projectsByCategory[service.slug]?.length ?? 0;
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Link href="/servicios" className="font-mono-data text-xs text-red hover:underline">
            ← SERVICIOS
          </Link>
          <h1 className="text-4xl md:text-5xl text-ink mt-3">{service.name}</h1>
          <p className="mt-6 text-steel text-[15px] leading-relaxed normal-case">
            {service.intro}
          </p>
          {relatedCount > 0 && (
            <Link
              href="/nuestro-trabajo"
              className="mt-6 inline-flex items-center gap-2 font-mono-data text-xs text-ink border border-steel-light px-4 py-2 hover:border-red hover:text-red transition-colors"
            >
              {relatedCount} PROYECTOS EJECUTADOS EN ESTA ÁREA →
            </Link>
          )}
        </div>
        <div className="relative aspect-[4/3] border border-steel-light">
          <Image src={service.image} alt={service.name} fill className="object-cover" />
        </div>
      </section>

      <BusDivider />

      <section className="mx-auto max-w-6xl px-5 py-16">
        {service.groups.map((group) => (
          <div key={group.heading} className="mb-12 last:mb-0">
            <h2 className="text-2xl text-ink mb-6">{group.heading}</h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-steel normal-case">
                  <span className="text-red font-mono-data mt-0.5">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="font-mono-data text-xs text-steel mb-4">OTROS SERVICIOS</div>
          <div className="flex flex-wrap gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="border border-steel-light bg-white px-4 py-2 text-sm hover:border-red hover:text-red transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}