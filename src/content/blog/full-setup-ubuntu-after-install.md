---
title: "Panduan Lengkap Setup Ubuntu Pasca-Install untuk Web Developer"
description: "Langkah demi langkah setup fresh install Ubuntu: pembaruan sistem, kustomisasi GNOME Tweaks & Extension Manager, hingga konfigurasi stack development modern (Python, TypeScript, Node.js, PostgreSQL, dan MySQL)."
pubDate: 2026-11-01
tags:
  - ubuntu
  - linux
  - programming
  - postgresql
  - mysql
  - typescript
  - python
---

Melakukan *fresh install* Ubuntu sering kali terasa menyenangkan sekaligus melelahkan. Anda mendapatkan sistem operasi yang bersih, cepat, dan stabil—tetapi sebelum Anda bisa mulai menulis baris kode pertama, ada serangkaian konfigurasi penting yang perlu dilakukan.

Panduan ini mendokumentasikan alur setup komprehensif pasca-install Ubuntu (khususnya versi LTS seperti 24.04 atau 22.04), mulai dari optimasi sistem dasar, kustomisasi antarmuka desktop, hingga instalasi dan konfigurasi lengkap database PostgreSQL dan MySQL untuk kebutuhan software engineering harian.

---

## 1. Pembaruan Sistem & Paket Esensial

Langkah paling awal yang wajib dijalankan adalah menyegarkan indeks paket lokal dan memperbarui seluruh komponen sistem ke versi terbaru yang stabil.

Buka terminal (`Ctrl + Alt + T`) lalu jalankan perintah berikut:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
```

Setelah sistem diperbarui, pasang paket kompilasi dasar, dependensi jaringan, dan utilitas CLI yang sering dibutuhkan:

```bash
sudo apt install -y \
  build-essential \
  curl \
  wget \
  git \
  unzip \
  zip \
  software-properties-common \
  apt-transport-https \
  ca-certificates \
  gnupg \
  lsb-release \
  htop \
  tree
