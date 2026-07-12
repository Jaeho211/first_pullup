import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

const icons: Record<string, ComponentProps<typeof Ionicons>['name']> = {
  index: 'home-outline',
  workout: 'barbell-outline',
  history: 'calendar-outline',
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 62 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 6,
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        tabBarIcon: ({ color, size, focused }) => (
          <View style={{ minWidth: 56, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: focused ? colors.accent : 'transparent' }}>
            <Ionicons name={icons[route.name]} color={color} size={size} />
          </View>
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: '홈' }} />
      <Tabs.Screen name="workout" options={{ title: '운동' }} />
      <Tabs.Screen name="history" options={{ title: '기록' }} />
    </Tabs>
  );
}
