export function fadeUp(delay: number, duration = 0.5) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, ease: 'easeOut' as const, delay },
  }
}
