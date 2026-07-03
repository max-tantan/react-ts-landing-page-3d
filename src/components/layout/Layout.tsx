import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import SoftAurora from '../ui/SoftAurora'

export function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <div className="h-px w-full bg-copy/5" />
      <div className="h-[200px] w-full">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.0}
          color1="#0284C7"
          color2="#161310"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>
      <Footer />
    </>
  )
}
