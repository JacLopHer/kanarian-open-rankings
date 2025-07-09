/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
         canary: {
          darkgreen: "#1d250f",
          lightgreen: "#81857a",
          white: "#ffffff",
          background: "#fffffe",
          accent: "#131a04",
        },
      },
    },
  },
  plugins: [],
}

