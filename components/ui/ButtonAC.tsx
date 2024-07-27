// TODO: Animate the button 24.07
// I tried to animate it with GSAP but there was no sense in it, so I just used hover:
'use client'

const ButtonAC = () => {

  return (
    <button id="btn-tl" type="submit" className="relative inline-flex h-full rounded-md overflow-hidden p-[1px] focus:outline-none 
    focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-90  translate-all duration-200">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
      bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center 
      rounded-md bg-slate-950 px-8 font-medium text-white backdrop-blur-3xl ">
        Get the results
      </span>
    </button>
  )
}

export default ButtonAC