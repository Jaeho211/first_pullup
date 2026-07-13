import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PROFILE, findExercise, getLevel } from '@/domain/exercises';
import { ExerciseSnapshot, UserProfile, WorkoutSession, snapshotExercise } from '@/domain/types';

const PROFILE_KEY = '@first-pullup/profile';
const SESSIONS_KEY = '@first-pullup/sessions';

const LEGACY_EXERCISE_NAMES: Record<string, string> = {
  'standing-chin-tuck': '서서 턱 당기기',
  'wall-scapular-pushup': '벽 견갑 푸시업',
  'dead-hang': '일반 매달리기',
  'wall-w-slide': '벽 W 슬라이드',
  'assisted-pullup': '발 보조 풀업',
  'negative-pullup': '네거티브 풀업',
  'strict-pullup': '정자세 풀업',
};

const LEGACY_TARGETS: Record<string, string> = {
  'standing-chin-tuck': '8~10회 · 1회당 5초 유지',
  'wall-scapular-pushup': '8~10회',
  'wall-w-slide': '8~12회',
  '1:dead-hang': '속으로 10까지 세기',
  '2:dead-hang': '속으로 15까지 세기',
  '3:dead-hang': '속으로 20까지 세기',
  '4:dead-hang': '속으로 20까지 세기',
  '5:dead-hang': '속으로 20까지 세기',
  '4:assisted-pullup': '5회',
  '5:negative-pullup': '천천히 내려오기 · 3회',
  '6:strict-pullup': '반동 없이 1회',
};

function parseStoredValue<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function legacySnapshot(id: string, targetText: string, totalSets: number): ExerciseSnapshot {
  const current = findExercise(id);
  if (current) return { ...snapshotExercise(current), targetText, totalSets };

  return {
    id,
    name: LEGACY_EXERCISE_NAMES[id] ?? id,
    purpose: '이전 버전의 운동 기록입니다.',
    targetText,
    totalSets,
    tracking: { primaryMetric: 'completion', fields: [] },
  };
}

function migrateSession(value: unknown): WorkoutSession | null {
  if (!isRecord(value) || typeof value.id !== 'string') return null;
  if (value.schemaVersion === 2 && Array.isArray(value.exercises)) return value as WorkoutSession;

  const level = typeof value.level === 'number' ? value.level : 1;
  const levelDefinition = getLevel(level);
  const completedAt = typeof value.completedAt === 'string' ? value.completedAt : new Date().toISOString();
  const legacyResults = Array.isArray(value.exercises) ? value.exercises : [];

  const exercises = legacyResults.flatMap((item) => {
    if (!isRecord(item) || typeof item.exerciseId !== 'string') return [];
    const completedSets = typeof item.completedSets === 'number' ? Math.max(0, item.completedSets) : 0;
    const totalSets = typeof item.totalSets === 'number' ? Math.max(1, item.totalSets) : 1;
    const setCompletedAt = Array.isArray(item.setCompletedAt)
      ? item.setCompletedAt.filter((time): time is string => typeof time === 'string')
      : [];
    const targetText = LEGACY_TARGETS[`${level}:${item.exerciseId}`] ?? LEGACY_TARGETS[item.exerciseId] ?? '이전 버전 목표';

    return [{
      exercise: legacySnapshot(item.exerciseId, targetText, totalSets),
      sets: Array.from({ length: completedSets }, (_, index) => ({
        completedAt: setCompletedAt[index] ?? completedAt,
        measurements: {},
      })),
    }];
  });

  return {
    schemaVersion: 2,
    id: value.id,
    startedAt: typeof value.startedAt === 'string' ? value.startedAt : completedAt,
    completedAt,
    level,
    levelName: levelDefinition.name,
    exercises,
    fullyCompleted: value.fullyCompleted === true,
    effort: value.effort === 'easy' || value.effort === 'moderate' || value.effort === 'hard' ? value.effort : undefined,
  };
}

export const storageRepository = {
  async getProfile(): Promise<UserProfile> {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...parseStoredValue(raw, DEFAULT_PROFILE) };
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  },
  async saveProfile(profile: UserProfile) {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },
  async getSessions(): Promise<WorkoutSession[]> {
    const raw = await AsyncStorage.getItem(SESSIONS_KEY);
    const stored = parseStoredValue<unknown[]>(raw, []);
    const sessions = Array.isArray(stored) ? stored.map(migrateSession).filter((session): session is WorkoutSession => session !== null) : [];
    const needsMigration = Array.isArray(stored) && stored.some((session) => !isRecord(session) || session.schemaVersion !== 2);
    if (needsMigration) await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    return sessions;
  },
  async addSession(session: WorkoutSession) {
    const sessions = await this.getSessions();
    await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify([session, ...sessions]));
  },
  async updateSession(session: WorkoutSession) {
    const sessions = await this.getSessions();
    await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.map((item) => item.id === session.id ? session : item)));
  },
  async clearAll() {
    await AsyncStorage.multiRemove([PROFILE_KEY, SESSIONS_KEY]);
  },
};
