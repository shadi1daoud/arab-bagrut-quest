
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'changa': ['Changa', 'sans-serif'],
				'outfit': ['Outfit', 'sans-serif'],
				'share-tech': ['"Share Tech Mono"', 'monospace'],
				'lexend': ['Lexend Deca', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Updated theme colors with holographic and VisionOS inspiration
				game: {
					primary: '#8056FF',       // Main action (holographic purple)
					secondary: '#5735E1',     // Secondary actions (deep purple)
					accent: '#31F4FF',        // Highlights (electric cyan)
					highlight: '#32FF88',     // Success elements (lime green)
					background: '#0E0E1C',    // Dark base background
					'card-bg': 'rgba(23, 21, 50, 0.65)',     // Card background (semi-transparent)
					'card-bg-alt': 'rgba(30, 27, 62, 0.7)',  // Alternative card background
					'text-primary': '#FFFFFF',  // Main text
					'text-secondary': '#B8B8FF', // Secondary text
					success: '#32FF88',       // Success indicators
					danger: '#F56EFF',        // Danger/error indicators (softer pink)
					info: '#31F4FF',          // Information indicators
					warning: '#FFD700',       // Warning indicators
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px 0px rgba(128, 86, 255, 0.5)',
						opacity: '0.8'
					},
					'50%': { 
						boxShadow: '0 0 15px 5px rgba(128, 86, 255, 0.65)',
						opacity: '1'
					}
				},
				'flash': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'xp-fill': {
					'0%': { width: '0%' },
					'100%': { width: 'var(--progress-value)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'glow': {
					'0%, 100%': { filter: 'drop-shadow(0 0 5px currentColor)' },
					'50%': { filter: 'drop-shadow(0 0 10px currentColor)' }
				},
				'shine': {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				},
				'border-glow': {
					'0%, 100%': { 
						borderColor: 'rgba(80, 70, 230, 0.5)',
						boxShadow: '0 0 5px rgba(80, 70, 230, 0.3)'
					},
					'50%': { 
						borderColor: 'rgba(245, 110, 255, 0.6)',
						boxShadow: '0 0 12px rgba(245, 110, 255, 0.5)'
					}
				},
				'border-rotate': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 0%' }
				},
				'grid-move': {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '20px 20px' }
				},
				'orbit': {
					'0%': { transform: 'rotate(0deg) translateX(6px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(6px) rotate(-360deg)' }
				},
				'counter': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'particles-float': {
					'0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0)' },
					'33%': { transform: 'translateY(-10px) translateX(5px) rotate(2deg)' },
					'66%': { transform: 'translateY(5px) translateX(-5px) rotate(-2deg)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
				'flash': 'flash 2s infinite ease-in-out',
				'xp-fill': 'xp-fill 1s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 3s infinite ease-in-out',
				'glow': 'glow 2.5s infinite ease-in-out',
				'shine': 'shine 3s infinite linear',
				'border-glow': 'border-glow 4s infinite ease-in-out',
				'border-rotate': 'border-rotate 4s linear infinite',
				'grid-move': 'grid-move 20s linear infinite',
				'orbit': 'orbit 4s infinite linear',
				'counter': 'counter 0.5s forwards ease-out',
				'particles-float': 'particles-float 15s infinite ease-in-out'
			},
			// Add backdrop blur utilities
			backdropBlur: {
				xs: '2px',
				'2xl': '25px',
				'3xl': '35px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
