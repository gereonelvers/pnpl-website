import Navigation from './components/Navigation';
import HeroAscii3D from './components/HeroAscii3D';
import LibriBrainCTA from './components/LibriBrainCTA';
import BlogCarousel from './components/BlogCarousel';
import Publications from './components/Publications';
import Team from './components/Team';
import GetInTouch from './components/GetInTouch';
import Footer from './components/Footer';
import { getAllPosts } from '@/lib/blog';

// (Optional) enforce static generation for this route:
export const dynamic = 'error';

export default async function Page() {
  const posts = await getAllPosts();
  
  return (
    <>
      <Navigation />
      <main style={{ color: '#0a0a0a', background: '#fff' }}>
        <section id="hero">
          <HeroAscii3D
            modelUrl="/pineapple.obj"
            rotationRPM={0.8}
            tilt={[25, 10, -8]}
            //characters={' .,:;pnl@'}
            characters={' .:-=+*#%@pnl'}
            fontSize={10}
            fit={4}
          />
        </section>

        <LibriBrainCTA />
        <BlogCarousel posts={posts} />
        <Publications />
        <Team />
        <GetInTouch />
        <Footer />
      </main>
    </>
  );
}
