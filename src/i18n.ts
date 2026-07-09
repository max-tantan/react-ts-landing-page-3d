import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonId from './locales/id/common.json'
import commonEn from './locales/en/common.json'

i18n.use(initReactI18next).init({
  resources: {
    id: { common: commonId },
    en: { common: commonEn },
  },
  lng: 'id',
  fallbackLng: 'id',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
