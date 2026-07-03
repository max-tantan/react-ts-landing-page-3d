import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BlurText, CornerBrackets, SectionDivider, GlareHover, PrestasiCard, Pagination, SpecimenLabel } from '../components'
import { fadeUp } from '../hooks/useFadeUp'
import prestasiData from '../data/prestasi.json'
import beritaData from '../data/berita.json'
import type { Artikel } from '../types'

type Student = {
  name: string
  program: string
  angkatan: string
  achievement: string
  image: string
}

const topStudents: Student[] = [
  {
    name: 'Aulia Rahman',
    program: 'Rekayasa Perangkat Lunak',
    angkatan: 'Angkatan 2023',
    achievement: 'Juara 1 Hackathon Nasional yang diselenggarakan oleh Kementerian Pendidikan. Aplikasi karyanya digunakan oleh 5 SMK di Jawa Barat.',
    image: 'https://picsum.photos/seed/siswa-rpl/400/500',
  },
  {
    name: 'Nadia Putri',
    program: 'Perhotelan',
    angkatan: 'Angkatan 2023',
    achievement: 'Terpilih sebagai siswa magang terbaik di Hotel Grand Asia Bandung dan mendapat tawaran kerja langsung setelah lulus.',
    image: 'https://picsum.photos/seed/siswa-htl/400/500',
  },
  {
    name: 'Dimas Saputra',
    program: 'Akuntansi',
    angkatan: 'Angkatan 2023',
    achievement: 'Meraih sertifikasi BNSP di bidang akuntansi sebelum lulus. Membukukan laporan keuangan untuk 3 UMKM binaan sekolah.',
    image: 'https://picsum.photos/seed/siswa-ak/400/500',
  },
]



function StudentCard({ student, index }: { student: Student; index: number }) {
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
        {...fadeUp(0.2 + index * 0.1)}
        className="flex flex-col"
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={student.image}
            alt={student.name}
            loading="lazy"
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col px-5 py-5">
          <div className="flex items-center gap-2">
            <span className="tool-tag">{student.angkatan}</span>
            <span className="font-mono text-[10px] tracking-wide text-muted/60">
              {student.program}
            </span>
          </div>
          <h3 className="mt-3 font-display text-lg font-bold text-copy">
            {student.name}
          </h3>
          <p className="mt-2 font-body text-sm font-light leading-relaxed text-muted">
            {student.achievement}
          </p>
        </div>
      </motion.article>
    </GlareHover>
  )
}

