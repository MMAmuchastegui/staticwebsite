"use client";

const VIDEO_SRC = "/videos/inicio.mp4";
const POSTER_SRC = "/images/hero-home-2.jpg";

export default function HeroVideo() {
  return (
    <section className="bg-ink py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 max-w-2xl">
          <div className="font-mono-data text-xs text-red mb-2 uppercase tracking-wider">
            GEDING EN ACCIÓN
          </div>
          <h2 className="text-3xl md:text-4xl text-white">
            Conozca nuestro trabajo
          </h2>
        </div>

        <div className="relative aspect-video w-full overflow-hidden bg-black shadow-2xl">
          <video
            className="h-full w-full"
            controls
            playsInline
            preload="metadata"
            poster={POSTER_SRC}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            Tu navegador no soporta la reproducción de este video.
          </video>
        </div>
      </div>
    </section>
  );
}