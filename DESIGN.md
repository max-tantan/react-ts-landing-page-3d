# SMK YADIKA SOREANG — Design Plan

## Grounding

**Subject:** SMK YADIKA SOREANG — a vocational high school in Soreang, Jawa Barat  
**Audience:** Indonesian teenagers (14–16) and their parents in the Bandung Raya area  
**Page's single job:** Make visitors feel this school is where you build real skills for a real career — *Siap Kerja, Siap Dunia*

## Concept: *Bengkel* (Workshop)

A vocational school is a place of making. The design takes cues from a well-organized workshop: warm materials, exposed structure, tools laid out with purpose. The visual language balances craft (warmth, tradition) with precision (technology, measurement, skill).

Three programs anchor the content:
- **TKJ** — Computer & Network Engineering (infrastructure, wiring, servers)
- **RPL** — Software Engineering (code, logic, systems)
- **MM** — Multimedia Design (visuals, motion, brand)

## Token System

### Color

```
#161310    — Base (warm dark, like oiled workbench)  
#2C2721    — Surface (warm dark card)  
#F5EDE0    — Primary text (warm off-white, like parchment)  
#0284C7    — Sky blue (primary accent: energetic, modern, trustworthy)  
#78716C    — Muted text (warm gray, for captions/body secondary)
```

Why: The dark base avoids pure black (#000) — it's warmer, reads as a physical surface. Sky blue replaces amber as the spotlight color — energetic and approachable for a school audience, while the warm base and text keep it from feeling cold or corporate.

### Typography

| Role | Face | Weight | Notes |
|------|------|--------|-------|
| Display | **Sora** | 700 | Warm rounded sans-serif; approachable, crafted, not overused |
| Body | **Space Grotesk** | 300–500 | Slightly technical, modern, high legibility |
| Utility | **JetBrains Mono** | 400 | For code, metrics, data — connects to TKJ/RPL programs |

**Size scale (display):** 3rem / 4rem / 5rem / 6rem  
**Size scale (body):** 0.75rem / 0.875rem / 1rem / 1.125rem

### Layout Concept

A single-column scroll with visible structural scaffolding. Every section is framed by workshop-blueprint elements: corner brackets, measurement tick marks, hairlines. Content reads as artifacts on a workbench.

```
┌──────────────────────────────────────┐
│  [nav · fixed · glass surface]        │
│                                        │
│  ┌── HERO ──────────────────────────┐ │
│  │  ◆ corner bracket motif          │ │
│  │  Headline (specimen on bench)    │ │
│  │  Subtitle · CTA · partner strip  │ │
│  │  ◆ corner bracket motif          │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌── STATS ──────────────────────┐      │
│  │  [tool-tag style cards]       │      │
│  │  ═══════════════════ (rule)   │      │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌── PROGRAMS ────────────────────┐       │
│  │  "// Program Keahlian" eyebrow │       │
│  │  Heading · 3 cards on grid     │       │
│  │  Each card = workshop drawer   │       │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌── WHY YADIKA ──────────────────┐         │
│  │  Alternating text + media      │         │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌── FOOTER / CTA ─────────────────┐          │
│  │  Strong amber CTA               │          │
│  │  Contact · social · copyright   │          │
│  │  ◆ corner bracket motif         │          │
│  └────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Signature Element: *The Workshop Scaffold*

Every section boundary is marked by subtle **corner brackets** (`╔ ╗ ╚ ╝` simplified) and **tick marks** along section edges — drawn from workshop measurement culture. These are thin, faint, and structural, not decorative.

Cards use a **tool-tag label** pattern: a diagonal-cut corner or a small "specimen" label (like a physical tag tied to a tool) that carries the section taxonomy.

This is the one memorable visual device. Everything else stays quiet.

### Motion

Scarce and purposeful:
- **Scroll reveal:** elements fade up with a slight rotation (like placing objects on a bench)
- **Hover:** cards lift with a subtle amber glow (like picking up a tool)
- **Nav:** active section indicator travels along the scaffold
- **Reduced motion respected** throughout

No page-load sequence, no floating particles, no parallax for its own sake.

## Self-Critique

I initially proposed a warm-cream background palette (#F4F0EA) which maps almost exactly to the first AI-default warning in the brief. I revised to the warm-dark workshop palette to avoid that. The amber accent was chosen over terracotta to further differentiate from the cream+terracotta default.

The corner-bracket motif risks feeling gimmicky if over-applied. Mitigation: use it only at section boundaries (4–5 locations), at low opacity, and only in the first pass — remove any instance that doesn't earn its place.

---

*Plan v1 — ready for review before building.*
