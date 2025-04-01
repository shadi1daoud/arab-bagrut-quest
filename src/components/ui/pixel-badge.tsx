
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pixelBadgeVariants = cva(
  "inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium transition-all hover:scale-105",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm shadow-orange-500/20",
        secondary: "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-sm shadow-gray-800/20",
        outline: "border border-gray-700 text-white",
        success: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm shadow-green-500/20",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm shadow-red-500/20",
        warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-sm shadow-yellow-500/20",
        info: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm shadow-blue-500/20",
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
