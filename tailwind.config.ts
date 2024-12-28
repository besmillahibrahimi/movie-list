import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      spacing: {
        gutter: "24px",
      },
      maxWidth: {
        container: "1440px",
      },
      margin: {
        grid: "120px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        "heading-1": ["4rem", { lineHeight: "5rem", letterSpacing: "0" }], // 64px / 80px
        "heading-2": ["3rem", { lineHeight: "3.5rem", letterSpacing: "0" }], // 48px / 56px
        "heading-3": ["2rem", { lineHeight: "2.5rem", letterSpacing: "0" }], // 32px / 40px
        "heading-4": ["1.5rem", { lineHeight: "2rem", letterSpacing: "0" }], // 24px / 32px
        "heading-5": ["1.25rem", { lineHeight: "1.5rem", letterSpacing: "0" }], // 20px / 24px
        "heading-6": ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }], // 16px / 24px
        "body-large": ["1.25rem", { lineHeight: "2rem", letterSpacing: "0" }], // 20px / 32px
        "body-regular": ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }], // 16px / 24px
        "body-small": ["0.875rem", { lineHeight: "1.5rem", letterSpacing: "0" }], // 14px / 24px
        "body-xs": ["0.75rem", { lineHeight: "1.5rem", letterSpacing: "0" }], // 12px / 24px
        caption: ["0.875rem", { lineHeight: "1rem", letterSpacing: "0" }], // 14px / 16px
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
