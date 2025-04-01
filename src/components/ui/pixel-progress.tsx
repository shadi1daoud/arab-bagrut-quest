
import * as React from "react"

import { cn } from "@/lib/utils"

interface PixelProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  color?: "default" | "success" | "warning" | "danger" | "info" | "green" | "pink" | "gold" | "teal"
  showValue?: boolean
  height?: "sm" | "md" | "lg"
  variant?: "default" | "minecraft" | "gradient" | "glow"
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
      default: "bg-game-primary",
      success: "bg-game-green",
      warning: "bg-game-accent",
      danger: "bg-red-500",
      info: "bg-game-teal",
      green: "bg-game-green",
      pink: "bg-game-primary",
      gold: "bg-game-accent",
      teal: "bg-game-teal",
    }

    const variantClass = {
      default: "",
      minecraft: "bg-opacity-80 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVQImWNgYGD4z8DAwMAAAAYEAQCs+27xAAAAAElFTkSuQmCC')]",
      gradient: color === "default" ? "bg-gradient-to-r from-game-primary via-game-primary to-pink-500" :
                color === "success" ? "bg-gradient-to-r from-green-400 via-game-green to-green-500" :
                color === "warning" ? "bg-gradient-to-r from-yellow-400 via-game-accent to-yellow-500" :
                color === "danger" ? "bg-gradient-to-r from-red-400 via-red-500 to-red-600" :
                color === "info" ? "bg-gradient-to-r from-cyan-400 via-game-teal to-cyan-500" :
                color === "green" ? "bg-gradient-to-r from-green-400 via-game-green to-green-500" :
                color === "pink" ? "bg-gradient-to-r from-pink-400 via-game-primary to-pink-500" :
                color === "gold" ? "bg-gradient-to-r from-yellow-400 via-game-accent to-yellow-500" :
                "bg-gradient-to-r from-cyan-400 via-game-teal to-cyan-500",
      glow: "",
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
            variantClass[variant]
          )}
          style={{ 
            width: `${percentage}%`,
            imageRendering: "pixelated",
            boxShadow: variant === "glow" ? 
              color === "default" ? "0 0 10px rgba(255, 60, 128, 0.7)" :
              color === "success" ? "0 0 10px rgba(163, 255, 18, 0.7)" :
              color === "warning" ? "0 0 10px rgba(255, 184, 0, 0.7)" :
              color === "danger" ? "0 0 10px rgba(255, 51, 102, 0.7)" :
              color === "info" ? "0 0 10px rgba(0, 255, 213, 0.7)" :
              color === "green" ? "0 0 10px rgba(163, 255, 18, 0.7)" :
              color === "pink" ? "0 0 10px rgba(255, 60, 128, 0.7)" :
              color === "gold" ? "0 0 10px rgba(255, 184, 0, 0.7)" :
              "0 0 10px rgba(0, 255, 213, 0.7)" : "none"
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