function NewsSection({ item, index }: { item: Artikel; index: number }) {
  const isReversed = index % 2 !== 0

  return (
    <motion.article
      {...fadeUp(0.1 + index * 0.1)}
      className="grid grid-cols-1 md:grid-cols-2"
    >
      <div
        className={`flex flex-col justify-center px-6 py-8 md:px-12 md:py-14 ${
          isReversed ? 'md:order-2' : ''
        }`}
      >
        <time className="font-mono text-[11px] tracking-wider text-accent/60">
          {item.date}
        </time>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-[-0.5px] text-copy md:text-2xl">
          {item.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted">
          {item.excerpt}
        </p>
        <Link
          to={`/berita/${item.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-accent transition-colors hover:text-accent-hover"
        >
          Baca selengkapnya
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-3.5 w-3.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div
        className={`relative aspect-[3/2] overflow-hidden md:aspect-auto ${
          isReversed ? 'md:order-1' : ''
        }`}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-500 hover:brightness-110"
        />
        <div className="absolute inset-0 border border-copy/5" />
      </div>
    </motion.article>
  )
}

const filterOptions = [
  { value: 'semua', label: 'Semua' },
  { value: 'siswa', label: 'Siswa' },
  { value: 'guru', label: 'Guru' },
] as const

type FilterValue = (typeof filterOptions)[number]['value']

export function Berita() {
  const [prestasiPage, setPrestasiPage] = useState(1)
  const [filter, setFilter] = useState<FilterValue>('semua')

  const filteredData = filter === 'semua'
    ? prestasiData
    : prestasiData.filter((item) =>
        filter === 'siswa' ? item.peran.startsWith('Siswa') : item.peran === 'Guru'
      )

  const PER_PAGE = 10
  const totalFilteredPages = Math.ceil(filteredData.length / PER_PAGE)

  function handleFilterChange(value: FilterValue) {
    setFilter(value)
    setPrestasiPage(1)
  }

  return (
    <section className="bg-base pt-28">
      <div className="px-6 pb-16 md:px-12 lg:px-16">
        <CornerBrackets className="relative mb-16 h-6" />

        <header>
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="data">
                Berita &amp; Kegiatan
              </SpecimenLabel>
            </motion.p>
          <div className="mt-2 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy">
            <BlurText
              text="Kabar terbaru"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
            <BlurText
              text="dari YADIKA"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
          </div>
        </header>

        <SectionDivider />

        <div className="mt-16">
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="narrative">
                Prestasi Siswa Terbaik
              </SpecimenLabel>
            </motion.p>
          <div className="mt-1 font-display text-2xl font-bold tracking-[-1px] text-copy md:text-3xl">
            <BlurText
              text="Siswa terbaik"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
            <BlurText
              text="dari setiap angkatan"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {topStudents.map((student, i) => (
            <StudentCard key={student.name} student={student} index={i} />
          ))}
        </div>
      </div>

      <div className="px-6 pt-16 md:px-12 lg:px-16">
        <SectionDivider />
      </div>

      <div className="px-6 md:px-12 lg:px-16">
        <motion.p {...fadeUp(0.1)}>
          <SpecimenLabel variant="narrative">
            Berita Terkini
          </SpecimenLabel>
        </motion.p>
        <div className="mt-1 font-display text-2xl font-bold tracking-[-1px] text-copy md:text-3xl">
          <BlurText
            text="Berita terkini"
            delay={150}
            animateBy="words"
            direction="bottom"
            className="my-0"
          />
          <BlurText
            text="dari YADIKA SOREANG"
            delay={150}
            animateBy="words"
            direction="bottom"
            className="my-0"
          />
        </div>
      </div>

      <div className="divide-y divide-copy/5 mt-8">
        {(beritaData as Artikel[]).map((item, i) => (
          <NewsSection key={item.id} item={item} index={i} />
        ))}
      </div>

      <div className="px-6 pt-16 md:px-12 lg:px-16">
        <SectionDivider />
      </div>

      <div className="px-6 pb-16 md:px-12 lg:px-16">
        <div className="mt-16">
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="data">
                Prestasi Siswa &amp; Guru
              </SpecimenLabel>
            </motion.p>
          <div className="mt-1 font-display text-2xl font-bold tracking-[-1px] text-copy md:text-3xl">
            <BlurText
              text="Kebanggaan"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
            <BlurText
              text="keluarga YADIKA"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleFilterChange(opt.value)}
              className={`font-mono text-xs tracking-wide px-4 py-2 transition-all ${
                filter === opt.value
                  ? 'bg-accent text-base font-bold'
                  : 'border border-copy/10 text-muted hover:border-accent/50 hover:text-copy'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={prestasiPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {(() => {
              const start = (prestasiPage - 1) * PER_PAGE
              return filteredData.slice(start, start + PER_PAGE).map((item, i) => (
                <PrestasiCard key={item.id} item={item} index={i} />
              ))
            })()}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 font-mono text-[11px] tracking-wide text-muted text-center"
        >
          Menampilkan {Math.min(PER_PAGE, filteredData.length - (prestasiPage - 1) * PER_PAGE)} dari {filteredData.length} prestasi
        </motion.p>

        <Pagination
          currentPage={prestasiPage}
          totalPages={totalFilteredPages}
          onPageChange={setPrestasiPage}
        />
      </div>
    </section>
  )
}
