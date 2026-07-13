export type UserProfile = {
  name: string;
  birthYear: number;
  weeklyTarget: number;
  currentLevel: number;
  longTermGoal: string;
};

export type ExerciseTrackingField = {
  key: string;
  label: string;
  unit?: string;
};

export type ExerciseTracking = {
  primaryMetric: 'repetitions' | 'duration' | 'completion';
  fields: ExerciseTrackingField[];
};

export type ExerciseDefinition = {
  id: string;
  name: string;
  purpose: string;
  targetText: string;
  totalSets: number;
  tracking: ExerciseTracking;
  instructions: string[];
  caution: string;
  videoUrl?: string;
};

export type ExerciseSnapshot = Pick<ExerciseDefinition, 'id' | 'name' | 'purpose' | 'targetText' | 'totalSets' | 'tracking'>;

export type ExerciseMeasurement = string | number | boolean;

export type ExerciseSetRecord = {
  completedAt: string;
  measurements: Record<string, ExerciseMeasurement>;
};

export type ExerciseResult = {
  exercise: ExerciseSnapshot;
  sets: ExerciseSetRecord[];
};

export type WorkoutEffort = 'easy' | 'moderate' | 'hard';

export type WorkoutSession = {
  schemaVersion: 2;
  id: string;
  startedAt: string;
  completedAt: string;
  level: number;
  levelName: string;
  exercises: ExerciseResult[];
  fullyCompleted: boolean;
  effort?: WorkoutEffort;
};

export type LevelDefinition = {
  level: number;
  name: string;
  summary: string;
  exercises: ExerciseDefinition[];
};

export const snapshotExercise = (exercise: ExerciseDefinition): ExerciseSnapshot => ({
  id: exercise.id,
  name: exercise.name,
  purpose: exercise.purpose,
  targetText: exercise.targetText,
  totalSets: exercise.totalSets,
  tracking: exercise.tracking,
});

export const completedSetCount = (result: ExerciseResult) => result.sets.length;

export const isExerciseResultComplete = (result: ExerciseResult) => completedSetCount(result) >= result.exercise.totalSets;
