/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'], // ✅ tailwind에서 `font-sans` 쓸 때도 Noto
      },
    },
  },
  plugins: [],
}
