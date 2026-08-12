import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#4F46E5", // Indigo 600
        "primary-hover": "#4338CA", // Indigo 700
        "primary-light": "#E0E7FF", // Indigo 100
        "secondary": "#7C3AED", // Violet 600
        "secondary-hover": "#6D28D9", // Violet 700
        "secondary-container": "#EDE9FE", // Violet 100
        "on-secondary-container": "#5B21B6", // Violet 800
        
        "background": "#F8FAFC", // Slate 50 - very light blue-gray
        "surface": "#FFFFFF", // Pure white for cards
        "surface-container": "#F1F5F9", // Slate 100
        "surface-container-low": "#F8FAFC",
        "surface-container-lowest": "#FFFFFF",
        "surface-variant": "#E2E8F0", // Slate 200
        "outline-variant": "#CBD5E1", // Slate 300
        "outline": "#94A3B8", // Slate 400
        
        "on-surface": "#0F172A", // Slate 900
        "on-surface-variant": "#475569", // Slate 600
        "on-background": "#0F172A",
        "on-primary": "#FFFFFF",
        
        "error": "#EF4444",
        "error-container": "#FEE2E2",
        "on-error-container": "#991B1B",
        
        "success": "#10B981",
        "success-container": "#D1FAE5",
        "on-success-container": "#065F46",

        "warning": "#F59E0B",
        "warning-container": "#FEF3C7",
        "on-warning-container": "#92400E",
      },
      boxShadow: {
        'soft-sm': '0 2px 4px 0 rgba(148, 163, 184, 0.1), 0 1px 2px -1px rgba(148, 163, 184, 0.1)',
        'soft-md': '0 4px 6px -1px rgba(148, 163, 184, 0.1), 0 2px 4px -2px rgba(148, 163, 184, 0.1)',
        'soft-xl': '0 20px 25px -5px rgba(148, 163, 184, 0.15), 0 8px 10px -6px rgba(148, 163, 184, 0.1)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.3)',
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "full": "9999px"
      },
      spacing: {
        "stack-gap": "1.5rem",
        "container-padding": "2rem",
        "unit": "0.25rem",
        "grid-gutter": "1.5rem",
        "table-cell-padding": "1rem 1.25rem"
      },
      fontFamily: {
        // We will load Outfit for headings and Inter for body in layout.tsx
        "display-lg": ["var(--font-outfit)", "sans-serif"],
        "headline-md": ["var(--font-outfit)", "sans-serif"],
        "title-sm": ["var(--font-outfit)", "sans-serif"],
        
        "body-md": ["var(--font-inter)", "sans-serif"],
        "body-sm": ["var(--font-inter)", "sans-serif"],
        "label-caps": ["var(--font-inter)", "sans-serif"],
        
        "mono-data": ["var(--font-jetbrains-mono)", "monospace"]
      },
      fontSize: {
        "display-lg": ["36px", { lineHeight: "44px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "headline-md": ["28px", { lineHeight: "36px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "title-sm": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.06em", fontWeight: "600", textTransform: "uppercase" }],
        "mono-data": ["13px", { lineHeight: "20px", fontWeight: "500" }]
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          'from': { backgroundPosition: '200% 0' },
          'to': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};
export default config;
