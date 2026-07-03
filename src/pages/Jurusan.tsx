import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, CornerBrackets, SectionDivider, GlareHover, SpecimenLabel } from '../components'
import type { ProgramCard } from '../types'
import { fadeUp } from '../hooks/useFadeUp'

const programs: ProgramCard[] = [
  {
    code: 'PPLG',
    title: 'Pengembangan Perangkat Lunak dan Gim',
    body: 'Kembangkan aplikasi web, mobile, dan gim dengan teknologi modern — dari coding hingga deployment — siap bersaing di industri digital global.',
    tags: ['Web Dev', 'Mobile', 'Game Dev', 'Full Stack'],
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
  const detailPath = `/jurusan/${code.toLowerCase()}`
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
        <div className="flex items-center gap-4 border-b border-copy/5 px-5 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center bg-accent/10">
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

        <div className="flex flex-1 flex-col px-5 py-4">
          <h3 className="line-clamp-2 h-[3.5rem] font-display text-[1.25rem] font-bold leading-snug tracking-[-0.5px] text-copy">
            {title}
          </h3>
          <div className="mt-2 flex-1">
            <p className="line-clamp-5 font-body text-[0.8125rem] font-light leading-relaxed text-muted">
              {body}
            </p>
          </div>
          <div className="mt-auto pt-4">
            <Link
              to={detailPath}
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-accent transition-all hover:text-sky-400"
            >
              Lihat lebih banyak
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </motion.article>
    </GlareHover>
  )
}

export function Jurusan() {
  return (
    <>
    <section className="bg-base pt-28">
      <div className="px-6 pb-16 md:px-12 lg:px-16">
        <CornerBrackets className="relative mb-16 h-6" />

        <header>
          <motion.p {...fadeUp(0.1)}>
            <SpecimenLabel variant="data">
              Program Keahlian
            </SpecimenLabel>
          </motion.p>
          <motion.h1
            {...fadeUp(0.2)}
            className="mt-2 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy"
          >
            Pilih jalur
            <br />
            masa depanmu
          </motion.h1>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCardItem key={program.code} {...program} />
          ))}
        </div>
      </div>

      <SectionDivider />
    </section>

    <section className="bg-base py-24 md:py-32">
      <div className="px-6 md:px-12 lg:px-16">
        <header className="mb-16">
          <motion.p {...fadeUp(0.1)}>
            <SpecimenLabel variant="narrative">
              Yang Dipelajari
            </SpecimenLabel>
          </motion.p>
          <motion.h2
            {...fadeUp(0.2)}
            className="mt-2 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy"
          >
            Apa yang akan
            <br />
            kamu pelajari?
          </motion.h2>
        </header>

        <div className="space-y-20 md:space-y-28">
          {[
            {
              title: 'Pengembangan Perangkat Lunak dan Gim',
              code: 'PPLG',
              image: 'https://picsum.photos/seed/pplg-code/800/600',
              items: [
                'Dasar pemrograman — HTML, CSS, JavaScript, PHP',
                'Framework modern — React, Laravel, Node.js, Flutter',
                'Game development — Unity, Construct, Godot',
                'UI/UX Design — Figma, prototyping, user research',
                'Siklus pengembangan — Agile, Scrum, Git, deployment',
              ],
            },
            {
              title: 'Perhotelan',
              code: 'HTL',
              image: 'https://picsum.photos/seed/hotel-service/800/600',
              items: [
                'Front Office — resepsionis, check-in/out, reservasi',
                'Housekeeping — tata graha, laundry, room inspection',
                'Food & Beverage — pelayanan restoran, barista, banquet',
                'Hospitality Management — standar layanan internasional',
                'Praktik langsung — hotel simulasi & magang industri',
              ],
            },
            {
              title: 'Akuntansi',
              code: 'AK',
              image: 'https://picsum.photos/seed/accounting/800/600',
              items: [
                'Dasar akuntansi — jurnal umum, buku besar, neraca',
                'Siklus akuntansi — perusahaan jasa, dagang, manufaktur',
                'Perpajakan — PPh, PPN, e-Faktur, pelaporan SPT',
                'Software akuntansi — MYOB, Accurate, Excel keuangan',
                'Audit & sertifikasi — BNSP, etika profesi akuntan',
              ],
            },
          ].map((program, i) => {
            const isReversed = i % 2 === 0

            return (
              <motion.div
                key={program.code}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isReversed ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 border border-copy/5" />
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70">
                    {program.code}
                  </span>
                  <h3 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-[-1.5px] text-copy">
                    {program.title}
                  </h3>
                  <div className="mt-6 h-px w-10 bg-accent/30" />
                  <ul className="mt-6 space-y-4">
                    {program.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                        <span className="font-body text-sm leading-relaxed text-muted">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <SectionDivider />
    </section>
    </>
  )
}
