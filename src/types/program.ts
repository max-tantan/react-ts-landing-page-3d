import type { ReactNode } from 'react'

export type ProgramCard = {
  title: string
  body: string
  tags: string[]
  code: string
  icon: ReactNode
}

export type JurusanDetail = {
  code: string
  title: string
  subtitle?: string
  heroTitle: string
  sambutan: {
    name: string
    role: string
    photo: string
    message: string
  }
  description: string[]
  curriculum: {
    year: number
    label: string
    items: string[]
  }[]
  careers: {
    title: string
    desc: string
    icon: string
  }[]
  gallery: string[]
}
