import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import BestSellers from '@/components/home/BestSellers'
import HowToOrder from '@/components/home/HowToOrder'
import Testimonials from '@/components/home/Testimonials'
import WhyChooseUs from '@/components/home/WhyChooseUs'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <BestSellers />
        <HowToOrder />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
