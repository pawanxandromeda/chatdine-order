import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsla(220, 17%, 90%, 0.6)",
        input: "hsla(220, 4%, 84%, 0.80)",
        ring: "hsl(var(--ring))",
        background: "hsl(210, 20%, 98%)",
        foreground: "hsl(220, 25%, 10%)",
        primary: {
          DEFAULT: "hsl(210, 100%, 52%)", // Blue
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsla(210, 50%, 92%, 0.8)", // Blue-tinted
          foreground: "hsl(220, 25%, 10%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        muted: {
          DEFAULT: "hsla(210, 50%, 92%, 0.6)", // blue-muted
          foreground: "hsl(220, 10%, 40%)",
        },
        accent: {
          DEFAULT: "hsl(210, 100%, 52%)",  // blue
          foreground: "hsl(0, 0%, 100%)",
        },
        "gray-accent": {
    DEFAULT: "hsla(0, 0%, 60%, 1.00)",         // Light gray
    foreground: "hsl(220, 25%, 10%)",   // Dark text
    glass: "hsla(0, 0%, 90%, 0.25)",    // Semi-transparent glass effect
    elevated: "hsla(0, 0%, 90%, 0.95)", // Elevated overlay
  },
        popover: {
          DEFAULT: "hsla(0, 0%, 100%, 0.9)",
          foreground: "hsl(220, 25%, 10%)",
        },
        card: {
    DEFAULT: "hsla(0, 0%, 92%, 1.00)",          // Use gray-accent DEFAULT
    foreground: "hsl(220, 25%, 10%)",    // Use gray-accent foreground
    glass: "hsla(0, 0%, 90%, 0.25)",     // Use gray-accent glass
    elevated: "hsla(0, 0%, 90%, 0.95)",  // Use gray-accent elevated
  },
        sidebar: {
          DEFAULT: "hsla(0, 0%, 100%, 0.8)",
          foreground: "hsl(220, 25%, 10%)",
          primary: "hsl(210, 100%, 52%)", // blue
          "primary-foreground": "hsl(0, 0%, 100%)",
          accent: "hsl(210, 100%, 52%)", // blue
          "accent-foreground": "hsl(0, 0%, 100%)",
          border: "hsla(220, 17%, 90%, 0.6)",
          ring: "hsl(210, 100%, 52%)",
        },
        // Premium gradient colors
        gradient: {
          start: "hsla(0, 0%, 100%, 0.9)",
          end: "hsla(210, 50%, 98%, 0.8)", // blue gradient
          glass: "hsla(0, 0%, 100%, 0.2)",
          glassDark: "hsla(220, 20%, 10%, 0.2)",
        }
      },
      borderRadius: {
        xl: "28px",
        lg: "20px",
        md: "16px",
        sm: "12px",
        pill: "100px",
      },
      boxShadow: {
        "card-light": "0 8px 40px hsla(220, 25%, 10%, 0.08), 0 2px 12px hsla(220, 25%, 10%, 0.04)",
        "card-dark": "0 8px 40px hsla(0, 0%, 0%, 0.25), 0 2px 12px hsla(0, 0%, 0%, 0.15)",
        "card-glow": "0 8px 40px hsla(210, 100%, 52%, 0.15), 0 2px 12px hsla(210, 100%, 52%, 0.08)", // blue glow
        "glass-light": "0 8px 32px hsla(220, 25%, 10%, 0.1), 0 2px 8px hsla(220, 25%, 10%, 0.05), inset 0 1px 0 hsla(0, 0%, 100%, 0.8)",
        "glass-dark": "0 8px 32px hsla(0, 0%, 0%, 0.3), 0 2px 8px hsla(0, 0%, 0%, 0.2), inset 0 1px 0 hsla(0, 0%, 100%, 0.1)",
        "premium": "0 25px 50px -12px hsla(220, 25%, 10%, 0.15), 0 8px 24px -8px hsla(220, 25%, 10%, 0.1), inset 0 1px 0 hsla(0, 0%, 100%, 0.9)",
        "depth": "0 20px 60px hsla(220, 25%, 10%, 0.12), 0 8px 32px hsla(220, 25%, 10%, 0.08)",
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsla(210, 100%, 52%, 0.3)" },
          "50%": { boxShadow: "0 0 30px hsla(210, 100%, 52%, 0.5)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
  "card-gradient": "linear-gradient(135deg, hsla(0, 0%, 100%, 0.9) 0%, hsla(210, 50%, 98%, 0.8) 100%)",
  "glass-gradient": "linear-gradient(135deg, hsla(0, 0%, 100%, 0.25) 0%, hsla(0, 0%, 100%, 0.1) 100%)",
  "premium-gradient": "linear-gradient(145deg, hsla(0, 0%, 100%, 0.95) 0%, hsla(210, 60%, 92%, 0.9) 50%, hsla(210, 55%, 88%, 0.85) 100%)",
  "radial-glow": "radial-gradient(ellipse at center, hsla(210, 100%, 52%, 0.1) 0%, transparent 70%)",
},

    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
