
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
        return "bg-indigo-600";
      case 'course':
        return "bg-indigo-600";
      case 'blue':
        return "bg-indigo-600";
      case 'green':
        return "bg-indigo-600";
      case 'purple':
        return "bg-indigo-600";
      case 'yellow':
        return "bg-indigo-600";
      case 'red':
        return "bg-indigo-600";
      case 'orange':
        return "bg-indigo-600";
      case 'pink':
        return "bg-indigo-600";
      default:
        return "bg-indigo-600";
    }
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-neutral-800",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-300",
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
