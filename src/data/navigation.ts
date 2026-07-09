export type NavLink = {
  label: string
  to: string
}

export const navLinks: NavLink[] = [
  { label: 'Beranda', to: '/' },
  { label: 'Profil', to: '/profil' },
  { label: 'Jurusan', to: '/jurusan' },
  { label: 'Fasilitas', to: '/fasilitas' },
  { label: 'Berita', to: '/berita' },
  { label: 'PPDB', to: '/ppdb' },
]
