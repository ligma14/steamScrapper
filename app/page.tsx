import Navbar from '../components/ui/Navbar'
import HeroSection from '../components/ui/HeroSection'
import Highlights from '../components/ui/Highlights'
import Footer from '../components/ui/Footer'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { buildProductJSON } from '@/lib/test'


export default function Home() {
  // buildProductJSON();
  return (
    <body id='root' style={{backgroundColor:"black",color:'white'}}>
        <Navbar />
        <HeroSection />
        <div className='bg-[#0E0E0E] max-sm:h-auto nav-height'><Highlights /></div>
        <Footer />

        <SpeedInsights />
    </body>
  );
}
