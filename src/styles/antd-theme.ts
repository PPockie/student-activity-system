import type { ThemeConfig } from 'antd'
import { palette, radius, typography } from './theme'

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: palette.primary.DEFAULT,
    colorInfo: palette.primary.DEFAULT,
    colorSuccess: palette.success,
    colorWarning: palette.warning,
    colorError: palette.danger,

    colorBgLayout: palette.surface.DEFAULT,
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',

    colorText: palette.ink[900],
    colorTextSecondary: palette.ink[600],
    colorTextTertiary: palette.ink[500],
    colorBorder: palette.ink[200],
    colorBorderSecondary: palette.ink[100],

    fontFamily: typography.fontFamily,
    borderRadius: 10,
    borderRadiusLG: 16,
    borderRadiusSM: 6,

    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,

    fontSizeLG: 16,
  },
  components: {
    Input: {
      paddingBlockLG: 12,
      paddingInlineLG: 16,
      borderRadiusLG: 16,
      colorBorder: palette.ink[100],
      hoverBorderColor: palette.primary[200],
      activeBorderColor: palette.primary.DEFAULT,
      activeShadow: `0 0 0 3px ${palette.primary[100]}`,
      colorTextPlaceholder: palette.ink[400],
    },
    Select: {
      borderRadiusLG: 16,
      colorBorder: palette.ink[100],
      hoverBorderColor: palette.primary[200],
      activeBorderColor: palette.primary.DEFAULT,
      activeOutlineColor: palette.primary[100],
    },
    DatePicker: {
      borderRadiusLG: 16,
      colorBorder: palette.ink[100],
      hoverBorderColor: palette.primary[200],
      activeBorderColor: palette.primary.DEFAULT,
      activeShadow: `0 0 0 3px ${palette.primary[100]}`,
    },
    Button: {
      primaryShadow: 'none',
      controlHeight: 40,
      borderRadius: 10,
    },
    Card: {
      borderRadiusLG: 16,
      headerBg: 'transparent',
    },
    Menu: {
      itemSelectedBg: palette.primary[100],
      itemSelectedColor: palette.primary[700],
      itemBorderRadius: 10,
    },
    Layout: {
      bodyBg: palette.surface.DEFAULT,
      headerBg: '#FFFFFF',
      siderBg: '#FFFFFF',
    },
    Table: {
      headerBg: palette.primary[50],
      headerColor: palette.primary[800],
      borderRadius: Number.parseFloat(radius.md) * 16,
    },
    Tag: {
      defaultBg: palette.primary[50],
      defaultColor: palette.primary[700],
    },
  },
}
