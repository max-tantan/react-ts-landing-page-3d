export type { ProgramCard, JurusanDetail } from './program'

export type Pendaftar = {
  id: string
  nama: string
  tempatLahir: string
  tanggalLahir: string
  jenisKelamin: 'L' | 'P'
  alamat: string
  noHp: string
  email: string
  asalSekolah: string
  nisn: string
  tahunLulus: string
  jurusan1: string
  jurusan2: string
  createdAt: string
}

export type ArticleContent = {
  subtitle: string
  text: string
}

export type Artikel = {
  id: number
  slug: string
  date: string
  category: string
  title: string
  excerpt: string
  author: string
  image: string
  content: ArticleContent[]
}
