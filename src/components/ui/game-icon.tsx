
import React from 'react';
import { cn } from '@/lib/utils';

interface GameIconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'coin' | 'fire' | 'sparkle' | 'trophy' | 'xp' | 'level' | 'heart' | 'star';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const GameIcon = React.forwardRef<HTMLDivElement, GameIconProps>(
  ({ type, size = 'md', animated = true, className, ...props }, ref) => {
    const sizeClass = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
    };

    const renderIcon = () => {
      switch (type) {
        case 'coin':
          return (
            <div 
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-game-accent border border-amber-800 text-amber-900 font-bold",
                animated && "animate-coin-spin",
                sizeClass[size],
                size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-7 h-7'
              )}
            >
              $
            </div>
          );
        case 'fire':
          return (
            <div 
              className={cn(
                "inline-flex items-center justify-center text-orange-500",
                animated && "animate-fire-flicker",
                sizeClass[size]
              )}
            >
              🔥
            </div>
          );
        case 'sparkle':
          return (
            <div 
              className={cn(
                "inline-flex items-center justify-center text-game-accent",
                animated && "animate-sparkle",
                sizeClass[size]
              )}
            >
              ✨
            </div>
          );
        case 'trophy':
          return (
            <div 
              className={cn(
                "inline-flex items-center justify-center text-game-accent",
                animated && "animate-pulse",
                sizeClass[size]
              )}
            >
              🏆
            </div>
          );
        case 'xp':
          return (
            <div 
              className={cn(
                "inline-flex items-center justify-center text-game-green font-minecraft",
                animated && "animate-pulse",
                sizeClass[size]
              )}
            >
              XP
            </div>
          );
        case 'level':
          return (
            <div 
              className={cn(
                "inline-flex items-center justify-center bg-game-secondary px-2 py-1 text-white border-2 border-gray-900 font-minecraft",
                sizeClass[size]
              )}
            >
              LVL
            </div>
          );
        case 'heart':
          return (
            <div 
              className={cn(
                "inline-flex items-center justify-center text-game-primary",
                animated && "animate-pulse",
                sizeClass[size]
              )}
            >
              ❤️
            </div>
          );
        case 'star':
          return (
            <div 
              className={cn(
                "inline-flex items-center justify-center text-game-accent",
                animated && "animate-pulse",
                sizeClass[size]
              )}
            >
              ⭐
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div 
        ref={ref} 
        className={cn("inline-block", className)} 
        {...props}
      >
        {renderIcon()}
      </div>
    );
  }
);

GameIcon.displayName = 'GameIcon';

export { GameIcon };
