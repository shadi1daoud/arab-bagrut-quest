
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
				// Game theme colors - refined for Neo-Arena style
				game: {
					primary: '#FF4293',       // Main action (hot pink)
					secondary: '#7122E3',     // Secondary actions (deep purple)
					accent: '#00FFE1',        // Highlights (electric cyan)
					highlight: '#32FF88',     // Success elements (lime green)
					background: '#0F0C1D',    // Dark base background
					'card-bg': '#171532',     // Card background
					'card-bg-alt': '#1E1B3E', // Alternative card background
					'text-primary': '#FFFFFF',  // Main text
					'text-secondary': '#B8B8FF', // Secondary text
					success: '#32FF88',       // Success indicators
					danger: '#FF4293',        // Danger/error indicators
					info: '#00FFE1',          // Information indicators
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
						boxShadow: '0 0 5px 0px #FF4293',
						opacity: '0.8'
					},
					'50%': { 
						boxShadow: '0 0 15px 5px #FF4293',
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
				'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
				'flash': 'flash 2s infinite ease-in-out',
				'xp-fill': 'xp-fill 1s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 3s infinite ease-in-out',
				'glow': 'glow 2s infinite ease-in-out',
				'shine': 'shine 3s infinite linear',
				'border-rotate': 'border-rotate 4s linear infinite',
				'grid-move': 'grid-move 20s linear infinite',
				'orbit': 'orbit 4s infinite linear',
				'counter': 'counter 0.5s forwards ease-out',
				'particles-float': 'particles-float 15s infinite ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
