import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#e64980',
        text: '#343a40',
        bgColor: '#adb5bd',
        border: '#adb5bd',
      },
      padding: {
        p5: '5px',
        p10: '10px',
        p20: '20px',
        p30: '30px',
        p50: '50px',
      },
      gap: {
        g10: '10px',
        g20: '20px',
      },
      margin: {
        m10: '10px',
        m20: '20px',
        m30: '30px',
        m40: '40px',
        m50: '50px',
        m80: '80px',
        
      },
      animation: {
        fadeInOut: 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
