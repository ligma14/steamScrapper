import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Navbar from '../components/ui/home/header/Navbar'
import HeroSection from '../components/ui/home/hero/HeroSection'
import Highlights from '../components/ui/home/highlights/Highlights'
import Footer from '../components/ui/home/footer/Footer'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <body id='root' style={{backgroundColor:"black",color:'white'}}>
      <Navbar />
      <HeroSection />
      <div className='bg-[#0E0E0E] max-sm:h-auto nav-height'><Highlights /></div>
      <Footer />
      <SpeedInsights />
      <Analytics/>
    </body>
  )
}
