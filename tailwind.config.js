/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ts: {
          background: 'rgb(var(--theme-background) / <alpha-value>)',
          secondary: 'rgb(var(--theme-secondary) / <alpha-value>)',
          'deep-gray': 'rgb(var(--theme-deep-gray) / <alpha-value>)',
          'light-gray': 'rgb(var(--theme-light-gray) / <alpha-value>)',
          gray: 'rgb(var(--theme-gray) / <alpha-value>)',
          success: 'rgb(var(--theme-success) / <alpha-value>)',
          error: 'rgb(var(--theme-error) / <alpha-value>)',
        },
      },
      fontFamily: {
        roboto: [
          '"Roboto Mono", monospace',
          {
            fontVariationSettings: '"opsz" auto',
          },
        ],
      },
    },
  },
  plugins: [],
};
