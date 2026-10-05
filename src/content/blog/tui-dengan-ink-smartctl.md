---
title: "Membangun TUI dengan Ink: Parsing smartctl ke Terminal"
description: Pengalaman membangun aplikasi Terminal User Interface menggunakan Ink dan TypeScript untuk memvisualisasikan data JSON smartctl secara real-time.
pubDate: 2025-11-02
tags:
  - typescript
  - cli
  - nodejs
---

Pernah kepikiran bikin aplikasi terminal yang tampilannya secanggih aplikasi web? Bukan sekadar `console.log` berjajar, tapi ada layout, border, warna, bahkan loading state. Itulah yang saya kerjakan waktu butuh tool untuk memvisualisasikan output **smartctl** (S.M.A.R.T. monitoring) secara real-time.

## Kenapa Ink?

[Ink](https://github.com/vadimdemedes/ink) adalah library React untuk CLI. Ya, React — tapi renderer-nya bukan DOM melainkan string di terminal:

```tsx
import React from "react";
import { render, Text, Box } from "ink";

const App = () => (
  <Box borderStyle="round" paddingX={2}>
    <Text color="yellow" bold>SMART Monitor</Text>
  </Box>
);

render(<App />);
```

Mental model-nya sama persis: komponen, props, hooks (`useState`, `useEffect`). Yang biasanya butuh manipulasi escape sequence manual jadi deklaratif.

## Alur data smartctl

`smartctl` bisa mengeluarkan hasil scan dalam format JSON:

```bash
smartctl --json --all /dev/sda
```

Masalahnya: output JSON smartctl tidak selalu konsisten antar versi dan tipe disk — field bisa hilang atau bentuknya beda. Jadi pipeline- saya seperti ini:

1. Spawn proses `smartctl` sebagai child process
2. Parse JSON dengan guard function per-field (never trust)
3. Normalisasi ke type internal `DriveHealth`
4. Render ke tabel Ink dengan pewarnaan berdasarkan threshold

## Guard parsing: jangan percaya JSON mentah

Bagian paling penting sebenarnya bukan rendering, tapi parsing defensif:

```ts
function parseTemperature(raw: unknown): number | null {
  if (typeof raw === "object" && raw !== null && "temperature" in raw) {
    const temp = (raw as { temperature: { current?: unknown } }).temperature;
    return typeof temp.current === "number" ? temp.current : null;
  }
  return null;
}
```

Dengan pendekatan ini, disk yang tidak punya sensor suhu tetap tampil di UI dengan nilai `—` daripada membuat aplikasi crash.

## Pelajaran yang saya ambil

> Tools terbaik untuk sebuah pekerjaan tidak selalu yang paling populer — kadang yang "aneh" justru pas.

React di terminal terdengar berlebihan sampai kamu merasakan betapa cepatnya iterasi UI dengan komponen reusable. Untuk tool internal yang dipakai harian, developer experience itu investasi.
