import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[rgba(25,25,30)]", className)}
      {...props}
    />
  )
}

export { Skeleton }
