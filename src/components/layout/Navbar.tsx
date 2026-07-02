import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from '../ui/icons/ArrowUpRight'
import logoSrc from '../../assets/image.png'

const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Profil', to: '/profil' },
  { label: 'Jurusan', to: '/jurusan' },
  { label: 'Fasilitas', to: '/fasilitas' },
  { label: 'Berita', to: '/berita' },
]

export function Navbar() {
  return (
    <nav className="fixed top-4 z-50 flex w-full items-center justify-between px-6 lg:px-12">
      <NavLink
        to="/"
        className="glass-nav flex items-center justify-center rounded px-2 py-1"
        aria-label="SMK YADIKA SOREANG"
      >
        <img src={logoSrc} alt="SMK YADIKA SOREANG" className="h-8 w-auto" />
      </NavLink>

      <div className="glass-nav hidden items-center px-0.5 md:flex">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `relative px-3 py-2 font-body text-sm font-medium transition-colors ${
                isActive ? 'text-accent' : 'text-copy/80'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-accent" />
                )}
                {link.label}
              </>
            )}
          </NavLink>
        ))}
        <a
          href="#daftar"
          className="mr-0.5 flex items-center gap-1.5 bg-accent px-4 py-2 font-body text-sm font-semibold text-base"
        >
          Daftar Sekarang
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="hidden h-10 w-10 md:block" aria-hidden="true" />
    </nav>
  )
}
