/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      chibold: ["chibold", "cursive"],
      patrick: ["Patrick Hand", "cursive"]
    },
    extend: {
       colors: {
         "main": "#91181D",
         "secondary": "#fff"
       }
    },
  },
  plugins: [],
}
