
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pixelButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-minecraft uppercase transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-none text-shadow-pixel relative overflow-hidden hover:translate-y-[-2px] active:translate-y-[2px] border-b-4 border-r-4 active:border-b-2 active:border-r-2 active:translate-x-[2px] text-xs",
  {
    variants: {
      variant: {
        default: "bg-game-primary border-gray-900 text-white hover:bg-game-primary/80", 
        secondary: "bg-game-secondary border-gray-900 text-white hover:bg-game-secondary/80",
        gold: "bg-game-accent border-amber-800 text-black hover:bg-game-accent/80",
        teal: "bg-game-teal border-teal-800 text-black hover:bg-game-teal/80",
        green: "bg-game-green border-green-800 text-black hover:bg-game-green/80",
        outline: "bg-transparent border-2 border-gray-700 text-white hover:border-game-primary hover:text-game-primary",
        destructive: "bg-red-500 border-red-700 text-white hover:bg-red-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1",
        lg: "h-11 px-8 py-3",
        icon: "h-10 w-10",
      },
      hasAnimation: {
        true: "group",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hasAnimation: false,
    },
  }
)

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pixelButtonVariants> {
  asChild?: boolean
}

const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, hasAnimation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(pixelButtonVariants({ variant, size, hasAnimation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
PixelButton.displayName = "PixelButton"

export { PixelButton, pixelButtonVariants }
