import { motion } from 'framer-motion'
import { ArrowUpRight, CornerBrackets, SectionDivider, GlareHover } from '../components'
import type { ProgramCard } from '../types'
import { fadeUp } from '../hooks/useFadeUp'

const programs: ProgramCard[] = [
  {
    code: 'RPL',
    title: 'Rekayasa Perangkat Lunak',
    body: 'Kembangkan aplikasi web dan mobile dengan metodologi pengembangan modern, dari perencanaan hingga deployment produksi.',
    tags: ['Web Dev', 'Mobile', 'Agile', 'Full Stack'],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-copy">
        <path d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z" />
      </svg>
    ),
  },
  {
    code: 'HTL',
    title: 'Perhotelan',
    body: 'Pelajari manajemen perhotelan, pelayanan tamu, housekeeping, dan operasional hotel standar internasional untuk siap kerja di industri hospitality.',
    tags: ['Pelayanan', 'Housekeeping', 'Front Office', 'Sertifikasi'],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-copy">
        <path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3Z" />
      </svg>
    ),
  },
  {
    code: 'AK',
    title: 'Akuntansi',
    body: 'Kuasai pencatatan keuangan, siklus akuntansi, perpajakan, dan penggunaan software akuntansi untuk kebutuhan bisnis dan industri.',
    tags: ['Keuangan', 'Pajak', 'Software Akuntansi', 'Audit'],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-copy">
        <path d="M3 13h2v6H3Zm4-5h2v11H7Zm4 3h2v8h-2Zm4-5h2v13h-2Z" />
      </svg>
    ),
  },
]

function ProgramCardItem({ title, body, tags, code, icon }: ProgramCard) {
  return (
    <GlareHover
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
      <motion.article
        {...fadeUp(0.2)}
        className="flex flex-col"
      >
        <div className="flex items-center gap-4 border-b border-copy/5 px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-accent/10">
              {icon}
            </div>
            <span className="tool-tag">{code}</span>
          </div>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-wide text-muted/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col px-6 py-5">
          <h3 className="font-display text-2xl font-bold leading-tight tracking-[-1px] text-copy md:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-[36ch] font-body text-sm font-light leading-relaxed text-muted">
            {body}
          </p>
          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-accent">
              Pelajari selengkapnya
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </motion.article>
    </GlareHover>
  )
}

export function Jurusan() {
  return (
    <section className="bg-base pt-28">
      <div className="px-6 pb-16 md:px-12 lg:px-16">
        <CornerBrackets className="relative mb-16 h-6" />

        <header>
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Program Keahlian
          </motion.p>
          <motion.h2
            {...fadeUp(0.2)}
            className="mt-2 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy"
          >
            Pilih jalur
            <br />
            masa depanmu
          </motion.h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCardItem key={program.code} {...program} />
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>
  )
}
