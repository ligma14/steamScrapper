import Navbar from '../components/ui/Navbar'
import HeroSection from '../components/ui/HeroSection'
import Highlights from '../components/ui/Highlights'
import Footer from '../components/ui/Footer'

export default function Home() {
  return (
    <body id='root' style={{backgroundColor:"black",color:'white'}}>
        <Navbar />
        <HeroSection />
        <Highlights />
        <Footer />
    </body>
  );
}
