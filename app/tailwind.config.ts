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
        "tertiary": "#000000",
        "outline-variant": "#c6c6cd",
        "on-error": "#ffffff",
        "on-primary-container": "#7c839b",
        "secondary-fixed-dim": "#b7c8e1",
        "error": "#ba1a1a",
        "surface": "#fcf8fa",
        "surface-container": "#f0edef",
        "surface-container-low": "#f6f3f5",
        "secondary-container": "#d0e1fb",
        "secondary-fixed": "#d3e4fe",
        "inverse-primary": "#bec6e0",
        "primary-fixed-dim": "#bec6e0",
        "background": "#fcf8fa",
        "on-primary-fixed": "#131b2e",
        "on-tertiary-fixed": "#271901",
        "primary-container": "#131b2e",
        "tertiary-fixed": "#fcdeb5",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#1b1b1d",
        "on-secondary-fixed": "#0b1c30",
        "tertiary-fixed-dim": "#dec29a",
        "on-surface-variant": "#45464d",
        "surface-variant": "#e4e2e4",
        "surface-bright": "#fcf8fa",
        "on-secondary-container": "#54647a",
        "on-background": "#1b1b1d",
        "on-tertiary-container": "#98805d",
        "inverse-on-surface": "#f3f0f2",
        "on-tertiary-fixed-variant": "#574425",
        "outline": "#76777d",
        "on-secondary": "#ffffff",
        "surface-dim": "#dcd9db",
        "on-error-container": "#93000a",
        "on-primary-fixed-variant": "#3f465c",
        "secondary": "#505f76",
        "on-tertiary": "#ffffff",
        "surface-tint": "#565e74",
        "primary-fixed": "#dae2fd",
        "inverse-surface": "#303032",
        "primary": "#000000",
        "error-container": "#ffdad6",
        "surface-container-highest": "#e4e2e4",
        "on-primary": "#ffffff",
        "on-secondary-fixed-variant": "#38485d",
        "surface-container-high": "#eae7e9",
        "tertiary-container": "#271901"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "stack-gap": "16px",
        "container-padding": "24px",
        "unit": "4px",
        "grid-gutter": "20px",
        "table-cell-padding": "12px 16px"
      },
      fontFamily: {
        "headline-md": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "display-lg": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "title-sm": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "mono-data": ["monospace"]
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
        "display-lg": ["30px", { lineHeight: "38px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "title-sm": ["18px", { lineHeight: "28px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "mono-data": ["13px", { lineHeight: "20px", fontWeight: "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};
export default config;
