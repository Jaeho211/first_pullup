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
  purpose: '발로 부하를 조절하며 손바닥과 그립을 적응시키고 안정된 매달리기 자세를 익힙니다.',
  targetText,
  totalSets,
  tracking: duration({ key: 'assistance', label: '발 보조 정도' }),
  instructions: [
    '철봉 아래의 바닥이나 움직이지 않는 의자에 두 발을 안정적으로 둡니다.',
    '철봉은 손가락과 손바닥의 경계보다 조금 손바닥 쪽에 놓고, 엄지는 철봉 아래로 감쌉니다.',
    '팔꿈치를 편 채 발로 체중을 충분히 받습니다. 손에 싣는 비율을 맞추려 하지 말고 통증 없이 여유가 남는 정도로 조절합니다.',
    '턱을 앞으로 내밀지 말고 목을 길게 유지하며 목표 시간 동안 반동 없이 매달립니다.',
    '손가락이 풀리거나 자세가 무너지기 전에 발에 체중을 싣고 내려옵니다.',
    '각 세트가 끝나면 60~90초 쉽니다.',
    '10초 5세트가 편안해지면 12초, 다음에는 15초로 늘립니다. 그다음 발 보조를 조금 줄이고, 마지막에 일반 매달리기 5~10초를 시도합니다.',
  ],
  caution: '시간과 발 보조 감소를 동시에 늘리지 마세요. 손가락 관절이나 손목의 통증, 찌르는 통증, 저림 또는 힘 빠짐이 나타나면 즉시 중단하세요.',
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
  name: assisted ? '발 보조 견갑 풀업' : '견갑 풀업',
  purpose: assisted
    ? '발로 체중을 덜어 팔꿈치를 펴고 어깨로 몸을 살짝 들어 올리는 감각을 익힙니다.'
    : '팔꿈치를 펴고 견갑을 아래로 움직여 풀업의 시작 힘을 기릅니다.',
  targetText,
  totalSets,
  tracking: repetitions(...(assisted ? [{ key: 'assistance', label: '발 보조 정도' }] : [])),
  instructions: assisted
    ? [
        '철봉 아래의 바닥이나 움직이지 않는 의자에 발을 두고, 팔꿈치를 편 채 매달립니다.',
        '발로 체중을 충분히 받으면서 어깨를 귀에서 멀어지게 아래로 내립니다.',
        '팔꿈치를 굽히지 않고 견갑만 움직입니다. 몸이 1~3cm 올라가도 충분합니다.',
        '목을 위로 빼거나 턱을 들지 말고, 천천히 어깨를 시작 위치로 돌립니다.',
        '5회 내내 같은 자세를 유지할 수 있도록 발 보조를 조절하고 세트 사이 60~90초 쉽니다.',
      ]
    : [
        '팔꿈치를 편 채 철봉에 매달립니다.',
        '어깨를 귀에서 멀어지게 아래로 내려 몸을 조금 들어 올립니다.',
        '팔꿈치를 계속 편 상태로 잠깐 멈춥니다.',
        '천천히 시작 위치로 돌아옵니다.',
      ],
  caution: assisted
    ? '팔꿈치를 굽혀 풀업처럼 당기거나 큰 동작을 만들려고 하지 마세요. 자세가 흐트러지면 발 보조를 늘리세요.'
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
    '철봉 아래의 바닥이나 움직이지 않는 의자에 발을 두고 팔을 편 상태에서 시작합니다.',
    '발로 체중을 충분히 받으며 먼저 어깨를 귀에서 멀어지게 아래로 내립니다.',
    '가슴을 철봉 쪽으로 가져간다는 느낌으로 약 2초 동안 천천히 당깁니다.',
    '턱이 철봉 위까지 올라가지 않아도 됩니다. 목을 내밀지 말고 통제 가능한 범위까지만 움직입니다.',
    '약 3초 동안 천천히 내려와 팔을 편 시작 자세로 돌아옵니다.',
    '반동 없이 모든 반복을 마칠 수 있도록 발 보조를 조절하고 세트 사이 60~90초 쉽니다.',
  ],
  caution: '목표 반복을 채우려고 발 보조를 줄이거나 자세를 희생하지 마세요. 손 통증이나 그립 불안이 커지면 그 세트를 종료하세요.',
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
    summary: '발 보조로 손바닥과 그립 부담을 조절하면서 견갑과 등의 당기기 힘을 함께 기릅니다.',
    exercises: [
      ...warmup,
      assistedHang('10초 · 휴식 60~90초', 5),
      scapularPullup(true, '5회 · 휴식 60~90초', 3),
      assistedPullup('3회 · 2초 상승/3초 하강', 3),
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
