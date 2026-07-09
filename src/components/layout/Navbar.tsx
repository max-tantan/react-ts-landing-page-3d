import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from '../ui/icons/ArrowUpRight'
import { FiDownload } from 'react-icons/fi'
import { navLinks } from '../../data/navigation'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { ThemeSwitcher } from '../ui/ThemeSwitcher'
import logoSrc from '../../assets/image.png'

const stagger = {
  enter: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const slideUp = {
  initial: { y: 16, opacity: 0 },
  enter: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const } },
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <nav className="fixed top-4 z-50 flex w-full justify-center px-4">
      <div className="flex w-full max-w-6xl items-center justify-between rounded-[2rem] border border-copy/6 bg-surf/60 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl md:px-6">
        <NavLink
          to="/"
          className="flex shrink-0 items-center justify-center rounded-full px-1 py-1"
          aria-label="SMK YADIKA SOREANG"
        >
          <img src={logoSrc} alt="SMK YADIKA SOREANG" className="h-7 w-auto md:h-8" />
        </NavLink>

        {/* Desktop: nav links + controls */}
        <div className="hidden items-center gap-0 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.key}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative px-3 py-1.5 font-body text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isActive ? 'text-accent' : 'text-copy/70 hover:text-copy'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-px bg-accent" />
                  )}
                  {t('nav.' + link.key)}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop: controls + CTAs */}
        <div className="hidden items-center gap-1 md:flex">
          <div className="flex items-center gap-0.5 rounded-[5px] border border-copy/6 bg-surf/30 p-0.5">
            <ThemeSwitcher />
            <span className="h-4 w-px bg-copy/6" />
            <LanguageSwitcher />
          </div>

          <div className="mx-3 h-5 w-px bg-copy/6" />

          <button
            type="button"
            className="flex cursor-default items-center gap-1.5 rounded-full border border-accent/30 px-4 py-1.5 font-body text-sm font-medium text-accent/60 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/60 hover:text-accent/90"
          >
            <FiDownload className="h-3.5 w-3.5" />
            {t('action.brosur')}
          </button>

          <NavLink
            to="/ppdb"
            className="group flex items-center gap-1.5 rounded-full bg-accent px-5 py-1.5 font-body text-sm font-semibold text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.97]"
          >
            {t('action.daftarSekarang')}
            <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </NavLink>
        </div>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label={t('action.menu')}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-copy">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-base/70 backdrop-blur-3xl md:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] as const }}
              className="fixed inset-4 flex flex-col overflow-hidden rounded-[2rem] border border-copy/6 bg-surf/90 backdrop-blur-3xl md:hidden"
            >
              <div className="flex items-center justify-between px-6 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{t('action.menu')}</span>
                <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center" aria-label={t('action.tutupMenu')}>
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-copy">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <motion.div
                variants={stagger}
                initial="initial"
                animate="enter"
                className="flex flex-1 flex-col justify-center gap-2 px-6"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.key} variants={slideUp}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block py-3 font-display text-4xl font-bold tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          isActive ? 'text-accent' : 'text-copy/80 hover:text-copy'
                        }`
                      }
                    >
                      {t('nav.' + link.key)}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
                className="flex flex-col gap-2 px-6 pb-8"
              >
                <div className="flex items-center gap-3">
                  <ThemeSwitcher />
                  <span className="h-4 w-px bg-copy/6" />
                  <LanguageSwitcher />
                </div>

                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-accent/30 px-4 py-3 font-body text-sm font-medium text-accent/80 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  >
                    <FiDownload className="h-4 w-4" />
                    {t('action.brosur')}
                  </button>
                  <NavLink
                    to="/ppdb"
                    onClick={() => setOpen(false)}
                    className="group flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-3 font-body text-sm font-semibold text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                  >
                    {t('action.daftarSekarang')}
                    <ArrowUpRight className="h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </NavLink>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
