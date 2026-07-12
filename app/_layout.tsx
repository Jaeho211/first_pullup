import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppDataProvider } from '@/context/AppDataContext';
import { colors } from '@/constants/theme';
export default function RootLayout() { return <AppDataProvider><StatusBar style="dark" /><Stack screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false, headerTintColor: colors.text, headerTitleStyle: { fontWeight: '700' }, contentStyle: { backgroundColor: colors.background } }}>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="workout/session" options={{ title: '오늘 운동', gestureEnabled: false }} />
  <Stack.Screen name="workout/complete" options={{ title: '', headerBackVisible: false, gestureEnabled: false }} />
  <Stack.Screen name="history/[id]" options={{ title: '운동 기록' }} />
  <Stack.Screen name="settings" options={{ title: '설정' }} />
</Stack></AppDataProvider>; }
