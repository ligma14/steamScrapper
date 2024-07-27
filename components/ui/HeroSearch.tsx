'use client'
import {Input} from './input'
import { Label } from './label'
import { cn } from '@/lib/utils'

const HeroSearch = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className='flex flex-col md:flex-row space-y-2 font-medium md:space-y-0 md:space-x-2
          dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400'>
          <LabelInputContainer>
            <Input id="search" placeholder="Enter item URL" type="text" />
          </LabelInputContainer>
      </div>
      <div className="">

        </div>
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