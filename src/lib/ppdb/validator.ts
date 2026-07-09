export interface PPDBForm {
  nama: string
  tempatLahir: string
  tanggalLahir: string
  jenisKelamin: '' | 'L' | 'P'
  alamat: string
  noHp: string
  email: string
  asalSekolah: string
  nisn: string
  tahunLulus: string
  jurusan1: string
  jurusan2: string
}

export type ValidationErrors = Partial<Record<keyof PPDBForm, string>>

export function validatePPDBForm(form: PPDBForm): ValidationErrors {
  const errs: ValidationErrors = {}

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
