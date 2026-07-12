# 첫 풀업

집에서 약 10분의 최소 루틴을 주 3회 수행해 정자세 풀업 1회까지 발전하도록 돕는 개인용 Android 앱입니다. 세트 완료 여부만 저장하며 타이머, 반복 횟수, 통증, RPE, 메모는 기록하지 않습니다.

## 기술 구성

- Expo / React Native / TypeScript / Expo Router
- AsyncStorage 기반 로컬 저장소 (`src/services/storage.ts`)
- StyleSheet 기반 Android 우선 세로 UI
- Expo Haptics 및 Keep Awake

## 프로젝트 구조

```text
app/                 Expo Router 화면과 라우팅
  (tabs)/            홈, 운동, 기록 탭
  workout/           운동 진행과 완료
  history/           기록 상세
src/
  components/        공통 화면과 버튼
  constants/         색상 토큰
  context/           프로필과 완료 세션 상태
  domain/            타입과 단계별 운동 정의
  services/          교체 가능한 로컬 저장소 계층
  utils/             날짜 계산
```

## 실행

```bash
npm install
npm run android
```

Android Studio 에뮬레이터 또는 USB 디버깅이 활성화된 Android 기기가 필요합니다. 타입 검사는 `npm run typecheck`로 실행합니다.

## 저장 정책

첫 실행 시 이재호의 기본 프로필을 생성합니다. 운동 중 상태는 메모리에만 있고, 모든 운동 세트를 마친 완료 세션만 로컬에 저장합니다. 설정의 전체 초기화는 프로필과 운동 기록을 삭제한 뒤 기본 프로필을 다시 생성합니다.

이 앱은 의료 진단이나 재활 치료를 제공하지 않습니다. 목이나 어깨에 날카로운 통증, 팔 저림 또는 힘 빠짐이 나타나면 운동을 중단해야 합니다.
