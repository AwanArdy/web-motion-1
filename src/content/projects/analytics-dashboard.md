---
title: Analytics Dashboard
description: Dashboard analitik data internal dengan visualisasi grafik interaktif, ekspor data, dan otomatisasi pelaporan berkala.
tech:
  - React
  - Python
  - FastAPI
  - Recharts
color: "#FF3B00"
dark: true
order: 3
---

## Ringkasan

Business intelligence tool internal yang mengubah data mentah menjadi dashboard interaktif: grafik tren, funnel, cohort, plus ekspor CSV dan laporan otomatis berkala.

## Fitur

- Interactive charts (zoom, filter rentang waktu, drill-down) berbasis **Recharts**
- Ekspor **CSV** satu klik untuk semua tampilan data
- Automated reporting: ringkasan harian/mingguan terkirim otomatis
- Query builder sederhana tanpa perlu menulis SQL

## Stack

Frontend **React**, backend **Python + FastAPI**. Agregasi berat dikerjakan di layer database; API menyajikan hasil agregat sehingga dashboard tetap cepat meski volume data jutaan baris.

## Hasil

> Tim non-teknis bisa menarik insight sendiri tanpa minta bantuan engineer — proses reporting manual berkurang sekitar **80%**.
