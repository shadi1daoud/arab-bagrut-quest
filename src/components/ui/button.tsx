
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#FF4800] to-[#CC3900] text-white hover:shadow-[0_0_15px_rgba(255,72,0,0.4)] hover:-translate-y-0.5 active:translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[rgba(255,72,0,0.3)] bg-[var(--color-glass-bg)] text-[var(--color-accent-primary)] hover:bg-[rgba(255,72,0,0.1)] hover:border-[var(--color-accent-primary)] hover:shadow-[0_0_12px_rgba(255,72,0,0.2)]",
        secondary:
          "bg-[var(--color-glass-bg)] text-white border border-white/10 hover:bg-white/10",
        ghost: "hover:bg-white/5 hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-[var(--color-accent-primary)]",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-xl",
        lg: "h-11 px-8 rounded-2xl",
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
      >
        {props.children}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
