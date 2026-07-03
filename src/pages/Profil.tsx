import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BlurText, CornerBrackets, SectionDivider, ArrowUpRight, CircularGallery, GlareHover, SpecimenLabel } from '../components'
import { fadeUp } from '../hooks/useFadeUp'

const sejarah = [
  {
    year: '2010',
    chapter: 'BAB 1',
    title: 'Bibit Keunggulan',
    body: 'SMK YADIKA SOREANG lahir dari sebuah visi besar: membangun jembatan antara dunia pendidikan dan industri. Di tahun pertamanya, sekolah ini membuka pintu bagi 120 siswa perdana dengan satu program keahlian — Akuntansi. Gedung sederhana di pusat Soreang menjadi saksi bisu denyut pertama pendidikan vokasi yang kelak menjelma menjadi salah satu SMK swasta terdepan di Kabupaten Bandung.',
    footnote: '12 Juni 2010 — Piagam pendirian ditandatangani',
  },
  {
    year: '2013',
    chapter: 'BAB 2',
    title: 'Merambah Horizon Baru',
    body: 'Tiga tahun berjalan, SMK YADIKA SOREANG tak lagi sekadar sekolah — ia mulai menjadi tujuan. Dua program keahlian baru lahir: Rekayasa Perangkat Lunak dan Perhotelan, menjawab dahaga industri akan tenaga terampil di era digital dan pariwisata. Jumlah siswa melonjak, ruang kelas tak lagi cukup. Semangat "belajar sambil melakukan" mulai mengakar kuat dalam setiap sudut sekolah.',
    footnote: 'Tahun pertumbuhan eksponensial — jumlah siswa naik 200%',
  },
  {
    year: '2017',
    chapter: 'BAB 3',
    title: 'Menuju Panggung Global',
    body: 'Tahun ini menjadi batu loncatan. SMK YADIKA SOREANG resmi menjalin kemitraan dengan BNSP, membuka jalan bagi sertifikasi kompetensi yang diakui industri. Workshop modern, laboratorium komputer, dan ruang praktik perhotelan dibangun — setiap sudut sekolah menjadi laboratorium kehidupan, tempat teori berjabat tangan dengan praktik.',
    footnote: 'Sertifikasi BNSP — standar kompetensi berkelas dunia',
  },
  {
    year: '2024',
    chapter: 'BAB 4',
    title: 'Kini & Nanti',
    body: 'Hari ini, lebih dari 1.200 siswa menempuh pendidikan di bawah naungan Yayasan Pendidikan YADIKA. Dengan 15 tahun pengalaman, 3 program keahlian unggulan, dan belasan mitra industri, SMK YADIKA SOREANG tegak berdiri — bukan sekadar sekolah, melainkan ekosistem tempat mimpi-mimpi ditempa menjadi keahlian, tempat para calon pemimpin industri masa depan ditempa.',
    footnote: '1200+ siswa \u00B7 12+ mitra industri \u00B7 3 program keahlian',
  },
]

export function Profil() {
  return (
    <section className="min-h-screen bg-base pt-28">
      <div className="px-6 pb-16 md:px-12 lg:px-16">
        <CornerBrackets className="relative mb-16 h-6" />

        <header>
          <motion.p {...fadeUp(0.1)}>
            <SpecimenLabel variant="data">
              Profil Sekolah
            </SpecimenLabel>
          </motion.p>
          <div className="mt-2 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy">
            <BlurText
              text="Tentang"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
            <BlurText
              text="SMK YADIKA SOREANG"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="my-0"
            />
          </div>
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
            <motion.div
              {...fadeUp(0.4)}
              className="px-6 py-6"
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
          </GlareHover>
        </div>

        <motion.div {...fadeUp(0.5)} className="mt-10">
          <Link
            to="/jurusan"
            className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-accent-hover"
          >
            Jelajahi Program Keahlian
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <section className="h-[600px] w-full">
        <CircularGallery />
      </section>

      <section className="relative overflow-hidden border-t border-copy/5 px-6 py-24 md:px-12 lg:px-16">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
          <span className="text-[clamp(8rem,30vw,24rem)] font-bold leading-none text-copy/[0.012] tracking-[-0.05em]">
            SEJARAH
          </span>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <header className="mb-16 md:mb-24">
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="narrative">
                Arsip Sejarah
              </SpecimenLabel>
            </motion.p>
            <div className="mt-3 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.9] tracking-[-3px] text-copy">
              <BlurText
                text="Kronik"
                delay={150}
                animateBy="words"
                direction="bottom"
                className="my-0"
              />
              <BlurText
                text="Perjalanan"
                delay={150}
                animateBy="words"
                direction="bottom"
                className="my-0"
              />
            </div>
            <motion.p
              {...fadeUp(0.3)}
              className="mt-4 max-w-xl font-body text-sm leading-relaxed text-muted"
            >
              Setiap sekolah memiliki cerita. Inilah kisah perjalanan SMK YADIKA
              SOREANG — dari mimpi menjadi nyata, dari langkah pertama hingga
              menjadi rumah bagi ribuan calon pemimpin masa depan.
            </motion.p>
          </header>

          <div className="space-y-20 md:space-y-28">
            {sejarah.map((item, index) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
                className="group relative"
              >
                <div className="relative border-l-2 border-accent/10 pl-6 md:pl-10">
                  <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full border-2 border-accent/40 bg-base transition-colors duration-300 group-hover:border-accent" />

                  <div className="pointer-events-none absolute -top-6 right-0 select-none text-[clamp(5rem,12vw,10rem)] font-bold leading-none tracking-[-0.05em] text-copy/[0.04]">
                    {item.year}
                  </div>

                  <p className="font-mono text-[10px] tracking-[0.3em] text-accent/40">
                    {item.chapter}
                    <span className="ml-3 text-[9px] tracking-wider text-copy/10">
                      {index + 1}/{sejarah.length}
                    </span>
                  </p>

                  <h3 className="relative mt-2 max-w-xl font-display text-[clamp(1.35rem,2.5vw,2rem)] font-bold leading-[1.15] tracking-[-0.5px] text-copy">
                    {item.title}
                  </h3>

                  <div className="mt-5 h-px w-10 bg-accent/30" />

                  <p className="relative mt-5 max-w-2xl font-body text-sm leading-[1.85] text-muted">
                    {item.body}
                  </p>

                  <p className="relative mt-5 font-mono text-[10px] tracking-wide text-accent/30">
                    {item.footnote}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative mt-24 border-t border-copy/5 pt-12 text-center md:mt-32"
          >
            <p className="font-display text-xl italic leading-relaxed text-copy/40 md:text-2xl">
              &ldquo;Dari Soreang, untuk Indonesia.&rdquo;
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.3em] text-accent/30">
              #YADIKA Berdaya &middot; Berkarakter &middot; Berprestasi
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />
    </section>
  )
}
