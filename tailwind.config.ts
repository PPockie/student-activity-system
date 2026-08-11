import type { Config } from 'tailwindcss'
import { fontStack, gradients, palette, radius } from './src/styles/theme'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: palette.surface,
        primary: palette.primary,
        accent: palette.accent,
        ink: palette.ink,
        success: palette.success,
        warning: palette.warning,
        danger: palette.danger,
      },
      fontFamily: {
        sans: [...fontStack],
        heading: [...fontStack],
      },
      backgroundImage: {
        'brand-gradient': gradients.brand,
      },
      borderRadius: radius,
      keyframes: {
        /* เส้นกวาดในกรอบสแกน QR */
        'scan-line': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
      },
      animation: {
        'scan-line': 'scan-line 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}

export default config
