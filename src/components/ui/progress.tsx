
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
        return "bg-cyan-400";
      case 'course':
        return "bg-cyan-400";
      case 'blue':
        return "bg-cyan-400";
      case 'green':
        return "bg-cyan-400";
      case 'purple':
        return "bg-purple-500";
      case 'yellow':
        return "bg-cyan-400";
      case 'red':
        return "bg-cyan-400";
      case 'orange':
        return "bg-cyan-400";
      case 'pink':
        return "bg-cyan-400";
      default:
        return "bg-cyan-400";
    }
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-full bg-white/5",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-700",
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
