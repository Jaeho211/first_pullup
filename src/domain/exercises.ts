import { ExerciseDefinition, LevelDefinition, UserProfile } from './types';

export const DEFAULT_PROFILE: UserProfile = {
  name: '이재호', birthYear: 1986, weeklyTarget: 3, currentLevel: 1,
  longTermGoal: '반동 없는 정자세 풀업 1회',
};

const chinTuck: ExerciseDefinition = {
  id: 'standing-chin-tuck', name: '서서 턱 당기기',
  purpose: '목의 중립 정렬을 연습하고 머리가 앞으로 빠지는 자세를 줄입니다.',
  targetText: '8~10회 · 1회당 5초 유지', totalSets: 1,
  instructions: ['정면을 바라보고 편하게 섭니다.', '턱을 아래로 숙이지 않고 얼굴과 머리 전체를 수평으로 뒤로 이동합니다.', '가볍게 이중턱을 만들고 목과 턱의 힘을 뺍니다.'],
  caution: '고개를 숙이지 말고 머리 전체를 뒤로 이동하세요.',
  videoUrl: 'https://www.youtube.com/shorts/450SrSL4tMc',
};
const wallPush: ExerciseDefinition = {
  id: 'wall-scapular-pushup', name: '벽 견갑 푸시업',
  purpose: '견갑골의 움직임과 안정화 능력을 연습합니다.', targetText: '8~10회', totalSets: 1,
  instructions: ['벽에서 팔 길이만큼 떨어져 양손을 어깨높이로 댑니다.', '가슴을 벽 쪽으로 살짝 보내 날개뼈를 모읍니다.', '벽을 밀어 몸을 뒤로 보내며 날개뼈를 벌립니다.', '어깨를 으쓱하거나 허리만 움직이지 않습니다.'],
  caution: '팔꿈치는 계속 편 상태로 유지하세요.',
  videoUrl: 'https://youtu.be/VrSE25QI8OA?si=xFXuffyKU0mrDbMQ&t=291',
};
const hang = (count: number): ExerciseDefinition => ({
  id: 'dead-hang', name: '일반 매달리기', purpose: '악력과 전완의 기초 지구력을 만들고 철봉 자세에 적응합니다.',
  targetText: `속으로 ${count}까지 세기`, totalSets: 3,
  instructions: ['의자를 밟고 철봉을 잡은 뒤 발을 뗍니다.', '팔꿈치를 펴고 턱을 앞으로 내밀지 않습니다.', `일정한 속도로 ${count}까지 세고 내려옵니다.`, '끝까지 버티거나 뛰어내리지 말고 의자를 밟습니다.'],
  caution: '손이 완전히 풀릴 때까지 버티지 마세요.',
});
const assistedScap: ExerciseDefinition = {
  id: 'assisted-scapular-pullup', name: '발 보조 스카풀라 풀업',
  purpose: '팔을 굽히기 전에 견갑골을 아래로 내리는 풀업 시작 동작을 연습합니다.', targetText: '5회', totalSets: 2,
  instructions: ['철봉 아래 의자를 놓고 발을 올려 체중을 충분히 보조합니다.', '어깨를 귀에서 멀어지게 아래로 내려 몸을 약간 올립니다.', '천천히 원래 위치로 돌아옵니다.'],
  caution: '팔을 굽히지 말고 어깨만 아래로 당기세요.',
  videoUrl: 'https://www.youtube.com/shorts/EO46FOpsk3c',
};
const future = (id: string, name: string, targetText: string, caution: string): ExerciseDefinition => ({
  id, name, purpose: '다음 풀업 단계에 필요한 힘과 동작을 연습합니다.', targetText, totalSets: 2,
  instructions: ['안정된 의자와 철봉을 준비합니다.', '반동 없이 통제된 범위에서 움직입니다.'], caution,
});

const prep = [chinTuck, wallPush];
export const LEVELS: LevelDefinition[] = [
  { level: 1, name: '매달리기 적응', summary: '철봉과 기본 견갑 움직임에 적응합니다.', exercises: [...prep, hang(10), assistedScap] },
  { level: 2, name: '매달리기 증가', summary: '매달리는 시간을 조금 늘립니다.', exercises: [...prep, hang(15), assistedScap] },
  { level: 3, name: '매달리기 안정화', summary: '매달리기와 견갑 동작을 안정시킵니다.', exercises: [...prep, hang(20), assistedScap] },
  { level: 4, name: '발 보조 풀업', summary: '다리 보조로 풀업 전체 동작을 연습합니다.', exercises: [...prep, hang(20), assistedScap, future('assisted-pullup', '발 보조 풀업', '5회', '발로 충분히 보조하고 반동을 사용하지 마세요.')] },
  { level: 5, name: '네거티브 풀업', summary: '상단에서 천천히 내려오는 힘을 기릅니다.', exercises: [...prep, hang(20), future('negative-pullup', '네거티브 풀업', '천천히 내려오기 · 3회', '의자로 상단 자세를 만든 뒤 통제해서 내려오세요.')] },
  { level: 6, name: '정자세 풀업', summary: '반동 없는 풀업 1회에 도전합니다.', exercises: [...prep, future('strict-pullup', '정자세 풀업', '반동 없이 1회', '통증이 없고 안정된 자세에서만 시도하세요.')] },
];

export const getLevel = (level: number) => LEVELS.find((item) => item.level === level) ?? LEVELS[0];
