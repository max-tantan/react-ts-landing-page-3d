import { useTheme } from '../../context/ThemeContext'

export function ThemeSwitcher() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className={`flex items-center justify-center rounded-[3px] px-2 py-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.93] ${
        theme === 'light'
          ? 'bg-accent text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_16px_-4px_#0284C7]'
          : 'text-copy/70 hover:text-copy'
      }`}
      aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'light' ? (
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="h-4 w-4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.4 10.75a7.5 7.5 0 0 1-8.15-8.15 7.5 7.5 0 1 0 8.15 8.15Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="h-4 w-4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="10" cy="10" r="3.5" />
          <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4.1 4.1l1.4 1.4M14.5 14.5l1.4 1.4M4.1 15.9l1.4-1.4M14.5 5.5l1.4-1.4" />
        </svg>
      )}
    </button>
  )
}
