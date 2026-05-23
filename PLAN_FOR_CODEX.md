# 기획 및 설계: 홈 화면 메트릭 블록 필터링 기능

## 1. 개요
홈 화면의 상단 섹션(지출, 수입, 저축/투자 영역)을 탭했을 때, 해당 영역이 활성화/비활성화되는 토글 기능을 구현합니다.
선택된 영역이 있으면 하단의 일간 리스트(`records-list`)에는 해당 항목(`type`)의 내역만 표시됩니다.

## 2. app.js 수정 사항

### 2.1 State 추가
`state` 객체(`const state = { ... }`)에 홈 화면 메트릭 필터 상태를 저장할 속성을 추가합니다.
```javascript
  homeMetricFilter: null, // 'expense', 'income', 'investment', 또는 null
```

### 2.2 Refs 추가 (옵션)
`const refs = { ... }`에 필요한 경우 `.metric-block` 요소들을 추가합니다.
```javascript
  homeMetricBlocks: [...document.querySelectorAll(".hero-summary__flow .metric-block")],
```

### 2.3 Event Binding
`bindEvents()` 내부에 `homeMetricBlocks`에 대한 클릭 이벤트를 추가합니다.
- `.metric-block--expense`, `.metric-block--income`, `.metric-block--investment`에 따라 각각 'expense', 'income', 'investment' 타입으로 매핑합니다.
- 클릭 시 `state.homeMetricFilter`가 현재 클릭한 타입과 같으면 `null`로 초기화하고, 다르면 해당 타입으로 설정합니다.
- 상태 변경 후, `updateHomeMetricBlockStyles()`(새로 만들 함수)를 호출하여 시각적 활성화를 반영하고, `renderDailyRecords()`를 호출하여 리스트를 다시 그립니다.

### 2.4 UI 갱신 함수 추가
선택된 필터에 따라 `.metric-block`의 CSS 클래스를 토글합니다.
```javascript
function updateHomeMetricBlockStyles() {
  refs.homeMetricBlocks.forEach(block => {
    let type;
    if (block.classList.contains('metric-block--expense')) type = 'expense';
    else if (block.classList.contains('metric-block--income')) type = 'income';
    else if (block.classList.contains('metric-block--investment')) type = 'investment';
    
    if (state.homeMetricFilter) {
      block.classList.toggle('is-active', state.homeMetricFilter === type);
      block.classList.toggle('is-dimmed', state.homeMetricFilter !== type);
    } else {
      block.classList.remove('is-active', 'is-dimmed');
    }
  });
}
```

### 2.5 `renderDailyRecords()` 수정
```javascript
function renderDailyRecords() {
  let items = getMemberScopedMonthTransactions().filter((item) => item.date === state.selectedDate);
  
  if (state.homeMetricFilter) {
    items = items.filter(item => item.type === state.homeMetricFilter);
  }
  
  refs.selectedDateTitle.textContent = displaySelectedDate(state.selectedDate);
  refs.recordsCaption.textContent = items.length ? `${items.length}건의 내역` : "내역이 없어요.";
  renderRecordCollection(refs.recordsList, items, "daily");
}
```

## 3. styles.css 수정 사항
`.metric-block`에 커서 스타일 및 호버/선택 상태 시각화를 추가합니다.

```css
.hero-summary__flow .metric-block {
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.hero-summary__flow .metric-block.is-dimmed {
  opacity: 0.4;
}

.hero-summary__flow .metric-block.is-active {
  transform: scale(1.02);
  /* 필요하다면 테두리 또는 배경색 변경으로 강조 */
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

---
**지시사항:**
위 기획서(PLAN_FOR_CODEX.md)의 내용을 바탕으로 `app.js`와 `styles.css`를 수정하여 "/goal" 태스크를 완수해주세요.
기능이 모두 동작하는지 꼼꼼히 QA를 여러번 반복하여 완수되면 작업을 종료해주세요.