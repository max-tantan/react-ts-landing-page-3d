# SMK YADIKA SOREANG — Website

Website profil sekolah untuk SMK YADIKA SOREANG — sebuah sekolah kejuruan di Soreang, Jawa Barat. Dibangun dengan pendekatan *workshop aesthetic*: hangat, terukur, dan berorientasi pada keahlian.

## Tech Stack

| Teknologi | Penggunaan |
|-----------|------------|
| **React 19** | UI framework |
| **TypeScript 6** | Type safety |
| **Vite 8** | Build tool |
| **Tailwind CSS 4** | Utility styling |
| **Framer Motion 12** | Animasi scroll-reveal |
| **React Router 7** | Routing |
| **OGL** | WebGL gallery (CircularGallery) |

## Development

```bash
npm install
npm run dev      # dev server di http://localhost:5173
npm run build    # build produksi ke dist/
npm run lint     # ESLint
```

## Struktur

```
src/
├── assets/          # static assets (gambar, dll.)
├── components/      # shared components
│   ├── icons/       # icon SVG components
│   └── index.ts     # barrel export
├── hooks/           # custom hooks (useFadeUp, dll.)
├── pages/           # halaman routing
│   ├── Beranda.tsx
│   ├── Profil.tsx
│   ├── Jurusan.tsx
│   ├── Fasilitas.tsx
│   └── Berita.tsx
├── types/           # shared TypeScript types
│   ├── program.ts
│   └── index.ts
├── App.tsx          # routing entry
├── index.css        # tailwind + design tokens
└── main.tsx         # app entry
```

## Design

Lihat [`DESIGN.md`](./DESIGN.md) untuk dokumentasi lengkap filosofi desain, token sistem (warna, tipografi, layout), dan sistem komponen.

### Theme

- **Base**: `#161310` (warm dark, seperti meja kerja)
- **Surface**: `#2C2721`
- **Copy**: `#F5EDE0` (off-white hangat)
- **Accent**: `#0284C7` (sky blue)
- **Muted**: `#78716C`

### Fonts

- **Display**: Sora 700
- **Body**: Space Grotesk 300–500
- **Mono**: JetBrains Mono 400
