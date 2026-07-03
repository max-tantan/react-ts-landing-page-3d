import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from '../ui/icons/ArrowUpRight'
import logoSrc from '../../assets/image.png'

const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Profil', to: '/profil' },
  { label: 'Jurusan', to: '/jurusan' },
  { label: 'Fasilitas', to: '/fasilitas' },
  { label: 'Berita', to: '/berita' },
  { label: 'PPDB', to: '/ppdb' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-4 z-50 flex w-full items-center justify-between px-6 lg:px-12">
      <NavLink
        to="/"
        className="glass-nav flex items-center justify-center rounded px-2 py-1"
        aria-label="SMK YADIKA SOREANG"
      >
        <img src={logoSrc} alt="SMK YADIKA SOREANG" className="h-8 w-auto" />
      </NavLink>

      {/* Desktop nav */}
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
        <NavLink
          to="/ppdb"
          className="mr-0.5 flex items-center gap-1.5 bg-accent px-4 py-2 font-body text-sm font-semibold text-base"
        >
          Daftar Sekarang
          <ArrowUpRight className="h-4 w-4" />
        </NavLink>
      </div>

      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center md:hidden"
        aria-label="Menu"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-copy">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="hidden h-10 w-10 md:block" aria-hidden="true" />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-base/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 flex h-full w-64 flex-col border-l border-copy/5 bg-surf md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span className="font-mono text-xs tracking-wider text-muted">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Tutup menu">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-copy">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 space-y-1 px-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded px-3 py-2.5 font-body text-sm font-medium transition-colors ${
                        isActive ? 'bg-accent/10 text-accent' : 'text-copy/80 hover:bg-copy/5 hover:text-copy'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="px-4 pb-8">
                <NavLink
                  to="/ppdb"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 bg-accent px-4 py-2.5 font-body text-sm font-semibold text-base"
                >
                  Daftar Sekarang
                  <ArrowUpRight className="h-4 w-4" />
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
