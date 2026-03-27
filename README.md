# React + TypeScript + Vite

## 과제 개요

Vite + React + TypeScript 환경에서 진행.
원본 레포 미제공으로, 과제 수행에 필요한 최소 범위 내에서 mock 데이터와 더미 컴포넌트를 직접 구성함.

AI 대화 로그: https://chatgpt.com/share/69c5dcfb-e14c-83a8-a4d2-9903fef355bc

# MISSION 1 — 레거시 코드 진단 및 리팩토링

## 개요

`PostListPage` 코드 기준으로 렌더링 성능 저하 원인을 분석하고, AI 제안과 직접 판단을 반영해 리팩토링함.


## [원인 1] 서로 다른 도메인의 비동기 로직이 하나의 effect에 묶여 있음

### 문제 설명

게시글 조회와 사용자 조회를 하나의 `useEffect`에서 함께 처리.
`categoryId` 변경 시 게시글만 재조회하면 되는 상황에서도 사용자 조회가 함께 실행될 수 있어 불필요한 fetch와 상태 업데이트 가능성 있음.
또한 JSX에서 실제로 사용하지 않는 `loading` state가 남아 상태 흐름만 복잡하게 만들고 있었음.

### AI가 제안한 해결책

별도 제안 없음.

### 내가 채택한 방식 및 이유

* 게시글 조회와 사용자 조회를 도메인별로 분리해 각각의 `useEffect`로 관리
* 사용하지 않는 `loading` state 제거

각 effect의 책임을 명확히 하고, 불필요한 상태 업데이트 가능성을 줄이기 위함.
렌더 횟수 자체보다 의존성과 책임이 명확한 구조가 더 중요하다고 판단함.

### 채택하지 않은 방식

`loading` state 유지 + 향후 로딩 UI 추가 방식도 가능했지만, 현재 과제 범위에서 사용하지 않는 상태를 남기는 것보다 제거가 더 명확하다고 판단함.


## [원인 2] 값이 변하지 않는 자식 컴포넌트까지 부모 리렌더에 따라 함께 렌더됨

### 문제 설명

`UserProfile`은 카테고리 변경과 무관하고 전달되는 `user` 값도 변하지 않음.
그럼에도 부모인 `PostListPage` 리렌더 시 함께 재렌더됨.
실측 기준 카테고리 변경 흐름에서 **4회 렌더링** 확인.

### AI가 제안한 해결책

`UserProfile` 컴포넌트에 `React.memo` 적용

### 내가 채택한 방식 및 이유

`UserProfile`에 `React.memo` 적용.
React Profiler 기준 카테고리 변경 시 `UserProfile` **4회 → 0회**로 감소 확인.
부모 리렌더 자체를 줄인 건 아니지만, 변화 없는 자식의 불필요한 렌더 비용을 줄임.

### 채택하지 않은 방식

없음


## [원인 3] 함수 prop 참조가 매 렌더마다 새로 생성되어 리스트 아이템 재렌더를 유발함

### 문제 설명

`handleClick`이 부모 렌더마다 새로 생성되면, `PostItem`을 `memo` 처리해도 함수 prop 참조가 달라져 재렌더 발생.
동일 게시글임에도 부모 렌더 시 불필요하게 재렌더되는 흐름 관찰됨.

### AI가 제안한 해결책

`handleClick`에 `React.useCallback` 적용

### 내가 채택한 방식 및 이유

`handleClick`을 `useCallback`으로 메모이제이션.
React Profiler 기준 `PostItem` 렌더 횟수 **4회 → 2회**로 감소 확인.
렌더 자체를 직접 막는 게 아니라, 함수 prop 참조를 안정화해 `React.memo(PostItem)`이 의미 있게 동작하도록 만듦.

### 채택하지 않은 방식

인라인 함수(`handleClick={() => handleClick(post.id)}`)는 구현은 단순하지만, 렌더마다 새로운 함수 참조가 생성되어 memoized child component의 props 안정성을 해치므로 채택하지 않음.
즉, 자식 컴포넌트를 `React.memo`로 감싸고 원본 핸들러를 `useCallback`으로 메모이제이션해도, 인라인 함수로 다시 감싸 전달하면 렌더링 감소 효과가 제한됨.

## 추가 검토 사항

### 정렬 로직에 `useMemo`를 적용하지 않은 이유

Mission 1 단계에서는 렌더링 저하의 핵심 원인이 재연산보다 자식 컴포넌트의 불필요한 재렌더에 있다고 판단해 미적용.
Mission 2에서 필터 상태가 추가되면서 `sortedAndFilteredPosts`가 여러 state 변화에 따라 반복 계산될 수 있으므로, 해당 시점에 `useMemo` 적용이 더 타당하다고 판단함.

# MISSION 2 — 트레이드오프 분석과 선택

