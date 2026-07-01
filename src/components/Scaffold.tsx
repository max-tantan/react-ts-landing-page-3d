export function CornerBrackets({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <div className="absolute top-0 left-6 w-6 h-6 border-t border-l border-accent/25" />
      <div className="absolute top-0 right-6 w-6 h-6 border-t border-r border-accent/25" />
    </div>
  )
}

export function BottomBrackets({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <div className="absolute bottom-0 left-6 w-6 h-6 border-b border-l border-accent/25" />
      <div className="absolute bottom-0 right-6 w-6 h-6 border-b border-r border-accent/25" />
    </div>
  )
}

export function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-4 ${className}`}>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/8" />
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 w-px bg-accent/15"
          style={{
            left: `${(i / 8) * 100}%`,
            height: i % 2 === 0 ? '12px' : '6px',
          }}
        />
      ))}
    </div>
  )
}
