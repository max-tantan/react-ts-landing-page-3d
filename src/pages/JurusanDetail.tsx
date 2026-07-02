import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BlurText,
  CornerBrackets,
  SectionDivider,
  ArrowUpRight,
  GlareHover,
} from '../components'
import { fadeUp } from '../hooks/useFadeUp'
import jurusanData from '../data/jurusan.json'
import type { JurusanDetail as JurusanDetailType } from '../types'

const jurusanMap = jurusanData as Record<string, JurusanDetailType>

export function JurusanDetail() {
  const { code } = useParams<{ code: string }>()
  const data = code ? jurusanMap[code.toLowerCase()] : undefined

  if (!data) {
    return (
      <section className="min-h-screen bg-base pt-28">
        <div className="flex flex-col items-center justify-center px-6 text-center md:px-12 lg:px-16">
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Tidak Ditemukan
          </motion.p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-[-2px] text-copy">
            Jurusan tidak ditemukan
          </h1>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-muted">
            Halaman yang kamu cari tidak tersedia. Pastikan kode jurusan yang
            dimasukkan benar.
          </p>
          <Link
            to="/jurusan"
            className="mt-8 inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-sky-700"
          >
            Kembali ke Program Keahlian
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-base pt-28">
        <div className="px-6 pb-16 md:px-12 lg:px-16">
          <CornerBrackets className="relative mb-16 h-6" />

          <header>
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
            >
              // {data.code}
              {data.subtitle && (
                <span className="ml-3 tracking-wider text-copy/10">
                  ({data.subtitle})
                </span>
              )}
            </motion.p>
            <div className="mt-2 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy">
              <BlurText
                text={data.title}
                delay={150}
                animateBy="words"
                direction="bottom"
                className="my-0"
              />
            </div>
            <motion.p
              {...fadeUp(0.3)}
              className="mt-4 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-light leading-tight tracking-[-0.5px] text-muted"
            >
              {data.heroTitle}
            </motion.p>
          </header>
        </div>
        <SectionDivider />
      </section>

      {/* ─── SAMBUTAN KAPRODI ─── */}
      <section className="bg-base">
        <div className="px-6 pt-20 pb-16 md:px-12 lg:px-16">
          <CornerBrackets className="relative mb-16 h-6" />

          <header>
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
            >
              // Sambutan
            </motion.p>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <motion.div
              {...fadeUp(0.2)}
              className="relative overflow-hidden"
            >
              <img
                src={data.sambutan.photo}
                alt={data.sambutan.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 border border-copy/5" />
            </motion.div>

            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-col justify-center"
            >
              <h2 className="font-display text-xl font-bold leading-snug tracking-[-0.5px] text-copy md:text-2xl">
                Sambutan Hangat dari Kaprodi
              </h2>
              <div className="mb-4 mt-3 h-px w-10 bg-accent/30" />
              <p className="font-body text-sm leading-relaxed text-muted">
                {data.sambutan.message}
              </p>
              <div className="mt-6 border-l-2 border-accent/40 pl-4">
                <p className="font-display text-base font-bold text-copy">
                  {data.sambutan.name}
                </p>
                <p className="font-mono text-[11px] tracking-wider text-accent/60">
                  {data.sambutan.role}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <SectionDivider />
      </section>

      {/* ─── APA ITU ─── */}
      <section className="bg-base py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-16">
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Tentang
          </motion.p>
          <div className="mt-2 max-w-3xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[0.9] tracking-[-2px] text-copy">
            <BlurText
              text={`Apa itu ${data.code}?`}
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="mt-8 max-w-4xl space-y-4"
          >
            {data.description.map((paragraph, i) => (
              <p
                key={i}
                className="font-body text-sm leading-[1.85] text-muted md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        <SectionDivider />
      </section>

      {/* ─── KURIKULUM ─── */}
      <section className="bg-base py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-16">
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Kurikulum
          </motion.p>
          <div className="mt-2 max-w-3xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[0.9] tracking-[-2px] text-copy">
            <BlurText
              text="Apa yang akan kamu pelajari?"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.curriculum.map((year) => (
              <GlareHover
                key={year.year}
                width="100%"
                background="#2C2721"
                borderColor="rgba(245, 237, 224, 0.06)"
                borderRadius="0"
                glareColor="#0284C7"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={250}
                transitionDuration={600}
                style={{ display: 'block', height: 'auto' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex h-full flex-col"
                >
                  <div className="border-b border-copy/5 px-5 py-3">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-accent/40">
                      TAHUN KE-{year.year}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-5 py-4">
                    <h3 className="font-display text-base font-bold leading-snug tracking-[-0.3px] text-copy">
                      {year.label}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {year.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                          <span className="font-body text-[0.8125rem] leading-relaxed text-muted">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </GlareHover>
            ))}
          </div>
        </div>

        <SectionDivider />
      </section>

      {/* ─── PROSPEK KARIR ─── */}
      <section className="bg-base py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-16">
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Prospek Karir
          </motion.p>
          <div className="mt-2 max-w-3xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[0.9] tracking-[-2px] text-copy">
            <BlurText
              text="Peluang setelah lulus"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.careers.map((career) => (
              <GlareHover
                key={career.title}
                width="100%"
                background="#2C2721"
                borderColor="rgba(245, 237, 224, 0.06)"
                borderRadius="0"
                glareColor="#0284C7"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={250}
                transitionDuration={600}
                style={{ display: 'block', height: 'auto' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex items-start gap-4 px-5 py-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-accent"
                    >
                      <path d={career.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-copy">
                      {career.title}
                    </h3>
                    <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                      {career.desc}
                    </p>
                  </div>
                </motion.div>
              </GlareHover>
            ))}
          </div>
        </div>

        <SectionDivider />
      </section>

      {/* ─── GALERI KEGIATAN ─── */}
      <section className="bg-base py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-16">
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Galeri Kegiatan
          </motion.p>
          <div className="mt-2 max-w-3xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[0.9] tracking-[-2px] text-copy">
            <BlurText
              text="Momen & aktivitas"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
          </div>

          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {data.gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: i * 0.08,
                }}
                className="mb-5 break-inside-avoid"
              >
                <GlareHover
                  width="100%"
                  background="#2C2721"
                  borderColor="rgba(245, 237, 224, 0.06)"
                  borderRadius="0"
                  glareColor="#0284C7"
                  glareOpacity={0.15}
                  glareAngle={-30}
                  glareSize={250}
                  transitionDuration={600}
                  style={{ display: 'block', height: 'auto' }}
                >
                  <div className="group relative overflow-hidden">
                    <img
                      src={src}
                      alt={`Kegiatan PPLG ${i + 1}`}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border border-copy/5 transition-colors group-hover:border-accent/20" />
                  </div>
                </GlareHover>
              </motion.div>
            ))}
          </div>
        </div>

        <SectionDivider />
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-base pb-28">
        <div className="px-6 text-center md:px-12 lg:px-16">
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Tertarik?
          </motion.p>
          <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[0.9] tracking-[-1.5px] text-copy">
            Mulai perjalananmu bersama {data.code}
          </h2>
          <motion.div {...fadeUp(0.3)} className="mt-8">
            <Link
              to="/jurusan"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-sky-700"
            >
              Jelajahi Program Lainnya
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