## 개요

다중 필터링 구현 시 필터 상태를 어디에 둘지, 어떤 방식으로 필터링을 구성할지를 비교함.

## [채택한 방식]

### 구현 방식 요약

`useState`로 필터 상태를 관리하고, `useMemo` 내부에서 순수 JS 필터 함수(`filterPosts`)로 카테고리, 날짜 범위, 좋아요 최솟값, 검색어 조건을 AND 결합.

### 선택 이유

* 추가 의존성 없음
* 구현과 설명이 직관적임
* 단일 화면 기준 상태 관리가 단순함
* 과제 범위에 맞는 최소 복잡도로 요구사항 충족 가능

## [채택하지 않은 방식]

### 구현 방식 요약

URL search params에 필터 상태를 저장하고, URL 값을 파싱해 필터링에 반영하는 방식

### 이 프로젝트에 맞지 않는 이유

새로고침 복원, 링크 공유 측면에서 장점이 있으나 아래 이유로 과한 설계라고 판단함.

* URL 직렬화/파싱 로직 추가 필요
* 필터 상태와 URL 상태를 함께 관리해 흐름이 복잡해짐
* 부모 컴포넌트에서 URL 동기화 책임이 커짐
* 단일 화면 과제 규모 대비 구현 복잡도 불필요하게 증가

## [AI 제안에서 내가 수정한 부분]

타입화선언 위치를 컴포넌트 외부로 분리.
재사용 가능한 타입 정의만 외부로 분리해 가독성과 재사용성을 높임.
외에 큰 구조 변화 없음
예시:

```ts
type PostFormValues = {
  title: string;
  content: string;
  tags: string[];
  likesThreshold: string;
};
```

# MISSION 3 — 커스텀 제약 하의 Validation 엔진

## 개요

### 3-1. Validation 엔진
* `src/MISSION3/utils/validation.ts`

### 3-2. useForm 커스텀 훅
* `src/MISSION3/hooks/useForm.ts`

### 3-3. 실제 사용 예시 폼
* `src/MISSION3/components/PostForm.tsx`

### 3-4. AI 제공 코드 수정본
* `src/MISSION3/hooks/useJsForm.js`

## MISSION 3 구현 요약

### Validation 엔진

검증 규칙은 JSON-serializable한 순수 객체 형태로 유지.
실제 검증 로직은 엔진 내부 함수에서만 처리하도록 구성.

주요 함수: `validateField`, `validateForm`, `hasErrors`

### useForm 훅

`useForm(rules, initialValues)` 시그니처 유지.
반환값: `values`, `errors`, `handleChange`, `handleSubmit`

### 실제 사용 예시

`PostForm.tsx`에서 제목, 내용, 태그, 좋아요 기준값 입력을 받고 각 필드별 에러 메시지를 한국어로 출력.

## AI 생성 코드 버그 분석

### 버그 1 — validate 함수 내 템플릿 문자열 오류

* **발생 위치:** `validate` 함수 내 최소/최대 길이 에러 메시지 반환 부분
* **문제 상황:** `${rule.minLength}`, `${rule.maxLength}`가 값으로 치환되지 않고 문자열 그대로 출력됨
* **수정:** 작은따옴표 → 백틱 템플릿 문자열로 수정

### 버그 2 — handleChange 내부 stale state 가능성

* **발생 위치:** `handleChange` 함수 내부
* **문제 상황:** 연속 입력이나 빠른 상태 변경 시 이전 state를 기준으로 덮어쓸 가능성 있음
* **수정:** `setValues`, `setErrors`를 함수형 업데이트 방식으로 변경

### 버그 3 — handleSubmit의 이벤트 처리 방식 문제

* **발생 위치:** `handleSubmit` 함수 내부
* **문제 상황:** 이벤트를 전달받지 않아 `preventDefault()` 호출 불가. 기본 제출 동작 발생 가능
* **수정:** `handleSubmit = (onSubmit) => (event) => { ... }` 형태로 변경

### 버그 4 — 숫자/배열 규칙 미지원

* **발생 위치:** 기존 `validate` 함수 전체 구조
* **문제 상황:** `type: 'number'`, `min`, `max`, `maxCount`, `pattern` 규칙을 처리하지 못함
* **수정:** 숫자/배열 규칙 분기를 추가해 전체 `postRules` 지원하도록 보완

### 버그 5 — 빈 값 판별 로직의 부정확성

* **발생 위치:** `if (rule.required && !value)` 조건문
* **문제 상황:** `0`, 공백 문자열, 빈 배열 등을 정확히 구분하지 못해 의도와 다른 검증 결과 발생 가능
* **수정:** `isEmptyValue` 헬퍼 함수 추가해 필수값 판별 기준 명확화

# 실행 방법

```bash
npm install
npm run dev
```
