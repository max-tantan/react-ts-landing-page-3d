# SoftAurora Integration Plan

## Files created

| File | Purpose |
|------|---------|
| `src/components/ui/SoftAurora.tsx` | WebGL aurora component |
| `src/components/ui/SoftAurora.css` | `.soft-aurora-container` styles |

## Files modified

| File | Change |
|------|--------|
| `src/components/layout/Layout.tsx` | Import `SoftAurora`, render between `<main>` and `<Footer>` on all pages |
| `src/components/index.ts` | Add `SoftAurora` to barrel export |

## Render structure (global — every page)

```
<Navbar />
<main>
  <Outlet />
</main>
─── <div className="h-px w-full bg-copy/5" />   ← separator line
<SoftAurora />                                   ← decorative connector, 200px
<Footer />
```

## Colors

- `color1`: `#87CEEB` (sky blue)
- `color2`: `#0284C7` (project accent)
- Remaining props: defaults from React Bits spec

## No changes needed

- `package.json` — `ogl` already installed
- Individual pages (Profil, Jurusan, Fasilitas, Berita, Beranda, etc.) — untouched
