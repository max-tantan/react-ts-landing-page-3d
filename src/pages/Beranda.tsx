import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { CornerBrackets, SectionDivider } from '../components/Scaffold'
import { ArrowUpRight } from '../components/icons/ArrowUpRight'

const reasons = [
  {
    title: 'Lulusan Siap Kerja',
    body: 'Kurikulum berbasis industri dengan praktik lapangan dan sertifikasi BNSP yang diakui nasional.',
  },
  {
    title: 'Mitra Industri',
    body: 'Bermitra dengan 12+ perusahaan dan lembaga terkemuka untuk magang dan penyaluran kerja.',
  },
  {
    title: 'Fasilitas Modern',
    body: 'Lab komputer, jaringan, perhotelan, dan akuntansi yang dilengkapi peralatan standar industri.',
  },
  {
    title: 'Pengajar Profesional',
    body: 'Tenaga pengajar bersertifikasi dengan pengalaman industri dan pendekatan pembelajaran modern.',
  },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
})

export function Beranda() {
  return (
    <>
      <Hero />

      <section className="bg-base">
        <div className="px-6 pt-20 pb-16 md:px-12 lg:px-16">
          <CornerBrackets className="relative mb-16 h-6" />

          <header>
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
            >
              // Mengapa YADIKA
            </motion.p>
            <motion.h2
              {...fadeUp(0.2)}
              className="mt-2 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.9] tracking-[-2px] text-copy"
            >
              Sekolah kejuruan
              <br />
              yang mempersiapkan masa depanmu
            </motion.h2>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {reasons.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(0.2 + i * 0.1)}
                className="workshop-card flex flex-col px-6 py-6"
              >
                <span className="font-mono text-[11px] tracking-wider text-accent/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-[-0.5px] text-copy">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm font-light leading-relaxed text-muted">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp(0.6)}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/jurusan"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-sky-700"
            >
              Lihat Program Keahlian
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/profil"
              className="inline-flex items-center gap-2 font-body text-sm text-copy/60 transition-colors hover:text-copy/90"
            >
              Tentang Sekolah
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <SectionDivider />
      </section>
    </>
  )
}
