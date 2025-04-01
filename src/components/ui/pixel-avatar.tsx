
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const PixelAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    variant?: 'default' | 'primary' | 'gold' | 'teal' | 'green';
    glow?: boolean;
  }
>(({ className, variant = 'default', glow = false, ...props }, ref) => {
  const variantBorder = {
    default: "border-game-border",
    primary: "border-game-primary",
    gold: "border-game-accent",
    teal: "border-game-teal",
    green: "border-game-green",
  };

  const glowEffect = glow ? {
    default: "0 0 10px rgba(51, 46, 89, 0.7)",
    primary: "0 0 10px rgba(255, 60, 128, 0.7)",
    gold: "0 0 10px rgba(255, 184, 0, 0.7)",
    teal: "0 0 10px rgba(0, 255, 213, 0.7)",
    green: "0 0 10px rgba(163, 255, 18, 0.7)",
  } : null;

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-none border-2 pixel-art",
        variantBorder[variant],
        glow && "animate-pulse-glow",
        className
      )}
      style={{
        boxShadow: glowEffect ? glowEffect[variant] : undefined,
        imageRendering: "pixelated"
      }}
      {...props}
    />
  );
});
PixelAvatar.displayName = AvatarPrimitive.Root.displayName;

const PixelAvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
PixelAvatarImage.displayName = AvatarPrimitive.Image.displayName;

const PixelAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    variant?: 'default' | 'primary' | 'gold' | 'teal' | 'green';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantBg = {
    default: "bg-game-secondary",
    primary: "bg-game-primary/50",
    gold: "bg-game-accent/50",
    teal: "bg-game-teal/50",
    green: "bg-game-green/50",
  };

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center font-minecraft text-white",
        variantBg[variant],
        className
      )}
      {...props}
    />
  );
});
PixelAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { PixelAvatar, PixelAvatarImage, PixelAvatarFallback };
