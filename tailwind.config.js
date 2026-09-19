/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#176b70',
        'brand-coral': '#f47b63',
        'brand-ink': '#17343a',
        'brand-mint': '#65bfae',
      },
    },
  },
};
