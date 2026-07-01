import { ArrowUpRight } from './icons/ArrowUpRight'

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Profil', href: '#profil' },
  { label: 'Jurusan', href: '#jurusan' },
  { label: 'Fasilitas', href: '#fasilitas' },
  { label: 'Berita', href: '#berita' },
]

export function Navbar() {
  return (
    <nav className="fixed top-4 z-50 flex w-full items-center justify-between px-8 lg:px-16">
      <a
        href="#beranda"
        className="liquid-glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
        aria-label="SMK YADIKA SOREANG"
      >
        <span className="font-heading text-xl italic text-white">y</span>
      </a>

      <div className="liquid-glass hidden items-center px-1.5 py-1.5 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="px-3 py-2 font-body text-sm font-medium text-white/90"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#daftar"
          className="flex items-center gap-1.5 rounded bg-white px-4 py-2 font-body text-sm font-medium whitespace-nowrap text-black"
        >
          Daftar Sekarang
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="hidden h-12 w-12 shrink-0 md:block" aria-hidden="true" />
    </nav>
  )
}
