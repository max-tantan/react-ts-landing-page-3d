export type NavLink = {
  label: string
  key: string
  to: string
}

export const navLinks: NavLink[] = [
  { label: 'Beranda', key: 'beranda', to: '/' },
  { label: 'Profil', key: 'profil', to: '/profil' },
  { label: 'Jurusan', key: 'jurusan', to: '/jurusan' },
  { label: 'Fasilitas', key: 'fasilitas', to: '/fasilitas' },
  { label: 'Berita', key: 'berita', to: '/berita' },
  { label: 'PPDB', key: 'ppdb', to: '/ppdb' },
]
