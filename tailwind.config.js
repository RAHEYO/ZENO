/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'foreground': '#ffffff',
        'background': '#292929',
        'bar': '#1B1B1B', // Navbars and stuff
        'primary': '#c0eee4',
        'secondary': '#ffcac8',
        'accent': '#ffe6c7',
        'neutral': '#CFCFCF' // Shared between dark and light modes, often for dividers and stuff
      }
    },
  },
  plugins: [],
}
