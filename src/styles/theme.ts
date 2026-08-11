export const palette = {
  /** 60% — page / surface background */
  surface: {
    DEFAULT: '#FBF8FF',
    50: '#FFFFFF',
    100: '#FBF8FF',
    200: '#F3ECFC',
    300: '#E8DEF8',
    400: '#D6C9EF',
    500: '#BCACDF',
  },

  /** 30% — brand primary */
  primary: {
    50: '#F4F1FD',
    100: '#E6E0FA',
    200: '#CEC3F5',
    300: '#B0A0ED',
    400: '#8E71E1',
    500: '#714BD5',
    600: '#5A37CE',
    700: '#4A2CAB',
    800: '#3C2489',
    900: '#2F1C6B',
    950: '#1E1245',
    DEFAULT: '#714BD5',
  },

  /** 10% — accent / highlight */
  accent: {
    50: '#FBF2FF',
    100: '#F5E3FF',
    200: '#EBC7FF',
    300: '#DDA5FF',
    400: '#C34AFF',
    500: '#B32DF5',
    600: '#9B1CD8',
    700: '#7F16B0',
    800: '#67148D',
    900: '#521070',
    950: '#350547',
    DEFAULT: '#C34AFF',
  },

  /** Neutral text / border ramp (violet-tinted grays) */
  ink: {
    50: '#F7F6FA',
    100: '#ECEAF2',
    200: '#DAD6E4',
    300: '#BEB8CD',
    400: '#9A93AE',
    500: '#7B7391',
    600: '#615A75',
    700: '#4C4760',
    800: '#332E45',
    900: '#1D1930',
    DEFAULT: '#1D1930',
  },

  /** Semantic status colors */
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
  info: '#714BD5',
} as const

/** Brand gradient (the solid swatch in the design sheet) */
export const gradients = {
  brand: `linear-gradient(135deg, ${palette.accent.DEFAULT} 0%, ${palette.primary[600]} 100%)`,
} as const

/** Font stack — shared by Tailwind (`font-sans` / `font-heading`) and Ant Design */
export const fontStack = ['Prompt', 'ui-sans-serif', 'system-ui', 'sans-serif'] as const

export const typography = {
  fontFamily: fontStack.join(', '),
  heading: {
    fontFamily: fontStack.join(', '),
    fontWeight: 600,
  },
  body: {
    fontFamily: fontStack.join(', '),
    fontWeight: 400,
  },
} as const

export const radius = {
  sm: '0.375rem',
  md: '0.625rem',
  lg: '1rem',
  xl: '1.25rem',
  full: '9999px',
} as const

export type Palette = typeof palette
