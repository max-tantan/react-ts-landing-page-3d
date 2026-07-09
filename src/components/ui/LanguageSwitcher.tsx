import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex items-center rounded-md border border-copy/6 bg-surf/40 p-0.5 backdrop-blur-sm">
      {languages.map((lang) => {
        const active = i18n.language === lang.code
        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`rounded-[3px] px-2.5 py-1 font-body text-[11px] font-medium uppercase tracking-wider transition-all ${
              active
                ? 'bg-accent text-base shadow-[0_0_12px_-4px_#0284C7]'
                : 'text-muted/60 hover:text-copy/80'
            }`}
          >
            {lang.label}
          </button>
        )
      })}
    </div>
  )
}
