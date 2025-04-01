
import * as React from "react"

import { cn } from "@/lib/utils"

interface PixelProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  color?: "default" | "success" | "warning" | "danger" | "info"
  showValue?: boolean
  height?: "sm" | "md" | "lg"
  variant?: "default" | "gradient"
}

const PixelProgress = React.forwardRef<HTMLDivElement, PixelProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    color = "default", 
    showValue = false, 
    height = "md", 
    variant = "default",
    ...props 
  }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    
    const heightClass = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    }
    
    const colorClass = {
      default: variant === "gradient" ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-orange-500",
      success: variant === "gradient" ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-green-500",
      warning: variant === "gradient" ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : "bg-yellow-500",
      danger: variant === "gradient" ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-red-500",
      info: variant === "gradient" ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-blue-500",
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-gray-800/50 backdrop-blur-sm",
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
          }}
        >
          <div className="absolute inset-0 bg-white/10 opacity-50 animate-pulse" />
        </div>
        
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
            {value}/{max}
          </div>
        )}
      </div>
    )
  }
)
PixelProgress.displayName = "PixelProgress"

export { PixelProgress }
