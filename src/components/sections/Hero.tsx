import { motion } from 'framer-motion'
import { BlurText } from '../ui/BlurText'
import { FadingVideo } from '../ui/FadingVideo'
import { ArrowUpRight } from '../ui/icons/ArrowUpRight'
import { Play } from '../ui/icons/Play'
import { CornerBrackets, SectionDivider } from './Scaffold'
import { fadeUp } from '../../hooks/useFadeUp'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'

const stats = [
  { value: '1200+', label: 'Siswa Aktif' },
  { value: '15+', label: 'Tahun Berdiri' },
  { value: '95%', label: 'Penyerapan Kerja' },
  { value: '12', label: 'Mitra Industri' },
]

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen flex-col bg-base"
    >
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute inset-0 z-0 object-cover"
        style={{ width: '100%', height: '100%' }}
      />

      <div className="absolute inset-0 z-[1] bg-base/70" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 pt-32">
          <CornerBrackets className="absolute top-24 left-0 right-0" />

          <motion.div {...fadeUp(0.3, 0.6)}>
            <span className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70">
              // PPDB 2026/2027
            </span>
          </motion.div>

          <BlurText
            text="Membangun Generasi Siap Kerja dan Siap Dunia"
            className="mt-4 max-w-4xl justify-center font-display text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.85] tracking-[-3px] text-copy"
          />

          <motion.p
            {...fadeUp(0.7, 0.6)}
            className="mt-4 max-w-lg text-center font-body text-sm font-light leading-relaxed text-muted"
          >
            SMK YADIKA SOREANG menghadirkan pendidikan kejuruan berkualitas
            dengan program unggulan, fasilitas modern, dan kemitraan industri
            yang membekali siswa dengan kompetensi siap kerja di era digital.
          </motion.p>

          <motion.div
            {...fadeUp(0.9, 0.6)}
            className="mt-8 flex items-center gap-6"
          >
            <a
              href="#daftar"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-sky-700"
            >
              Daftar Sekarang
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#profil"
              className="inline-flex items-center gap-2 font-body text-sm text-copy/60 transition-colors hover:text-copy/90"
            >
              <Play className="h-4 w-4" />
              Jelajahi Sekolah
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(1.1, 0.6)}
            className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold tracking-tight text-copy">
                  {stat.value}
                </span>
                <span className="font-body text-xs tracking-wide text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(1.3, 0.6)} className="mt-6">
            <span className="tool-tag">Bermitra dengan BNSP & 12+ mitra industri</span>
          </motion.div>
        </div>

        <div className="relative z-10">
          <SectionDivider />
        </div>
      </div>
    </section>
  )
}
