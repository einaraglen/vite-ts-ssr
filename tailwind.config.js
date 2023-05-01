/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        seaonics: {
          50: "#FFF",
          100: "#def0f4",
          200: "#cde8ed",
          300: "#b9e0e7",
          400: "#579aa6",
          500: "#007888",
          600: "#005469",
          700: "#003446",
          800: "#002a38",
          900: "#001f2a"
        },
        primary: {
          50: "#f0809a",
          100: "#ec6685",
          200: "#e94d71",
          300: "#e6335d",
          400: "#e31a48",
          500: "#e00034",
          600: "#ca002f",
          700: "#b3002a",
          800: "#9d0024",
          900: "#86001f"
        }
      },
    },
  },
  plugins: [],
}

