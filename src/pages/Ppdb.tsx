import { useState, type FormEvent, type ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CornerBrackets,
  SectionDivider,
  BottomBrackets,
  ArrowUpRight,
  SpecimenLabel,
} from '../components'
import { GlareHover } from '../components'
import { fadeUp } from '../hooks/useFadeUp'
import {
  viewReveal,
  staggerFormField,
  modalOverlay,
  modalCard,
} from '../hooks/animationPresets'
import { validatePPDBForm, createLocalStorageStore } from '../lib/ppdb'
import type { Pendaftar } from '../types'

const store = createLocalStorageStore()

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

type FormKey = keyof typeof emptyForm

function FieldShell({
  error,
  children,
}: {
  error?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`input-shell ${
        error ? 'input-shell-error' : ''
      } group-focus-within:input-shell-focus`}
    >
      <div className="input-core relative">{children}</div>
    </div>
  )
}

export function Ppdb() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<FormKey, string>>>({})
  const [submitted, setSubmitted] = useState<Pendaftar | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as FormKey]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function validate() {
    return validatePPDBForm(form)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setSubmitting(true)

    const id = `PPDB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
    const pendaftar: Pendaftar = {
      id,
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

    store.save(pendaftar)

    setTimeout(() => {
      setSubmitted(pendaftar)
      setSubmitting(false)
      setForm(emptyForm)
    }, 800)
  }

  function scrollToForm() {
    document.getElementById('form-pendaftaran')?.scrollIntoView({ behavior: 'smooth' })
  }

  const fieldIndex = (key: FormKey) => {
    const order: FormKey[] = [
      'nama', 'tempatLahir', 'tanggalLahir', 'jenisKelamin',
      'alamat', 'noHp', 'email', 'asalSekolah',
      'nisn', 'tahunLulus', 'jurusan1', 'jurusan2',
    ]
    return order.indexOf(key)
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
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98]"
              >
                Daftar Sekarang
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
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
              <SpecimenLabel variant="data">Persyaratan</SpecimenLabel>
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
              <SpecimenLabel variant="narrative">Alur Pendaftaran</SpecimenLabel>
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
              <SpecimenLabel variant="data">Jadwal Seleksi</SpecimenLabel>
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
              <SpecimenLabel variant="data">Program Keahlian</SpecimenLabel>
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
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-body text-sm font-semibold text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98]"
            >
              Daftar Sekarang
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </button>
          </motion.div>
        </div>

        <SectionDivider />
      </section>

      {/* ─── Form Pendaftaran — Editorial Split ─── */}
      <section id="form-pendaftaran" className="relative bg-base overflow-hidden">
        {/* Mesh gradient background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/4 -left-32 h-[600px] w-[600px] rounded-full opacity-[0.04]"
            style={{
              background:
                'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute -right-24 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-[0.03]"
            style={{
              background:
                'radial-gradient(circle, #818cf8 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative px-6 pt-20 pb-24 md:px-12 lg:px-16">
          <CornerBrackets className="relative mb-16 h-6" />

          <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
            {/* ── Left: Editorial Copy ── */}
            <div className="lg:w-5/12 lg:sticky lg:top-28 lg:self-start">
              <motion.div {...viewReveal}>
                <SpecimenLabel variant="action">Formulir Pendaftaran</SpecimenLabel>
              </motion.div>

              <motion.h2
                {...viewReveal}
                transition={{ ...viewReveal.transition, delay: 0.1 }}
                className="mt-4 max-w-xl font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.88] tracking-[-3px] text-copy"
              >
                Isi data dirimu
                <br />
                dengan benar
              </motion.h2>

              <motion.p
                {...viewReveal}
                transition={{ ...viewReveal.transition, delay: 0.2 }}
                className="mt-6 max-w-md font-body text-sm leading-relaxed text-muted"
              >
                Pastikan semua data yang kamu masukkan sudah benar. Data
                yang terdaftar tidak dapat diubah setelah pengiriman.
              </motion.p>

              {/* Program pills */}
              <motion.div
                {...viewReveal}
                transition={{ ...viewReveal.transition, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {programs.map((p) => (
                  <span
                    key={p.code}
                    className="tool-tag"
                  >
                    {p.code}
                  </span>
                ))}
              </motion.div>

              {/* Decorative measurement marks */}
              <motion.div
                {...viewReveal}
                transition={{ ...viewReveal.transition, delay: 0.4 }}
                className="mt-10 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-accent/20" />
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-accent/30">
                    {requirements.length} berkas diperlukan
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px w-12 bg-accent/20" />
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-accent/30">
                    {jadwal.length} gelombang aktif
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ── Right: Glass Form Card ── */}
            <motion.div
              {...viewReveal}
              transition={{ ...viewReveal.transition, delay: 0.15 }}
              className="lg:w-7/12"
            >
              <div className="glass-card rounded-[2rem] p-3 md:p-4">
                <div className="rounded-[calc(2rem-0.375rem)] bg-base/40 p-6 md:p-10">
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Nama */}
                    <motion.div {...staggerFormField(fieldIndex('nama'))}>
                      <label
                        htmlFor="nama"
                        className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                      >
                        Nama Lengkap <span className="text-error">*</span>
                      </label>
                      <FieldShell error={errors.nama}>
                        <input
                          id="nama"
                          name="nama"
                          type="text"
                          value={form.nama}
                          onChange={handleChange}

                          className="w-full bg-transparent font-body text-sm text-copy outline-none placeholder:text-muted/30"
                          placeholder="Nama lengkap sesuai ijazah"
                        />
                      </FieldShell>
                      {errors.nama && (
                        <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.nama}</p>
                      )}
                    </motion.div>

                    {/* Tempat & Tgl Lahir */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <motion.div {...staggerFormField(fieldIndex('tempatLahir'))}>
                        <label
                          htmlFor="tempatLahir"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                        >
                          Tempat Lahir <span className="text-error">*</span>
                        </label>
                        <FieldShell error={errors.tempatLahir}>
                          <input
                            id="tempatLahir"
                            name="tempatLahir"
                            type="text"
                            value={form.tempatLahir}
                            onChange={handleChange}
                            className="w-full bg-transparent font-body text-sm text-copy outline-none placeholder:text-muted/30"
                            placeholder="Contoh: Bandung"
                          />
                        </FieldShell>
                        {errors.tempatLahir && (
                          <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.tempatLahir}</p>
                        )}
                      </motion.div>
                      <motion.div {...staggerFormField(fieldIndex('tanggalLahir'))}>
                        <label
                          htmlFor="tanggalLahir"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                        >
                          Tanggal Lahir <span className="text-error">*</span>
                        </label>
                        <FieldShell error={errors.tanggalLahir}>
                          <input
                            id="tanggalLahir"
                            name="tanggalLahir"
                            type="date"
                            value={form.tanggalLahir}
                            onChange={handleChange}
                            className="w-full bg-transparent font-body text-sm text-copy outline-none [color-scheme:dark]"
                          />
                        </FieldShell>
                        {errors.tanggalLahir && (
                          <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.tanggalLahir}</p>
                        )}
                      </motion.div>
                    </div>

                    {/* Jenis Kelamin — Radio Pills */}
                    <motion.div {...staggerFormField(fieldIndex('jenisKelamin'))}>
                      <span className="mb-2 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60">
                        Jenis Kelamin <span className="text-error">*</span>
                      </span>
                      <div className="flex gap-3">
                        {(['L', 'P'] as const).map((val) => (
                          <label key={val} className="flex-1">
                            <input
                              type="radio"
                              name="jenisKelamin"
                              value={val}
                              checked={form.jenisKelamin === val}
                              onChange={handleChange}
                              className="peer sr-only"
                            />
                            <div
                              className={`radio-pill peer-checked:radio-pill-active peer-active:scale-[0.97] w-full ${
                                errors.jenisKelamin && !form.jenisKelamin
                                  ? 'border-error/30'
                                  : ''
                              }`}
                            >
                              <span className={`block h-2 w-2 rounded-full transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                form.jenisKelamin === val
                                  ? 'bg-base scale-110'
                                  : 'bg-muted/30'
                              }`} />
                              {val === 'L' ? 'Laki-laki' : 'Perempuan'}
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.jenisKelamin && (
                        <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.jenisKelamin}</p>
                      )}
                    </motion.div>

                    {/* Alamat */}
                    <motion.div {...staggerFormField(fieldIndex('alamat'))}>
                      <label
                        htmlFor="alamat"
                        className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                      >
                        Alamat <span className="text-error">*</span>
                      </label>
                      <FieldShell error={errors.alamat}>
                        <textarea
                          id="alamat"
                          name="alamat"
                          rows={3}
                          value={form.alamat}
                          onChange={handleChange}
                          className="w-full resize-none bg-transparent font-body text-sm text-copy outline-none placeholder:text-muted/30"
                          placeholder="Alamat lengkap sesuai KTP"
                        />
                      </FieldShell>
                      {errors.alamat && (
                        <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.alamat}</p>
                      )}
                    </motion.div>

                    {/* No HP & Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <motion.div {...staggerFormField(fieldIndex('noHp'))}>
                        <label
                          htmlFor="noHp"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                        >
                          No. HP/WA <span className="text-error">*</span>
                        </label>
                        <FieldShell error={errors.noHp}>
                          <input
                            id="noHp"
                            name="noHp"
                            type="tel"
                            value={form.noHp}
                            onChange={handleChange}
                            className="w-full bg-transparent font-body text-sm text-copy outline-none placeholder:text-muted/30"
                            placeholder="08xxxxxxxxxx"
                          />
                        </FieldShell>
                        {errors.noHp && (
                          <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.noHp}</p>
                        )}
                      </motion.div>
                      <motion.div {...staggerFormField(fieldIndex('email'))}>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                        >
                          Email <span className="text-error">*</span>
                        </label>
                        <FieldShell error={errors.email}>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-transparent font-body text-sm text-copy outline-none placeholder:text-muted/30"
                            placeholder="contoh@email.com"
                          />
                        </FieldShell>
                        {errors.email && (
                          <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.email}</p>
                        )}
                      </motion.div>
                    </div>

                    {/* Asal Sekolah & NISN */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <motion.div {...staggerFormField(fieldIndex('asalSekolah'))}>
                        <label
                          htmlFor="asalSekolah"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                        >
                          Asal Sekolah <span className="text-error">*</span>
                        </label>
                        <FieldShell error={errors.asalSekolah}>
                          <input
                            id="asalSekolah"
                            name="asalSekolah"
                            type="text"
                            value={form.asalSekolah}
                            onChange={handleChange}
                            className="w-full bg-transparent font-body text-sm text-copy outline-none placeholder:text-muted/30"
                            placeholder="Nama SMP/MTs asal"
                          />
                        </FieldShell>
                        {errors.asalSekolah && (
                          <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.asalSekolah}</p>
                        )}
                      </motion.div>
                      <motion.div {...staggerFormField(fieldIndex('nisn'))}>
                        <label
                          htmlFor="nisn"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                        >
                          NISN <span className="text-error">*</span>
                        </label>
                        <FieldShell error={errors.nisn}>
                          <input
                            id="nisn"
                            name="nisn"
                            type="text"
                            maxLength={10}
                            value={form.nisn}
                            onChange={handleChange}
                            className="w-full bg-transparent font-body text-sm text-copy outline-none placeholder:text-muted/30"
                            placeholder="10 digit NISN"
                          />
                        </FieldShell>
                        {errors.nisn && (
                          <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.nisn}</p>
                        )}
                      </motion.div>
                    </div>

                    {/* Tahun Lulus */}
                    <motion.div {...staggerFormField(fieldIndex('tahunLulus'))}>
                      <label
                        htmlFor="tahunLulus"
                        className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                      >
                        Tahun Lulus <span className="text-error">*</span>
                      </label>
                      <FieldShell error={errors.tahunLulus}>
                        <select
                          id="tahunLulus"
                          name="tahunLulus"
                          value={form.tahunLulus}
                          onChange={handleChange}
                          className="custom-select w-full bg-transparent font-body text-sm text-copy outline-none"
                        >
                          <option value="" className="bg-surf text-muted">— Pilih Tahun Lulus —</option>
                          {[2024, 2025, 2026].map((th) => (
                            <option key={th} value={th} className="bg-surf text-copy">{th}</option>
                          ))}
                        </select>
                      </FieldShell>
                      {errors.tahunLulus && (
                        <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.tahunLulus}</p>
                      )}
                    </motion.div>

                    {/* Pilihan Jurusan */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <motion.div {...staggerFormField(fieldIndex('jurusan1'))}>
                        <label
                          htmlFor="jurusan1"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                        >
                          Jurusan 1 (Utama) <span className="text-error">*</span>
                        </label>
                        <FieldShell error={errors.jurusan1}>
                          <select
                            id="jurusan1"
                            name="jurusan1"
                            value={form.jurusan1}
                            onChange={handleChange}
                            className="custom-select w-full bg-transparent font-body text-sm text-copy outline-none"
                          >
                            <option value="" className="bg-surf text-muted">— Pilih Jurusan —</option>
                            {programs.map((p) => (
                              <option key={p.code} value={p.code} className="bg-surf text-copy">
                                {p.code} — {p.name}
                              </option>
                            ))}
                          </select>
                        </FieldShell>
                        {errors.jurusan1 && (
                          <p className="mt-1.5 pl-1 font-mono text-[10px] text-error">{errors.jurusan1}</p>
                        )}
                      </motion.div>
                      <motion.div {...staggerFormField(fieldIndex('jurusan2'))}>
                        <label
                          htmlFor="jurusan2"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60"
                        >
                          Jurusan 2 (Cadangan)
                        </label>
                        <FieldShell>
                          <select
                            id="jurusan2"
                            name="jurusan2"
                            value={form.jurusan2}
                            onChange={handleChange}
                            className="custom-select w-full bg-transparent font-body text-sm text-copy outline-none"
                          >
                            <option value="" className="bg-surf text-muted">— Tidak Ada —</option>
                            {programs.filter((p) => p.code !== form.jurusan1).map((p) => (
                              <option key={p.code} value={p.code} className="bg-surf text-copy">
                                {p.code} — {p.name}
                              </option>
                            ))}
                          </select>
                        </FieldShell>
                      </motion.div>
                    </div>

                    {/* Submit */}
                    <motion.div
                      {...staggerFormField(fieldIndex('jurusan2') + 1)}
                      className="border-t border-copy/5 pt-6"
                    >
                      <p className="mb-5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted/50">
                        <span className="text-error">*</span> = Wajib diisi
                      </p>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 font-body text-sm font-semibold text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            Kirim Pendaftaran
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  </form>
                </div>
              </div>

              <BottomBrackets className="relative mt-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Success Modal — Upgraded Glass ─── */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="modal-backdrop"
            {...modalOverlay}
            className="fixed inset-0 z-50 flex items-center justify-center bg-base/80 px-4 backdrop-blur-2xl"
          >
            <motion.div
              key="modal-content"
              {...modalCard}
              className="w-full max-w-lg"
            >
              <div className="glass-card rounded-[2rem] p-3">
                <div className="rounded-[calc(2rem-0.375rem)] bg-base/60 p-8 text-center">
                  {/* Success icon */}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/20">
                    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-accent">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.5px] text-copy">
                    Pendaftaran Berhasil!
                  </h3>
                  <p className="mt-3 max-w-sm mx-auto font-body text-sm leading-relaxed text-muted">
                    Data kamu sudah kami terima. Simpan nomor pendaftaran
                    berikut untuk pengecekan status.
                  </p>

                  {/* PPDB ID — Specimen Display */}
                  <div className="mt-6 input-shell">
                    <div className="input-core flex items-center justify-center py-4">
                      <p className="font-mono text-lg font-bold tracking-[0.15em] text-accent">
                        {submitted.id}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 font-body text-xs leading-relaxed text-muted/50">
                    Nomor ini digunakan untuk cek status pendaftaran.
                    <br />
                    Kami akan menghubungimu melalui email/WA untuk jadwal tes seleksi.
                  </p>

                  <button
                    onClick={() => setSubmitted(null)}
                    className="mt-7 group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3 font-body text-sm font-semibold text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98]"
                  >
                    Tutup
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
