import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/theme';
const icons: Record<string, ComponentProps<typeof Ionicons>['name']> = { index: 'home-outline', workout: 'barbell-outline', history: 'calendar-outline' };
import { ComponentProps } from 'react';
export default function TabLayout() { return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted, tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 6, backgroundColor: colors.surface, borderTopColor: colors.border }, tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }, tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} color={color} size={size} /> })}>
  <Tabs.Screen name="index" options={{ title: '홈' }} /><Tabs.Screen name="workout" options={{ title: '운동' }} /><Tabs.Screen name="history" options={{ title: '기록' }} />
</Tabs>; }
