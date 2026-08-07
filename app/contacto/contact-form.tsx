"use client";

import { useState } from "react";
import { site } from "@/lib/data/site";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Consulta desde geding.com.ar — ${form.name || "sin nombre"}`
  )}&body=${encodeURIComponent(
    `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
  )}`;

  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoHref;
      }}
    >
      <div>
        <label htmlFor="name" className="block text-xs font-mono-data text-steel mb-1.5">
          NOMBRE
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-steel-light bg-white px-4 py-3 text-[15px] outline-none focus:border-red"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-mono-data text-steel mb-1.5">
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-steel-light bg-white px-4 py-3 text-[15px] outline-none focus:border-red"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-mono-data text-steel mb-1.5">
          CONSULTA
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-steel-light bg-white px-4 py-3 text-[15px] outline-none focus:border-red resize-none"
        />
      </div>
      <button
        type="submit"
        className="justify-self-start bg-red hover:bg-red-dark transition-colors text-white font-display tracking-wide px-8 py-3"
      >
        ENVIAR CONSULTA
      </button>
      <p className="text-xs text-steel normal-case">
        Al enviar, se abrirá tu programa de correo con el mensaje ya
        redactado hacia {site.email}.
      </p>
    </form>
  );
}
