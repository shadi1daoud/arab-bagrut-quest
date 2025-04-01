
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pixelButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-minecraft uppercase transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-none text-shadow-pixel relative overflow-hidden hover:translate-y-[-2px] active:translate-y-[2px] border-b-4 border-r-4 active:border-b-2 active:border-r-2 active:translate-x-[2px]",
  {
    variants: {
      variant: {
        default: "bg-orange-500 border-orange-700 text-white hover:bg-orange-400 border-b-4 border-r-4 border-orange-700",
        secondary: "bg-gray-700 border-gray-900 text-white hover:bg-gray-600",
        outline: "bg-transparent border-2 border-gray-700 text-white hover:border-orange-500 hover:text-orange-500",
        destructive: "bg-red-500 border-red-700 text-white hover:bg-red-400",
        green: "bg-green-500 border-green-700 text-white hover:bg-green-400",
        blue: "bg-blue-500 border-blue-700 text-white hover:bg-blue-400",
        brown: "bg-amber-700 border-amber-900 text-white hover:bg-amber-600",
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
