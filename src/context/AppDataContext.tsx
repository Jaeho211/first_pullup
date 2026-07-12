import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_PROFILE } from '@/domain/exercises';
import { UserProfile, WorkoutSession } from '@/domain/types';
import { storageRepository } from '@/services/storage';

type AppData = {
  profile: UserProfile; sessions: WorkoutSession[]; loading: boolean;
  saveProfile: (profile: UserProfile) => Promise<void>;
  addSession: (session: WorkoutSession) => Promise<void>;
  resetData: () => Promise<void>;
};
const Context = createContext<AppData | null>(null);

export function AppDataProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { Promise.all([storageRepository.getProfile(), storageRepository.getSessions()])
    .then(([nextProfile, nextSessions]) => { setProfile(nextProfile); setSessions(nextSessions); })
    .finally(() => setLoading(false)); }, []);
  const saveProfile = useCallback(async (next: UserProfile) => { await storageRepository.saveProfile(next); setProfile(next); }, []);
  const addSession = useCallback(async (session: WorkoutSession) => { await storageRepository.addSession(session); setSessions((old) => [session, ...old]); }, []);
  const resetData = useCallback(async () => { await storageRepository.clearAll(); await storageRepository.saveProfile(DEFAULT_PROFILE); setProfile(DEFAULT_PROFILE); setSessions([]); }, []);
  const value = useMemo(() => ({ profile, sessions, loading, saveProfile, addSession, resetData }), [profile, sessions, loading, saveProfile, addSession, resetData]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useAppData() { const value = useContext(Context); if (!value) throw new Error('AppDataProvider is missing'); return value; }
