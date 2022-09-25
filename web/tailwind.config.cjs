/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    themw: {
      fontFamily: {
        sans: ['Inter','sans-sarif']
      }
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.69deg, #9572FC 57.08% #43E7AD 33.94%, #E1D55D 10.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.80%)',
      },
    },
  },
  plugins: [],
}