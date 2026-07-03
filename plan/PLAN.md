# Halaman Detail Berita

## Ringkasan
Membuat halaman `/berita/:slug` untuk menampilkan detail artikel berita dengan tema membaca artikel, memisahkan data berita ke JSON, dan menghubungkan tombol "Baca selengkapnya" dari halaman Berita.

---

## 1. `src/data/berita.json` — Data Berita dalam JSON
Pindahkan 4 item berita dari hardcoded array di `Berita.tsx` ke file JSON terpisah.

**Field tambahan dari struktur lama:**
- `id` (number) — identifier unik
- `slug` (string) — kebab-case untuk URL routing
- `category` (string) — kategori berita (Informasi, Prestasi, Kegiatan, dll)
- `author` (string) — nama penulis artikel
- `content` (string[]) — array paragraf (lebih kaya dari string `body` tunggal)

**Struktur tiap item:**
```json
{
  "id": 1,
  "slug": "ppdb-smk-yadika-tahun-ajaran-2026-2027-resmi-dibuka",
  "date": "20 Jun 2026",
  "category": "Informasi",
  "title": "PPDB SMK YADIKA Tahun Ajaran 2026/2027 Resmi Dibuka",
  "excerpt": "Pendaftaran peserta didik baru telah dimulai. Tersedia jalur prestasi, reguler, dan afirmasi.",
  "author": "Tim Humas SMK YADIKA",
  "image": "https://picsum.photos/seed/ppdb-yadika/1200/600",
  "content": [
    "Paragraf pertama...",
    "Paragraf kedua...",
    "..."
  ]
}
```

---

## 2. `src/pages/BeritaDetail.tsx` — Halaman Artikel Baru
Layout seperti portal berita / artikel bacaan dengan estetika dark theme yang sudah ada.

**Bagian halaman:**
- Back link: "← Kembali ke Berita" (Link ke `/berita`)
- Header artikel:
  - Category badge
  - Tanggal publikasi
  - Estimated reading time (dihitung dari total kata)
  - Judul besar dengan `BlurText` animation
  - Nama penulis
- Featured image (full-width, max-h-96) dengan subtle border overlay
- Body artikel:
  - `font-body text-base md:text-lg leading-[1.85]`
  - Spasi lega antar paragraf
  - Maksimal lebar konten untuk readability (max-w-3xl)
- Separator tipis (`<SectionDivider />`)
- **Berita Lainnya** — 3 artikel lain sebagai card (GlareHover), dengan pengecualian artikel yang sedang dibaca
- 404 state jika slug tidak ditemukan

---

## 3. Update `src/pages/Berita.tsx`
- Hapus hardcoded `news[]` array
- Import data: `import beritaData from '../data/berita.json'`
- Ganti `href="#"` jadi `<Link to={/berita/${item.slug}}>` pada tombol "Baca selengkapnya"
- Import `Link` dari `react-router-dom`
- Gunakan beritaData untuk mapping komponen `NewsSection`

---

## 4. Update `src/App.tsx`
- Import `BeritaDetail` dari `./pages/BeritaDetail`
- Tambah route: `<Route path="/berita/:slug" element={<BeritaDetail />} />`

---

## 5. Tipe Data (opsional)
Jika diperlukan, buat tipe `NewsItem` di `src/types/` untuk digunakan bersama antara Berita.tsx dan BeritaDetail.tsx.

---

## Design Notes
- Mengikuti design token yang sudah ada (`bg-base`, `bg-surf`, `text-copy`, `text-muted`, `accent`)
- Font: `font-display` (Sora) untuk judul, `font-body` (Space Grotesk) untuk body
- Animasi: `framer-motion` (fadeUp) untuk scroll reveals
- Tidak perlu state management — data statis dari JSON import
- Tidak ada API calls — semua data bundle-time
