/* Qpaix design tokens for Tailwind (Play CDN).
   Load order on every page:
   1. <script src="https://cdn.tailwindcss.com/3.4.16"></script>
   2. <script src="js/tailwind-config.js"></script>
   Later we switch to the Tailwind CLI build and move this into tailwind.config.js. */
tailwind.config = {
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // Brand navy, built around the logo colour #042439 (navy-900)
        navy: {
          50: '#EEF4F8',
          100: '#D6E3EC',
          200: '#ADC7D9',
          300: '#7FA5BF',
          400: '#4F7C9C',
          500: '#2A5A7C',
          600: '#134264',
          700: '#0B3A5C',
          800: '#072E4A',
          900: '#042439',
          950: '#021624',
        },
        // Accent cyan for CTAs, links and highlights
        accent: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
        },
        ink: '#0F172A',   // main text
        muted: '#64748B', // secondary text
        line: '#E2E8F0',  // borders
        canvas: '#F5F8FB' // light section background
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(4,36,57,.04), 0 4px 16px rgba(4,36,57,.06)',
        lift: '0 8px 30px rgba(4,36,57,.12)',
        glow: '0 0 0 4px rgba(6,182,212,.18)',
      },
    },
  },
};
