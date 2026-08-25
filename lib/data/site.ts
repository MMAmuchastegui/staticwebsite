export const site = {
  name: "GEDING",
  tagline: "Automatismos y Control",
  foundedYear: 1999,
  phone: "03543 432094",
  email: "webmaster@geding.com.ar",
  address: "Rivera Indarte 527, Villa Allende, Córdoba, Argentina",
};

export const mainNav = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nuestro-trabajo", label: "Nuestro trabajo" },
  { href: "/contacto", label: "Contacto" },
];

export type ServiceSlug =
  | "energia-electrica"
  | "saneamiento"
  | "industria-oil-gas"
  | "edificios-inteligentes";

export interface Service {
  slug: ServiceSlug;
  name: string;
  short: string;
  intro: string;
  image: string;
  groups: { heading: string; items: string[] }[];
}

export const services: Service[] = [
  {
    slug: "energia-electrica",
    name: "Energía Eléctrica",
    short:
      "Automatización en sistemas de Generación, Distribución y Transmisión.",
    intro:
      "GEDING provee hace más de 20 años soluciones de automatización en sistemas de Generación, Distribución y Transmisión. Contamos con una sólida y vasta experiencia en sistemas de supervisión, control y gerenciamiento de energía (SCADA, DMS, EMS); nuestros desarrollos garantizan al cliente escalabilidad, flexibilidad y seguridad. Nuestras soluciones comienzan por el asesoramiento al cliente, pasando por proyecto, ejecución, ensayos, puesta en marcha, entrenamiento y soporte, garantizando un sistema integral y a la medida de sus necesidades.",
    image: "/images/servicio-energia-electrica.png",
    groups: [
      {
        heading: "Áreas de implementación SCADA GEDING",
        items: [
          "Automatización de Subestaciones",
          "Centros de Control de Generación, Distribución y Transmisión",
          "Sistemas de Telemedición Inteligentes",
          "Monitoreo de Protecciones",
          "SOTR",
          "Redes inteligentes de energía (Smart Grids)",
          "Generación Distribuida",
          "Provisión de RTU y Concentradores de Estación",
          "Sistemas DMS, EMS",
          "Integración de sistemas GIS, ERP",
          "Calidad de Servicio, campañas de medición (todas las marcas)",
        ],
      },
    ],
  },
  {
    slug: "saneamiento",
    name: "Saneamiento",
    short:
      "Automatización y control de plantas potabilizadoras y depuradoras.",
    intro:
      "GEDING proporciona soluciones en automatización y control de sistemas de saneamiento, viabilizando economía de energía, operación eficiente, registro y control de parámetros de calidad e insumos, operación no asistida de sistemas remotos, y menor costo de mantenimiento y operación. Disponemos de herramientas de gestión corporativa para la toma de decisiones de la empresa.",
    image: "/images/servicio-saneamiento.png",
    groups: [
      {
        heading: "Sistemas de supervisión y telecontrol",
        items: [
          "Automatización y Control de Plantas Potabilizadoras",
          "Automatización y Control de Plantas Depuradoras",
          "Provisión de PLC, SCADA e Instrumentación",
          "Automatización de Acueductos",
          "Estaciones de Elevación y Bombeo",
          "Comunicaciones y Telecontrol",
          "Tableros de Control",
          "Gestión de Datos Corporativos",
        ],
      },
    ],
  },
  {
    slug: "industria-oil-gas",
    name: "Industria — Oil & Gas",
    short:
      "Automatización y control industrial para minería, petróleo y gas.",
    intro:
      "GEDING proporciona soluciones en automatización y control de sistemas industriales, en especial en el área de los servicios eléctricos, gas, saneamiento y generación. Disponemos de soluciones para minería, petróleo y gas.",
    image: "/images/servicio-industria-oil-gas.png",
    groups: [
      {
        heading: "Sistemas de supervisión y telecontrol",
        items: [
          "Automatización y Control de Gasoductos",
          "Sistemas de Medición de Consumos",
          "Automatización y Control Eléctrico de Plantas",
          "Provisión de RTU y Tableros de Control",
          "Gestión de Energías en Predios Industriales",
          "Sistemas de Comunicación para Control y Seguridad",
          "Sistemas de Información PIMS-EPNL",
        ],
      },
    ],
  },
  {
    slug: "edificios-inteligentes",
    name: "Edificios Inteligentes",
    short: "Automatización y gestión BAS/BMS para grandes edificios.",
    intro:
      "GEDING provee sistemas de automatización y gestión para edificios (BAS, BMS) de oficinas, públicos, hoteles, hospitales y centros comerciales, para el control sustentable de los recursos y maximizando la calidad del servicio y la seguridad. También disponemos de un Sistema de Gestión de Terminales para el transporte de pasajeros (colectivos, trenes, aeropuertos y puertos), gestionando estos predios de forma inteligente.",
    image: "/images/servicio-edificios-inteligentes.png",
    groups: [
      {
        heading: "Energía eléctrica",
        items: [
          "Consumo de energía",
          "Energía de emergencia y confiable (UPS, generadores)",
          "Sistemas de iluminación: regulación, programación, horarios",
          "Tableros generales y celdas MT",
          "Tableros seccionales",
          "Servicios auxiliares",
          "Transformadores de potencia",
        ],
      },
      {
        heading: "Utilidades",
        items: [
          "Monitoreo y alarmas de bombas sanitarias y pluviales",
          "Niveles de tanques y cisternas",
          "Ascensores, escaleras y cintas",
          "Consumo de gas y agua",
        ],
      },
      {
        heading: "Aire acondicionado",
        items: [
          "Aire acondicionado central",
          "Máquinas de frío y calderas",
          "Control de aire acondicionado VRV",
          "Ventilaciones",
        ],
      },
      {
        heading: "Seguridad",
        items: [
          "Control de accesos e intrusiones",
          "Detección y extinción de incendios",
          "Integración con CCTV",
        ],
      },
    ],
  },
];
