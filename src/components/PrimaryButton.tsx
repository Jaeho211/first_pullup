import { ComponentProps } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants/theme';
export function PrimaryButton({ title, loading, variant = 'primary', ...props }: ComponentProps<typeof Pressable> & { title: string; loading?: boolean; variant?: 'primary' | 'secondary' }) {
  return <Pressable accessibilityRole="button" disabled={loading || props.disabled} {...props} style={({ pressed }) => [styles.base, variant === 'secondary' ? styles.secondary : styles.primary, (pressed || props.disabled) && styles.dim]}>
    {loading ? <ActivityIndicator color="#FFF" /> : <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{title}</Text>}
  </Pressable>;
}
const styles = StyleSheet.create({ base: { minHeight: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingHorizontal: 20 }, primary: { backgroundColor: colors.primary }, secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }, dim: { opacity: .55 }, text: { color: '#FFF', fontSize: 18, fontWeight: '700' }, secondaryText: { color: colors.text } });
