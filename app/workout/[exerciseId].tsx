import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { useAppData } from '@/context/AppDataContext';
import { getLevel } from '@/domain/exercises';

export default function ExerciseDetailScreen() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const { profile } = useAppData();
  const exercise = getLevel(profile.currentLevel).exercises.find((item) => item.id === exerciseId);

  if (!exercise) {
    return <Screen contentStyle={styles.center}><Text style={styles.missing}>운동 정보를 찾을 수 없습니다.</Text></Screen>;
  }

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.purpose}>{exercise.purpose}</Text>
      </View>

      <View style={styles.target}>
        <Text style={styles.label}>목표</Text>
        <Text style={styles.targetText}>{exercise.targetText}</Text>
        <Text style={styles.sets}>총 {exercise.totalSets}세트</Text>
      </View>

      <Text style={styles.sectionTitle}>운동 방법</Text>
      <View style={styles.instructions}>
        {exercise.instructions.map((instruction, index) => (
          <View key={instruction} style={styles.instruction}>
            <View style={styles.step}><Text style={styles.stepText}>{index + 1}</Text></View>
            <Text style={styles.instructionText}>{instruction}</Text>
          </View>
        ))}
      </View>

      <View style={styles.caution}>
        <Ionicons name="alert-circle-outline" size={22} color={colors.warningText} />
        <Text style={styles.cautionText}>{exercise.caution}</Text>
      </View>

      {exercise.videoUrl && (
        <Pressable accessibilityRole="link" style={styles.video} onPress={() => Linking.openURL(exercise.videoUrl!)}>
          <Ionicons name="logo-youtube" size={22} color="#D92D20" />
          <Text style={styles.videoText}>레퍼런스 영상 보기</Text>
          <Ionicons name="open-outline" size={18} color={colors.muted} />
        </Pressable>
      )}

      <PrimaryButton title="오늘 루틴 시작하기" onPress={() => router.push('/workout/session')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28 },
  center: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
  missing: { fontSize: 16, color: colors.muted },
  header: { marginBottom: 20 },
  name: { fontSize: 26, lineHeight: 34, fontWeight: '900', color: colors.text },
  purpose: { marginTop: 8, fontSize: 15, lineHeight: 22, color: colors.muted },
  target: { padding: 18, borderRadius: 20, backgroundColor: colors.surface },
  label: { fontSize: 12, fontWeight: '800', color: colors.muted },
  targetText: { marginTop: 5, fontSize: 18, fontWeight: '900', color: colors.text },
  sets: { marginTop: 5, fontSize: 13, fontWeight: '700', color: colors.primary },
  sectionTitle: { marginTop: 26, marginBottom: 12, fontSize: 18, fontWeight: '900', color: colors.text },
  instructions: { gap: 12 },
  instruction: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  step: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent },
  stepText: { fontSize: 13, fontWeight: '900', color: colors.primaryDark },
  instructionText: { flex: 1, paddingTop: 3, fontSize: 15, lineHeight: 22, color: colors.text },
  caution: { marginVertical: 22, padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: colors.warning },
  cautionText: { flex: 1, fontSize: 14, lineHeight: 21, color: colors.warningText },
  video: { minHeight: 52, marginBottom: 20, paddingHorizontal: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface },
  videoText: { flex: 1, fontSize: 14, fontWeight: '800', color: colors.text },
});
