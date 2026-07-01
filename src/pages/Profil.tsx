import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CornerBrackets, SectionDivider } from '../components/Scaffold'
import { ArrowUpRight } from '../components/icons/ArrowUpRight'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
})

export function Profil() {
  return (
    <section className="min-h-screen bg-base pt-28">
      <div className="px-6 pb-16 md:px-12 lg:px-16">
        <CornerBrackets className="relative mb-16 h-6" />

        <header>
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Profil Sekolah
          </motion.p>
          <motion.h2
            {...fadeUp(0.2)}
            className="mt-2 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy"
          >
            Tentang
            <br />
            SMK YADIKA SOREANG
          </motion.h2>
        </header>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <motion.div {...fadeUp(0.3)}>
            <p className="font-body text-sm leading-relaxed text-muted">
              SMK YADIKA SOREANG berdiri sejak 2010 di bawah naungan Yayasan
              Pendidikan YADIKA. Berlokasi di pusat Kota Soreang, Kabupaten
              Bandung, sekolah ini berkomitmen mencetak lulusan yang siap kerja
              dan siap dunia melalui pendidikan kejuruan berkualitas.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              Dengan tiga program keahlian unggulan — Rekayasa Perangkat Lunak,
              Perhotelan, dan Akuntansi — kami membekali siswa dengan kompetensi
              teknis, sertifikasi BNSP, dan pengalaman magang di industri
              terkemuka.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-copy/5 pt-8">
              <div>
                <p className="font-display text-3xl font-bold text-copy">1200+</p>
                <p className="mt-1 font-body text-xs text-muted">Siswa Aktif</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-copy">15+</p>
                <p className="mt-1 font-body text-xs text-muted">Tahun Berdiri</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-copy">12+</p>
                <p className="mt-1 font-body text-xs text-muted">Mitra Industri</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            className="workshop-card px-6 py-6"
          >
            <h3 className="font-display text-lg font-bold text-copy">
              Visi & Misi
            </h3>
            <div className="mt-4">
              <p className="font-mono text-[11px] tracking-wider text-accent/60">
                VISI
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-copy/90">
                Menjadi sekolah kejuruan unggulan yang menghasilkan lulusan
                berdaya saing global, berkarakter, dan siap menghadapi
                tantangan industri 4.0.
              </p>
            </div>
            <div className="mt-5">
              <p className="font-mono text-[11px] tracking-wider text-accent/60">
                MISI
              </p>
              <ul className="mt-1 space-y-2">
                {[
                  'Menyelenggarakan pendidikan vokasi berbasis industri',
                  'Mengembangkan kompetensi siswa sesuai kebutuhan dunia kerja',
                  'Menjalin kemitraan dengan dunia usaha dan industri',
                  'Membentuk karakter siswa yang disiplin dan profesional',
                ].map((m) => (
                  <li key={m} className="flex gap-2 font-body text-sm text-muted">
                    <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.5)} className="mt-10">
          <Link
            to="/jurusan"
            className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-sky-700"
          >
            Jelajahi Program Keahlian
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <SectionDivider />
    </section>
  )
}
