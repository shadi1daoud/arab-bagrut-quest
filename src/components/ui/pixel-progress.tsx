
import * as React from "react"

import { cn } from "@/lib/utils"

interface PixelProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  color?: "default" | "success" | "warning" | "danger" | "info" | "green" | "blue" | "brown"
  showValue?: boolean
  height?: "sm" | "md" | "lg"
  variant?: "default" | "minecraft"
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
      green: "bg-green-500",
      blue: "bg-blue-500",
      brown: "bg-amber-700",
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-none bg-gray-800 border-2 border-gray-900",
          heightClass[height],
          className
        )}
        {...props}
      >
        <div 
          className={cn(
            "h-full transition-all",
            colorClass[color],
            variant === "minecraft" && "bg-opacity-80 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVQImWNgYGD4z8DAwMAAAAYEAQCs+27xAAAAAElFTkSuQmCC')]"
          )}
          style={{ 
            width: `${percentage}%`,
            imageRendering: "pixelated"
          }}
        >
          {variant === "minecraft" && (
            <div className="absolute inset-0 bg-white/10 opacity-50" />
          )}
        </div>
        
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-minecraft">
            {value}/{max}
          </div>
        )}
      </div>
    )
  }
)
PixelProgress.displayName = "PixelProgress"

export { PixelProgress }
