
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pixelBadgeVariants = cva(
  "inline-flex items-center rounded-none border-2 px-2 py-1 text-xs font-medium pixel-text",
  {
    variants: {
      variant: {
        default: "border-orange-600 bg-orange-500/80 text-white",
        secondary: "border-gray-700 bg-gray-800/80 text-white",
        outline: "border-gray-700 text-white",
        success: "border-green-600 bg-green-500/80 text-white",
        destructive: "border-red-600 bg-red-500/80 text-white",
        warning: "border-yellow-600 bg-yellow-500/80 text-black",
        info: "border-blue-600 bg-blue-500/80 text-white",
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
