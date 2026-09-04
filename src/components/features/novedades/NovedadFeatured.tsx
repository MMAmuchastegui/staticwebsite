import Image from "next/image";
import type { Novedad } from "@/lib/data/novedades.types";
import { statusLabel } from "@/lib/data/novedades";

export default function NovedadFeatured({ novedad }: { novedad: Novedad }) {
  const isEvento = novedad.type === "evento";
  const image = isEvento ? novedad.images[0] : novedad.project.images?.[0];
  const title = isEvento ? novedad.title : novedad.project.title;
  const badge = isEvento ? novedad.eventType : statusLabel(novedad.status);
  const description = isEvento
    ? novedad.description
    : novedad.project.details.slice(0, 3).join(" · ");

  if (!image) {
    return (
      <div className="border border-steel-light bg-white p-10 md:p-14 max-w-3xl mx-auto text-center">
        <span className="inline-block font-mono-data text-[10px] text-white bg-red px-2 py-1 uppercase tracking-wide">
          {badge}
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl text-ink normal-case leading-tight">{title}</h1>
        <p className="mt-3 text-steel normal-case">{description}</p>
      </div>
    );
  }

  return (
    <div className="relative border border-steel-light bg-white overflow-hidden">
      <div className="relative h-[420px] w-full">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="inline-block font-mono-data text-[10px] text-white bg-red px-2 py-1 uppercase tracking-wide">
            {badge}
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl text-white normal-case leading-tight max-w-3xl">
            {title}
          </h1>
          <p className="mt-3 text-steel-light normal-case max-w-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
}