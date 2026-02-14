# Stackflow Navigation Test Monorepo (실구현 버전)

요청하신 "시나리오만 나열"이 아니라, 각 앱이 **클릭 가능한 동작**을 가지도록 구성했습니다.

## 구조
- `apps/stackflow-repro`: Stack push/pop, browser back, refresh 복원, 데스크톱 이슈 시뮬레이션
- `apps/navigation-patterns`: 탭+중첩, 위저드, 풀스크린 모달
- `apps/famous-app-nav`: Instagram/YouTube/Uber/KakaoTalk 스타일 상태 전이

## 실행 (의존성 설치 불필요)
```bash
npm run serve:stackflow
npm run serve:patterns
npm run serve:famous
```

## 1) Router 적합성 검증 (실제 재현)
`apps/stackflow-repro`에서 아래를 직접 검증 가능:
1. `history 동기화 사용` 체크 상태에서 push/pop + browser back 동작 비교
2. 폭 > 600에서 `List -> Detail` 진입 후 새로고침
3. `flow.pop()`과 `window.history.back()` 차이 확인
4. `PC 새로고침 이슈 시뮬레이션` 켜서 문제 상황 강제 재현

## 2) Stack Navigation 가능한 대안 Web Router
- React Router: 표준 웹 라우팅 + 커스텀 스택 상태 레이어
- TanStack Router: 타입 안정성/데이터 라우팅 강점 + 스택 UX는 커스텀
- React Navigation (web): 모바일 앱형 stack 경험을 웹으로 이식 가능

## 3) 다양한 내비게이션 방식
`apps/navigation-patterns`에서 실제 버튼 클릭으로 재현:
- Tabs + nested detail
- Wizard 1~3 step
- Fullscreen modal route 형태

## 4) 유명 앱 내비게이션 재현
`apps/famous-app-nav`에서 각 앱의 주요 전이를 상태 기반으로 재현:
- Instagram
- YouTube
- Uber
- KakaoTalk
