import Navbar from '@/components/Navbar';
import Hero from '../components/Hero';
import BusinessSection from '@/components/BusinessCardSection';
import Featured from '@/components/Featured';

import { getFeaturedStores } from '@/utils/actions/shopActions';

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Featured featuredStores={{ getFeaturedStores }} />
      <BusinessSection />
    </main>
  );
}
