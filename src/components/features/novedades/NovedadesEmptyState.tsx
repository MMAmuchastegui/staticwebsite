"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/data/projects";

export default function NovedadesEmptyState({
  featured,
}: {
  featured: Project[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featured.length);
    }, 1700);

    return () => clearInterval(interval);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const getRelativePosition = (index: number) => {
    const total = featured.length;
    let difference = index - activeIndex;

    if (difference > total / 2) {
      difference -= total;
    }

    if (difference < -total / 2) {
      difference += total;
    }

    return difference;
  };

  return (
    <div>
      {/* Mensaje original */}
      <div className="border border-dashed border-steel-light bg-paper-dim p-8 text-center">
        <p className="text-steel normal-case">
          Actualmente no hay proyectos recientes para mostrar.
        </p>
        <p className="text-steel normal-case mt-1">
          Mientras tanto, conozca algunos de nuestros proyectos destacados.
        </p>
      </div>

      {/* Carrusel */}
      <div className="mt-12 relative h-[340px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {featured.map((project, index) => {
            const position = getRelativePosition(index);

            const isCenter = position === 0;
            const isVisible = Math.abs(position) <= 2;

            if (!isVisible) return null;

            const translateX = position * 190;

            let scale = 0.82;
            let opacity = 0.35;
            let zIndex = 10 - Math.abs(position);

            if (isCenter) {
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (Math.abs(position) === 1) {
              scale = 0.9;
              opacity = 0.65;
              zIndex = 20;
            }

            return (
              <div
                key={project.title}
                className="
                  absolute
                  left-1/2
                  w-[330px]
                  sm:w-[390px]
                  md:w-[440px]
                  h-[240px]
                  sm:h-[250px]
                  md:h-[270px]
                  border
                  border-steel-light
                  bg-white
                  p-7
                  md:p-8
                  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  flex
                  flex-col
                  justify-between
                "
                style={{
                  transform: `
                    translateX(calc(-50% + ${translateX}px))
                    scale(${scale})
                  `,
                  opacity,
                  zIndex,
                }}
              >
                <div>
                  <span className="font-mono-data text-[10px] text-steel uppercase tracking-[0.15em]">
                    {project.year}
                  </span>

                  <h3
                    className={`
                      text-ink
                      normal-case
                      leading-tight
                      mt-3
                      transition-all
                      duration-700
                      ${
                        isCenter
                          ? "text-[22px] sm:text-[24px] md:text-[26px]"
                          : "text-[16px]"
                      }
                    `}
                  >
                    {project.title}
                  </h3>
                </div>

                {isCenter && (
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-[9px] uppercase tracking-widest text-steel">
                      Proyecto destacado
                    </span>

                    <span className="text-steel text-sm">→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicadores */}
      {featured.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {featured.map((project, index) => (
            <span
              key={project.title}
              className={`
                h-1 transition-all duration-500
                ${
                  index === activeIndex
                    ? "w-7 bg-ink"
                    : "w-2 bg-steel-light"
                }
              `}
            />
          ))}
        </div>
      )}

      {/* Botón */}
      <div className="mt-8 text-center">
        <Link
          href="/nuestro-trabajo"
          className="
            inline-block
            bg-ink
            hover:bg-red
            transition-colors
            text-white
            font-display
            tracking-wide
            px-8
            py-3
          "
        >
          VER TODOS LOS PROYECTOS
        </Link>
      </div>
    </div>
  );
}