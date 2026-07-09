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
| **i18next** | Internasionalisasi (id/en) |
| **OGL** | WebGL (CircularGallery, SoftAurora) |
| **react-icons** | Icon library |

## Development

```bash
npm install
npm run dev      # dev server di http://localhost:5173
npm run build    # build produksi ke dist/
npm run lint     # ESLint
```

## Struktur

```
public/
├── favicon.svg            # SVG favicon
├── icons.svg              # icon sprite
└── brosur-ppdb.html       # standalone PPDB brochure
src/
├── assets/                # static assets (gambar, logo, dll.)
├── components/
│   ├── icons/             # icon SVG components
│   │   ├── ArrowUpRight.tsx
│   │   └── Play.tsx
│   ├── layout/            # layout components
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── sections/          # section components
│   │   ├── Hero.tsx
│   │   ├── LogoLoop.tsx
│   │   └── Scaffold.tsx
│   ├── ui/                # reusable UI components
│   │   ├── BlurText.tsx
│   │   ├── CircularGallery.tsx
│   │   ├── FadingVideo.tsx
│   │   ├── GlareHover.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── Pagination.tsx
│   │   ├── PrestasiCard.tsx
│   │   ├── SoftAurora.tsx
│   │   ├── SpecimenLabel.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── ScrollToTop.tsx
│   └── index.ts           # barrel export
├── context/
│   └── ThemeContext.tsx    # dark/light theme context
├── data/                  # static JSON data + query layer
│   ├── index.ts           # data access query functions
│   ├── navigation.ts
│   ├── berita.json
│   ├── prestasi.json
│   ├── ak.json
│   ├── htl.json
│   └── pplg.json
├── hooks/                 # custom hooks
│   ├── useFadeUp.ts
│   └── animationPresets.ts
├── i18n.ts                # i18next configuration
├── lib/
│   └── ppdb/              # PPDB module
│       ├── store.ts       # localStorage adapter
│       ├── validator.ts   # pure validation functions
│       └── index.ts       # barrel export
├── locales/
│   ├── id/common.json     # Indonesian translations
│   └── en/common.json     # English translations
├── pages/                 # halaman routing
│   ├── Beranda.tsx
│   ├── Profil.tsx
│   ├── Jurusan.tsx
│   ├── JurusanDetail.tsx
│   ├── Fasilitas.tsx
│   ├── Berita.tsx
│   ├── BeritaDetail.tsx
│   └── Ppdb.tsx
├── types/                 # shared TypeScript types
│   ├── program.ts
│   └── index.ts
├── App.tsx                # routing entry
├── index.css              # tailwind + design tokens
└── main.tsx               # app entry
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
