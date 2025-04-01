
import * as React from "react"

import { cn } from "@/lib/utils"

const PixelCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'dirt' | 'stone' | 'wood' | 'obsidian' | 'default' }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    dirt: "bg-amber-800 border-amber-900",
    stone: "bg-gray-600 border-gray-800",
    wood: "bg-amber-600 border-amber-800",
    obsidian: "bg-purple-900 border-purple-950",
    default: "bg-gray-800/90 border-gray-900"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-none border-2 text-white shadow-md",
        variantClasses[variant],
        className
      )}
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
      "text-xl font-minecraft leading-none tracking-wider text-orange-400 uppercase",
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
