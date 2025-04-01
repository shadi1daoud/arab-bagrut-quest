
import * as React from "react"

import { cn } from "@/lib/utils"

interface PixelProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  color?: "default" | "success" | "warning" | "danger" | "info"
  showValue?: boolean
  height?: "sm" | "md" | "lg"
}

const PixelProgress = React.forwardRef<HTMLDivElement, PixelProgressProps>(
  ({ className, value = 0, max = 100, color = "default", showValue = false, height = "md", ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    
    const heightClass = {
      sm: "h-2",
      md: "h-4",
      lg: "h-6",
    }
    
    const colorClass = {
      default: "bg-orange-500",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      danger: "bg-red-500",
      info: "bg-blue-500",
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-none border-2 border-gray-700 bg-black/50",
          heightClass[height],
          className
        )}
        {...props}
      >
        <div 
          className={cn(
            "h-full transition-all",
            colorClass[color],
          )}
          style={{ 
            width: `${percentage}%`,
            backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)",
            backgroundSize: "8px 8px"
          }}
        />
        
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center pixel-text text-white text-shadow-pixel text-xs">
            {value}/{max}
          </div>
        )}
      </div>
    )
  }
)
PixelProgress.displayName = "PixelProgress"

export { PixelProgress }
