import type { ReactNode } from 'react'

type SpecimenVariant = 'data' | 'narrative' | 'action'

const variantStyles: Record<SpecimenVariant, string> = {
  data: 'border border-accent/20 bg-accent/[0.04] px-2.5 py-1',
  narrative: 'border-l-2 border-accent/30 pl-2.5',
  action: 'flex items-center gap-1.5',
}

const labelContent: Record<SpecimenVariant, (children: ReactNode) => ReactNode> = {
  data: (children) => (
    <>
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent/50" />
      {children}
    </>
  ),
  narrative: (children) => (
    <>
      <span className="mr-1.5 inline-block h-3 w-px bg-accent/30" />
      {children}
    </>
  ),
  action: (children) => (
    <>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/60" />
      {children}
    </>
  ),
}

type SpecimenLabelProps = {
  variant?: SpecimenVariant
  children: ReactNode
  className?: string
}

export function SpecimenLabel({
  variant = 'data',
  children,
  className = '',
}: SpecimenLabelProps) {
  return (
    <span
      className={`inline-flex items-center font-mono text-[11px] tracking-[0.2em] uppercase text-accent/70 ${variantStyles[variant]} ${className}`}
    >
      {labelContent[variant](children)}
    </span>
  )
}
