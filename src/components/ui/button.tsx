
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:translate-y-[-2px] active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-500 to-blue-500 text-primary-foreground hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/40 hover:brightness-110",
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-500 text-destructive-foreground hover:bg-destructive/90 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 hover:brightness-110",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-gradient-to-r from-cyan-400 to-blue-500 text-secondary-foreground hover:brightness-110 shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/40",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
