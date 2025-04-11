import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  fontFamily: {
    nunito: ["Nunito", "sans-serif"],
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths according to your folder structure
    "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}", // ShadCN components
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1620px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        destructive: {
          DEFAULT: "#ff4d4f", // your custom red
          foreground: "#fff", // text color
        },
        borderColor: "#DCDCDC",
        primary: "#34C759",
        primaryLight: "#068CFF",
        primaryHover: "#0724ab",
        primaryDark: "#0724AB",
        secondary: "#ECECEC",
        primaryText: "white",
        secondaryText: "#212121",
        darkGray: "#505050",
        warning: "#FF0E0E",
        green: "#2AAA5D",
        colorWhiteFA: "#FAFAFA",
        cardBg: "#F8F8F8",
        lightHover: "#F3F3F3",
        colorStrokeInput: "#CACACA",
        redColor: "#E21B1B",
        notesColor: "#919191",
        notesBgColor: "#E4E4E4",
        placeholderColor: "#A5A5A5",
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
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
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
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".field-sizing-content": {
          "field-sizing": "content",
        },
      });
    }),
  ],
};
