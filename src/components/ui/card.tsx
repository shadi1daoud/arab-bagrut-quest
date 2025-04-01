
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
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
      "text-2xl font-semibold leading-none tracking-tight",
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
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Minecraft style cards
const MinecraftCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'dirt' | 'stone' | 'grass' | 'wood' | 'obsidian' | 'default' }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    dirt: "bg-minecraft-dirt border-amber-900 before:bg-dirt-pattern",
    stone: "bg-minecraft-stone border-gray-800 before:bg-stone-pattern",
    grass: "bg-minecraft-grass border-green-800 before:bg-grass-pattern",
    wood: "bg-amber-700 border-amber-900 before:bg-wood-pattern",
    obsidian: "bg-purple-900 border-purple-950 before:bg-obsidian-pattern",
    default: "bg-gray-800 border-gray-900"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-none border-2 p-4 text-white shadow-md relative before:absolute before:inset-0 before:opacity-30 before:content-[''] before:z-0",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        {props.children}
      </div>
    </div>
  )
})
MinecraftCard.displayName = "MinecraftCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  MinecraftCard 
}
