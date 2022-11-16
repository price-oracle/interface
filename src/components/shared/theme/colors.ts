/**
 * colors source
 * @external https://mui.com/material-ui/customization/dark-mode/
 */

export interface Theme {
  actionActive: string;
  actionDisabled: string;
  actionDisabledBackground: string;
  actionHover: string;
  actionSelected: string;
  background: string;
  divider: string;
  border: string;
  textDisabled: string;
  textPrimary: string;
  textSecondary: string;
  type: 'dark' | 'light';
}

export interface PropTheme {
  theme: Theme;
}

export const darkTheme: Theme = {
  type: 'dark',
  background: '#121212',
  textPrimary: `#fff`,
  textSecondary: `rgba(255, 255, 255, 0.5)`,
  textDisabled: `rgba(255, 255, 255, 0.5)`,
  divider: `rgba(255, 255, 255, 0.12)`,
  border: `2px solid rgba(255, 255, 255, 0.12)`,
  actionActive: `#fff`,
  actionHover: `rgba(255, 255, 255, 0.08)`,
  actionSelected: `rgba(255, 255, 255, 0.16)`,
  actionDisabled: `rgba(255, 255, 255, 0.3)`,
  actionDisabledBackground: `rgba(255, 255, 255, 0.12)`,
};

export const lightTheme: Theme = {
  type: 'light',
  background: '#fff',
  textPrimary: `rgba(0, 0, 0, 0.87)`,
  textSecondary: `rgba(0, 0, 0, 0.38)`,
  textDisabled: `rgba(0, 0, 0, 0.38)`,
  divider: `rgba(0, 0, 0, 0.12)`,
  border: `2px solid rgba(0, 0, 0, 0.12)`,
  actionActive: `rgba(0, 0, 0, 0.54)`,
  actionHover: `rgba(0, 0, 0, 0.04)`,
  actionSelected: `rgba(0, 0, 0, 0.08)`,
  actionDisabled: `rgba(0, 0, 0, 0.26)`,
  actionDisabledBackground: `rgba(0, 0, 0, 0.12)`,
};