```

> **Catatan:** Paket `build-essential` mencakup `gcc`, `g++`, dan `make` yang sangat penting ketika Anda mengompilasi paket native (seperti modul Node-gyp atau modul C pada Python).

---

## 2. Kustomisasi Desktop: Tweaks & Extension Manager

Ubuntu hadir dengan desktop environment GNOME bawaan yang fungsional. Namun, untuk alur kerja multitasking yang nyaman, kita perlu mengaktifkan pengaturan lanjutan serta memasang beberapa ekstensi esensial.

### Pasang GNOME Tweaks

GNOME Tweaks memberikan kontrol mendalam atas font sistem, perilaku jendela, tema, dan tombol titlebar:

```bash
sudo apt install -y gnome-tweaks
```

### Pasang Extension Manager

Alih-alih mengandalkan integrasi browser dan add-on Chrome/Firefox yang sering bermasalah karena versi shell yang tidak cocok, gunakan **Extension Manager** native:

```bash
sudo apt install -y gnome-shell-extension-manager
```

Buka **Extension Manager** melalui app launcher, buka tab **Browse**, lalu cari dan pasang ekstensi-ekstensi berikut:

1. **Dash to Dock** — Mengubah dock Ubuntu menjadi dock mengambang yang responsif, mendukung autohide cerdas, dan dapat dipindah ke bagian bawah layar ala macOS.
2. **AppIndicator and KStatusNotifierItem Support** — Memastikan ikon aplikasi latar belakang (seperti Docker, Discord, Slack, atau Telegram) muncul dengan rapi di panel kanan atas.
3. **Clipboard Indicator** — Menyimpan riwayat teks yang Anda salin sehingga mempermudah pengambilan snippet kode atau token API sebelumnya.
4. **Just Perfection** — Memungkinkan Anda menyembunyikan elemen UI GNOME yang tidak terpakai, mematikan efek visual yang memperlambat respon, atau mengatur letak jam dan panel.
5. **Sound Output Device Chooser** — Berpindah perangkat audio (misalnya antara headphone kabel, headset Bluetooth, dan speaker) langsung dari menu pengaturan cepat.

### Pasang Font Khusus Coding (Monospace dengan Ligatur)

Tipografi yang jelas mengurangi kelelahan mata saat menatap kode berjam-jam:

```bash
sudo apt install -y fonts-firacode fonts-jetbrains-mono
```

Setelah terpasang, buka GNOME Tweaks > **Fonts**, lalu atur **Monospace Text** ke **JetBrains Mono** atau **Fira Code Retina** dengan ukuran 11.

---

## 3. Konfigurasi Git & Kunci SSH

Sebelum mengkloning repositori pekerjaan, pastikan identitas Git dan autentikasi aman sudah terkonfigurasi.

### Identitas Global Git

```bash
git config --global user.name "Nama Lengkap Anda"
git config --global user.email "email-anda@domain.com"
git config --global init.defaultBranch main
git config --global core.editor "nano"
```

### Pembuatan Kunci SSH (ed25519)

Gunakan algoritma `ed25519` yang lebih modern, aman, dan berukuran ringkas dibandingkan RSA lawas:

```bash
ssh-keygen -t ed25519 -C "email-anda@domain.com"
```

Tekan `Enter` untuk lokasi default, lalu masukkan passphrase jika Anda menginginkan perlindungan tambahan. Selanjutnya, aktifkan SSH agent dan daftarkan kunci Anda:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

Tampilkan public key Anda, lalu salin seluruh barisnya untuk ditambahkan ke profil GitHub (Settings > SSH and GPG keys):

```bash
cat ~/.ssh/id_ed25519.pub
```

Uji koneksi SSH Anda ke GitHub:

```bash
ssh -T git@github.com
```

Jika muncul pesan *“Hi username! You've successfully authenticated...”*, berarti SSH Anda sudah terkonfigurasi sempurna.

---

## 4. Setup Python Environment Modern

Hindari menggunakan `pip install` langsung ke sistem root global Ubuntu karena versi Ubuntu modern menerapkan PEP 668 (*externally-managed-environment*).

### Instalasi Python & Modul Inti

```bash
sudo apt install -y python3 python3-pip python3-venv python3-dev
```

Untuk kemudahan, tambahkan alias agar perintah `python` otomatis merujuk ke `python3`:

```bash
echo 'alias python=python3' >> ~/.bashrc
source ~/.bashrc
```

### Menggunakan Virtual Environment

Untuk setiap proyek baru, buat isolasi dependensi sendiri:

```bash
# Membuat environment di folder .venv
python3 -m venv .venv

# Mengaktifkan environment
source .venv/bin/activate

# Menginstal paket proyek di dalam isolasi
pip install fastapi uvicorn sqlalchemy psycopg2-binary
```

### Alternatif Cepat: Menggunakan `uv`

Jika Anda ingin ekosistem Python yang jauh lebih kencang untuk resolusi dependensi dan instalasi paket berbasis Rust, pasang **uv**:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc
```

Dengan `uv`, perintah seperti `uv venv` dan `uv pip install <paket>` dapat berjalan 10-100x lebih cepat daripada pip konvensional.

---

## 5. Setup TypeScript & Node.js Runtime

Sangat tidak disarankan menginstal Node.js langsung melalui `sudo apt install nodejs` bawaan repository Ubuntu, karena versinya biasanya tertinggal jauh dan menimbulkan konflik izin akses (`EACCES`) saat memasang paket global.

Solusi terbaik adalah menggunakan Node Version Manager. Di sini kita menggunakan **fnm** (Fast Node Manager) yang ditulis dalam Rust dan berjalan jauh lebih cepat dari nvm:

```bash
# Pasang fnm via skrip resmi
curl -fsSL https://fnm.vercel.app/install | bash

# Muat ulang konfigurasi shell
source ~/.bashrc

# Pasang versi LTS terbaru
fnm install --lts
fnm use --lts
fnm default --lts
```

