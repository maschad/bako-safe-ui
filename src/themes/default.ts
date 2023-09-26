import { extendBaseTheme, withDefaultColorScheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';

const defaultTheme = extendBaseTheme({
  ...chakraTheme,
  fonts: {
    heading: `Inter, sans-serif`,
    body: `Inter, sans-serif`,
  },
  colors: {
    brand: {
      500: '#49F8AE',
      600: '#1CF593',
    },
    grey: {
      200: '#C0C0C0',
      500: '#696B65',
    },
    dark: {
      100: '#2C2C2C',
      200: '#1B1A1A',
      300: '#121212',
      500: '#0F0F0F',
    },
    error: {
      500: '#EF9B8F',
      900: 'rgba(248,73,73,0.1)',
    },
    warning: {
      500: '#F59E1C',
      900: 'rgba(245,158,28,0.1)',
    },
    success: {
      500: '#49F8AE',
      900: 'rgba(73,248,174,0.1)',
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: 'dark.500',
        color: '#FFFFFF',
      },
    }),
  },
  ...withDefaultColorScheme({
    colorScheme: 'brand',
  }),
});

export { defaultTheme };
