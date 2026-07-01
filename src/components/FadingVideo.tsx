import { useEffect, useRef } from 'react'

const FADE_MS = 500
const FADE_OUT_LEAD = 0.55

type FadingVideoProps = {
  src: string
  className?: string
  style?: React.CSSProperties
}

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const fadeTo = (target: number, duration = FADE_MS) => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }

      const startOpacity = parseFloat(video.style.opacity || '0')
      const startTime = performance.now()

      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const next = startOpacity + (target - startOpacity) * progress
        video.style.opacity = String(next)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          rafRef.current = null
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const onLoadedData = () => {
      video.style.opacity = '0'
      void video.play()
      fadeTo(1)
    }

    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime
      if (
        !fadingOutRef.current &&
        remaining <= FADE_OUT_LEAD &&
        remaining > 0
      ) {
        fadingOutRef.current = true
        fadeTo(0)
      }
    }

    const onEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        void video.play()
        fadingOutRef.current = false
        fadeTo(1)
      }, 100)
    }

    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="auto"
      src={src}
      className={className}
      style={{ opacity: 0, ...style }}
    />
  )
}
