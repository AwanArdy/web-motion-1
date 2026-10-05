---
title: Realtime Chat App
description: WebSocket-powered messaging dengan end-to-end encryption, file sharing, dan group channels. Melayani 5k MAU.
tech:
  - Node.js
  - Socket.io
  - MongoDB
  - React
color: "#0038FF"
dark: true
order: 2
---

## Ringkasan

Aplikasi chat real-time dengan pesan terenkripsi end-to-end, berbagi file, dan channel grup. Dirancang untuk komunitas dengan ribuan pengguna aktif harian.

## Fitur

- Pesan instan berbasis **WebSocket** dengan indikator typing & read receipt
- **End-to-end encryption** — server tidak pernah melihat isi plaintext pesan
- Upload & preview lampiran (gambar, dokumen) langsung di thread
- Group channels dengan peran admin dan notifikasi yang bisa disenyapkan

## Teknis

Backend **Node.js + Socket.io**, persistensi pesan di **MongoDB** (sharding per channel), frontend **React**. Kunci enkripsi dibangkitkan di sisi klien; server hanya menyimpan ciphertext beserta metadata minimal.

## Hasil

> Stabil melayani **5k monthly active users** dengan latensi pengiriman pesan rata-rata di bawah 100 ms.
