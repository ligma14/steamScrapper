'use client'

import { Input } from './input'
import { cn } from '@/lib/utils'
import { FormEvent, useState } from 'react'

const isValidProductLinkURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(
      hostname.includes('steamcommunity.com')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}


const HeroSearch = () => {

  const [searchPrompt, setsearchPrompt] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (e: any) => {
    setsearchPrompt(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidLink = isValidProductLinkURL(searchPrompt);

    if(!isValidLink) return alert('Please provide a valid steam item URL')

    try {
      setisLoading(true);

    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }

  return (
      <form action="" className="flex flex-row items-center gap-3 h-full" onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row space-y-2 font-medium md:space-y-0 md:space-x-2
            dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            group-hover/input:shadow-none transition duration-400'>
            <LabelInputContainer>
              <Input id="search" onChange={handleChange} value = {searchPrompt} placeholder="Enter item URL" type="text" />
            </LabelInputContainer>
        </div>

        <button id="btn-tl" type="submit" className="relative inline-flex h-[95%] rounded-md overflow-hidden 
        p-[1px] focus:outline-none hover:scale-90  translate-all duration-200">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
          bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center 
          rounded-md bg-slate-950 px-8 font-medium text-white backdrop-blur-3xl ">
            {isLoading ? 'Searching...' : 'Get the results'}
          </span>
        </button>
      </form>
  )
}


const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default HeroSearch