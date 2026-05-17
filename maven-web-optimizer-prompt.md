# 🚀 MASTER PROMPT — Web Performance Analyzer & Auto-Fixer

## CARA PAKAI
Copy prompt di bawah ke Claude / GPT-4o / Gemini.
Ganti placeholder `{{URL}}` dan `{{FRAMEWORK}}` sesuai project.

---

## ═══ MASTER PROMPT ═══

```
Kamu adalah senior web performance engineer dengan keahlian di Core Web Vitals, Next.js optimization, dan SEO teknikal.

Tugasmu ada DUA FASE:

---

## FASE 1 — AUDIT & ANALISIS

Analisis website berikut secara menyeluruh:
URL: {{URL}}
Framework: {{FRAMEWORK}} (misal: Next.js, Nuxt, plain HTML)
Hosting: {{HOSTING}} (misal: VPS Coolify, Vercel, Netlify)

### Checklist Audit (cek semua poin berikut):

#### 🖼️ IMAGE OPTIMIZATION
- [ ] Apakah ada gambar base64 inline di HTML? (sangat buruk untuk performa)
- [ ] Apakah gambar menggunakan format modern (WebP/AVIF)?
- [ ] Apakah ada lazy loading pada gambar below-the-fold?
- [ ] Apakah dimensi gambar sudah tepat (tidak oversized)?
- [ ] Apakah menggunakan next/image (jika Next.js)?
- [ ] Apakah ada CDN untuk serve gambar?

#### ⚡ JAVASCRIPT & BUNDLE
- [ ] Apakah ada unused JavaScript yang diload?
- [ ] Apakah ada render-blocking scripts di <head>?
- [ ] Apakah code splitting sudah diterapkan?
- [ ] Berapa estimasi ukuran JS bundle?
- [ ] Apakah ada third-party scripts berat (analytics, chat widget, dsb)?

#### 🎨 CSS & FONTS
- [ ] Apakah Google Fonts diload dengan font-display: swap?
- [ ] Apakah ada unused CSS?
- [ ] Apakah Critical CSS sudah di-inline?
- [ ] Berapa banyak font family yang diload?

#### 🌐 NETWORK & SERVER
- [ ] Apakah ada Cloudflare / CDN di depan server?
- [ ] Apakah HTTP/2 atau HTTP/3 sudah aktif?
- [ ] Apakah response header Cache-Control sudah diset dengan benar?
- [ ] Berapa Time to First Byte (TTFB)? Target < 200ms
- [ ] Apakah GZIP / Brotli compression aktif?
- [ ] Apakah ada redirect chain yang tidak perlu?

#### 📊 CORE WEB VITALS
- [ ] LCP (Largest Contentful Paint) — target < 2.5 detik
- [ ] INP (Interaction to Next Paint) — target < 200ms
- [ ] CLS (Cumulative Layout Shift) — target < 0.1
- [ ] FCP (First Contentful Paint) — target < 1.8 detik
- [ ] TTFB (Time to First Byte) — target < 600ms

#### 🔍 SEO TEKNIKAL
- [ ] Apakah meta title & description ada dan optimal?
- [ ] Apakah ada Open Graph tags untuk social sharing?
- [ ] Apakah ada structured data (JSON-LD)?
- [ ] Apakah ada sitemap.xml?
- [ ] Apakah ada robots.txt?
- [ ] Apakah canonical URL sudah benar?
- [ ] Apakah heading hierarchy (H1 > H2 > H3) sudah benar?
- [ ] Apakah semua gambar punya alt text?

#### 📱 MOBILE & AKSESIBILITAS
- [ ] Apakah viewport meta tag sudah ada?
- [ ] Apakah touch targets minimal 44x44px?
- [ ] Apakah color contrast ratio memenuhi WCAG AA?
- [ ] Apakah ada aria-label pada elemen interaktif?

#### 🔒 KEAMANAN
- [ ] Apakah HTTPS aktif?
- [ ] Apakah ada HSTS header?
- [ ] Apakah ada Content-Security-Policy?
- [ ] Apakah dependency package sudah up-to-date?

---

### FORMAT OUTPUT FASE 1:

Berikan hasil audit dalam format tabel berikut:

| # | Area | Masalah | Severity | Estimasi Impact |
|---|------|---------|----------|-----------------|
| 1 | Image | ... | 🔴 Critical | LCP +2s |
| 2 | JS | ... | 🟠 High | TTI +1s |
| 3 | SEO | ... | 🟡 Medium | Organic traffic |
| 4 | Cache | ... | 🟢 Low | Repeat visits |

Severity:
- 🔴 Critical = Perbaiki sekarang, dampak langsung ke user
- 🟠 High = Perbaiki minggu ini
- 🟡 Medium = Perbaiki bulan ini
- 🟢 Low = Nice to have

Setelah tabel, berikan:
1. **SKOR ESTIMASI** (0-100) untuk: Performance | SEO | Accessibility | Security
2. **TOP 3 PRIORITAS** yang harus diperbaiki duluan
3. **QUICK WINS** — hal yang bisa diperbaiki < 30 menit

---

## FASE 2 — GENERATE CODE FIXES

Untuk setiap masalah 🔴 Critical dan 🟠 High, berikan solusi kode konkret.

Format per fix:

### FIX #[nomor]: [Nama Masalah]

**Masalah:**
[Jelaskan masalahnya]

**Kode SEBELUM (bermasalah):**
```[bahasa]
[kode lama]
```

**Kode SESUDAH (sudah dioptimasi):**
```[bahasa]
[kode baru yang dioptimasi]
```

**Cara Implementasi:**
[Langkah-langkah konkret]

**Estimasi Improvement:**
[Contoh: "LCP berkurang ~1.2 detik", "Bundle size -40KB"]

---

Mulai audit sekarang. Jika kamu tidak bisa langsung akses URL-nya, minta user paste source HTML atau screenshot Lighthouse report.
```

