
import * as React from "react"

import { cn } from "@/lib/utils"

// Add support for rarity style prop
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, rarity, ...props }, ref) => {
  // Generate rarity-specific styling
  const rarityStyles = rarity ? getRarityStyles(rarity) : '';
  
  return (
    <div
      ref={ref}
      className={cn(
        "bg-black/40 backdrop-blur-md rounded-xl border border-white/5 shadow-lg overflow-hidden hover:shadow-[0_0_20px_rgba(255,72,0,0.15)] transition-shadow animate-scale-in relative",
        rarityStyles,
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1 p-3", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-bold leading-none tracking-tight font-['Outfit'] truncate text-white",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-[var(--color-text-muted)] font-['Lexend_Deca']", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-3 flex-1 flex flex-col", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-black/90 p-3 flex items-center justify-between border-t border-white/10", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Helper function to get rarity-specific styling
function getRarityStyles(rarity: 'common' | 'rare' | 'epic' | 'legendary'): string {
  switch(rarity) {
    case 'legendary':
      return 'border-game-legendary/80 shadow-[0_0_15px_rgba(255,215,0,0.3)]';
    case 'epic':
      return 'border-game-epic/80 shadow-[0_0_15px_rgba(163,53,238,0.3)]';
    case 'rare':
      return 'border-game-rare/80 shadow-[0_0_15px_rgba(0,112,221,0.3)]';
    default: // common
      return 'border-game-common/80 shadow-[0_0_10px_rgba(157,157,157,0.2)]';
  }
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
