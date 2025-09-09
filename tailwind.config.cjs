// tailwind.config.cjs
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brix: {
          50:  "#EEF6FC",
          100: "#D8EAF7",
          200: "#B7D8F0",
          300: "#95C6E8",
          400: "#74B3DE",
          500: "#4B9CD3",
          600: "#2C82BA", 
          700: "#206A9A",
          800: "#1A557B",
          900: "#153F5B"
        }
      },
      boxShadow: {
        brix: "0 10px 20px rgba(75,156,211,0.25)"
      },
      ringColor: {
        brix: "#4B9CD3"
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        scroll: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(10px)',
          },
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        scroll: 'scroll 1.5s ease-in-out infinite',
      },
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
}