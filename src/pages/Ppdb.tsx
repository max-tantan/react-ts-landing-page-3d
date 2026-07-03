import { useState, type FormEvent, type ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CornerBrackets, SectionDivider, BottomBrackets, ArrowUpRight, SpecimenLabel } from '../components'
import { GlareHover } from '../components'
import { fadeUp } from '../hooks/useFadeUp'
import type { Pendaftar } from '../types'

const programs = [
  { code: 'PPLG', name: 'Pengembangan Perangkat Lunak dan Gim' },
  { code: 'HTL', name: 'Perhotelan' },
  { code: 'AK', name: 'Akuntansi' },
]

const requirements = [
  'Surat Keterangan Lulus (SKL) / Ijazah SMP/MTs sederajat',
  'Fotokopi Kartu Keluarga (KK) 2 lembar',
  'Akta Kelahiran (fotokopi)',
  'Pas foto 3x4 berlatar merah — 2 lembar',
  'NISN (Nomor Induk Siswa Nasional)',
  'Rapor SMP/MTs semester 1–5 (fotokopi legalisir)',
  'Sertifikat prestasi (jika ada)',
]

const flows = [
  { step: '01', title: 'Pendaftaran Online', desc: 'Isi formulir pendaftaran melalui halaman ini. Pastikan data yang dimasukkan benar dan lengkap.' },
  { step: '02', title: 'Verifikasi Berkas', desc: 'Tim PPDB akan memeriksa kelengkapan dan keabsahan berkas yang diunggah.' },
  { step: '03', title: 'Tes Seleksi', desc: 'Ikuti tes akademik dan wawancara yang akan dijadwalkan oleh pihak sekolah.' },
  { step: '04', title: 'Pengumuman', desc: 'Hasil seleksi akan diumumkan melalui website dan papan pengumuman sekolah.' },
  { step: '05', title: 'Daftar Ulang', desc: 'Calon siswa yang diterima wajib melakukan daftar ulang dengan menyerahkan berkas asli.' },
]

const jadwal = [
  { gelombang: 'Gelombang 1', pendaftaran: '1 Jan – 31 Mar 2026', tes: '10–12 Apr 2026', pengumuman: '20 Apr 2026' },
  { gelombang: 'Gelombang 2', pendaftaran: '1 Apr – 30 Jun 2026', tes: '12–14 Jul 2026', pengumuman: '22 Jul 2026' },
  { gelombang: 'Gelombang 3', pendaftaran: '1 Jul – 31 Agu 2026', tes: '6–8 Sep 2026', pengumuman: '16 Sep 2026' },
]

const emptyForm = {
  nama: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '' as '' | 'L' | 'P',
  alamat: '',
  noHp: '',
  email: '',
  asalSekolah: '',
  nisn: '',
  tahunLulus: '',
  jurusan1: '',
  jurusan2: '',
}

