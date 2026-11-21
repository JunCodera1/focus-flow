import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

/** Returns the color tokens for the current system color scheme. */
export function useTheme() {
  const scheme = useColorScheme();

  return Colors[scheme === 'dark' ? 'dark' : 'light'];
}
