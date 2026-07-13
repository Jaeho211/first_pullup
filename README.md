# 첫 풀업

반동 없는 정자세 풀업 1회를 준비할 수 있도록 단계별 운동을 안내하고 수행 기록을 남기는 개인용 Android 앱입니다. 준비 운동보다 철봉 매달리기, 견갑 풀업, 보조 풀업과 네거티브 풀업에 중점을 두며, 사용자가 자신의 현재 단계를 직접 선택합니다.

## 주요 기능

- 6단계 풀업 준비 루틴과 운동별 자세 안내
- 세션 당시의 운동 정보와 세트 단위 완료 기록 보존
- 월간 운동 달력과 세션별 상세 기록
- 운동 후 체감 강도 기록
- 이름, 주간 목표 횟수, 현재 단계 설정
- 전체 기록을 GPT/Codex 분석용 JSON으로 공유
- 프로필과 기록의 로컬 저장 및 전체 초기화

## 기술 구성

- Expo 57 / React Native 0.86 / React 19 / TypeScript
- Expo Router 기반 파일 라우팅
- AsyncStorage 기반 로컬 저장소
- Expo Haptics, Keep Awake, File System, Sharing
- Android 우선 세로형 `StyleSheet` UI

## 프로젝트 구조

```text
app/                 Expo Router 화면과 라우팅
  (tabs)/            홈, 운동, 기록 탭
  workout/           운동 안내, 진행, 완료 화면
  history/           운동 기록 상세 화면
src/
  components/        공통 화면과 버튼
  constants/         색상과 테마
  context/           프로필 및 세션 상태
  domain/            운동 정의와 데이터 타입
  services/          로컬 저장과 기록 내보내기
  utils/             날짜 유틸리티
android/             Android 네이티브 프로젝트
```

## 시작하기

의존성을 설치하고 Expo 개발 서버를 실행합니다.

```bash
npm install
npm run start
```

Android Studio 에뮬레이터 또는 USB 디버깅이 활성화된 Android 기기에서 네이티브 앱을 실행하려면 다음 명령을 사용합니다.

```bash
npm run android
```

## 데이터와 개인정보

프로필과 운동 세션은 기기의 AsyncStorage에만 저장됩니다. 기록 공유를 직접 실행하면 앱이 JSON 파일을 생성해 Android 공유 화면을 엽니다. 전체 초기화는 두 번의 확인을 거쳐 로컬 프로필과 운동 기록을 삭제합니다.

## 안전 안내

이 앱은 의료 진단이나 재활 치료를 제공하지 않으며 첫 풀업 달성 시점을 보장하지 않습니다. 운동 중 목이나 어깨의 날카로운 통증, 팔 저림 또는 힘 빠짐이 나타나면 운동을 중단하세요.

운동 구성의 기준, 앱 동작 계약, 변경 시 확인 사항은 [AGENTS.md](./AGENTS.md)를 참고하세요.
