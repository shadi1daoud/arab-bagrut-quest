
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pixelButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 pixel-corners border-2 pixel-text",
  {
    variants: {
      variant: {
        default: "bg-orange-500 border-orange-600 text-white hover:bg-orange-600 active:bg-orange-700",
        destructive:
          "bg-red-500 border-red-600 text-white hover:bg-red-600 active:bg-red-700",
        outline:
          "bg-transparent border-gray-700 text-white hover:border-orange-500 hover:text-orange-500",
        secondary:
          "bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-600",
        ghost: "border-transparent bg-transparent text-white hover:bg-gray-800 hover:border-gray-700",
        link: "border-transparent text-orange-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pixelButtonVariants> {
  asChild?: boolean
}

const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(pixelButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
PixelButton.displayName = "PixelButton"

export { PixelButton, pixelButtonVariants }
