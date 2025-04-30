
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
        return "bg-gradient-to-r from-purple-500 to-pink-400 shadow-[0_0_6px_rgba(128,86,255,0.4)]";
      case 'course':
        return "bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_6px_rgba(49,244,255,0.4)]";
      case 'blue':
        return "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_5px_rgba(59,130,246,0.3)]";
      case 'green':
        return "bg-gradient-to-r from-emerald-400 to-green-500 shadow-[0_0_5px_rgba(34,197,94,0.3)]";
      case 'purple':
        return "bg-gradient-to-r from-purple-500 to-violet-500 shadow-[0_0_5px_rgba(128,86,255,0.3)]";
      case 'yellow':
        return "bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.3)]";
      case 'red':
        return "bg-gradient-to-r from-red-400 to-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.3)]";
      case 'orange':
        return "bg-gradient-to-r from-orange-400 to-amber-500 shadow-[0_0_5px_rgba(249,115,22,0.3)]";
      case 'pink':
        return "bg-gradient-to-r from-pink-400 to-rose-500 shadow-[0_0_5px_rgba(236,72,153,0.3)]";
      default:
        return "bg-gradient-to-r from-blue-500 to-purple-500";
    }
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-black/30 backdrop-blur-sm",
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
