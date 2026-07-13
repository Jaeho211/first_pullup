import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { useAppData } from '@/context/AppDataContext';
import { completedSetCount, isExerciseResultComplete } from '@/domain/types';
import { formatKoreanDate } from '@/utils/date';

export default function HistoryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sessions } = useAppData();
  const session = sessions.find((item) => item.id === id);

  if (!session) return <Screen contentStyle={styles.center}><Text style={styles.missing}>기록을 찾을 수 없습니다.</Text></Screen>;

  const effort = session.effort ? { easy: '쉬움', moderate: '적당함', hard: '어려움' }[session.effort] : null;
  const duration = session.startedAt ? Math.max(1, Math.round((new Date(session.completedAt).getTime() - new Date(session.startedAt).getTime()) / 60000)) : null;

  return <Screen>
    <Text style={styles.date}>{formatKoreanDate(session.completedAt)}</Text>
    <View style={styles.badge}><Text style={styles.badgeText}>Level {session.level} · {session.levelName} · {session.fullyCompleted ? '전체 완료' : '일부 완료'}</Text></View>
    {(duration || effort) && <Text style={styles.meta}>{duration ? `운동 시간 약 ${duration}분` : ''}{duration && effort ? ' · ' : ''}{effort ? `체감 강도 ${effort}` : ''}</Text>}
    <View style={styles.list}>{session.exercises.map((result) => {
      const complete = isExerciseResultComplete(result);
      return <View key={result.exercise.id} style={styles.row}>
        <Ionicons name={complete ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={complete ? colors.primary : colors.muted} />
        <View style={styles.exerciseCopy}>
          <Text style={styles.name}>{result.exercise.name}</Text>
          <Text style={styles.target}>{result.exercise.targetText}</Text>
          <Text style={styles.sets}>{completedSetCount(result)} / {result.exercise.totalSets}세트</Text>
        </View>
      </View>;
    })}</View>
  </Screen>;
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', alignItems: 'center' },
  missing: { fontSize: 17, color: colors.muted },
  date: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 8 },
  badge: { alignSelf: 'flex-start', backgroundColor: colors.accent, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginTop: 12 },
  badgeText: { color: colors.primaryDark, fontWeight: '700' },
  meta: { fontSize: 14, color: colors.muted, marginTop: 10 },
  list: { marginTop: 26, borderTopWidth: 1, borderColor: colors.border },
  row: { minHeight: 82, flexDirection: 'row', alignItems: 'center', gap: 13, borderBottomWidth: 1, borderColor: colors.border },
  exerciseCopy: { flex: 1, paddingVertical: 12 },
  name: { fontSize: 17, fontWeight: '700', color: colors.text },
  target: { fontSize: 13, color: colors.muted, marginTop: 4 },
  sets: { fontSize: 14, color: colors.muted, marginTop: 4 },
});
