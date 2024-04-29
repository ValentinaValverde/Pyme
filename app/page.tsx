import Header from '@/components/ShopHeader';
import Hero from '../components/Hero';
import BusinessSection from '@/components/BusinessCardSection';
import Featured from '@/components/featured-carousel/Carousel';
import { EmblaOptionsType } from 'embla-carousel';

import { getDisplayAllStores } from '@/utils/actions/shopActions';
import { getFeaturedStores } from '@/utils/actions/shopActions';
import { getStores } from '@/utils/actions/shopActions';

export default async function Home() {
  const featuredStores = await getFeaturedStores();
  const businesses = await getDisplayAllStores();

  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 3;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <main className="">
      <Header />
      <Hero />
      <Featured
        slides={SLIDES}
        options={OPTIONS}
        featuredStores={featuredStores}
      />
      <BusinessSection stores={businesses} />
    </main>
  );
}
