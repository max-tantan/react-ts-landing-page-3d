import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiVuedotjs } from 'react-icons/si'
import { Hero } from '../components/Hero'
import { CornerBrackets, SectionDivider } from '../components/Scaffold'
import { ArrowUpRight } from '../components/icons/ArrowUpRight'
import { LogoLoop } from '../components/LogoLoop'

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

const partnerLogos = [
  { node: <span className="text-copy/60"><SiReact /></span>, title: 'React', href: 'https://react.dev' },
  { node: <span className="text-copy/60"><SiNextdotjs /></span>, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <span className="text-copy/60"><SiTypescript /></span>, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <span className="text-copy/60"><SiTailwindcss /></span>, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <span className="text-copy/60"><SiNodedotjs /></span>, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <span className="text-copy/60"><SiVuedotjs /></span>, title: 'Vue.js', href: 'https://vuejs.org' },
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
              // Sambutan Kepala Sekolah
            </motion.p>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <motion.div
              {...fadeUp(0.2)}
              className="flex flex-col justify-center"
            >
              <p className="font-body text-sm leading-relaxed text-muted">
                Assalamu&rsquo;alaikum warahmatullahi wabarakatuh.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                Puji syukur ke hadirat Allah SWT atas limpahan rahmat dan
                karunia-Nya sehingga SMK YADIKA SOREANG dapat terus berkiprah
                dalam mencerdaskan kehidupan bangsa melalui pendidikan kejuruan
                yang berkualitas.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                Sebagai lembaga pendidikan vokasi, kami berkomitmen untuk
                mencetak lulusan yang tidak hanya kompeten di bidangnya, tetapi
                juga berkarakter, disiplin, dan siap menghadapi tantangan dunia
                kerja. Dengan dukungan tenaga pengajar profesional, kurikulum
                berbasis industri, serta fasilitas yang memadai, kami yakin
                dapat menjadi mitra terbaik bagi putra-putri Anda dalam
                meraih masa depan gemilang.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                Mari bergabung bersama SMK YADIKA SOREANG. Jadilah bagian dari
                generasi siap kerja dan siap dunia.
              </p>
              <div className="mt-6 border-l-2 border-accent/40 pl-4">
                <p className="font-display text-base font-bold text-copy">
                  Drs. H. Ahmad Fauzi, M.Pd.
                </p>
                <p className="font-mono text-[11px] tracking-wider text-accent/60">
                  KEPALA SMK YADIKA SOREANG
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.3)}
              className="relative overflow-hidden"
            >
              <img
                src="https://picsum.photos/seed/kepala-sekolah/600/700"
                alt="Kepala Sekolah SMK YADIKA SOREANG"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 border border-copy/5" />
            </motion.div>
          </div>
        </div>

        <SectionDivider />
      </section>

      <section className="border-t border-copy/5 py-12">
        <div className="px-6 md:px-12 lg:px-16">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent/40 text-center">
            Bermitra dengan teknologi industri terkini
          </p>
          <div className="mt-6">
            <LogoLoop
              logos={partnerLogos}
              speed={80}
              direction="left"
              logoHeight={56}
              gap={64}
              scaleOnHover
              fadeOut
              fadeOutColor="#161310"
              ariaLabel="Mitra industri"
            />
          </div>
        </div>
      </section>

      <section className="bg-base">
        <div className="px-6 pt-20 pb-16 md:px-12 lg:px-16">
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
