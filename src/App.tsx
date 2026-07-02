import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, ScrollToTop } from './components'
import { Beranda } from './pages/Beranda'
import { Profil } from './pages/Profil'
import { Jurusan } from './pages/Jurusan'
import { JurusanDetail } from './pages/JurusanDetail'
import { Fasilitas } from './pages/Fasilitas'
import { Berita } from './pages/Berita'
import { BeritaDetail } from './pages/BeritaDetail'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/jurusan" element={<Jurusan />} />
          <Route path="/jurusan/:code" element={<JurusanDetail />} />
          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:slug" element={<BeritaDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
