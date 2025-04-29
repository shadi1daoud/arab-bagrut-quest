
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { 
    variant?: 'default' | 'xp' | 'course' | 'blue' | 'green' | 'purple' | 'yellow'
  }
>(({ className, value, variant = 'default', ...props }, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'xp':
        return "bg-gradient-to-r from-[#FF4293] to-[#FA64B5] shadow-[0_0_8px_rgba(255,66,147,0.5)]";
      case 'course':
        return "bg-gradient-to-r from-[#00FFE1] to-[#32FF88] shadow-[0_0_8px_rgba(0,255,225,0.5)]";
      case 'blue':
        return "bg-gradient-to-r from-blue-500 to-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]";
      case 'green':
        return "bg-gradient-to-r from-green-500 to-green-600 shadow-[0_0_8px_rgba(34,197,94,0.5)]";
      case 'purple':
        return "bg-gradient-to-r from-purple-500 to-purple-600 shadow-[0_0_8px_rgba(168,85,247,0.5)]";
      case 'yellow':
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-[0_0_8px_rgba(234,179,8,0.5)]";
      default:
        return "bg-primary";
    }
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
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
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAzTDEyIDNNMTggM0wyNCAxIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+')]"></div>
        </div>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
