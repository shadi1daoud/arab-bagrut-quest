
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pixelButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-lg backdrop-blur-sm border relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 text-white hover:shadow-md hover:shadow-orange-500/20",
        secondary: "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white hover:shadow-md hover:shadow-gray-800/20",
        outline: "bg-transparent border-gray-700 text-white hover:border-orange-500 hover:text-orange-500",
        destructive: "bg-gradient-to-br from-red-500 to-red-600 border-red-400 text-white hover:shadow-md hover:shadow-red-500/20",
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
      >
        <span className="relative z-10 flex items-center gap-2">
          {props.children}
        </span>
        <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 group-active:opacity-20" />
      </Comp>
    )
  }
)
PixelButton.displayName = "PixelButton"

export { PixelButton, pixelButtonVariants }
