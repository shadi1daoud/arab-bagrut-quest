
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:translate-y-[-2px] active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-[#00D9FF] text-[#0C0E1A] hover:bg-[#00c0e0] shadow-md hover:shadow-lg hover:shadow-[0_4_14px_rgba(0,0,0,0.35)]",
        destructive:
          "bg-red-500 text-destructive-foreground hover:bg-red-600",
        outline:
          "border border-[#00D9FF] bg-transparent text-[#00D9FF] hover:bg-[#00D9FF]/10",
        secondary:
          "bg-[#00D9FF]/80 text-[#0C0E1A] hover:bg-[#00D9FF]",
        ghost: "hover:bg-[#00D9FF]/10 text-[#00D9FF]",
        link: "text-[#00D9FF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-xl px-3 text-xs",
        lg: "h-11 rounded-xl px-8",
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
