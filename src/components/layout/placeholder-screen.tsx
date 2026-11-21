import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';

export type PlaceholderScreenProps = {
  title: string;
  /** Short note describing which feature owns this screen. */
  description: string;
};

/**
 * Temporary screen used for tabs whose features are not implemented yet.
 * Replace the tab's route file content once the feature is built.
 */
export function PlaceholderScreen({ title, description }: PlaceholderScreenProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
        {description}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
    gap: Spacing.two,
  },
  description: {
    textAlign: 'center',
  },
});
