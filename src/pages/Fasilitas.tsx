import { motion } from 'framer-motion'
import { CornerBrackets, SectionDivider, GlareHover } from '../components'
import { fadeUp } from '../hooks/useFadeUp'

const facilities = [
  {
    title: 'Lab Komputer & Jaringan',
    desc: 'Laboratorium dengan perangkat keras dan lunak terkini untuk praktik TKJ dan RPL.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-copy">
        <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
      </svg>
    ),
  },
  {
    title: 'Ruang Praktik Perhotelan',
    desc: 'Simulasi front office, housekeeping, dan tata boga untuk pengalaman hospitality nyata.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-copy">
        <path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3Z" />
      </svg>
    ),
  },
  {
    title: 'Lab Akuntansi',
    desc: 'Ruang praktik dengan software akuntansi profesional untuk simulasi siklus keuangan bisnis.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-copy">
        <path d="M3 13h2v6H3Zm4-5h2v11H7Zm4 3h2v8h-2Zm4-5h2v13h-2Z" />
      </svg>
    ),
  },
  {
    title: 'Perpustakaan Digital',
    desc: 'Koleksi buku, jurnal, dan akses database online untuk mendukung pembelajaran mandiri.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-copy">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
      </svg>
    ),
  },
  {
    title: 'Masjid & Sarana Ibadah',
    desc: 'Fasilitas ibadah yang nyaman untuk mendukung pembentukan karakter spiritual siswa.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-copy">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
      </svg>
    ),
  },
  {
    title: 'Lapangan & Area Olahraga',
    desc: 'Fasilitas olahraga untuk mendukung keseimbangan akademik dan pengembangan fisik siswa.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-copy">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      </svg>
    ),
  },
]

export function Fasilitas() {
  return (
    <section className="min-h-screen bg-base pt-28">
      <div className="px-6 pb-16 md:px-12 lg:px-16">
        <CornerBrackets className="relative mb-16 h-6" />

        <header>
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Fasilitas
          </motion.p>
          <motion.h2
            {...fadeUp(0.2)}
            className="mt-2 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy"
          >
            Sarana & prasarana
            <br />
            standar industri
          </motion.h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((item, i) => (
            <GlareHover
              key={item.title}
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
                {...fadeUp(0.2 + i * 0.1)}
                className="px-6 py-6"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-accent/10">
                  {item.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-copy">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm font-light leading-relaxed text-muted">
                  {item.desc}
                </p>
              </motion.div>
            </GlareHover>
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>
  )
}
