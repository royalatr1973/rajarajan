import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import BestSellers from '@/components/home/BestSellers';
import HowToOrder from '@/components/home/HowToOrder';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <BestSellers />
      <HowToOrder />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
