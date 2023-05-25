/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'spooky-orange': '#FF7300',
        'spooky-black': '#171719',
        'spooky-blue': '#262A56'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      noto: ["Noto Sans Thai", "sans-serif"]
    },
    width: {
      // Add your custom width values here
      '128': '32rem', // Example: width-128 will be 32rem
        '144': '36rem', // Example: width-144 will be 36rem
        '160': '40rem', // Example: width-160 will be 40rem
        '192': '48rem', // Example: width-192 will be 48rem
        '200': '56rem', // Example: width-200 will be 56rem
        '256': '64rem', // Example: width-256 will be 64rem
        '320': '80rem', // Example: width-320 will be 80rem
      // Add more custom width values as needed
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
