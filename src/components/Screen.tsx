import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
export function Screen({ children, contentStyle }: PropsWithChildren<{ contentStyle?: ViewStyle }>) {
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView contentContainerStyle={[styles.content, contentStyle]} keyboardShouldPersistTaps="handled">{children}</ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, content: { flexGrow: 1, padding: 20, paddingBottom: 32 } });
