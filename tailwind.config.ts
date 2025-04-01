
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
				minecraft: ['"Press Start 2P"', 'monospace'],
				vt323: ['VT323', 'monospace'],
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
				// Minecraft theme colors
				minecraft: {
					primary: '#FF5500',
					secondary: '#FF7733',
					accent: '#FFCC00',
					background: '#0F1215',
					'card-bg': '#171C21',
					'text-primary': '#FFFFFF',
					'text-secondary': '#A1A1AA',
					success: '#22DD88',
					danger: '#FF3366',
					info: '#33AAFF',
					warning: '#FFAA33',
					// Block colors
					dirt: '#8B5A2B',
					stone: '#7D7D7D',
					grass: '#5DA130',
					'grass-top': '#91BD59',
					wood: '#9F703A',
					leaves: '#3A5E25',
					water: '#2F5DC6',
					lava: '#D75908',
					obsidian: '#1F1347',
					bedrock: '#252525',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px 0px #FF5500',
						opacity: '0.8'
					},
					'50%': { 
						boxShadow: '0 0 15px 5px #FF5500',
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
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				},
				'pixelated-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'pixel-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'block-place': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
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
				'shimmer': 'shimmer 3s infinite linear',
				'pixelated-pulse': 'pixelated-pulse 1s steps(2) infinite',
				'pixel-bounce': 'pixel-bounce 0.5s infinite steps(2)',
				'block-place': 'block-place 0.3s ease-out'
			},
			backgroundImage: {
				'dirt-pattern': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApElEQVQ4T2NkoBAwUqifAbcB/2EA3SJsMsR4AqcX0A1Al2CNXOyaQQDDAOxhgB42hAJKQnEo9wTpYcDwAqE0QGxCImQoxRpABmAzBJch2NIAzgBENwRbIGKLA9wGYDOEUCDi9AK6AbgSESyQCcUFOAMR3RBceQGbIdgCE6sBuAxBNgRXYGIMRFyG4AtsrLGAHIjYEhKuxITTC+gGUJwbiXYB1QwAAACb0iJEDLO7VAAAAABJRU5ErkJggg==')",
				'stone-pattern': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASElEQVQ4T2NkoBAwUqifgWQDQJpramqIci5y/MM1EW0AofAgZAhFBqAHFnJ6QY9ndEOIjgVCsYCc+ISCk2QvIBtCUUJCNgAA1K4cEVm0kYMAAAAASUVORK5CYII=')",
				'grass-pattern': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnklEQVQ4T52TyxHAIAhEOdMCKcpeSPH0Zia6wbAPTfYkCo8FY8zbWutzpZRzGGNOvQYopdxCiE+CC8BWwBhzZubNOXcUCdj3vRPw2FqfGKAHoHU0Ywt472slVKUUeQSt5KGALaUQQYvGVgr9nVIC6O/AxEIIrfN7J4jIwt5ZAVJrZ/VCKPsGw30DM+FIV28xT2BgJnAA1sq/AVB5FeYvghdtCywRHqbUvAAAAABJRU5ErkJggg==')",
				'obsidian-pattern': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVQ4T2NkoBAwUqifAacB////J9pSRkZG7AagG0KMAQQNQDaEWANwGoDNEFIMwGsAsiGkGkDQAJAhpBhA0ACQIaQaQNQgImbooxtA1DCglicoTsrEpgV0A6ieF6hqAAD35S8RixLmwwAAAABJRU5ErkJggg==')",
				'wood-pattern': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnElEQVQ4T2NkgID/DAwMjFBaAYgdgPgFEIPYD4GYGYgZkAG6ZpBGYjQRZQBM8////zOANCJrRjcM3RCsBhBjCFYD8BkCMgCXZpwG4DIEqwGEDEE2AKdhWA0gZAjMAKyGYTOAGEOQDcBqGLoBxBoCMgCrYegGkGIIsgG4DYAZQKohyAbgNARkQA2yIaQagmwATkOQNQIAI/IvEbWlLB4AAAAASUVORK5CYII=')",
				'hero-pattern': "url('/lovable-uploads/94fe6055-e6c6-45e4-9417-a528e701d1f6.png')",
				'minecraft-dirt': "url('/lovable-uploads/45021bdb-020e-4bbb-994c-a3ee3a2247bd.png')",
				'minecraft-stone': "url('/lovable-uploads/a1720fdf-6a93-4286-beb9-490341339f14.png')",
				'minecraft-grass': "url('/lovable-uploads/4d57e7ee-a6ad-43e6-a5f2-31128650a71b.png')",
				'minecraft-pattern': "url('/lovable-uploads/d98cc1f4-a7d5-475a-b052-0f55de4f75c7.png')",
				'minecraft-character': "url('/lovable-uploads/4a94efb7-b0d5-465d-8a6d-555d8d853904.png')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
