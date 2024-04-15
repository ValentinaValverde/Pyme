
import LandingPage from '../components/LandingPage';
import Hero from '../components/Hero';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <LandingPage />
      <Hero />
    </main>
  );
}
