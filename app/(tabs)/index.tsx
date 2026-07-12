import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { useAppData } from '@/context/AppDataContext';
import { getLevel } from '@/domain/exercises';
import { isToday } from '@/utils/date';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function HomeScreen() {
  const { profile, sessions, loading } = useAppData();
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const level = getLevel(profile.currentLevel);
  const todayDone = sessions.some((session) => isToday(session.completedAt));
  const completedDays = useMemo(() => new Set(sessions.filter((session) => session.fullyCompleted).map((session) => dateKey(new Date(session.completedAt)))), [sessions]);
  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const leading = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();
    return [...Array(leading).fill(null), ...Array.from({ length: total }, (_, index) => index + 1)];
  }, [visibleMonth]);

  if (loading) return <View style={styles.loading}><ActivityIndicator color={colors.primary} size="large" /></View>;

  const moveMonth = (amount: number) => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  const monthLabel = `${visibleMonth.getFullYear()}년 ${visibleMonth.getMonth() + 1}월`;
  const completedThisMonth = calendarDays.reduce((count, day) => day && completedDays.has(dateKey(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day))) ? count + 1 : count, 0);

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.appBar}>
        <View>
          <Text style={styles.eyebrow}>FIRST PULL-UP</Text>
          <Text style={styles.title}>{profile.name}님, 오늘도 가볍게!</Text>
        </View>
        <Pressable accessibilityLabel="설정" android_ripple={{ color: colors.border, borderless: true }} hitSlop={8} style={styles.iconButton} onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.progressHeader}>
        <View style={styles.levelPill}><Text style={styles.levelPillText}>LEVEL {level.level}</Text></View>
        <Text style={styles.progressTitle}>{level.name}</Text>
        <Text style={styles.progressCopy}>{level.summary}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.calendarHeader}>
          <View>
            <Text style={styles.sectionLabel}>나의 운동 기록</Text>
            <Text style={styles.month}>{monthLabel}</Text>
          </View>
          <View style={styles.monthControls}>
            <Pressable accessibilityLabel="이전 달" hitSlop={8} style={styles.monthButton} onPress={() => moveMonth(-1)}><Ionicons name="chevron-back" size={20} color={colors.text} /></Pressable>
            <Pressable accessibilityLabel="다음 달" hitSlop={8} style={styles.monthButton} onPress={() => moveMonth(1)}><Ionicons name="chevron-forward" size={20} color={colors.text} /></Pressable>
          </View>
        </View>
        <View style={styles.weekdays}>{WEEKDAYS.map((day, index) => <Text key={day} style={[styles.weekday, index === 0 && styles.sunday]}>{day}</Text>)}</View>
        <View style={styles.calendarGrid}>
          {calendarDays.map((day, index) => {
            if (!day) return <View key={`blank-${index}`} style={styles.dayCell} />;
            const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
            const done = completedDays.has(dateKey(date));
            const today = dateKey(date) === dateKey(new Date());
            return <View key={day} style={styles.dayCell}><View style={[styles.dayCircle, done && styles.dayDone, today && !done && styles.dayToday]}><Text style={[styles.dayText, index % 7 === 0 && styles.sunday, done && styles.dayDoneText]}>{day}</Text>{done && <Ionicons name="checkmark" size={11} color="#FFFFFF" style={styles.dayCheck} />}</View></View>;
          })}
        </View>
        <View style={styles.calendarFooter}><View style={styles.legend}><View style={styles.legendDot} /><Text style={styles.legendText}>운동 완료</Text></View><Text style={styles.monthCount}>이번 달 {completedThisMonth}회</Text></View>
      </View>

      <View style={styles.routineHeader}>
        <View><Text style={styles.sectionLabel}>오늘의 운동</Text><Text style={styles.routineTitle}>딱 10분 루틴</Text></View>
        <View style={[styles.todayBadge, todayDone && styles.todayBadgeDone]}><Ionicons name={todayDone ? 'checkmark-circle' : 'time-outline'} size={16} color={todayDone ? colors.primary : colors.muted} /><Text style={styles.todayBadgeText}>{todayDone ? '완료' : '약 10분'}</Text></View>
      </View>
      <View style={styles.routineCard}>
        {level.exercises.map((exercise, index) => (
          <Pressable
            key={exercise.id}
            accessibilityRole="button"
            accessibilityLabel={`${exercise.name} 운동 자세 보기`}
            android_ripple={{ color: colors.border }}
            onPress={() => router.push({ pathname: '/workout/[exerciseId]', params: { exerciseId: exercise.id } })}
            style={({ pressed }) => [styles.exerciseRow, index < level.exercises.length - 1 && styles.exerciseDivider, pressed && styles.exerciseRowPressed]}
          >
            <View style={styles.exerciseNumber}><Text style={styles.exerciseNumberText}>{index + 1}</Text></View>
            <View style={styles.exerciseInfo}><Text style={styles.exerciseName}>{exercise.name}</Text><Text style={styles.exerciseTarget}>{exercise.targetText}{exercise.totalSets > 1 ? ` · ${exercise.totalSets}세트` : ''}</Text></View>
            <Ionicons name="chevron-forward" size={18} color={colors.disabled} />
          </Pressable>
        ))}
      </View>

      <Pressable accessibilityRole="button" android_ripple={{ color: '#FFFFFF2A' }} style={styles.startButton} onPress={() => router.push('/workout/session')}>
        <Ionicons name={todayDone ? 'refresh' : 'play'} size={20} color="#FFFFFF" />
        <Text style={styles.startButtonText}>{todayDone ? '10분 루틴 다시 하기' : '10분 루틴 시작하기'}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  screen: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28 },
  appBar: { minHeight: 64, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  eyebrow: { fontSize: 11, lineHeight: 16, letterSpacing: 1.5, fontWeight: '800', color: colors.primary },
  title: { marginTop: 2, fontSize: 22, lineHeight: 30, fontWeight: '800', color: colors.text },
  iconButton: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  progressHeader: { marginBottom: 18 }, levelPill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: colors.accent },
  levelPillText: { fontSize: 11, fontWeight: '900', letterSpacing: .5, color: colors.primaryDark }, progressTitle: { marginTop: 9, fontSize: 20, fontWeight: '800', color: colors.text }, progressCopy: { marginTop: 3, fontSize: 14, lineHeight: 20, color: colors.muted },
  card: { padding: 18, borderRadius: 24, backgroundColor: colors.surface, elevation: 2, shadowColor: '#17211B', shadowOpacity: .08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, sectionLabel: { fontSize: 12, fontWeight: '700', color: colors.muted }, month: { marginTop: 3, fontSize: 20, fontWeight: '900', color: colors.text }, monthControls: { flexDirection: 'row', gap: 4 }, monthButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  weekdays: { flexDirection: 'row', marginTop: 18, marginBottom: 6 }, weekday: { width: '14.285%', textAlign: 'center', fontSize: 12, fontWeight: '700', color: colors.muted }, sunday: { color: '#C7554D' }, calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' }, dayCell: { width: '14.285%', height: 42, alignItems: 'center', justifyContent: 'center' }, dayCircle: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' }, dayDone: { backgroundColor: colors.primary }, dayToday: { borderWidth: 1.5, borderColor: colors.primary }, dayText: { fontSize: 13, fontWeight: '600', color: colors.text }, dayDoneText: { color: '#FFFFFF', transform: [{ translateY: -3 }] }, dayCheck: { position: 'absolute', bottom: 2 }, calendarFooter: { marginTop: 10, paddingTop: 14, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, legend: { flexDirection: 'row', alignItems: 'center', gap: 7 }, legendDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary }, legendText: { fontSize: 12, color: colors.muted }, monthCount: { fontSize: 13, fontWeight: '800', color: colors.primaryDark },
  routineHeader: { marginTop: 28, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }, routineTitle: { marginTop: 3, fontSize: 22, fontWeight: '900', color: colors.text }, todayBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, backgroundColor: colors.surface }, todayBadgeDone: { backgroundColor: colors.accent }, todayBadgeText: { fontSize: 12, fontWeight: '800', color: colors.text },
  routineCard: { paddingHorizontal: 16, borderRadius: 20, backgroundColor: colors.surface, overflow: 'hidden' }, exerciseRow: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 12 }, exerciseRowPressed: { opacity: .65 }, exerciseDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, exerciseNumber: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent }, exerciseNumberText: { fontSize: 14, fontWeight: '900', color: colors.primaryDark }, exerciseInfo: { flex: 1 }, exerciseName: { fontSize: 15, fontWeight: '800', color: colors.text }, exerciseTarget: { marginTop: 4, fontSize: 13, color: colors.muted },
  startButton: { minHeight: 56, marginTop: 20, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, backgroundColor: colors.primary, elevation: 3 }, startButtonText: { fontSize: 16, fontWeight: '900', color: '#FFFFFF' },
});
