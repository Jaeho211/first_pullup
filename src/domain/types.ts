export type UserProfile = {
  name: string;
  birthYear: number;
  weeklyTarget: number;
  currentLevel: number;
  longTermGoal: string;
};

export type ExerciseDefinition = {
  id: string;
  name: string;
  purpose: string;
  targetText: string;
  totalSets: number;
  instructions: string[];
  caution: string;
  videoUrl?: string;
};

export type ExerciseResult = {
  exerciseId: string;
  completedSets: number;
  totalSets: number;
  setCompletedAt: string[];
};

export type WorkoutEffort = 'easy' | 'moderate' | 'hard';

export type WorkoutSession = {
  id: string;
  startedAt: string;
  completedAt: string;
  level: number;
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
