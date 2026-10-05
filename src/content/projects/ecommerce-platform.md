---
title: E-Commerce Platform
description: Platform e-commerce dengan manajemen inventaris real-time, integrasi gateway Midtrans, dan dashboard operasional.
tech:
  - Next.js
  - PostgreSQL
  - Redis
  - Docker
color: "#FFDD00"
dark: false
order: 1
---

## Ringkasan

Marketplace full-stack yang menangani siklus belanja end-to-end: katalog produk, keranjang, checkout, pembayaran, hingga dashboard admin. Sistem dirancang untuk lalu lintas tinggi dengan **real-time inventory** yang selalu sinkron di semua sesi pengguna.

## Tantangan

- Sinkronisasi stok real-time saat flash sale tanpa overselling
- Integrasi payment gateway Midtrans dengan penanganan webhook yang idempotent
- Admin dashboard yang tetap responsif meski data produk ribuan item

## Solusi

Stok disimpan di **PostgreSQL** dengan row-level locking, sementara cache harga dan ketersediaan ditempatkan di **Redis**. Webhook Midtrans diverifikasi signature-nya dan dicatat ke tabel `payment_events` sebelum diproses, sehingga retry aman dilakukan.

## Hasil

> Mampu melayani 10k+ transaksi harian dengan tingkat error pembayaran di bawah 0,1% dan waktu checkout rata-rata di bawah 2 detik.