export function Ppdb() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof emptyForm, string>>>({})
  const [submitted, setSubmitted] = useState<Pendaftar | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function validate() {
    const errs: Partial<Record<keyof typeof emptyForm, string>> = {}
    if (!form.nama.trim()) errs.nama = 'Nama lengkap wajib diisi'
    if (!form.tempatLahir.trim()) errs.tempatLahir = 'Tempat lahir wajib diisi'
    if (!form.tanggalLahir) errs.tanggalLahir = 'Tanggal lahir wajib diisi'
    if (!form.jenisKelamin) errs.jenisKelamin = 'Pilih jenis kelamin'
    if (!form.alamat.trim()) errs.alamat = 'Alamat wajib diisi'
    if (!form.noHp.trim()) errs.noHp = 'Nomor HP/WA wajib diisi'
    if (!form.email.trim()) errs.email = 'Email wajib diisi'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Format email tidak valid'
    if (!form.asalSekolah.trim()) errs.asalSekolah = 'Asal sekolah wajib diisi'
    if (!form.nisn.trim()) errs.nisn = 'NISN wajib diisi'
    else if (!/^\d{10}$/.test(form.nisn)) errs.nisn = 'NISN harus 10 digit angka'
    if (!form.tahunLulus) errs.tahunLulus = 'Pilih tahun lulus'
    if (!form.jurusan1) errs.jurusan1 = 'Pilih jurusan utama'
    return errs
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setSubmitting(true)

    const pendaftar: Pendaftar = {
      id: `PPDB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      nama: form.nama.trim(),
      tempatLahir: form.tempatLahir.trim(),
      tanggalLahir: form.tanggalLahir,
      jenisKelamin: form.jenisKelamin as 'L' | 'P',
      alamat: form.alamat.trim(),
      noHp: form.noHp.trim(),
      email: form.email.trim(),
      asalSekolah: form.asalSekolah.trim(),
      nisn: form.nisn.trim(),
      tahunLulus: form.tahunLulus,
      jurusan1: form.jurusan1,
      jurusan2: form.jurusan2,
      createdAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('ppdb_pendaftar') || '[]')
    existing.push(pendaftar)
    localStorage.setItem('ppdb_pendaftar', JSON.stringify(existing))

    setTimeout(() => {
      setSubmitted(pendaftar)
      setSubmitting(false)
      setForm(emptyForm)
    }, 800)
  }

  function scrollToForm() {
    document.getElementById('form-pendaftaran')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-base pt-28">
        <div className="px-6 pb-16 md:px-12 lg:px-16">
          <CornerBrackets className="relative mb-16 h-6" />

          <header>
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="action">
                PPDB {new Date().getFullYear()}
              </SpecimenLabel>
            </motion.p>
            <motion.h1
              {...fadeUp(0.2)}
              className="mt-2 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.9] tracking-[-2px] text-copy"
            >
              Penerimaan Peserta Didik Baru
            </motion.h1>
            <motion.p
              {...fadeUp(0.3)}
              className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-muted"
            >
              Bergabunglah dengan SMK YADIKA SOREANG — sekolah kejuruan
              siap kerja yang telah melahirkan lulusan kompeten di bidang
              teknologi, perhotelan, dan akuntansi.
            </motion.p>
            <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-accent-hover"
              >
                Daftar Sekarang
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </motion.div>
          </header>
        </div>

        <SectionDivider />
      </section>

      {/* ─── Persyaratan ─── */}
      <section className="bg-base">
        <div className="px-6 pt-20 pb-16 md:px-12 lg:px-16">
          <header>
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="data">
                Persyaratan
              </SpecimenLabel>
            </motion.p>
            <motion.h2
              {...fadeUp(0.2)}
              className="mt-2 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-[-2px] text-copy"
            >
              Apa saja yang
              <br />
              perlu disiapkan?
            </motion.h2>
          </header>

          <motion.div
            {...fadeUp(0.3)}
            className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {requirements.map((req) => (
              <div
                key={req}
                className="flex items-start gap-3 border border-copy/5 bg-surf px-4 py-3"
              >
                <span className="mt-0.5 block h-2 w-2 shrink-0 rounded-full bg-accent/60" />
                <span className="font-body text-sm leading-relaxed text-muted">
                  {req}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Alur Pendaftaran ─── */}
      <section className="bg-base">
        <div className="px-6 pt-20 pb-16 md:px-12 lg:px-16">
          <header>
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="narrative">
                Alur Pendaftaran
              </SpecimenLabel>
            </motion.p>
            <motion.h2
              {...fadeUp(0.2)}
              className="mt-2 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-[-2px] text-copy"
            >
              Bagaimana cara
              <br />
              mendaftar?
            </motion.h2>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-5">
            {flows.map((item, i) => (
              <GlareHover
                key={item.step}
                width="100%"
                background="#2C2721"
                borderColor="rgba(245, 237, 224, 0.06)"
                borderRadius="0"
                glareColor="#0284C7"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={250}
                transitionDuration={600}
                style={{ display: 'block', height: 'auto' }}
              >
                <motion.div
                  {...fadeUp(0.2 + i * 0.08)}
                  className="flex flex-col px-5 py-5"
                >
                  <span className="font-mono text-[11px] tracking-wider text-accent/60">
                    {item.step}
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold leading-tight tracking-[-0.3px] text-copy">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-xs leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </motion.div>
              </GlareHover>
            ))}
          </div>
        </div>

        <SectionDivider />
      </section>

      {/* ─── Jadwal ─── */}
      <section className="bg-base">
        <div className="px-6 pt-20 pb-16 md:px-12 lg:px-16">
          <header>
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="data">
                Jadwal Seleksi
              </SpecimenLabel>
            </motion.p>
            <motion.h2
              {...fadeUp(0.2)}
              className="mt-2 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-[-2px] text-copy"
            >
              Kapan saja
              <br />
              waktunya?
            </motion.h2>
          </header>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse font-body text-sm">
              <thead>
                <tr className="border-b border-copy/10">
                  <th className="px-4 py-3 text-left font-mono text-[11px] tracking-wider text-accent/70">Gelombang</th>
                  <th className="px-4 py-3 text-left font-mono text-[11px] tracking-wider text-accent/70">Pendaftaran</th>
                  <th className="px-4 py-3 text-left font-mono text-[11px] tracking-wider text-accent/70">Tes Seleksi</th>
                  <th className="px-4 py-3 text-left font-mono text-[11px] tracking-wider text-accent/70">Pengumuman</th>
                </tr>
              </thead>
              <tbody>
                {jadwal.map((row) => (
                  <tr key={row.gelombang} className="border-b border-copy/5 transition-colors hover:bg-surf/50">
                    <td className="px-4 py-3 font-medium text-copy">{row.gelombang}</td>
                    <td className="px-4 py-3 text-muted">{row.pendaftaran}</td>
                    <td className="px-4 py-3 text-muted">{row.tes}</td>
                    <td className="px-4 py-3 text-muted">{row.pengumuman}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Program Keahlian ─── */}
      <section className="bg-base">
        <div className="px-6 pt-20 pb-16 md:px-12 lg:px-16">
          <header>
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="data">
                Program Keahlian
              </SpecimenLabel>
            </motion.p>
            <motion.h2
              {...fadeUp(0.2)}
              className="mt-2 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-[-2px] text-copy"
            >
              Pilih jurusan
              <br />
              impianmu
            </motion.h2>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {programs.map((p, i) => (
              <GlareHover
                key={p.code}
                width="100%"
                background="#2C2721"
                borderColor="rgba(245, 237, 224, 0.06)"
                borderRadius="0"
                glareColor="#0284C7"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={250}
                transitionDuration={600}
                style={{ display: 'block', height: 'auto' }}
              >
                <motion.div
                  {...fadeUp(0.2 + i * 0.1)}
                  className="flex flex-col px-5 py-5"
                >
                  <span className="tool-tag self-start">{p.code}</span>
                  <h3 className="mt-3 font-display text-lg font-bold leading-tight tracking-[-0.3px] text-copy">
                    {p.name}
                  </h3>
                </motion.div>
              </GlareHover>
            ))}
          </div>

          <motion.div {...fadeUp(0.5)} className="mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-accent-hover"
            >
              Daftar Sekarang
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        <SectionDivider />
      </section>

      {/* ─── Form Pendaftaran ─── */}
      <section id="form-pendaftaran" className="bg-base">
        <div className="relative px-6 pt-20 pb-20 md:px-12 lg:px-16">
          <header>
            <motion.p {...fadeUp(0.1)}>
              <SpecimenLabel variant="action">
                Formulir Pendaftaran
              </SpecimenLabel>
            </motion.p>
            <motion.h2
              {...fadeUp(0.2)}
              className="mt-2 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-[-2px] text-copy"
            >
              Isi data dirimu
              <br />
              dengan benar
            </motion.h2>
          </header>

          <motion.form
            {...fadeUp(0.3)}
            onSubmit={handleSubmit}
            className="mt-10 max-w-3xl space-y-6"
            noValidate
          >
            {/* Nama */}
            <div>
              <label htmlFor="nama" className="block font-mono text-[11px] tracking-wider text-accent/70">
                Nama Lengkap <span className="text-error">*</span>
              </label>
              <input
                id="nama"
                name="nama"
                type="text"
                value={form.nama}
                onChange={handleChange}
                className={`mt-1.5 w-full border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors placeholder:text-muted/40 focus:border-accent/60 ${
                  errors.nama ? 'border-error/60' : 'border-copy/10'
                }`}
                placeholder="Nama lengkap sesuai ijazah"
              />
              {errors.nama && <p className="mt-1 font-mono text-[11px] text-error">{errors.nama}</p>}
            </div>

            {/* Tempat & Tgl Lahir */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="tempatLahir" className="block font-mono text-[11px] tracking-wider text-accent/70">
                  Tempat Lahir <span className="text-error">*</span>
                </label>
                <input
                  id="tempatLahir"
                  name="tempatLahir"
                  type="text"
                  value={form.tempatLahir}
                  onChange={handleChange}
                  className={`mt-1.5 w-full border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors placeholder:text-muted/40 focus:border-accent/60 ${
                    errors.tempatLahir ? 'border-error/60' : 'border-copy/10'
                  }`}
                  placeholder="Contoh: Bandung"
                />
                {errors.tempatLahir && <p className="mt-1 font-mono text-[11px] text-error">{errors.tempatLahir}</p>}
              </div>
              <div>
                <label htmlFor="tanggalLahir" className="block font-mono text-[11px] tracking-wider text-accent/70">
                  Tanggal Lahir <span className="text-error">*</span>
                </label>
                <input
                  id="tanggalLahir"
                  name="tanggalLahir"
                  type="date"
                  value={form.tanggalLahir}
                  onChange={handleChange}
                  className={`mt-1.5 w-full border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors focus:border-accent/60 ${
                    errors.tanggalLahir ? 'border-error/60' : 'border-copy/10'
                  }`}
                />
                {errors.tanggalLahir && <p className="mt-1 font-mono text-[11px] text-error">{errors.tanggalLahir}</p>}
              </div>
            </div>

            {/* JK */}
            <div>
              <span className="block font-mono text-[11px] tracking-wider text-accent/70">
                Jenis Kelamin <span className="text-error">*</span>
              </span>
              <div className="mt-2 flex gap-6">
                {(['L', 'P'] as const).map((val) => (
                  <label key={val} className="flex items-center gap-2 font-body text-sm text-muted">
                    <input
                      type="radio"
                      name="jenisKelamin"
                      value={val}
                      checked={form.jenisKelamin === val}
                      onChange={handleChange}
                      className="h-4 w-4 accent-accent"
                    />
                    {val === 'L' ? 'Laki-laki' : 'Perempuan'}
                  </label>
                ))}
              </div>
              {errors.jenisKelamin && <p className="mt-1 font-mono text-[11px] text-error">{errors.jenisKelamin}</p>}
            </div>

            {/* Alamat */}
            <div>
              <label htmlFor="alamat" className="block font-mono text-[11px] tracking-wider text-accent/70">
                Alamat <span className="text-error">*</span>
              </label>
              <textarea
                id="alamat"
                name="alamat"
                rows={3}
                value={form.alamat}
                onChange={handleChange}
                className={`mt-1.5 w-full resize-none border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors placeholder:text-muted/40 focus:border-accent/60 ${
                  errors.alamat ? 'border-error/60' : 'border-copy/10'
                }`}
                placeholder="Alamat lengkap sesuai KTP"
              />
              {errors.alamat && <p className="mt-1 font-mono text-[11px] text-error">{errors.alamat}</p>}
            </div>

            {/* No HP & Email */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="noHp" className="block font-mono text-[11px] tracking-wider text-accent/70">
                  No. HP/WA <span className="text-error">*</span>
                </label>
                <input
                  id="noHp"
                  name="noHp"
                  type="tel"
                  value={form.noHp}
                  onChange={handleChange}
                  className={`mt-1.5 w-full border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors placeholder:text-muted/40 focus:border-accent/60 ${
                    errors.noHp ? 'border-error/60' : 'border-copy/10'
                  }`}
                  placeholder="08xxxxxxxxxx"
                />
                {errors.noHp && <p className="mt-1 font-mono text-[11px] text-error">{errors.noHp}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block font-mono text-[11px] tracking-wider text-accent/70">
                  Email <span className="text-error">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`mt-1.5 w-full border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors placeholder:text-muted/40 focus:border-accent/60 ${
                    errors.email ? 'border-error/60' : 'border-copy/10'
                  }`}
                  placeholder="contoh@email.com"
                />
                {errors.email && <p className="mt-1 font-mono text-[11px] text-error">{errors.email}</p>}
              </div>
            </div>

            {/* Asal Sekolah & NISN */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="asalSekolah" className="block font-mono text-[11px] tracking-wider text-accent/70">
                  Asal Sekolah <span className="text-error">*</span>
                </label>
                <input
                  id="asalSekolah"
                  name="asalSekolah"
                  type="text"
                  value={form.asalSekolah}
                  onChange={handleChange}
                  className={`mt-1.5 w-full border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors placeholder:text-muted/40 focus:border-accent/60 ${
                    errors.asalSekolah ? 'border-error/60' : 'border-copy/10'
                  }`}
                  placeholder="Nama SMP/MTs asal"
                />
                {errors.asalSekolah && <p className="mt-1 font-mono text-[11px] text-error">{errors.asalSekolah}</p>}
              </div>
              <div>
                <label htmlFor="nisn" className="block font-mono text-[11px] tracking-wider text-accent/70">
                  NISN <span className="text-error">*</span>
                </label>
                <input
                  id="nisn"
                  name="nisn"
                  type="text"
                  maxLength={10}
                  value={form.nisn}
                  onChange={handleChange}
                  className={`mt-1.5 w-full border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors placeholder:text-muted/40 focus:border-accent/60 ${
                    errors.nisn ? 'border-error/60' : 'border-copy/10'
                  }`}
                  placeholder="10 digit NISN"
                />
                {errors.nisn && <p className="mt-1 font-mono text-[11px] text-error">{errors.nisn}</p>}
              </div>
            </div>

            {/* Tahun Lulus */}
            <div>
              <label htmlFor="tahunLulus" className="block font-mono text-[11px] tracking-wider text-accent/70">
                Tahun Lulus <span className="text-error">*</span>
              </label>
              <select
                id="tahunLulus"
                name="tahunLulus"
                value={form.tahunLulus}
                onChange={handleChange}
                className={`mt-1.5 w-full border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors focus:border-accent/60 ${
                  errors.tahunLulus ? 'border-error/60' : 'border-copy/10'
                }`}
              >
                <option value="">— Pilih Tahun Lulus —</option>
                {[2024, 2025, 2026].map((th) => (
                  <option key={th} value={th}>{th}</option>
                ))}
              </select>
              {errors.tahunLulus && <p className="mt-1 font-mono text-[11px] text-error">{errors.tahunLulus}</p>}
            </div>

            {/* Pilihan Jurusan */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="jurusan1" className="block font-mono text-[11px] tracking-wider text-accent/70">
                  Jurusan 1 (Pilihan Utama) <span className="text-error">*</span>
                </label>
                <select
                  id="jurusan1"
                  name="jurusan1"
                  value={form.jurusan1}
                  onChange={handleChange}
                  className={`mt-1.5 w-full border bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors focus:border-accent/60 ${
                    errors.jurusan1 ? 'border-error/60' : 'border-copy/10'
                  }`}
                >
                  <option value="">— Pilih Jurusan —</option>
                  {programs.map((p) => (
                    <option key={p.code} value={p.code}>{p.code} — {p.name}</option>
                  ))}
                </select>
                {errors.jurusan1 && <p className="mt-1 font-mono text-[11px] text-error">{errors.jurusan1}</p>}
              </div>
              <div>
                <label htmlFor="jurusan2" className="block font-mono text-[11px] tracking-wider text-accent/70">
                  Jurusan 2 (Pilihan Cadangan)
                </label>
                <select
                  id="jurusan2"
                  name="jurusan2"
                  value={form.jurusan2}
                  onChange={handleChange}
                  className="mt-1.5 w-full border border-copy/10 bg-surf px-4 py-2.5 font-body text-sm text-copy outline-none transition-colors focus:border-accent/60"
                >
                  <option value="">— Tidak Ada —</option>
                  {programs.filter((p) => p.code !== form.jurusan1).map((p) => (
                    <option key={p.code} value={p.code}>{p.code} — {p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t border-copy/5 pt-6">
              <p className="mb-4 font-mono text-[11px] tracking-wider text-muted/60">
                <span className="text-error">*</span> = Wajib diisi
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-accent px-8 py-3 font-body text-sm font-semibold text-base transition-all hover:bg-accent-hover disabled:opacity-50"
              >
                {submitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.form>

          <BottomBrackets className="absolute bottom-0 left-0 right-0" />
        </div>
      </section>

      {/* ─── Success Modal ─── */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-base/70 px-4 backdrop-blur-sm"
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-lg border border-copy/10 bg-surf p-8"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-accent">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-copy">
                  Pendaftaran Berhasil!
                </h3>
                <p className="mt-2 font-body text-sm text-muted">
                  Data kamu sudah kami terima. Simpan nomor pendaftaran berikut:
                </p>
                <div className="mt-4 w-full border border-accent/20 bg-accent/5 px-4 py-3">
                  <p className="font-mono text-lg font-bold tracking-wider text-accent">
                    {submitted.id}
                  </p>
                </div>
                <p className="mt-4 font-body text-xs leading-relaxed text-muted/60">
                  Nomor ini digunakan untuk cek status pendaftaran.
                  Kami akan menghubungimu melalui email/WA untuk jadwal tes seleksi.
                </p>
                <button
                  onClick={() => setSubmitted(null)}
                  className="mt-6 inline-flex items-center gap-2 bg-accent px-6 py-2.5 font-body text-sm font-semibold text-base transition-all hover:bg-accent-hover"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
