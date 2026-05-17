# PRD — MAVEN FORGE

## Company Profile Website + Admin Panel

---

## [META] Meta Info

| Field               | Detail                                        |
| ------------------- | --------------------------------------------- | -------------------------------------------------------------- |
| **Brand**           | MAVEN Forge — Digital Agency                  |
| **Headline**        | "Forge Your Digital Future"                   |
| **Tema**            | Neo-Brutalism — Colorful & Loud               |
| **Target Audience** | B2B, B2C, Klien Lokal & Internasional         |
| **Tech Stack**      | Next.js + Neon DB + Drizzle ORM + NextAuth.js |
| **Tanggal**         | Mei 2026                                      | fleksibel dinamis sesuai bulan dan tahun aktif berubah sendiri |

---

## [DESIGN] Design System

### Color Palette

| Role    | Warna       | Hex       |
| ------- | ----------- | --------- |
| Base 1  | Putih       | `#FFFFFF` |
| Base 2  | Hitam       | `#0A0A0A` |
| Primary | Merah       | `#CC0000` |
| Accent  | Orange      | `#FF6B00` |
| Border  | Hitam Tebal | `#000000` |

> **Catatan:** Beberapa section pakai base putih, beberapa hitam (alternating). No purple.

### Typography

- **Display Font:** Bebas Neue — condensed, all caps, gahar. Untuk semua headline besar.
- **Body Font:** IBM Plex Mono — monospace, techy & readable. Untuk paragraf dan teks kecil.

---

## [LAYOUT] Website Sections & Layout

### 1. [HOME] Hero / Landing

- Layout asimetris grid brutal
- Animasi / moving element
- Mockup preview project
- Big bold headline: **"Forge Your Digital Future"**
- Subtext + CTA button

### 2. [ABOUT] About Us

- Gaya editorial koran brutal
- Big stats numbers (jumlah klien, project selesai, tahun berdiri)
- Cerita / story brand
- Visi & Misi
- "Why Us" — alasan pilih MAVEN Forge

### 3. [SERVICES] Services

- 4 warna blok berbeda, numbered 01–04
- Border hitam tebal antar blok
- Layanan:
  - 01 — [AI] AI / Automation
  - 02 — [SHOP] E-commerce
  - 03 — [MOBILE] Mobile App Development
  - 04 — [WEB] Web Development

### 4. [PORTFOLIO] Portfolio / Case Study

- Masonry layout asimetris
- Gambar mockup project ukuran bervariasi
- Border tebal hitam
- Label kategori warna-warni di tiap foto

### 5. [REVIEW] Testimonial

- Gaya editorial koran brutal
- Rating system (bintang)
- Tampil seperti artikel review majalah

### 6. [TEAM] Team

- Avatar ilustrasi custom per member
- Nama + jabatan
- Placeholder ilustrasi, bisa diganti foto asli

### 7. [CATALOG] Katalog

- Halaman khusus menampilkan semua produk/paket layanan secara terstruktur
- Filter & search berdasarkan kategori, teknologi, atau rentang harga
- Card katalog bergaya neo-brutalism: border tebal, warna blok, label badge kategori
- Setiap item katalog punya:
  - Nama produk / paket
  - Deskripsi singkat
  - Harga (opsional: bisa sembunyikan, tampilkan "Hubungi Kami")
  - Fitur-fitur unggulan (checklist)
  - Label teknologi / stack yang digunakan
  - Tombol CTA: "Pesan Sekarang" -> arahkan ke form kontak / WA
- Tampilan grid responsif: 3 kolom desktop, 2 tablet, 1 mobile
- Bagian atas halaman: banner/headline + subtext singkat tentang katalog

### 8. [CONTACT] Contact / CTA

- Form kontak langsung
- Nomor WA / Telepon
- Email address
- Alamat / lokasi kantor
- Link sosmed

---

## [ADMIN] Admin Panel

### Overview

- Tema: Neo-Brutalism (seragam sama website utama)
- Auth: NextAuth.js + Email & Password
- Akses: Internal only

### Fitur Admin

| Modul                   | Fungsi                                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Portfolio Manager**   | CRUD project: tambah, edit, hapus, upload gambar mockup                                                                 |
| **Services Manager**    | CRUD layanan: nama, deskripsi, icon, warna blok                                                                         |
| **Team Manager**        | CRUD member: nama, jabatan, avatar ilustrasi, sosmed                                                                    |
| **Testimonial Manager** | CRUD review: nama klien, perusahaan, isi review, rating bintang                                                         |
| **Katalog Manager**     | CRUD item katalog: nama paket, deskripsi, harga, fitur checklist, label teknologi, status aktif/nonaktif, urutan tampil |
| **Dashboard**           | Statistik pengunjung: page views, visitor, traffic source                                                               |

---

## [STACK] Tech Stack

| Layer         | Tech         | Keterangan                                               |
| ------------- | ------------ | -------------------------------------------------------- |
| **Framework** | Next.js      | Frontend + API Routes, SSR untuk SEO optimal             |
| **Database**  | Neon DB      | PostgreSQL serverless — cloud hosted, free tier tersedia |
| **ORM**       | Drizzle ORM  | Type-safe schema & query, ringan, cocok dengan Neon DB   |
| **Auth**      | NextAuth.js  | Email + password login untuk admin panel                 |
| **Deploy**    | Vercel       | Hosting Next.js, integrasi langsung dengan Neon DB       |
| **Styling**   | Tailwind CSS | Utility-first CSS, custom neo-brutalism components       |

---

## [FOLDER] Struktur Folder (Next.js)

```
maven-forge/
├── app/
│   ├── (website)/
│   │   ├── page.tsx          # Homepage
│   │   └── layout.tsx
│   ├── katalog/
│   │   └── page.tsx          # Halaman katalog publik
│   └── (admin)/
│       ├── dashboard/
│       ├── portfolio/
│       ├── services/
│       ├── team/
│       ├── testimonials/
│       └── katalog/          # CRUD katalog admin
├── components/
│   ├── sections/             # Hero, About, Services, dll
│   └── admin/                # Admin UI components
├── lib/
│   ├── db.ts
│   └── auth.ts
├── drizzle/
│   ├── schema.ts
│   └── migrations/
└── public/
    └── uploads/
```

---

_MAVEN Forge — Confidential PRD | Mei 2026_
