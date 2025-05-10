
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-[var(--color-accent-primary)] bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-primary-hover)] transition-all relative"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[progress-shimmer_2s_infinite]"></span>
      <span className="absolute inset-0 shadow-[0_0_6px_rgba(255,72,0,0.6)]"></span>
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
