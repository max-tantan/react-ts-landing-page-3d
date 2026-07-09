import { useTheme } from '../../context/ThemeContext'

export function ThemeSwitcher() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center rounded-[3px] px-2 py-1 transition-all hover:text-copy/80 text-muted/60"
      aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <circle cx="10" cy="10" r="4" />
          <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M17.39 10.74a7.5 7.5 0 0 1-8.13-8.13 7.5 7.5 0 1 0 8.13 8.13Z" />
        </svg>
      )}
    </button>
  )
}
