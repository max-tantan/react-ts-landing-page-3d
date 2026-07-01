import { motion } from 'framer-motion'
import { CornerBrackets, SectionDivider } from '../components'
import { fadeUp } from '../hooks/useFadeUp'

type Student = {
  name: string
  program: string
  angkatan: string
  achievement: string
  image: string
}

type NewsItem = {
  date: string
  title: string
  excerpt: string
  body: string
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

const news: NewsItem[] = [
  {
    date: '20 Jun 2026',
    title: 'PPDB SMK YADIKA Tahun Ajaran 2026/2027 Resmi Dibuka',
    excerpt: 'Pendaftaran peserta didik baru telah dimulai. Tersedia jalur prestasi, reguler, dan afirmasi.',
    body: 'SMK YADIKA SOREANG membuka pendaftaran peserta didik baru untuk tahun ajaran 2026/2027. Tersedia tiga program keahlian unggulan: Rekayasa Perangkat Lunak, Perhotelan, dan Akuntansi. Pendaftaran dapat dilakukan secara online melalui website resmi sekolah atau datang langsung ke kampus.',
    image: 'https://picsum.photos/seed/ppdb-yadika/600/400',
  },
  {
    date: '15 Mei 2026',
    title: 'Siswa RPL Juara 2 Lomba Aplikasi Mobile Tingkat Provinsi',
    excerpt: 'Tim pengembang aplikasi mobile SMK YADIKA berhasil meraih juara kedua pada ajang kompetisi tingkat Jawa Barat.',
    body: 'Tim Rekayasa Perangkat Lunak SMK YADIKA berhasil membawa pulang trophy juara kedua dalam ajang Lomba Aplikasi Mobile Tingkat Provinsi Jawa Barat. Aplikasi yang dikembangkan berupa platform pembelajaran interaktif untuk siswa SMK.',
    image: 'https://picsum.photos/seed/rpl-juara/600/400',
  },
  {
    date: '28 Apr 2026',
    title: 'Penandatanganan MoU dengan Hotel Grand Asia Bandung',
    excerpt: 'Kerjasama baru bidang magang dan penyerapan lulusan program keahlian Perhotelan.',
    body: 'SMK YADIKA resmi menjalin kerjasama dengan Hotel Grand Asia Bandung. MoU ini mencakup program magang bagi siswa Perhotelan, pelatihan bersama, dan prioritas penyerapan lulusan. Hotel Grand Asia akan menjadi salah satu mitra industri utama program keahlian Perhotelan.',
    image: 'https://picsum.photos/seed/mou-hotel/600/400',
  },
  {
    date: '10 Mar 2026',
    title: 'Workshop Akuntansi Digital bersama Kantor Akuntan Publik',
    excerpt: 'Siswa Akuntansi mengikuti pelatihan penggunaan software akuntansi terkini langsung dari praktisi.',
    body: 'Program keahlian Akuntansi mengadakan workshop Akuntansi Digital yang menghadirkan praktisi dari Kantor Akuntan Publik terkemuka. Siswa mendapat pelatihan langsung penggunaan software akuntansi modern dan praktik pencatatan keuangan digital.',
    image: 'https://picsum.photos/seed/workshop-akuntansi/600/400',
  },
]

function StudentCard({ student, index }: { student: Student; index: number }) {
  return (
    <motion.article
      {...fadeUp(0.2 + index * 0.1)}
      className="workshop-card flex flex-col overflow-hidden"
    >
      <div className="aspect-[4/5] overflow-hidden">
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
  )
}

function NewsSection({ item, index }: { item: NewsItem; index: number }) {
  const isReversed = index % 2 !== 0

  return (
    <motion.article
      {...fadeUp(0.1 + index * 0.1)}
      className="grid grid-cols-1 md:grid-cols-2"
    >
      <div
        className={`flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 ${
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
        <p className="mt-3 font-body text-sm leading-relaxed text-muted/70">
          {item.body}
        </p>
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-accent transition-colors hover:text-sky-400"
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
        </a>
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
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 border border-copy/5" />
      </div>
    </motion.article>
  )
}

export function Berita() {
  return (
    <section className="bg-base pt-28">
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

        <div className="mt-16">
          <motion.p
            {...fadeUp(0.3)}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70"
          >
            // Prestasi Siswa Terbaik
          </motion.p>
          <motion.h3
            {...fadeUp(0.35)}
            className="mt-1 font-display text-2xl font-bold tracking-[-1px] text-copy md:text-3xl"
          >
            Siswa terbaik
            <br />
            dari setiap angkatan
          </motion.h3>
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

      <div className="divide-y divide-copy/5">
        {news.map((item, i) => (
          <NewsSection key={item.title} item={item} index={i} />
        ))}
      </div>

      <div className="px-6 pt-16 pb-16 md:px-12 lg:px-16">
        <SectionDivider />
      </div>
    </section>
  )
}
