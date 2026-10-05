---
title: REST API Gateway
description: Centralized API management dengan rate limiting, JWT auth, request logging, dan auto-generated OpenAPI docs.
tech:
  - Express.js
  - Prisma
  - PostgreSQL
  - Swagger
color: "#B8FF3B"
dark: false
order: 4
---

## Ringkasan

Gerbang API terpusat untuk seluruh layanan internal: autentikasi, otorisasi, rate limiting, logging, dan dokumentasi dalam satu pintu sehingga service di belakangnya bisa fokus pada bisnis logic.

## Fitur

- **JWT authentication** dengan refresh token rotation
- Rate limiting per API key dan per IP (sliding window)
- Request/response logging terstruktur siap dikonsumsi log aggregator
- Dokumentasi **OpenAPI** yang auto-generated langsung dari definisi route

## Teknis

Dibangun dengan Express.js + TypeScript. Akses data menggunakan **Prisma** di atas PostgreSQL. Middleware dipipa berlapis: verifikasi JWT → cek kuota rate limit → log request → proxy ke service tujuan. Skema OpenAPI dihasilkan dari type definition sehingga dokumentasi tidak pernah telat update.

```ts
router.get("/v1/orders", requireAuth, rateLimit({ window: "1m", max: 60 }), listOrders);
```

## Hasil

Onboarding layanan baru ke ekosistem API turun dari hitungan hari menjadi hitungan jam karena auth, limit, dan docs sudah ditangani di gateway.
