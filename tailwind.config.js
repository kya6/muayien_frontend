/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        brand: {
          primary:    '#39EB92',
          secondary:  '#09502C',
          secondary2: '#12884D',
          secondary3: '#9DFFCE',
          bg:         '#0D2117',
        },
        surface: {
          DEFAULT: '#122B1F',
          raised:  '#163524',
          subtle:  '#0F2519',
        },
      },
      boxShadow: {
        soft:  '0 1px 2px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)',
        glow:  '0 0 0 1px rgba(57, 235, 146, 0.18), 0 8px 24px -8px rgba(57, 235, 146, 0.25)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(57,235,146,0.12) 0%, rgba(13,33,23,0) 70%)',
      },
    },
  },
  plugins: [],
}
