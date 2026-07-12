import { WorkoutSession } from '@/domain/types';
export const localDateKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const formatKoreanDate = (iso: string) => { const d = new Date(iso); return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`; };
export const isToday = (iso: string) => localDateKey(new Date(iso)) === localDateKey();
export const countThisWeek = (sessions: WorkoutSession[]) => {
  const now = new Date(); const start = new Date(now); const day = (now.getDay() + 6) % 7;
  start.setDate(now.getDate() - day); start.setHours(0, 0, 0, 0);
  return sessions.filter((s) => new Date(s.completedAt) >= start).length;
};
