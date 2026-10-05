---
title: Design Tokens di Tailwind v4 dengan @theme
description: Berhenti menulis hex hardcoded di className. Gunakan blok @theme Tailwind v4 untuk mendefinisikan warna brand, shadow kustom, dan animasi sebagai utilities.
pubDate: 2026-07-15
tags:
  - tailwind
  - css
  - frontend
---

Waktu rewrite portfolio ini, hal pertama yang saya bereskan bukan layout — tapi warna. Versi React lamanya penuh hex hardcoded: `bg-[#FFDD00]`, `shadow-[4px_4px_0_#000]`, `hover:bg-[#FF3B00]`, diulang puluhan kali. Satu brand color berubah? Selamat mencari-replace di seluruh codebase.

## Blok @theme

Tailwind v4 memindahkan konfigurasi dari `tailwind.config.js` ke CSS. Warna, font, shadow, bahkan keyframes bisa didefinisikan langsung di file CSS:

```css
@import "tailwindcss";

@theme {
  --color-sun: #ffdd00;
  --color-blaze: #ff3b00;
  --font-display: "Archivo Black", sans-serif;

  --shadow-brutal: 6px 6px 0 0 #000;

  --animate-marquee: marquee 22s linear infinite;

  @keyframes marquee {
    to {
      transform: translateX(-50%);
    }
  }
}
```

Setiap variabel otomatis menjadi utility class:

| Variabel               | Utility yang lahir            |
| ---------------------- | ----------------------------- |
| `--color-sun`          | `bg-sun`, `text-sun`, `border-sun` |
| `--font-display`       | `font-display`                |
| `--shadow-brutal`      | `shadow-brutal`               |
| `--animate-marquee`    | `animate-marquee`             |

## Before / after

```html
<!-- sebelum -->
<div class="bg-[#FFDD00] shadow-[6px_6px_0_#000]">...</div>

<!-- sesudah -->
<div class="bg-sun shadow-brutal">...</div>
```

Kelasnya lebih pendek, maksudnya jelas, dan yang terpenting: **single source of truth**. Ganti nilai `--color-sun` sekali, seluruh situs ikut.

## Referensi variabel di CSS biasa

Variabel `@theme` juga bisa dipakai di custom CSS karena semuanya adalah CSS variables biasa:

```css
::selection {
  background-color: var(--color-sun);
  color: #000;
}
```

## Kesimpulan

Kalau kamu masih menulis warna mentah di utility class, migrasi ke `@theme` adalah refactor termurah dengan dampak terbesar untuk maintainability. Mulai dari warna brand dan font — sisanya mengikuti seiring waktu.
