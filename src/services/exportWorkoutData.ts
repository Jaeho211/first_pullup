import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Share } from 'react-native';
import { LEVELS } from '@/domain/exercises';
import { UserProfile, WorkoutSession } from '@/domain/types';

export async function exportWorkoutData(profile: UserProfile, sessions: WorkoutSession[]) {
  const report = {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    analysisGuide: '운동 빈도, 세트 간 휴식, 수행 속도, 중단 패턴, 레벨 적합성과 정체 가능성을 분석해 주세요.',
    profile,
    exerciseCatalog: LEVELS.map((level) => ({
      level: level.level,
      name: level.name,
      exercises: level.exercises.map(({ id, name, purpose, targetText, totalSets }) => ({ id, name, purpose, targetText, totalSets })),
    })),
    sessions,
  };
  const contents = JSON.stringify(report, null, 2);
  if (await Sharing.isAvailableAsync()) {
    const file = new File(Paths.cache, `first-pullup-records-${new Date().toISOString().slice(0, 10)}.json`);
    file.create({ overwrite: true });
    file.write(contents);
    await Sharing.shareAsync(file.uri, { mimeType: 'application/json', dialogTitle: 'GPT 분석용 운동 기록 공유' });
    return;
  }
  await Share.share({ title: 'GPT 분석용 운동 기록', message: contents });
}
