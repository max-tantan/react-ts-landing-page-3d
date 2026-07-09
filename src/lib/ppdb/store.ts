import type { Pendaftar } from '../../types'

export interface RegistrantStore {
  save(pendaftar: Pendaftar): void
  getAll(): Pendaftar[]
  getById(id: string): Pendaftar | undefined
}

const STORAGE_KEY = 'ppdb_pendaftar'

export function createLocalStorageStore(): RegistrantStore {
  function read(): Pendaftar[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  }

  function write(data: Pendaftar[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  return {
    save(pendaftar: Pendaftar) {
      const all = read()
      all.push(pendaftar)
      write(all)
    },

    getAll() {
      return read()
    },

    getById(id: string) {
      return read().find((p) => p.id === id)
    },
  }
}

export function createInMemoryStore(): RegistrantStore {
  const data: Pendaftar[] = []

  return {
    save(pendaftar: Pendaftar) {
      data.push(pendaftar)
    },

    getAll() {
      return [...data]
    },

    getById(id: string) {
      return data.find((p) => p.id === id)
    },
  }
}
