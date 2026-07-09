import beritaData from './berita.json'
import prestasiData from './prestasi.json'
import pplgData from './pplg.json'
import htlData from './htl.json'
import akData from './ak.json'
import type { Artikel } from '../types'
import type { JurusanDetail } from '../types'

type PrestasiEntry = {
  id: number
  nama: string
  peran: string
  program: string
  prestasi: string
  deskripsi: string
  image: string
}

const articles = beritaData as Artikel[]
const prestasis = prestasiData as PrestasiEntry[]
const jurusanMap: Record<string, JurusanDetail> = {
  pplg: pplgData as JurusanDetail,
  htl: htlData as JurusanDetail,
  ak: akData as JurusanDetail,
}

export function getAllArticles(): Artikel[] {
  return articles
}

export function getArticleBySlug(slug: string): Artikel | undefined {
  return articles.find((item) => item.slug === slug)
}

export function getRelatedArticles(slug: string, limit = 3): Artikel[] {
  return articles.filter((item) => item.slug !== slug).slice(0, limit)
}

export function getPrestasiAll(): PrestasiEntry[] {
  return prestasis
}

export function getPrestasiByCategory(category: 'siswa' | 'guru'): PrestasiEntry[] {
  if (category === 'siswa') {
    return prestasis.filter((item) => item.peran.startsWith('Siswa'))
  }
  return prestasis.filter((item) => item.peran === 'Guru')
}

export function getJurusanDetail(code: string): JurusanDetail | undefined {
  return jurusanMap[code.toLowerCase()]
}