Verifikasi versi Node.js dan npm:

```bash
node -v
npm -v
```

### Aktifkan Package Manager Modern (pnpm & yarn)

Node.js modern telah menyertakan Corepack untuk mengelola pnpm dan yarn tanpa perlu instalasi npm global:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### Pasang TypeScript Global Tooling

Pasang compiler TypeScript dan executor TypeScript cepat (`tsx`):

```bash
npm install -g typescript tsx
tsc --version
```

Sekarang Anda bisa menjalankan file TypeScript langsung di terminal tanpa langkah build manual:

```bash
tsx index.ts
```

---

## 6. Tutorial Setup & Konfigurasi PostgreSQL

PostgreSQL adalah salah satu database relasional object-relational terpopuler untuk backend modern berkat integritas data dan fiturnya yang kaya (JSONB, Full-Text Search, Window Functions).

### 1. Instalasi PostgreSQL Server

Pasang paket PostgreSQL beserta paket utilitas tambahannya:

```bash
sudo apt install -y postgresql postgresql-contrib
```

### 2. Memeriksa Status & Mengaktifkan Service

Pastikan service PostgreSQL aktif dan diset untuk berjalan otomatis setiap kali komputer booting:

```bash
sudo systemctl enable postgresql
sudo systemctl start postgresql
sudo systemctl status postgresql
```

### 3. Memahami Autentikasi Default PostgreSQL

Secara default, PostgreSQL di Ubuntu menggunakan skema autentikasi **ident** / **peer**, yang berarti pengguna Linux `postgres` dapat langsung mengakses database tanpa password melalui socket lokal.

Untuk mengakses terminal PostgreSQL pertama kali:

```bash
sudo -u postgres psql
```

### 4. Mengubah Password Superuser `postgres`

Di dalam prompt interactive PostgreSQL (`postgres=#`), jalankan:

```sql
ALTER USER postgres WITH PASSWORD 'password_master_rahasia';
```

### 5. Membuat User Development Baru

Hindari menggunakan user `postgres` root untuk aplikasi harian. Buat user khusus development lokal dengan izin membuat database (`CREATEDB`):

```sql
CREATE ROLE devuser WITH LOGIN CREATEDB PASSWORD 'password_dev_123';
```

### 6. Membuat Database Pertama & Memberikan Hak Akses

Buat database baru untuk proyek Anda dan berikan kepemilikannya kepada user yang baru dibuat:

```sql
CREATE DATABASE myproject_dev OWNER devuser;
GRANT ALL PRIVILEGES ON DATABASE myproject_dev TO devuser;
```

Keluar dari antarmuka psql:

```sql
\q
```

### 7. Menguji Koneksi Akun Development

Uji koneksi database menggunakan akun dan database yang baru saja dibuat melalui TCP localhost:

```bash
psql -U devuser -d myproject_dev -h localhost -W
```

Masukkan password (`password_dev_123`) saat diminta. Jika berhasil masuk ke prompt `myproject_dev=>`, konfigurasi user dan database PostgreSQL Anda telah sukses!

> **Tips `pg_hba.conf`:** Jika Anda ingin menggunakan otentikasi password berbasis MD5/SCRAM untuk koneksi socket lokal, Anda dapat memeriksa file konfigurasi di `/etc/postgresql/<versi>/main/pg_hba.conf` dan mengubah baris `local all all peer` menjadi `local all all scram-sha-256`, lalu jalankan `sudo systemctl restart postgresql`.

---

## 7. Tutorial Setup & Konfigurasi MySQL

Selain PostgreSQL, banyak proyek (termasuk PHP, Laravel, WordPress, dan arsitektur microservices tertentu) memerlukan MySQL atau MariaDB.

### 1. Instalasi MySQL Server

Jalankan perintah instalasi server MySQL dari repositori resmi:

```bash
sudo apt install -y mysql-server
```

### 2. Memastikan Service Berjalan

```bash
sudo systemctl enable --now mysql
sudo systemctl status mysql
```

