"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projectCount } from "@/lib/data/projects";
import { site } from "@/lib/data/site";

interface Slide {
  image: string;
  kicker: string;
  heading: string[];
  text: string;
  buttons: {
    label: string;
    href: string;
    primary?: boolean;
  }[];
}

const slides: Slide[] = [
  {
    image: "/images/hero-slide-01.jpg",
    kicker: `DESARROLLANDO SISTEMAS DE CONTROL DESDE ${site.foundedYear}`,
    heading: [],
    text: "Somos una empresa de servicios de ingeniería especializada en la integración de Sistemas de Control, con importantes clientes y sistemas que lo avalan.",
    buttons: [
      { label: "QUIÉNES SOMOS", href: "/quienes-somos", primary: true },
      { label: "CONTÁCTENOS", href: "/contacto" },
    ],
  },
  {
    image: "/images/hero-slide-02.jpg",
    kicker: "NUESTROS SERVICIOS",
    heading: [],
    text: "Energía eléctrica, saneamiento, industria oil & gas y edificios inteligentes: la solución técnica y económica apropiada para su emprendimiento.",
    buttons: [{ label: "VER SERVICIOS", href: "/servicios", primary: true }],
  },
  {
    image: "/images/hero-slide-03.jpg",
    kicker: "TRAYECTORIA",
    heading: [],
    text: "Desde 1999 desarrollando e integrando sistemas de control para proyectos de energía eléctrica, saneamiento, industria oil & gas y edificios inteligentes.",
    buttons: [{ label: "NUESTRO TRABAJO", href: "/nuestro-trabajo", primary: true }],
  },
  {
    image: "/images/hero-slide-04.jpg",
    kicker: "CONTACTO",
    heading: [],
    text: "Nuestro equipo de ingeniería ofrecer una propuesta técnica adaptada a las necesidades de su proyecto, garantizando calidad, eficiencia y confiabilidad en cada etapa del proceso.",
    buttons: [{ label: "SOLICITAR ASESORAMIENTO", href: "/contacto", primary: true }],
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const goTo = (i: number) => setIndex(((i % total) + total) % total);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (paused || total <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused, total]);

  return (
    <section
      className="relative h-[60vh] min-h-[500px] max-h-[700px] overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Imágenes */}
      {slides.map((slide, i) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent z-[1]" />

      {/* Textura */}
      <div
        className="absolute inset-0 opacity-25 z-[2]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(226,0,26,.35) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 h-full mx-auto max-w-6xl flex items-center px-6">
        {slides.map((slide, i) => (
          <div
            key={slide.kicker}
            className={`absolute max-w-xl transition-all duration-700 ${
              i === index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-2 font-mono-data text-[12px] text-red mb-4 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-red" />
              {slide.kicker}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
              {slide.heading.map((line, j) => (
                <span key={j} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p
              className={`mt-5 max-w-xl text-white leading-relaxed ${
                slide.heading.length === 0
                  ? "text-xl md:text-2xl font-bold"
                  : "text-base md:text-lg font-normal"
              }`}
            >
              {slide.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {slide.buttons.map((button) =>
                button.primary ? (
                  <Link
                    key={button.label}
                    href={button.href}
                    className="bg-red hover:bg-red-dark px-6 py-2.5 text-sm text-white font-display transition-colors"
                  >
                    {button.label}
                  </Link>
                ) : (
                  <Link
                    key={button.label}
                    href={button.href}
                    className="border border-white/40 px-6 py-2.5 text-sm text-white hover:border-red hover:text-red transition-colors"
                  >
                    {button.label}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Flechas */}
      <button
        type="button"
        aria-label="Diapositiva anterior"
        onClick={prev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:border-red hover:text-red"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Siguiente diapositiva"
        onClick={next}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:border-red hover:text-red"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-red" : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}