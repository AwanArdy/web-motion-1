# Audit Pra-Deploy — porto-neo

> Tanggal audit: 2026-08-25 · Stack: Astro 7.2.6 + Tailwind CSS v4 · Output: static
>
> **PENTING:** Ada perubahan yang sudah dibuat tapi *belum diverifikasi build ulang*
> (pemindahan `Header` ke `BaseLayout` + penambahan `robots.txt`).
> Jalankan `npm run build` sebagai langkah pertama sebelum deploy.

---

## 1. Status Verifikasi (sudah dites & beres)

| Area | Status | Catatan |
|---|---|---|
| Build produksi | ✅ | 9 halaman ter-generate (sebelum perubahan terakhir) |
| Smoke test rute | ✅ | `/`, `/blog/`, `/blog/[slug]/`, `/projects/[slug]/` → HTTP 200 |
| Zero framework JS | ✅ | Hanya 2 skrip kecil inline (menu mobile & form kontak), tanpa hydration |
| SEO dasar | ✅ | Title/description unik per halaman, OG tags dasar, meta author |
| Font | ✅ | Self-hosted via Fontsource (Archivo Black, Courier Prime) |
| Favicon | ✅ | `public/favicon.svg` |
| robots.txt | ✅ | Baru ditambahkan, mengizinkan indexing |
| A11y dasar | ✅ | Label form ter-asosiasi, `aria-label` link ikon, `aria-expanded` menu mobile |

### Rute final yang harus ada setelah build
```
/                                            ← homepage portfolio
/blog/                                       ← index blog
/blog/kenapa-migrasi-react-ke-astro/
/blog/tailwind-v4-design-tokens/
/blog/tui-dengan-ink-smartctl/
/projects/ecommerce-platform/
/projects/realtime-chat-app/
/projects/analytics-dashboard/
/projects/rest-api-gateway/
```

---

## 2. 🔴 Wajib Diperbaiki Sebelum Deploy

### 2.1 Hapus `vite.config.ts` (leftover era React)

File ini sisa proyek lama dan **tidak dipakai Astro sama sekali** (Astro pakai
`astro.config.mjs`). Selain membingungkan, ia menjadi sumber 5 error type-check
(`@vitejs/plugin-react` sudah tidak ada, `__dirname` tidak dikenal, dll).

```bash
rm vite.config.ts
```

Juga cek leftover lain yang boleh dihapus bila tidak dipakai:
- `pnpm-workspace.yaml` (harmless, tapi tidak relevan jika pakai npm)

### 2.2 Perbaiki 13 error type: tipe ikon SVG

Import SVG di Astro 7 menghasilkan **komponen**, bukan string URL.
Di `src/data/portfolio.ts`, interface `Skill` masih mendeklarasikan `icon: string`.

**Fix yang disarankan** — ganti deklarasi tipe field icon:

```ts
// src/data/portfolio.ts
import reactIcon from "../assets/react.svg"; // import value ini sudah ada

export interface Skill {
  name: string;
  icon: typeof reactIcon; // ← bukan 'string' lagi
  category: "Frontend" | "Backend" | "DevOps";
}
```

Error terkait di `src/components/Skills.astro` (`props width/height/aria-hidden`
tidak sesuai `IntrinsicAttributes`) kemungkinan hilang sendiri setelah tipe di atas
benar, atau cukup longgarkan pemanggilannya:

```astro
<skill.icon />
```

Verifikasi: `npx astro check` → target **0 errors**.
Catatan: `npx astro build` tetap sukses walau ada type error (build tidak mengecek
tipe), jadi jangan anggap build hijau = types aman.

### 2.3 Verifikasi ulang build setelah perubahan terakhir

Perubahan berikut **belum pernah di-build ulang**:

1. `<Header />` dipindah dari `pages/index.astro` ke `layouts/BaseLayout.astro`
   → kini semua halaman (blog & project detail) punya navigasi.
2. `public/robots.txt` baru.

```bash
npm run build && npx astro preview
# cek manual: buka /blog/tailwind-v4-design-tokens/ — nav harus muncul di atas
```

---

## 3. 🟡 Disarankan Sebelum / Segera Setelah Deploy

- [ ] **Set `site` di `astro.config.mjs`** saat domain sudah pasti — prasyarat
      canonical URL, sitemap, dan RSS:
      ```js
      export default defineConfig({
        site: "https://domainmu.com",
        vite: { plugins: [tailwindcss()] },
      });
      ```
- [ ] **OG image** (`og:image`, 1200×630) — belum ada sama sekali; penting saat
      link dibagikan ke WhatsApp/Twitter/LinkedIn.
- [ ] **Form kontak masih simulasi** — submit hanya menampilkan pesan sukses,
      tidak mengirim ke mana pun. Opsi: [Formspree](https://formspree.io),
      Netlify Forms (kalau deploy di Netlify), atau API route sendiri
      (butuh SSR adapter).
- [ ] **RSS feed** (`npm i @astrojs/rss`) + file `src/pages/rss.xml.js`.
- [ ] **Sitemap** (`npm i @astrojs/sitemap`) + daftarkan ke robots.txt.
      ⚠️ Disk `/home` sangat sempit — install paket besar setelah ruang lega.
- [ ] **Konten contoh**: 3 post blog dan body 4 project adalah tulisan template
      yang saya buat. Review/edit/hapus sebelum go-live.
- [ ] **Link GitHub**: verifikasi `github.com/AwanArdy` benar-benar akunmu;
      frontmatter project punya opsi `github:` dan `demo:` yang belum diisi.

---

## 4. 💾 Catatan Lingkungan (disk!)

Partisi `/home` hampir penuh (per audit: ~92–97%). Cache npm yang **100% aman**
dihapus kapan saja (regenerasi otomatis):

```bash
rm -rf ~/.npm/_cacache ~/.npm/_logs ~/.npm/_npx
df -h /home   # cek hasil
```

Dependencies dev (`@astrojs/check`, `typescript`) terpasang untuk `astro check`.
Simpan bila mau type-check di CI; kalau tidak, `npm rm -D @astrojs/check typescript`
untuk hemat ±80MB.

---

## 5. 🧪 Perintah Verifikasi Mandiri

```bash
npm run dev            # dev server http://localhost:4321
npm run build          # build produksi → dist/
npx astro preview      # serve dist/ untuk uji final
npx astro check        # type check → target 0 errors
```

Checklist manual di browser (preview):
- [ ] Menu mobile berfungsi (hamburger → X, tutup saat link diklik)
- [ ] Marquee bergerak, hover kartu project/blog bergeser brutalist
- [ ] Halaman post: heading, code block (Shiki), tabel, blockquote tampil benar
- [ ] Draft test: tambah `draft: true` di salah satu post → tidak muncul di `/blog/`
      pada build produksi
- [ ] Form: submit kosong tertahan validasi HTML, submit valid → pesan sukses
- [ ] Lighthouse (DevTools): target Performance/A11y/SEO ≥ 95
