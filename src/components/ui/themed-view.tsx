import { View, type ViewProps } from 'react-native';

import { type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  /** Theme token used for the background. Defaults to `background`. */
  themeColor?: ThemeColor;
};

export function ThemedView({ style, themeColor = 'background', ...rest }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[themeColor] }, style]} {...rest} />;
}