### 3. Mengamankan Instalasi (`mysql_secure_installation`)

Ubuntu menyediakan skrip otomasi untuk membersihkan konfigurasi default yang tidak aman:

```bash
sudo mysql_secure_installation
```

Anda akan dipandu melalui beberapa pertanyaan interaktif:
1. **VALIDATE PASSWORD COMPONENT**: Anda dapat mengetik `Y` jika ingin aturan kompleksitas password ketat, atau `N` jika ini adalah komputer development lokal agar bebas menggunakan password sederhana.
2. **Remove anonymous users?**: Ketik `Y` (menghapus user tanpa nama).
3. **Disallow root login remotely?**: Ketik `Y` (mencegah login root dari IP luar).
4. **Remove test database and access to it?**: Ketik `Y` (menghapus tabel percobaan).
5. **Reload privilege tables now?**: Ketik `Y` (menerapkan semua perubahan hak akses).

### 4. Membuat Database & User Development Khusus

Di Ubuntu, akun `root` MySQL secara default menggunakan plugin `auth_socket` (hanya bisa diakses via `sudo mysql`). Agar aplikasi web Anda dapat terhubung menggunakan username dan password standar, buat user terpisah.

Masuk ke console MySQL:

```bash
sudo mysql
```

Di dalam console MySQL (`mysql>`), buat database dengan collation `utf8mb4`:

```sql
CREATE DATABASE myproject_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Buat user development lokal baru menggunakan metode autentikasi `caching_sha2_password` (standar MySQL 8+):

```sql
CREATE USER 'devuser'@'localhost' IDENTIFIED BY 'password_mysql_123';
```

Berikan hak akses penuh atas database tersebut kepada `devuser`:

```sql
GRANT ALL PRIVILEGES ON myproject_db.* TO 'devuser'@'localhost';
FLUSH PRIVILEGES;
```

Keluar dari shell MySQL:

```sql
EXIT;
```

### 5. Menguji Koneksi MySQL

Verifikasi koneksi user baru Anda:

```bash
mysql -u devuser -p -h localhost myproject_db
```

Masukkan password Anda saat diminta. Jika berhasil, Anda akan disambut dengan prompt `mysql>`. Anda dapat mengetik `SHOW TABLES;` untuk memastikan koneksi berjalan lancar.

---

## 8. Ringkasan & Checklist Verifikasi Lingkungan

Setelah menyelesaikan seluruh langkah di atas, luangkan waktu sejenak untuk memverifikasi instalasi seluruh stack development Anda:

| Komponen | Perintah Verifikasi | Status Target |
| :--- | :--- | :--- |
| **Compiler & Tools** | `gcc --version && git --version` | Terpasang |
| **SSH Key** | `ssh -T git@github.com` | Berhasil autentikasi |
| **Python** | `python3 --version && python -v` | Python 3.12+ |
| **Node.js** | `node -v && npm -v` | Node LTS (v20+ / v22+) |
| **TypeScript** | `tsc --version && tsx --version` | Terpasang global |
| **PostgreSQL** | `sudo systemctl is-active postgresql` | `active` |
| **MySQL** | `sudo systemctl is-active mysql` | `active` |

### Rekomendasi GUI Database Client

Untuk mengelola tabel, skema, dan query di kedua database tersebut secara visual, Anda dapat menginstal salah satu aplikasi berikut:

- **DBeaver Community**: Multi-database client berbasis Java yang sangat lengkap, mendukung PostgreSQL, MySQL, SQLite, dan Redis dalam satu jendela.
- **DataGrip**: IDE database lengkap dari JetBrains jika Anda memiliki lisensi.
- **VS Code Database Extensions**: Ekstensi seperti *Database Client* atau *SQLTools* untuk melihat data langsung dari dalam editor kode Anda.

Dengan seluruh alur konfigurasi ini, workstation Ubuntu Anda kini telah siap digunakan untuk membangun aplikasi web modern berskala produksi dengan performa optimal.
