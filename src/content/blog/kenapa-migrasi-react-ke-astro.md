---
title: Kenapa Saya Migrasi Portfolio dari React ke Astro
description: Cerita rewrite portfolio dari SPA React + Vite menjadi Astro murni — tanpa hydration, tanpa runtime JS framework, dengan fitur blog bawaan content collections.
pubDate: 2026-08-20
tags:
  - astro
  - react
  - web-dev
---

Portfolio lama saya adalah SPA React biasa: satu `App.tsx` raksasa, semua section jadi satu file, dan — seperti kebanyakan SPA — seluruh React runtime dikirim ke browser hanya untuk menampilkan konten yang sebenarnya statis.

## Masalahnya bukan React

React bagus untuk aplikasi yang sangat interaktif. Tapi portfolio itu **konten**, bukan aplikasi. Tidak ada state global, tidak ada data fetching kompleks, tidak ada interaksi yang butuh virtual DOM. Yang ada:

- Hero section yang diam saja
- Daftar project yang tidak pernah berubah sejak build
- Dua-duanya cuma butuh HTML + CSS

Ironisnya, interaksi "paling rumit" di situs itu hanyalah toggle menu mobile.

## Astro: komponen, tapi output-nya HTML

Yang saya suka dari Astro: saya tetap menulis komponen, memecah section per file, memakai Tailwind v4 — tapi hasil akhirnya **HTML statis murni**. Tidak ada hydration, tidak ada bundle framework di client.

```astro
---
import { site } from "../data/portfolio";
---

<h1 class="font-display">{site.name}</h1>
```

Bagian depan (`---`) berjalan saat **build time**. Browser hanya menerima hasil render-nya.

## Content collections: fitur yang bikin nagih

Fitur yang paling membuat migrasi ini worth it adalah **content collections**. Blog dan daftar project kini hidup sebagai file markdown dengan schema yang tervalidasi Zod saat build:

```ts
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

Salah tulis frontmatter? Build langsung gagal dengan pesan yang jelas. Tidak ada lagi post publish dengan field typo yang lolos diam-diam.

## Hasil akhir

| Aspek              | React SPA              | Astro                    |
| ------------------ | ---------------------- | ------------------------ |
| JS ke browser      | Runtime framework      | ~2 skrip kecil (menu & form) |
| Konten             | Hardcoded di TSX       | Markdown + schema        |
| Struktur           | 1 file raksasa         | Komponen per section     |
| Dependencies       | 60+ paket              | 5 paket                  |

> Framework terbaik untuk situs konten adalah yang akhirnya mengirim **paling sedikit** JavaScript.

Kalau situsmu 90% konten, pertimbangkan serius untuk berhenti meng-hydrate halaman yang tidak butuh.
