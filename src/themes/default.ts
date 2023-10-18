import { extendTheme } from '@chakra-ui/react';

import { colors } from '@/themes/colors';
import { components } from '@/themes/components';
import { fonts } from '@/themes/fonts';

const breakpoints = {
  md: '42em',
  lg: '72em',
};

const defaultTheme = extendTheme({
  breakpoints,
  fonts,
  colors,
  components: {
    ...components,
  },
  styles: {
    global: () => ({
      body: {
        bg: 'dark.500',
        color: '#FFFFFF',
      },
      '#chakra-toast-manager-top-right': {
        mt: 20,
      },
    }),
  },
});

export { defaultTheme };
