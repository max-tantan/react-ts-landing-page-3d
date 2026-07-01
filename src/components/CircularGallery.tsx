import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from 'ogl'
import { useEffect, useRef } from 'react'

import './CircularGallery.css'

export interface GalleryItem {
  image: string
  text: string
}

interface GalleryProps {
  items?: GalleryItem[]
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  fontUrl?: string
  scrollSpeed?: number
  scrollEase?: number
}

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  const debounced = (...args: Parameters<T>) => {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
  return debounced
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t
}

function autoBind(instance: Record<string, unknown>) {
  const proto = Object.getPrototypeOf(instance)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = (instance[key] as (...args: unknown[]) => void).bind(instance)
    }
  })
}

const DEFAULT_FONT = 'bold 30px Figtree'
const DEFAULT_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap'

function deriveFontFamilyFromUrl(url: string): string {
  const fileName = (url.split('/').pop() || 'custom-font').split('?')[0]
  const base = fileName.replace(/\.(woff2?|ttf|otf|eot)$/i, '')
  return base.replace(/[^a-zA-Z0-9-_ ]/g, '').trim() || 'CircularGalleryFont'
}

async function loadFontFromStylesheet(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch font stylesheet (${response.status})`)
  const cssText = await response.text()
  const faceBlocks = cssText.match(/@font-face\s*{[^}]*}/g) || []
  let family: string | null = null
  const fontFaces: FontFace[] = []
  for (const block of faceBlocks) {
    const familyMatch = block.match(/font-family:\s*['"]?([^;'"]+)['"]?/)
    const urlMatch = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/)
    if (!familyMatch || !urlMatch) continue
    family = familyMatch[1].trim()
    const descriptors: Record<string, string> = {}
    const weightMatch = block.match(/font-weight:\s*([^;]+);/)
    const styleMatch = block.match(/font-style:\s*([^;]+);/)
    const rangeMatch = block.match(/unicode-range:\s*([^;]+);/)
    if (weightMatch) descriptors.weight = weightMatch[1].trim()
    if (styleMatch) descriptors.style = styleMatch[1].trim()
    if (rangeMatch) descriptors.unicodeRange = rangeMatch[1].trim()
    fontFaces.push(new FontFace(family, `url(${urlMatch[1]})`, descriptors))
  }
  if (!family) throw new Error('No @font-face rule found in the stylesheet')
  await Promise.allSettled(
    fontFaces.map(async (face) => {
      await face.load()
      document.fonts.add(face)
    }),
  )
  return family
}

async function loadFontFromFile(url: string): Promise<string> {
  const family = deriveFontFamilyFromUrl(url)
  const fontFace = new FontFace(family, `url(${url})`)
  await fontFace.load()
  document.fonts.add(fontFace)
  return family
}

async function loadCustomFont(fontUrl: string): Promise<string> {
  const isStylesheet =
    fontUrl.includes('fonts.googleapis.com') || /\.css(\?.*)?$/i.test(fontUrl)
  return isStylesheet ? loadFontFromStylesheet(fontUrl) : loadFontFromFile(fontUrl)
}

async function resolveFont(
  font: string,
  fontUrl?: string,
): Promise<string> {
  const effectiveUrl =
    fontUrl || (font === DEFAULT_FONT ? DEFAULT_FONT_URL : null)
  if (!effectiveUrl) {
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(font)
        await document.fonts.ready
      } catch {
        // ignore
      }
    }
    return font
  }
  try {
    const family = await loadCustomFont(effectiveUrl)
    const sizeMatch = font.match(/^\s*(.*?\d+px)/)
    const prefix = sizeMatch ? sizeMatch[1].trim() : 'bold 30px'
    const resolved = `${prefix} "${family}"`
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(resolved)
      } catch {
        // ignore
      }
    }
    return resolved
  } catch (error) {
    console.error('CircularGallery: unable to load font from', fontUrl, error)
    return font
  }
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/)
  return match ? parseInt(match[1], 10) : 30
}

function createTextTexture(
  gl: WebGLRenderingContext,
  text: string,
  font = 'bold 30px monospace',
  color = 'black',
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  context.font = font
  const metrics = context.measureText(text)
  const textWidth = Math.ceil(metrics.width)
  const textHeight = Math.ceil(getFontSize(font) * 1.2)
  canvas.width = textWidth + 20
  canvas.height = textHeight + 20
  context.font = font
  context.fillStyle = color
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new Texture(gl as never, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

interface TitleOptions {
  gl: WebGLRenderingContext
  plane: Mesh
  renderer: Renderer
  text: string
  textColor?: string
  font?: string
}

class Title {
  gl: WebGLRenderingContext
  plane: Mesh
  renderer: Renderer
  text: string
  textColor: string
  font: string
  mesh: Mesh

  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }: TitleOptions) {
    autoBind(this as unknown as Record<string, unknown>)
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.mesh = this.createMesh()
  }

  createMesh(): Mesh {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
    )
    const geometry = new Plane(this.gl as never)
    const program = new Program(this.gl as never, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    })
    const mesh = new Mesh(this.gl as never, { geometry, program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.15
    const textWidth = textHeight * aspect
    mesh.scale.set(textWidth, textHeight, 1)
    mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05
    mesh.setParent(this.plane)
    return mesh
  }
}

interface MediaOptions {
  geometry: Plane
  gl: WebGLRenderingContext
  image: string
  index: number
  length: number
  renderer: Renderer
  scene: Transform
  screen: { width: number; height: number }
  text: string
  viewport: { width: number; height: number }
  bend: number
  textColor: string
  borderRadius: number
  font: string
}

class Media {
  extra: number
  geometry: Plane
  gl: WebGLRenderingContext
  image: string
  index: number
  length: number
  renderer: Renderer
  scene: Transform
  screen: { width: number; height: number }
  text: string
  viewport: { width: number; height: number }
  bend: number
  textColor: string
  borderRadius: number
  font: string
  program: Program
  plane: Mesh
  title: Title
  scale!: number
  padding!: number
  width!: number
  widthTotal!: number
  x!: number
  speed!: number
  isBefore = false
  isAfter = false

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
  }: MediaOptions) {
    this.extra = 0
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.program = this.createShader()
    this.plane = this.createMesh()
    this.title = this.createTitle()
    this.onResize()
  }

  createShader(): Program {
    const texture = new Texture(this.gl as never, {
      generateMipmaps: true,
    })
    const program = new Program(this.gl as never, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    })
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = this.image
    img.onload = () => {
      texture.image = img
      program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }
    return program
  }

  createMesh(): Mesh {
    const plane = new Mesh(this.gl as never, {
      geometry: this.geometry,
      program: this.program,
    })
    plane.setParent(this.scene)
    return plane
  }

  createTitle(): Title {
    return new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    })
  }

  update(scroll: { current: number; last: number }, direction: string): void {
    this.plane.position.x = this.x - scroll.current - this.extra

    const x = this.plane.position.x
    const H = this.viewport.width / 2

    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }

    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }

  onResize(resizeData?: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } }): void {
    if (resizeData?.screen) this.screen = resizeData.screen
    if (resizeData?.viewport) {
      this.viewport = resizeData.viewport
    }
    this.scale = this.screen.height / 1500
    this.plane.scale.y =
      (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x =
      (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ]
    this.padding = 2
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

interface AppOptions {
  items?: GalleryItem[]
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  scrollSpeed?: number
  scrollEase?: number
}

class App {
  container: HTMLElement
  scrollSpeed: number
  scroll: { ease: number; current: number; target: number; last: number }
  onCheckDebounce: () => void
  renderer: Renderer
  gl: WebGLRenderingContext
  camera: Camera
  scene: Transform
  planeGeometry: Plane
  mediasImages: GalleryItem[]
  medias: Media[]
  screen: { width: number; height: number }
  viewport: { width: number; height: number }
  raf: number
  isDown = false
  start = 0
  scrollPosition = 0

  boundOnResize: () => void
  boundOnWheel: (e: Event) => void
  boundOnTouchDown: (e: Event) => void
  boundOnTouchMove: (e: Event) => void
  boundOnTouchUp: () => void
  boundOnKeyDown: (e: Event) => void

  constructor(container: HTMLElement, options: AppOptions = {}) {
    this.container = container
    this.scrollSpeed = options.scrollSpeed ?? 2
    this.scroll = {
      ease: options.scrollEase ?? 0.05,
      current: 0,
      target: 0,
      last: 0,
    }
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200)
    this.renderer = this.createRenderer()
    this.gl = this.renderer.gl
    this.camera = this.createCamera()
    this.scene = this.createScene()
    this.screen = { width: 0, height: 0 }
    this.viewport = { width: 0, height: 0 }
    this.onResize()
    this.planeGeometry = this.createGeometry()
    this.mediasImages = []
    this.medias = []
    this.createMedias(
      options.items,
      options.bend ?? 3,
      options.textColor ?? '#ffffff',
      options.borderRadius ?? 0.05,
      options.font ?? DEFAULT_FONT,
    )
    this.raf = 0
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnWheel = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)
    this.boundOnKeyDown = this.onKeyDown.bind(this)
    this.update()
    this.addEventListeners()
  }

  createRenderer(): Renderer {
    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    })
    renderer.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(renderer.gl.canvas as HTMLCanvasElement)
    return renderer
  }

  createCamera(): Camera {
    const camera = new Camera(this.gl as never)
    camera.fov = 45
    camera.position.z = 20
    return camera
  }

  createScene(): Transform {
    return new Transform()
  }

  createGeometry(): Plane {
    return new Plane(this.gl as never, {
      heightSegments: 50,
      widthSegments: 100,
    })
  }

  createMedias(
    items?: GalleryItem[],
    bend = 3,
    textColor = '#ffffff',
    borderRadius = 0.05,
    font = DEFAULT_FONT,
  ): void {
    const defaultItems: GalleryItem[] = [
      { image: 'https://picsum.photos/seed/yadika-1/800/600', text: 'Lab Komputer' },
      { image: 'https://picsum.photos/seed/yadika-2/800/600', text: 'Praktik Jaringan' },
      { image: 'https://picsum.photos/seed/yadika-3/800/600', text: 'Ruang Kelas' },
      { image: 'https://picsum.photos/seed/yadika-4/800/600', text: 'Perpustakaan' },
      { image: 'https://picsum.photos/seed/yadika-5/800/600', text: 'Lab Akuntansi' },
      { image: 'https://picsum.photos/seed/yadika-6/800/600', text: 'Front Office' },
      { image: 'https://picsum.photos/seed/yadika-7/800/600', text: 'Housekeeping' },
      { image: 'https://picsum.photos/seed/yadika-8/800/600', text: 'Olahraga' },
      { image: 'https://picsum.photos/seed/yadika-9/800/600', text: 'Masjid' },
      { image: 'https://picsum.photos/seed/yadika-10/800/600', text: 'Area Santai' },
    ]
    const galleryItems = items && items.length ? items : defaultItems
    this.mediasImages = galleryItems.concat(galleryItems)
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      })
    })
  }

  onTouchDown(e: Event): void {
    this.isDown = true
    this.scrollPosition = this.scroll.current
    const mouseEvent = e as MouseEvent
    const touchEvent = e as TouchEvent
    this.start = touchEvent.touches
      ? touchEvent.touches[0].clientX
      : mouseEvent.clientX
  }

  onTouchMove(e: Event): void {
    if (!this.isDown) return
    const mouseEvent = e as MouseEvent
    const touchEvent = e as TouchEvent
    const x = touchEvent.touches
      ? touchEvent.touches[0].clientX
      : mouseEvent.clientX
    const distance = (this.start - x) * (this.scrollSpeed * 0.025)
    this.scroll.target = this.scrollPosition + distance
  }

  onTouchUp(): void {
    this.isDown = false
    this.onCheck()
  }

  onWheel(e: Event): void {
    const wheelEvent = e as WheelEvent
    const delta =
      wheelEvent.deltaY || (wheelEvent as unknown as { wheelDelta?: number }).wheelDelta || 0
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2
    this.onCheckDebounce()
  }

  onKeyDown(e: Event): void {
    const keyEvent = e as KeyboardEvent
    switch (keyEvent.key) {
      case 'ArrowRight':
        e.preventDefault()
        this.scroll.target += this.scrollSpeed * 5
        this.onCheckDebounce()
        break
      case 'ArrowLeft':
        e.preventDefault()
        this.scroll.target -= this.scrollSpeed * 5
        this.onCheckDebounce()
        break
      case 'Home':
        e.preventDefault()
        this.scroll.target = 0
        this.onCheckDebounce()
        break
      default:
        break
    }
  }

  onCheck(): void {
    if (!this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }

  onResize(): void {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport }),
      )
    }
  }

  update(): void {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease,
    )
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction))
    }
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners(): void {
    window.addEventListener('resize', this.boundOnResize)
    window.addEventListener('wheel', this.boundOnWheel)
    window.addEventListener('mousedown', this.boundOnTouchDown)
    window.addEventListener('mousemove', this.boundOnTouchMove)
    window.addEventListener('mouseup', this.boundOnTouchUp)
    window.addEventListener('touchstart', this.boundOnTouchDown)
    window.addEventListener('touchmove', this.boundOnTouchMove)
    window.addEventListener('touchend', this.boundOnTouchUp)

    this.container?.addEventListener('keydown', this.boundOnKeyDown)
  }

  destroy(): void {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.boundOnResize)
    window.removeEventListener('wheel', this.boundOnWheel)
    window.removeEventListener('mousedown', this.boundOnTouchDown)
    window.removeEventListener('mousemove', this.boundOnTouchMove)
    window.removeEventListener('mouseup', this.boundOnTouchUp)
    window.removeEventListener('touchstart', this.boundOnTouchDown)
    window.removeEventListener('touchmove', this.boundOnTouchMove)
    window.removeEventListener('touchend', this.boundOnTouchUp)
    if (
      this.renderer &&
      this.renderer.gl &&
      this.renderer.gl.canvas &&
      this.renderer.gl.canvas.parentNode
    ) {
      this.renderer.gl.canvas.parentNode.removeChild(
        this.renderer.gl.canvas,
      )
    }

    if (this.container) {
      this.container.removeEventListener('keydown', this.boundOnKeyDown)
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  fontUrl,
  scrollSpeed = 2,
  scrollEase = 0.05,
}: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    let app: App | null = null
    let isMounted = true

    resolveFont(font, fontUrl).then((resolvedFont) => {
      if (!isMounted || !containerRef.current) return
      app = new App(containerRef.current, {
        items,
        bend,
        textColor,
        borderRadius,
        font: resolvedFont,
        scrollSpeed,
        scrollEase,
      })
    })

    return () => {
      isMounted = false
      if (app) app.destroy()
    }
  }, [items, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase])

  return (
    <div
      className="circular-gallery"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular image gallery. Use left and right arrow keys to navigate."
    />
  )
}
