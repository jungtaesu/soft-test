# React + TypeScript + Vite

────────────────────
MISSION 1 — 레거시 코드 진단 및 리팩토링

과제:

AI를 활용하여 성능 저하 원인 3가지를 찾아내세요.각 원인을 리팩토링한 코드를 제출하세요.아래 양식으로 자가 검토서를 작성하세요.

제출 양식 (원인마다 반복):


  1번 AI를 활용하여 성능 저하 원인 3가지를 찾아내세요.각 원인을 리팩토링한 코드를 제출하세요.아래 양식으로 자가 검토서를 작성하세요.
  [원인 N]

  문제 설명:AI가 제안한 해결책:내가 채택한 방식 및 이유:채택하지 않은 방식이 있다면, 그 이유 

  1-1
  useEffect 내부 도메인 별 로직 분리
  //쓰지않는 state 정리 (loading) 로딩값 쓰는 jsx가 없음. userId 의존성 배열에서 삭제
  문제설명: useEffect에 다른 도메인의 state가 포함되어 불필요하게 재렌더링 유도 가능성이 있었음.
  AI 해결책: 없음
  채택방식 및 이유 : 각 도메인별 useEffect 분리, 불필요한 state 삭제
  각 useEffect의 책임이 분명하다. 불필요한 state 삭제로 렌더링 최적화

  1-2
  UserProfile React.memo 설정 - 자식 컴포넌트 재렌더 방지/ UserProfile 렌더링 4회 -> 0회
  문제설명: 변하지 않는 값을 props를 받지만 그럼에도 불구하고 렌더링 발생
  AI 해결책: UserProfile 컴포넌트를 memo로 감싸기
  채택방식 및 이유: 렌더링 4회 -> 0회 
  실제로 렌더링이 발생하지않음. 변화없는 props를 쓰는데 렌더링 발생은 불필요 자식 렌더 비용 감소

  1-3
  handleClick React.useCallback - PostItem 리렌더링 4회 -> 2회.
  문제설명: 같은 postitem임에도 postlistpage 렌더링 시 새로운 함수가 되는 handleclick이 postitem props로 쓰이면 postitem도 재렌더링된다.
  AI 해결책: handleclick 함수에 React.useCallback 씌우기.
  채택 방식 및 이유:  PostItem 리렌더링 4회 -> 2회. 렌더링 최적화.


노트: 
  채택하지 않은 방식:   const sortedPosts = useMemo(() => [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ), [posts]
  
   memo 적용 -> 사유: 리렌더링 방지가 핵심이 아니라 재연산 방지가 목적이기 때문이다? 리렌더 원인이 오직 setPosts 뿐이라면 의미없다.

  mission2 를 하면서 state 가 많아져서 sortedAndFilteredPosts 여기선 씌워야하지만 전에는 안그래도 됐음.


MISSION 2 — 트레이드오프 분석과 선택


과제:

1. AI를 활용하여 이 필터링 기능을 최소 2가지 방식으로 도출하세요. (예: 순수 JS 구현 vs 외부 라이브러리, URL 쿼리 파라미터 기반 등)
2. 최종 채택한 방식의 코드를 제출하고 아래 양식으로 판단 근거를 서술하세요.

제출 양식:

[채택한 방식]

- 구현 방식 요약: React의 useState로 필터 상태를 관리하고, useMemo 내부에서 순수 JS 필터 함수를 통해 카테고리, 날짜 범위, 좋아요 최솟값, 검색어 조건을 AND로 결합했다.
선택 이유: 추가 의존성이 없어 번들 크기 증가가 없고, 구현과 설명이 직관적이며 과제 범위에 맞는 최소 복잡도로 요구사항을 충족할 수 있다고 판단했다. 자식에서 상태관리가 간단함.

[채택하지 않은 방식]

- 구현 방식 요약: URL search params에 필터 상태를 저장하고, URL 값을 파싱해 필터링에 반영하는 방식
치명적 단점 또는 이 프로젝트에 맞지 않는 이유: 새로고침 복원성과 공유 가능성은 장점이지만, 이번 과제는 단일 화면의 필터링 기능 검증이 핵심이라 URL 직렬화/파싱까지 도입하면 구현 복잡도만 증가한다고 판단했다.

- 치명적 단점 또는 이 프로젝트에 맞지 않는 이유: 부모에서 URL 동기화 하는 번거러움, state 관리가여러곳에서. 부모컴포넌트의 책임 무거움 (어떻게?)
이 방식은 URL 직렬화와 파싱 로직이 추가되어 부모 컴포넌트의 책임이 커지고, 구현 복잡도도 함께 증가한다. 따라서 현재 프로젝트 규모와 과제 목적에는 과한 설계라고 판단했다.

[AI 제안에서 내가 수정한 부분]

- 수정 내용: 
// 큰 구조 변경은 없었고 타입 선언 위치 분리

- 수정 이유:
// 재사용성

type PostFormValues = {
  title: string;
  content: string;
  tags: string[];
  likesThreshold: string;
};


3-1 커스텀 제약 하의 Validation 엔진
vite-project/src/MISSION3/utils/validation.ts

3-2 vite-project/src/MISSION3/hooks/useForm.ts

3-3 vite-project/src/MISSION3/components/postForm.tsx

3-4
vite-project/src/MISSION3/hooks/useJsForm.js

버그마다 아래를 서술해 주세요:
- 어느 줄에서 발생하는가?
- 어떤 상황에서 문제가 생기는가?
- 수정된 코드:

연속 호출/ 동시 업데이트 시 간헐적 버그