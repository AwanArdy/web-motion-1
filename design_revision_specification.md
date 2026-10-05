# Dokumen Revisi Desain & Motion Portfolio Website

**Project:** Fullstack Developer Portfolio Website  
**Style Concept:** Architectural Swiss / Structural Minimalist  
**Color Palette:** Monokrom murni (Hitam & Putih) dengan Light & Dark Mode  
**Typography:** Plus Jakarta Sans (Utama & Display) + System Monospace (Metadata Teknis)  
**Motion Library:** Anime.js  
**Visual Constraint:** Tanpa foto — Murni mengandalkan tipografi, grid layout, ikon SVG, dan motion interaktif.

---

## 1. Konsep & Estetika Visual (Architectural Swiss)

- **Grid System:**
  - Layout berbasis grid presisi dengan garis pembatas tipis (`1px border`).
  - Warna border:
    - *Light Mode:* `#E5E5E5` (Default) / `#000000` (Aksen / Active border)
    - *Dark Mode:* `#262626` (Default) / `#FFFFFF` (Aksen / Active border)
  - Layout mengedepankan *negative space* yang rapi dan terstruktur layaknya cetak biru arsitektur.

- **Sistem Warna (Monokrom):**
  - **Light Mode:**
    - Background: `#FFFFFF`
    - Foreground/Text: `#0A0A0A`
    - Muted Text: `#666666`
  - **Dark Mode:**
    - Background: `#0A0A0A`
    - Foreground/Text: `#FAFAFA`
    - Muted Text: `#A3A3A3`

- **Tipografi (Plus Jakarta Sans):**
  - **Display / Big Headlines:** *Plus Jakarta Sans (ExtraBold / Bold, tracking tight)*
  - **Body / Subheadings:** *Plus Jakarta Sans (Medium / Regular)*
  - **Technical Metadata & Code Tags:** *Font Monospace standar (JetBrains Mono / Fira Code)*

---

## 2. Rencana Implementasi Motion Graphics (Anime.js)

### A. Initial Page Load Sequence (Architectural Blueprint Reveal)
1. **Grid Line Drawing (`scaleX` / `scaleY`):**
   - Garis-garis border grid tidak langsung muncul, melainkan dianimasikan seperti digambar dari `0` ke `100%`.
   - Menggunakan `anime.stagger()` agar garis vertikal dan horizontal muncul secara sekuensial dari kiri-atas ke kanan-bawah.
   - *Easing:* `easeOutExpo` (durasi ~800ms).
2. **Text Clipping & Staggered Reveal:**
   - Text headline utama muncul dari bawah container dengan efek *overflow: hidden* (masking reveal).
   - Teks dipecah per kata/karakter lalu dianimasikan naik dengan `translateY: ['100%', '0%']`.

### B. Hero Section Motion
1. **Real-time Technical Counter:**
   - Statistik angka (misal: jumlah project, commit, atau sistem uptime) dianimasikan dari `0` ke angka asli menggunakan properti `round: 1` pada Anime.js.
2. **Live Status Indicator (Available for Work / Server Status):**
   - Ring geometris kecil di samping teks status dengan efek *radar pulse* atau *scaling loop* halus (`scale: [1, 1.4]`, `opacity: [1, 0]`).

### C. Project List Section (Replacing Photos with Motion)
1. **Interactive Grid Expansion (Accordion / Morphing):**
   - Saat list nama proyek diklik/di-hover, container meregang halus tanpa reload halaman.
   - Animasikan properti `height`, `opacity`, dan `translateY` pada detail proyek (stack, deskripsi, arsitektur backend).
2. **Dynamic Arrow & SVG Icon Animation:**
   - Ikon panah pada setiap item proyek berputar 45°/90° secara *snappy* saat di-hover (`rotate: [0, 45]`).
   - Ikon SVG *tech stack* dianimasikan menggunakan `strokeDashoffset` untuk memberikan efek garis tergambar saat kursor berada di atasnya.

### D. Interaksi & Utility Graphics
1. **Inversion Cursor Overlay:**
   - Kursor custom berbentuk lingkaran kecil dengan properti CSS `mix-blend-mode: difference`.
   - Mengubah warna elemen yang dilewatinya secara instan tanpa perlu pewarnaan manual (hitam jadi putih, putih jadi hitam).
2. **Light / Dark Mode Transition Wave:**
   - Pengalihan tema menggunakan animasi `clip-path: circle()` pada Anime.js.
   - Gelombang lingkaran menyebar dari koordinat ikon tombol tema hingga memenuhi seluruh layar.

---

## 3. Parameter Animasi Anime.js (Guidelines)

- **Presisi & Responsif:** Avoid soft bouncing (hindari elastisitas lebay).
- **Easing Utama:**
  - Standard Reveal: `cubicBezier(0.16, 1, 0.3, 1)`
  - Grid & Line Animation: `easeOutExpo`
  - Hover Micro-interactions: `easeOutQuad`
- **Duration Standard:**
  - Micro-interaction (Hover/Click): `200ms - 350ms`
  - Page/Section Transition: `600ms - 900ms`

---

## 4. Checklist Perubahan Kode & Layout

- [ ] Update import font Google Fonts ke **Plus Jakarta Sans** (weights: 400, 500, 600, 700, 800).
- [ ] Hapuskan semua elemen asset gambar/foto dari layout.
- [ ] Terapkan CSS Grid murni dengan border `1px` monokrom di setiap section utama.
- [ ] Siapkan helper fungsi Anime.js untuk animasi grid line load & text reveal.
- [ ] Atur CSS `mix-blend-mode: difference` untuk kursor kustom dan interaksi hover monokrom.
- [ ] Terapkan transisi theme switcher berbasis `clip-path`.