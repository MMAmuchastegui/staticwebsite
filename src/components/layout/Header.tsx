"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/data/site";
import { getActiveNovedades } from "@/lib/data/novedades";

const SEEN_KEY = "novedades_seen_count";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hasNovedades, setHasNovedades] = useState(false);
  const [novedadesCount, setNovedadesCount] = useState(0);
  const pathname = usePathname();

  // Chequea si hay novedades nuevas no vistas
  useEffect(() => {
    try {
      const activas = getActiveNovedades();
      const count = activas.length;
      setNovedadesCount(count);

      const seenCount = Number(localStorage.getItem(SEEN_KEY) ?? 0);
      setHasNovedades(count > seenCount);
    } catch (error) {
      console.error("Error checking novedades:", error);
      setHasNovedades(false);
      setNovedadesCount(0);
    }
  }, []);

  // Al entrar a /novedades, marca como visto
  useEffect(() => {
    if (pathname === "/novedades" && novedadesCount > 0) {
      localStorage.setItem(SEEN_KEY, String(novedadesCount));
      setHasNovedades(false);
    }
  }, [pathname, novedadesCount]);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-steel-light">
      <div className="mx-auto max-w-6xl px-5 flex items-center justify-between h-24">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="GEDING Automatismos y Control"
            width={230}
            height={59}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-display text-[15px] tracking-wide">
          {mainNav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            const isNovedades = item.href === "/novedades" || 
                               item.label.toLowerCase().includes("novedad") ||
                               item.label.toLowerCase().includes("noticia");
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 transition-colors hover:text-red ${
                  active ? "text-red" : "text-ink"
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.label}
                  {isNovedades && hasNovedades && (
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red text-[10px] font-bold text-white">
                        {novedadesCount}
                      </span>
                    </span>
                  )}
                </span>
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-red" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-steel-light bg-paper px-5 py-4 flex flex-col gap-4 font-display text-lg">
          {mainNav.map((item) => {
            const isNovedades = item.href === "/novedades" || 
                               item.label.toLowerCase().includes("novedad") ||
                               item.label.toLowerCase().includes("noticia");
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setOpen(false)} 
                className="py-1 flex items-center gap-2"
              >
                {item.label}
                {isNovedades && hasNovedades && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}