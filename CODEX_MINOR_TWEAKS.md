# UI 디테일 및 홈 화면 필터링 추가 지시서

가계부의 실사용성을 높이기 위해 아래 두 가지 수정 사항을 `app.js`와 `index.html`, `styles.css`에 반영하세요.

## 1. 지불수단 명칭 명확화
- **요구사항:** 내역 추가 다이얼로그(`entry-dialog`)에서 지불수단 중 '카드'를 '신용카드'로 변경하세요.
- **수정 위치:** `app.js` 상단의 `ACCOUNTS` 배열 내 `{ id: "credit-card", name: "카드", type: "credit" }` 부분의 `name`을 **"신용카드"**로 변경하여 체크카드와 명확히 구분되게 하세요.

## 2. 홈 화면: 전역 사용자 필터링 (Global Member Filter)
메인 화면(달력 탭)에서 전체, 정우, 솔이의 내역을 쪼개서 볼 수 있는 필터 기능을 추가합니다.

### A. UI 디자인 및 위치
- **위치:** `index.html`의 요약 카드(`hero-summary`) 내부 최상단, 또는 상단바(`topbar`) 바로 아래에 작고 유려한 **세그먼트 컨트롤(Segmented Control)**을 배치하세요.
- **구조:** `[ 전체 | 정우 | 솔이 ]` 3개의 탭으로 구성된 둥근 모서리의 토글 버튼 그룹입니다.
- **스타일 (`styles.css`):** 
  - 배경은 연한 회색(`background: #f0f2f5;`), 모서리는 완전 둥글게(`border-radius: 999px;`).
  - 활성화된 탭(`is-active`)은 흰색 배경(`background: #fff;`)에 가벼운 그림자(`box-shadow`)가 생기며 텍스트가 굵어지는(슬라이딩 탭) 형태의 네이티브 앱 감성으로 구현하세요.

### B. 로직 연동 (`app.js`)
- **전역 상태 추가:** `state.memberFilter` 상태를 추가하고 기본값을 `'all'`(전체)로 설정하세요.
- **필터 적용:** 
  - 탭을 클릭하면 `state.memberFilter`가 `'all'`, `'정우'`, `'솔이'`로 변경됩니다.
  - 이 필터 값은 **1) Hero Summary (수입/지출/잔액 계산)**, **2) 달력(Calendar)의 일자별 금액 표시**, **3) 하단 리스트(Records List) 렌더링**에 모두 실시간으로 반영되어야 합니다.
  - 필터를 바꿀 때마다 `renderSummary()`, `renderCalendar()`, `renderRecords()`가 다시 호출되도록 연동하세요.
