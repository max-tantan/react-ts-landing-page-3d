# SMK YADIKA SOREANG — Domain Context

## Domain Terms

### PPDB
Penerimaan Peserta Didik Baru — annual student admissions pipeline.
- Intake form captures: nama, tempatLahir, tanggalLahir, jenisKelamin, alamat, noHp, email, asalSekolah, nisn, tahunLulus, jurusan1, jurusan2
- Persistence currently via localStorage (RegistrantStore adapter)
- Validation rules live in the Validator module (pure functions)

### Jurusan (Program Keahlian)
Three academic programs:
- **PPLG** — Pengembangan Perangkat Lunak dan Gim (Software Engineering, formerly RPL)
- **HTL** — Perhotelan (Hospitality)
- **AK** — Akuntansi (Accounting)

Each has a detail page at `/jurusan/:code` driven by JSON data (curriculum, careers, gallery, sambutan).

### Berita
News articles with support for:
- Listing (`/berita`) with excerpt grid
- Detail (`/berita/:slug`) with reading time estimate and related articles
- Static JSON data source, accessed via Data Access query functions

### Prestasi
Achievements by students and teachers.
- Filterable by category (siswa/guru)
- Paginated display (10 per page)

### Navigation
Site structure defined in `src/data/navigation.ts` — single source for route definitions and navbar rendering.

## Architectural Vocabulary

See `/codebase-design` skill for: module, interface, depth, seam, adapter, leverage, locality.

## ADRs

None recorded yet.
