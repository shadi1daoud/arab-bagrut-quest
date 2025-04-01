
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pixelBadgeVariants = cva(
  "inline-flex items-center rounded-none px-2 py-1 text-xs font-minecraft uppercase transition-all hover:translate-y-[-1px] border-2",
  {
    variants: {
      variant: {
        default: "bg-game-primary border-gray-900 text-white",
        secondary: "bg-game-secondary border-gray-900 text-white",
        outline: "border-gray-700 bg-transparent text-white",
        success: "bg-game-green border-green-700 text-black",
        destructive: "bg-red-500 border-red-700 text-white",
        warning: "bg-game-accent border-amber-700 text-black",
        info: "bg-game-teal border-teal-700 text-black",
        gold: "bg-game-accent border-amber-700 text-black",
        teal: "bg-game-teal border-teal-700 text-black",
        green: "bg-game-green border-green-700 text-black",
        gradient: "bg-gradient-to-r from-game-primary via-pink-500 to-purple-500 border-gray-900 text-white",
        minecraft: "bg-opacity-80 bg-game-primary border-gray-900 text-white bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVQImWNgYGD4z8DAwMAAAAYEAQCs+27xAAAAAElFTkSuQmCC')]",
      },
      glow: {
        true: "animate-pulse-glow",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      glow: false,
    },
  }
)

export interface PixelBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelBadgeVariants> {}

function PixelBadge({ className, variant, glow, ...props }: PixelBadgeProps) {
  return (
    <div className={cn(pixelBadgeVariants({ variant, glow }), className)} {...props} />
  )
}

export { PixelBadge, pixelBadgeVariants }
