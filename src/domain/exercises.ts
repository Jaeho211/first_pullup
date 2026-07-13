import { ExerciseDefinition, ExerciseTracking, LevelDefinition, UserProfile } from './types';

export const DEFAULT_PROFILE: UserProfile = {
  name: '이재호',
  birthYear: 1986,
  weeklyTarget: 3,
  currentLevel: 1,
  longTermGoal: '반동 없는 정자세 풀업 1회',
};

const repetitions = (...extraFields: { key: string; label: string; unit?: string }[]): ExerciseTracking => ({
  primaryMetric: 'repetitions',
  fields: [{ key: 'repetitions', label: '반복 수', unit: '회' }, ...extraFields],
});

const duration = (...extraFields: { key: string; label: string; unit?: string }[]): ExerciseTracking => ({
  primaryMetric: 'duration',
  fields: [{ key: 'durationSeconds', label: '수행 시간', unit: '초' }, ...extraFields],
});

const chinTuck: ExerciseDefinition = {
  id: 'standing-chin-tuck',
  name: '서서 턱 당기기',
  purpose: '본운동 전에 목과 머리의 중립 정렬을 짧게 연습합니다.',
  targetText: '8회 · 1회당 5초 유지',
  totalSets: 1,
  tracking: repetitions({ key: 'holdSeconds', label: '유지 시간', unit: '초' }),
  instructions: [
    '정면을 바라보고 편하게 섭니다.',
    '턱을 숙이지 않고 얼굴과 머리 전체를 수평으로 뒤로 이동합니다.',
    '가볍게 이중턱을 만든 상태로 5초 유지한 뒤 힘을 뺍니다.',
  ],
  caution: '고개를 숙이거나 목에 강하게 힘을 주지 마세요.',
  videoUrl: 'https://www.youtube.com/shorts/450SrSL4tMc',
};

const wallWSlide: ExerciseDefinition = {
  id: 'wall-w-slide',
  name: '벽 W 슬라이드',
  purpose: '본운동 전에 어깨를 올리는 범위와 견갑 움직임을 가볍게 준비합니다.',
  targetText: '8~10회',
  totalSets: 1,
  tracking: repetitions(),
  instructions: [
    '벽에 등을 대고 팔꿈치를 굽혀 양팔로 W자를 만듭니다.',
    '어깨를 귀에서 멀리 둔 채 팔을 통증 없는 범위까지만 올립니다.',
    '허리가 꺾이지 않게 유지하며 천천히 W 자세로 돌아옵니다.',
  ],
  caution: '손등이나 팔꿈치를 벽에 억지로 붙이지 마세요.',
};

const assistedHang = (targetText: string, totalSets = 3): ExerciseDefinition => ({
  id: 'foot-assisted-hang',
  name: '발 보조 매달리기',
  purpose: '발로 체중을 덜어 그립과 철봉 자세에 안전하게 적응합니다.',
  targetText,
  totalSets,
  tracking: duration({ key: 'assistance', label: '발 보조 정도' }),
  instructions: [
    '철봉 아래의 안정된 의자에 두 발을 올리고 철봉을 잡습니다.',
    '팔꿈치는 펴고 발로 필요한 만큼 체중을 지지합니다.',
    '턱을 앞으로 내밀지 않은 채 목표 시간 동안 유지합니다.',
    '내려올 때는 발에 체중을 다시 싣고 철봉을 놓습니다.',
  ],
  caution: '의자가 움직이지 않는지 확인하고 그립이 풀릴 때까지 버티지 마세요.',
});

const deadHang = (targetText: string, totalSets = 3): ExerciseDefinition => ({
  id: 'dead-hang',
  name: '일반 매달리기',
  purpose: '그립과 전완의 지구력을 기르고 철봉에서 몸을 안정시킵니다.',
  targetText,
  totalSets,
  tracking: duration(),
  instructions: [
    '의자를 밟고 철봉을 잡은 뒤 준비가 되면 발을 뗍니다.',
    '팔꿈치를 펴고 턱을 앞으로 내밀지 않습니다.',
    '목표 시간 동안 반동 없이 유지합니다.',
    '끝까지 버티거나 뛰어내리지 말고 의자를 다시 밟습니다.',
  ],
  caution: '손이 완전히 풀릴 때까지 버티지 마세요.',
});

