import Navbar from '../components/ui/Navbar'
import HeroSection from '../components/ui/HeroSection'
import Highlights from '../components/ui/Highlights'
import Footer from '../components/ui/Footer'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
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
