import { motion } from 'framer-motion'
import { BlurText } from './BlurText'
import { FadingVideo } from './FadingVideo'
import { Navbar } from './Navbar'
import { ArrowUpRight } from './icons/ArrowUpRight'
import { Play } from './icons/Play'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'

const motionInitial = {
  filter: 'blur(10px)',
  opacity: 0,
  y: 20,
}

const partners = ['BNSP', 'Industri', 'Kompetensi', 'Inovasi', 'Kolaborasi']

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-7 w-7 text-white"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-7 w-7 text-white"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  )
}

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen flex-col bg-black"
    >
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top"
        style={{ width: '120%', height: '120%' }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24">
          <motion.div
            initial={motionInitial}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            className="liquid-glass flex items-center gap-2 rounded-full"
          >
            <span className="rounded bg-white px-3 py-1 font-body text-xs font-semibold text-black">
              Baru
            </span>
            <span className="pr-3 font-body text-sm text-white/90">
              Penerimaan Peserta Didik Baru 2026/2027
            </span>
          </motion.div>

          <BlurText
            text="Membangun Generasi Siap Kerja dan Siap Dunia"
            className="mt-6 max-w-2xl justify-center font-heading text-6xl leading-[0.8] tracking-[-4px] text-white italic md:text-7xl lg:text-[5.5rem]"
          />

          <motion.p
            initial={motionInitial}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.8 }}
            className="mt-4 max-w-2xl text-center font-body text-sm font-light leading-tight text-white md:text-base"
          >
            SMK YADIKA SOREANG menghadirkan pendidikan kejuruan berkualitas
            dengan program unggulan, fasilitas modern, dan kemitraan industri
            yang membekali siswa dengan kompetensi siap kerja di era digital.
          </motion.p>

          <motion.div
            initial={motionInitial}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 1.1 }}
            className="mt-6 flex items-center gap-6"
          >
            <a
              href="#daftar"
              className="liquid-glass-strong flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-white"
            >
              Daftar Sekarang
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="#profil"
              className="flex items-center gap-2 font-body text-sm font-medium text-white"
            >
              <Play className="h-4 w-4" />
              Jelajahi Sekolah
            </a>
          </motion.div>

          <motion.div
            initial={motionInitial}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 1.3 }}
            className="mt-8 flex flex-wrap items-stretch justify-center gap-4"
          >
            <div className="liquid-glass w-[220px] rounded-[1.25rem] p-5">
              <ClockIcon />
              <p className="mt-4 font-heading text-4xl leading-none tracking-[-1px] text-white italic">
                1200+
              </p>
              <p className="mt-2 font-body text-xs font-light text-white">
                Siswa Aktif
              </p>
            </div>
            <div className="liquid-glass w-[220px] rounded-[1.25rem] p-5">
              <GlobeIcon />
              <p className="mt-4 font-heading text-4xl leading-none tracking-[-1px] text-white italic">
                15+
              </p>
              <p className="mt-2 font-body text-xs font-light text-white">
                Tahun Berdiri
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={motionInitial}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 1.4 }}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <span className="liquid-glass rounded-full px-3.5 py-1 font-body text-xs font-medium text-white">
            Bermitra dengan industri dan lembaga sertifikasi
          </span>
          <p className="font-heading text-2xl tracking-tight text-white italic md:text-3xl">
            {partners.join(' · ')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