const scapularPullup = (assisted: boolean, targetText: string, totalSets: number): ExerciseDefinition => ({
  id: assisted ? 'chair-assisted-scapular-pullup' : 'scapular-pullup',
  name: assisted ? '의자 보조 견갑 풀업' : '견갑 풀업',
  purpose: assisted
    ? '발로 체중을 덜어 팔꿈치를 펴고 어깨로 몸을 살짝 들어 올리는 감각을 익힙니다.'
    : '팔꿈치를 펴고 견갑을 아래로 움직여 풀업의 시작 힘을 기릅니다.',
  targetText,
  totalSets,
  tracking: repetitions(...(assisted ? [{ key: 'assistance', label: '발 보조 정도' }] : [])),
  instructions: assisted
    ? [
        '철봉 아래의 안정된 의자에 두 발을 올리고 팔꿈치를 편 채 매달립니다.',
        '발로 체중 일부를 지지하고 어깨를 귀에서 멀어지게 아래로 내립니다.',
        '팔꿈치를 굽히지 않은 채 몸이 2~5cm 올라가도록 합니다.',
        '천천히 어깨를 시작 위치로 돌립니다.',
      ]
    : [
        '팔꿈치를 편 채 철봉에 매달립니다.',
        '어깨를 귀에서 멀어지게 아래로 내려 몸을 조금 들어 올립니다.',
        '팔꿈치를 계속 편 상태로 잠깐 멈춥니다.',
        '천천히 시작 위치로 돌아옵니다.',
      ],
  caution: assisted
    ? '팔꿈치를 굽혀 풀업처럼 당기지 말고, 안정된 의자에서 발로 충분히 보조하세요.'
    : '동작 범위가 작아도 괜찮습니다. 팔꿈치를 굽히거나 반동을 쓰지 마세요.',
});

const assistedPullup = (targetText: string, totalSets = 3): ExerciseDefinition => ({
  id: 'foot-assisted-pullup',
  name: '발 보조 풀업',
  purpose: '발로 체중을 덜면서 실제 풀업과 같은 수직 당기기 동작을 연습합니다.',
  targetText,
  totalSets,
  tracking: repetitions({ key: 'assistance', label: '발 보조 정도' }),
  instructions: [
    '안정된 의자에 발을 올리고 팔을 편 상태에서 시작합니다.',
    '가슴을 살짝 들고 팔꿈치를 아래로 끌어내립니다.',
    '발로 필요한 만큼 밀어 턱이 철봉 높이에 오도록 합니다.',
    '반동 없이 천천히 시작 위치로 돌아옵니다.',
  ],
  caution: '발로 충분히 보조하고 목을 내밀거나 반동을 사용하지 마세요.',
});

const negativePullup = (targetText: string, totalSets: number): ExerciseDefinition => ({
  id: 'negative-pullup',
  name: '네거티브 풀업',
  purpose: '상단에서 천천히 내려오며 풀업에 필요한 편심성 당기기 힘을 기릅니다.',
  targetText,
  totalSets,
  tracking: repetitions({ key: 'descentSeconds', label: '하강 시간', unit: '초' }),
  instructions: [
    '의자를 이용해 턱이 철봉 위에 있는 상단 자세를 만듭니다.',
    '발을 떼고 가슴과 몸통을 안정시킵니다.',
    '목표 시간 동안 일정한 속도로 내려옵니다.',
    '팔이 펴지면 의자를 밟고 다음 반복을 준비합니다.',
  ],
  caution: '뛰어올라 시작하거나 마지막 구간에서 갑자기 떨어지지 마세요.',
});

