
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pixelBadgeVariants = cva(
  "inline-flex items-center rounded-none px-2 py-1 text-xs font-minecraft uppercase transition-all hover:translate-y-[-1px] border-2",
  {
    variants: {
      variant: {
        default: "bg-orange-500 border-orange-700 text-white",
        secondary: "bg-gray-700 border-gray-900 text-white",
        outline: "border-gray-700 bg-transparent text-white",
        success: "bg-green-500 border-green-700 text-white",
        destructive: "bg-red-500 border-red-700 text-white",
        warning: "bg-yellow-500 border-yellow-700 text-black",
        info: "bg-blue-500 border-blue-700 text-white",
        brown: "bg-amber-700 border-amber-900 text-white",
        gradient: "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 border-orange-700 text-white",
        minecraft: "bg-opacity-80 bg-orange-500 border-orange-700 text-white bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVQImWNgYGD4z8DAwMAAAAYEAQCs+27xAAAAAElFTkSuQmCC')]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface PixelBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelBadgeVariants> {}

function PixelBadge({ className, variant, ...props }: PixelBadgeProps) {
  return (
    <div className={cn(pixelBadgeVariants({ variant }), className)} {...props} />
  )
}

export { PixelBadge, pixelBadgeVariants }
