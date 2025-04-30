
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { 
    variant?: 'default' | 'xp' | 'course' | 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'orange' | 'pink'
  }
>(({ className, value, variant = 'default', ...props }, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'xp':
        return "bg-indigo-500";
      case 'course':
        return "bg-blue-500";
      case 'blue':
        return "bg-blue-500";
      case 'green':
        return "bg-emerald-500";
      case 'purple':
        return "bg-purple-500";
      case 'yellow':
        return "bg-amber-500";
      case 'red':
        return "bg-rose-500";
      case 'orange':
        return "bg-orange-500";
      case 'pink':
        return "bg-pink-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-neutral-800/50",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-500",
          getVariantStyles()
        )}
        style={{ 
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
