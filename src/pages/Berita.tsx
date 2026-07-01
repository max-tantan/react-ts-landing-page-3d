import { motion } from 'framer-motion'
import { CornerBrackets, SectionDivider } from '../components/Scaffold'
import { ArrowUpRight } from '../components/icons/ArrowUpRight'

const news = [
  {
    date: '20 Jun 2026',
    title: 'PPDB SMK YADIKA Tahun Ajaran 2026/2027 Resmi Dibuka',
    excerpt: 'Pendaftaran peserta didik baru telah dimulai. Tersedia jalur prestasi, reguler, dan afirmasi.',
  },
  {
    date: '15 Mei 2026',
    title: 'Siswa RPL Juara 2 Lomba Aplikasi Mobile Tingkat Provinsi',
    excerpt: 'Tim pengembang aplikasi mobile SMK YADIKA berhasil meraih juara kedua pada ajang kompetisi tingkat Jawa Barat.',
  },
  {
    date: '28 Apr 2026',
    title: 'Penandatanganan MoU dengan Hotel Grand Asia Bandung',
    excerpt: 'Kerjasama baru bidang magang dan penyerapan lulusan program keahlian Perhotelan.',
  },
  {
    date: '10 Mar 2026',
    title: 'Workshop Akuntansi Digital bersama Kantor Akuntan Publik',
    excerpt: 'Siswa Akuntansi mengikuti pelatihan penggunaan software akuntansi terkini langsung dari praktisi.',
  },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
})

export function Berita() {
  return (
    <section className="min-h-screen bg-base pt-28">
      <div className="px-6 pb-16 md:px-12 lg:px-16">
        <CornerBrackets className="relative mb-16 h-6" />

        <header>
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Berita & Kegiatan
          </motion.p>
          <motion.h2
            {...fadeUp(0.2)}
            className="mt-2 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy"
          >
            Kabar terbaru
            <br />
            dari YADIKA
          </motion.h2>
        </header>

        <div className="mt-12 space-y-4">
          {news.map((item, i) => (
            <motion.article
              key={item.title}
              {...fadeUp(0.2 + i * 0.1)}
              className="workshop-card flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
                <time className="font-mono text-[11px] tracking-wider text-accent/60 shrink-0">
                  {item.date}
                </time>
                <div>
                  <h3 className="font-display text-base font-bold text-copy md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 font-body text-sm text-muted">
                    {item.excerpt}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted/50" />
            </motion.article>
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>
  )
}
