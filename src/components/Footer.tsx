import { ArrowUpRight } from './icons/ArrowUpRight'
import { BottomBrackets, SectionDivider } from './Scaffold'
import logoSrc from '../assets/image.png'

export function Footer() {
  return (
    <footer className="relative bg-base">
      <SectionDivider />

      <div className="relative px-6 pt-20 pb-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-lg">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70">
                // Hubungi Kami
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-[-2px] text-copy">
              Siap mulai
              <br />
              perjalananmu?
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                SMK YADIKA SOREANG — Jl. Raya Soreang No. 123, Kab. Bandung,
                Jawa Barat 40912
              </p>
              <div className="mt-6 flex items-center gap-6">
                <a
                  href="tel:+6281234567890"
                  className="font-body text-sm text-copy/80 transition-colors hover:text-accent"
                >
                  (022) 1234-5678
                </a>
                <span className="h-3 w-px bg-muted/30" />
                <a
                  href="mailto:info@smkyadika.sch.id"
                  className="font-body text-sm text-copy/80 transition-colors hover:text-accent"
                >
                  info@smkyadika.sch.id
                </a>
              </div>
            </div>

            <a
              href="#daftar"
              className="group inline-flex shrink-0 items-center gap-3 bg-accent px-8 py-4 font-body text-sm font-semibold text-base transition-all hover:bg-sky-700"
            >
              Daftar Sekarang
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-copy/5 pt-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <a
                href="#beranda"
                className="flex items-center justify-center"
                aria-label="SMK YADIKA SOREANG"
              >
                <img src={logoSrc} alt="SMK YADIKA SOREANG" className="h-6 w-auto" />
              </a>
              <span className="font-body text-xs text-muted">
                © 2026 SMK YADIKA SOREANG
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="font-mono text-[11px] tracking-wide text-muted/60 transition-colors hover:text-copy/80"
              >
                Instagram
              </a>
              <a
                href="#"
                className="font-mono text-[11px] tracking-wide text-muted/60 transition-colors hover:text-copy/80"
              >
                YouTube
              </a>
              <a
                href="#"
                className="font-mono text-[11px] tracking-wide text-muted/60 transition-colors hover:text-copy/80"
              >
                Facebook
              </a>
              <a
                href="#"
                className="font-mono text-[11px] tracking-wide text-muted/60 transition-colors hover:text-copy/80"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <BottomBrackets className="absolute bottom-0 left-0 right-0" />
      </div>
    </footer>
  )
}
