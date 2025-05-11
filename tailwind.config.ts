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
				'noto-arabic': ['"Noto Sans Arabic"', 'sans-serif'],
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
				
				// Improved game theme colors with consistent naming
				game: {
					primary: '#FF4800',       // Main action color (cosmic orange)
					secondary: '#CC3900',     // Secondary actions (darker orange)
					accent: '#FFA56E',        // Highlights and accents
					background: '#0E0E0E',    // Deep space background
					foreground: '#E9E9E9',    // Main text color
					'foreground-muted': '#B5B5B5', // Secondary text color
					
					// Card styles
					'card-bg': 'rgba(255,255,255,0.05)',     // Card background (glass)
					'card-bg-hover': 'rgba(255,255,255,0.08)',  // Card hover
					'card-bg-alt': 'rgba(20,20,25,0.5)',      // Alternative card background
					'card-border': 'rgba(255,255,255,0.1)',    // Card border
					
					// Status colors
					success: '#4CAF50',
					warning: '#FF9800', 
					error: '#F44336',
					info: '#03A9F4',
					
					// Rarity colors
					legendary: '#FFD700',
					epic: '#A335EE',
					rare: '#0070DD',
					common: '#9D9D9D',
				},
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
						boxShadow: '0 0 5px 0px rgba(255, 72, 0, 0.5)',
						opacity: '0.8'
					},
					'50%': { 
						boxShadow: '0 0 15px 5px rgba(255, 72, 0, 0.65)',
						opacity: '1'
					}
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
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'progress-shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'particles-float': {
					'0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0)' },
					'33%': { transform: 'translateY(-10px) translateX(5px) rotate(2deg)' },
					'66%': { transform: 'translateY(5px) translateX(-5px) rotate(-2deg)' },
				},
				'border-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'portal-shimmer': {
					'0%': { opacity: '0.5', transform: 'scale(0.95)' },
					'50%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0.5', transform: 'scale(0.95)' }
				},
				'portal-pulse': {
					'0%, 100%': { boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.3)' },
					'50%': { boxShadow: '0 0 30px 5px rgba(255, 255, 255, 0.6)' }
				},
			},
			animation: {
				
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
				'float': 'float 3s infinite ease-in-out',
				'glow': 'glow 2.5s infinite ease-in-out',
				'shine': 'shine 3s infinite linear',
				'scale-in': 'scale-in 0.3s ease-out',
				'particles-float': 'particles-float 15s infinite ease-in-out',
				'border-rotate': 'border-rotate 12s linear infinite',
				'portal-shimmer': 'portal-shimmer 3s ease-in-out infinite',
				'portal-pulse': 'portal-pulse 4s ease-in-out infinite',
			},
			backdropBlur: {
				xs: '2px',
				'2xl': '25px',
				'3xl': '35px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
