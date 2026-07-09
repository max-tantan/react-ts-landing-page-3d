export const SPRING = [0.32, 0.72, 0, 1] as const

export function fadeUp(delay: number, duration = 0.5) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, ease: 'easeOut' as const, delay },
  }
}

export const FADE_UP = fadeUp(0)
export const FADE_UP_SLOW = fadeUp(0, 0.7)
export const FADE_UP_FAST = fadeUp(0, 0.3)

export function staggerChildren(baseDelay = 0.2, step = 0.1) {
  return (index: number) => fadeUp(baseDelay + index * step)
}

export const viewReveal = {
  initial: { opacity: 0, y: 40, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: SPRING },
}

export function staggerFormField(index: number) {
  return {
    initial: { opacity: 0, y: 20, filter: 'blur(2px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, ease: SPRING, delay: index * 0.06 },
  }
}

export const modalOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: SPRING },
}

export const modalCard = {
  initial: { opacity: 0, scale: 0.94, y: 24 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.94, y: 24 },
  transition: { type: 'spring' as const, damping: 28, stiffness: 280 },
}
