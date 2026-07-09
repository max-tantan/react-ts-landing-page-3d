import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex items-center rounded-[5px] border border-copy/6 bg-surf/30 p-0.5">
      {languages.map((lang) => {
        const active = i18n.language === lang.code
        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`rounded-[3px] px-2 py-1 font-body text-[11px] font-medium uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              active
                ? 'bg-accent text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_16px_-4px_#0284C7]'
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