const topHold: ExerciseDefinition = {
  id: 'top-hold',
  name: '풀업 상단 버티기',
  purpose: '풀업의 가장 높은 위치를 안정적으로 유지하는 힘을 기릅니다.',
  targetText: '5~10초 유지',
  totalSets: 2,
  tracking: duration(),
  instructions: [
    '의자를 이용해 턱이 철봉 위에 있는 자세를 만듭니다.',
    '가슴을 살짝 들고 어깨가 귀로 올라가지 않게 유지합니다.',
    '목표 시간만큼 버틴 뒤 천천히 내려옵니다.',
  ],
  caution: '턱을 억지로 내밀지 말고 자세가 무너지기 전에 의자를 밟으세요.',
};

const strictPullup = (targetText: string, totalSets: number, attempt = false): ExerciseDefinition => ({
  id: attempt ? 'strict-pullup-attempt' : 'strict-pullup',
  name: attempt ? '보조 없는 풀업 시도' : '정자세 풀업',
  purpose: attempt ? '피로가 적을 때 보조 없는 첫 풀업을 차분히 시도합니다.' : '성공한 정자세 풀업을 반복 가능한 힘으로 발전시킵니다.',
  targetText,
  totalSets,
  tracking: repetitions(),
  instructions: [
    '팔을 편 상태에서 어깨를 안정시키고 시작합니다.',
    '가슴을 살짝 들고 팔꿈치를 아래로 끌어내립니다.',
    '반동이나 발차기 없이 턱이 철봉을 넘도록 당깁니다.',
    '내려올 때도 통제하며 팔을 편 시작 자세로 돌아옵니다.',
  ],
  caution: attempt ? '각 시도 사이 2~3분 쉬고 같은 세션에서 실패를 반복하지 마세요.' : '반동, 발차기, 목 내밀기 없이 가능한 반복까지만 수행하세요.',
});

const warmup = [chinTuck, wallWSlide];

export const LEVELS: LevelDefinition[] = [
  {
    level: 1,
    name: '보조 당기기 적응',
    summary: '발로 충분히 보조하며 첫날부터 실제 당기기 동작을 익힙니다.',
    exercises: [
      ...warmup,
      assistedHang('15~20초', 3),
      scapularPullup(true, '5회', 3),
      assistedPullup('5회', 3),
    ],
  },
  {
    level: 2,
    name: '견갑과 보조 풀업',
    summary: '매달리기와 견갑 움직임을 안정시키고 보조 풀업 반복을 늘립니다.',
    exercises: [
      ...warmup,
      deadHang('20~30초', 3),
      scapularPullup(false, '5~8회', 3),
      assistedPullup('6~8회', 3),
    ],
  },
  {
    level: 3,
    name: '네거티브 입문',
    summary: '보조 풀업의 힘을 유지하며 짧은 네거티브를 시작합니다.',
    exercises: [
      ...warmup,
      deadHang('20~30초', 2),
      scapularPullup(false, '6~10회', 3),
      assistedPullup('5~8회', 3),
      negativePullup('3회 · 3초 하강', 2),
    ],
  },
  {
    level: 4,
    name: '네거티브 강화',
    summary: '보조를 줄이고 상단 유지와 느린 하강 능력을 기릅니다.',
    exercises: [
      ...warmup,
      scapularPullup(false, '6~10회', 2),
      assistedPullup('5~8회', 3),
      negativePullup('3~5회 · 3~5초 하강', 3),
      topHold,
    ],
  },
  {
    level: 5,
    name: '첫 풀업 시도',
    summary: '세션 초반에 보조 없이 시도하고 보조 운동으로 힘을 보완합니다.',
    exercises: [
      ...warmup,
      strictPullup('1회씩 시도', 3, true),
      assistedPullup('4~6회', 3),
      negativePullup('3회 · 5초 하강', 2),
      scapularPullup(false, '6~8회', 2),
    ],
  },
  {
    level: 6,
    name: '정자세 풀업 안정화',
    summary: '성공한 정자세 풀업을 안정적인 반복으로 발전시킵니다.',
    exercises: [
      ...warmup,
      strictPullup('1~3회', 3),
      assistedPullup('5~8회', 2),
      deadHang('20~30초', 2),
    ],
  },
];

export const getLevel = (level: number) => LEVELS.find((item) => item.level === level) ?? LEVELS[0];

export const findExercise = (id: string) => LEVELS.flatMap((level) => level.exercises).find((exercise) => exercise.id === id);
