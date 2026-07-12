import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PROFILE } from '@/domain/exercises';
import { UserProfile, WorkoutSession } from '@/domain/types';

const PROFILE_KEY = '@first-pullup/profile';
const SESSIONS_KEY = '@first-pullup/sessions';

function parseStoredValue<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
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
    return parseStoredValue(raw, []);
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
