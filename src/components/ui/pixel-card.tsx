
import * as React from "react"

import { cn } from "@/lib/utils"

const PixelCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    variant?: 'default' | 'primary' | 'secondary' | 'gold' | 'teal' | 'green',
    glow?: boolean
  }
>(({ className, variant = 'default', glow = false, ...props }, ref) => {
  const variantClasses = {
    default: "bg-game-card border-game-border",
    primary: "bg-game-card border-game-primary",
    secondary: "bg-game-card border-game-secondary",
    gold: "bg-game-card border-game-accent",
    teal: "bg-game-card border-game-teal",
    green: "bg-game-card border-game-green"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-none border-2 text-white shadow-md relative",
        variantClasses[variant],
        glow && "animate-pulse-glow",
        className
      )}
      style={{
        boxShadow: glow ? 
          variant === 'primary' ? "0 0 10px rgba(255, 60, 128, 0.5)" :
          variant === 'secondary' ? "0 0 10px rgba(51, 46, 89, 0.5)" :
          variant === 'gold' ? "0 0 10px rgba(255, 184, 0, 0.5)" :
          variant === 'teal' ? "0 0 10px rgba(0, 255, 213, 0.5)" :
          variant === 'green' ? "0 0 10px rgba(163, 255, 18, 0.5)" :
          "0 0 10px rgba(51, 46, 89, 0.5)" : "",
      }}
      {...props}
    />
  )
})
PixelCard.displayName = "PixelCard"

const PixelCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4 border-b-2 border-gray-700", className)}
    {...props}
  />
))
PixelCardHeader.displayName = "PixelCardHeader"

const PixelCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-minecraft leading-none tracking-wider text-game-accent uppercase",
      className
    )}
    {...props}
  />
))
PixelCardTitle.displayName = "PixelCardTitle"

const PixelCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-400 font-minecraft", className)}
    {...props}
  />
))
PixelCardDescription.displayName = "PixelCardDescription"

const PixelCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4", className)} {...props} />
))
PixelCardContent.displayName = "PixelCardContent"

const PixelCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0", className)}
    {...props}
  />
))
PixelCardFooter.displayName = "PixelCardFooter"

export { 
  PixelCard, 
  PixelCardHeader, 
  PixelCardFooter, 
  PixelCardTitle, 
  PixelCardDescription, 
  PixelCardContent 
}
