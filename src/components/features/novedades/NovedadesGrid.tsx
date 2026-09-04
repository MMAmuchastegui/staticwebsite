import type { Novedad } from "@/lib/data/novedades.types";
import NovedadCard from "./NovedadCard";

export default function NovedadesGrid({ novedades }: { novedades: Novedad[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {novedades.map((n) => (
        <NovedadCard key={n.id} novedad={n} />
      ))}
    </div>
  );
}