---

---

# 📋 REKAP REKOMENDASI — maven.ve-lora.my.id

Hasil analisis dari source code yang sudah dicek:

## 🔴 CRITICAL — Perbaiki Sekarang

| # | Masalah | Lokasi | Fix |
|---|---------|--------|-----|
| 1 | **Gambar base64 inline di HTML** | Foto tim (Mahin Utsman) di-embed sebagai string `/9j/4AA...` langsung di HTML | Upload ke Cloudflare R2 / Supabase Storage, ganti dengan URL |
| 2 | **Tidak pakai `next/image`** | Semua gambar portfolio & hero pakai `<img>` biasa | Ganti ke `<Image>` dari `next/image` untuk auto WebP + lazy load |

## 🟠 HIGH — Perbaiki Minggu Ini

| # | Masalah | Detail | Fix |
|---|---------|--------|-----|
| 3 | **Tidak ada Cloudflare proxy** | Request langsung ke VPS, tidak ada CDN | Aktifkan Cloudflare Proxy (orange cloud) di DNS |
| 4 | **External request ke ui-avatars.com** | Avatar tim nge-hit domain lain setiap load | Pre-generate avatar, simpan lokal atau di R2 |
| 5 | **Unsplash images tanpa sizing optimal** | `?w=800&q=80` — tidak ada next-gen format, tidak ada `srcset` | Pakai next/image dengan `sizes` prop yang tepat |
| 6 | **Counter animasi start dari 0** | `0+ Klien Aktif`, `0 Proyek Selesai` — kelihatan belum ada data | Isi data nyata atau sembunyikan jika belum ada |

## 🟡 MEDIUM — Perbaiki Bulan Ini

| # | Masalah | Detail | Fix |
|---|---------|--------|-----|
| 7 | **Meta description terlalu pendek** | "Agency digital neo-brutal..." — perlu lebih keyword-rich | Optimasi dengan target keyword utama |
| 8 | **Tidak ada Open Graph image** | Social share preview tidak optimal | Tambah `og:image` 1200x630px |
| 9 | **Tidak ada structured data** | Tidak ada JSON-LD untuk LocalBusiness / WebSite | Tambah schema.org markup |
| 10 | **Nomor WA hardcoded** | `wa.me/6281234567890` — nomornya placeholder | Ganti ke nomor asli |
| 11 | **Portofolio & testimoni placeholder** | Klien "Nadia Putri - Atlas Retail", "Daniel Hart - Northbound Studio" terlihat fiktif | Ganti dengan klien nyata atau hilangkan dulu |

## 🟢 LOW — Nice to Have

| # | Masalah | Detail |
|---|---------|--------|
| 12 | Sitemap.xml | Belum terdeteksi |
| 13 | HSTS header | Perlu dicek di Coolify |
| 14 | Brotli compression | Pastikan aktif di Nginx config Coolify |
| 15 | Preconnect hints | Tambah `<link rel="preconnect">` untuk Unsplash, fonts |

---

## ⚡ QUICK WINS (< 30 menit, impact besar)

### 1. Fix base64 image — 15 menit
```bash
# Upload foto tim ke Cloudflare R2
# Ganti di kode dari:
# src="data:image/jpeg;base64,/9j/4AAQ..."
# Ke:
# src="https://pub-xxxxx.r2.dev/team/mahin.jpg"
```

### 2. Aktifkan Cloudflare Proxy — 5 menit
```
DNS Cloudflare:
maven.ve-lora.my.id → A → [IP VPS] → ☁️ Proxied (ON)
```

### 3. Ganti `<img>` ke `next/image` — 10 menit
```jsx
// SEBELUM
<img src="https://images.unsplash.com/photo-xxx?w=800&q=80" />

// SESUDAH
import Image from 'next/image'
<Image
  src="https://images.unsplash.com/photo-xxx"
  width={800}
  height={600}
  alt="Industrial Tech"
  loading="lazy"
  quality={80}
/>
```

---

## 📊 Estimasi Skor Saat Ini vs Target

| Metrik | Estimasi Sekarang | Target Setelah Fix |
|--------|-------------------|-------------------|
| Performance | 45–60 | 85+ |
| SEO | 65–75 | 90+ |
| Accessibility | 60–70 | 85+ |
| LCP | ~3–5 detik | < 2.5 detik |
| TTFB | ~300–600ms | < 200ms |

> Cek skor aktual di: **pagespeed.web.dev** → masukkan URL maven.ve-lora.my.id

---

*Generated untuk MAVEN Forge — maven.ve-lora.my.id*
