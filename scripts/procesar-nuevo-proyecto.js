const fs = require("fs");
const path = require("path");
const { descargarImagen, extractImageUrls } = require("./github-images.js");

const PROJECTS_PATH = path.join(__dirname, "..", "lib", "data", "projects-raw.json");
const NOVEDADES_PATH = path.join(__dirname, "..", "lib", "data", "novedades-raw.json");

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseIssueBody(body) {
  const data = {};
  const blocks = body.split(/^### /m).slice(1);
  for (const block of blocks) {
    const newlineIndex = block.indexOf("\n");
    const label = block.slice(0, newlineIndex).trim();
    const value = block.slice(newlineIndex).trim();
    data[label] = value === "_No response_" ? "" : value;
  }
  return data;
}

function extractSortYear(yearStr) {
  const matches = yearStr.match(/\d{4}/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
}

function uniqueSlug(base, existingIds) {
  let slug = base;
  let i = 2;
  while (existingIds.has(slug)) {
    slug = `${base}-${i}`;
    i++;
  }
  return slug;
}

async function procesarNuevoProyecto(issueBody) {
  const fields = parseIssueBody(issueBody);

  const title = fields["Nombre del proyecto"];
  const year = fields["Año (ej. 2026 o 2025-2026)"];
  const category = fields["Categoría"];
  const detailsRaw = fields["Detalles (uno por línea)"] || "";
  const status = fields["Estado"];
  const expiresRaw = fields["Días que permanece en Novedades (dejar vacío = 60)"];

  if (!title || !year || !category || !status) {
    throw new Error("Faltan campos obligatorios en el formulario.");
  }

  const details = detailsRaw.split("\n").map((d) => d.trim()).filter(Boolean);

  const projects = JSON.parse(fs.readFileSync(PROJECTS_PATH, "utf-8"));
  const novedades = JSON.parse(fs.readFileSync(NOVEDADES_PATH, "utf-8"));

  const existingIds = new Set(projects.map((p) => p.id).filter(Boolean));
  const id = uniqueSlug(slugify(title), existingIds);

  // Descargar imágenes
  const fotosRaw = fields["Fotos (opcional)"] || "";
  const imageUrls = extractImageUrls(fotosRaw);
  const destDir = path.join(__dirname, "..", "public", "images", "proyectos");
  const images = [];
  for (let i = 0; i < imageUrls.length; i++) {
    images.push(await descargarImagen(imageUrls[i], destDir, id, i + 1));
  }

  const newProject = { 
    id, 
    title, 
    year, 
    sortYear: extractSortYear(year), 
    category, 
    details,
    images 
  };

  const parsedExpires = parseInt(expiresRaw, 10);
  const expiresInDays = Number.isFinite(parsedExpires) ? parsedExpires : undefined;

  const newNovedad = {
    id,
    type: "proyecto",
    projectId: id,
    status,
    dateAdded: new Date().toISOString().slice(0, 10),
    ...(expiresInDays ? { expiresInDays } : {}),
  };

  projects.unshift(newProject);
  novedades.unshift(newNovedad);

  fs.writeFileSync(PROJECTS_PATH, JSON.stringify(projects, null, 2) + "\n");
  fs.writeFileSync(NOVEDADES_PATH, JSON.stringify(novedades, null, 2) + "\n");

  return { id, title };
}

module.exports = { procesarNuevoProyecto, parseIssueBody, slugify };