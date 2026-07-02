import { motion } from 'framer-motion'
import { fadeUp } from '../../hooks/useFadeUp'

type PrestasiItem = {
  id: number
  nama: string
  peran: string
  program: string
  prestasi: string
  deskripsi: string
  image: string
}

export function PrestasiCard({ item, index }: { item: PrestasiItem; index: number }) {
  return (
    <motion.article
      {...fadeUp(0.2 + index * 0.05)}
      className="flex flex-col h-full border border-copy/5 bg-[#2C2721]"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.nama}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-4 py-4">
        <span className="tool-tag self-start">{item.peran}</span>
        <h3 className="mt-2 font-display text-sm font-bold text-copy leading-tight">
          {item.nama}
        </h3>
        <p className="mt-0.5 font-mono text-[10px] tracking-wide text-muted/60">
          {item.program}
        </p>
        <p className="mt-2 font-body text-xs font-light leading-relaxed text-accent/80">
          {item.prestasi}
        </p>
        <p className="mt-1 font-body text-[11px] leading-relaxed text-muted line-clamp-2">
          {item.deskripsi}
        </p>
      </div>
    </motion.article>
  )
}
