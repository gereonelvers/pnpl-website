import Navigation from './components/Navigation';
import HeroAscii3D from './components/HeroAscii3D';
import LibriBrainCTA from './components/LibriBrainCTA';
import Publications from './components/Publications';
import Team from './components/Team';
import GetInTouch from './components/GetInTouch';
import Footer from './components/Footer';

// (Optional) enforce static generation for this route:
export const dynamic = 'error';

export default function Page() {
  return (
    <>
      <Navigation />
      <main style={{ color: '#0a0a0a', background: '#fff' }}>
        <section id="hero">
          <HeroAscii3D
            modelUrl="/model.glb"
            rotationRPM={0.8}
            tilt={[25, 10, -8]}
            //characters={' .,:;pnl@'}
            characters={' .:-=+*#%@pnl'}
            fontSize={9}
            fit={3.5}
          />
        </section>

        <LibriBrainCTA />
        <Publications />
        <Team />
        <GetInTouch />
        <Footer />
      </main>
    </>
  );
}
