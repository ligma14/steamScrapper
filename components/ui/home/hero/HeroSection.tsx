// TODO: Implement a proper search function, connect to API
// TODO: Implement a GSAP animation (Button click, hover; Text animation)
'use client'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import HeroSearch from "./HeroSearch";

const herosection = () => {
  useGSAP(()=>{
    gsap.to('.heroTextAnimation',{
      opacity:1, y:0, x:0, delay: 1, stagger:1, 
    })
  },[])
  return (
    <section className="w-full px-5 sm:px-10 nav-height bg-black relative">
      <div className="h-5/6 w-full flex justify-center flex-col font-black gap-10">
        <div className="text-left flex flex-col gap-10">
          <div className="flex flex-col">
            <h1 className="text-8xl opacity-0 heroTextAnimation max-sm:text-6xl skew-y-10 text-highlighted">Unleash the power</h1>
            <h2 className="text-6xl opacity-0 heroTextAnimation max-sm:text-4xl skew-y-10 ">of SteamScrapper</h2>
          </div>
          <p className="font-normal text-gray-500 opacity-0 skew-y-10 heroTextAnimation">Powerful, self-serve product and growth analytics tool to help you manage your Steam collection. <br/>Steam market data at your fingertips. And more!</p>
        </div>
        <div className="opacity-0 heroTextAnimation">
          <HeroSearch />
        </div>
      </div>
    </section>
  )
}

export default herosection