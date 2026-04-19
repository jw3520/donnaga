import { importedTransactions } from "./seed-data.js";

const STORAGE_KEY = "donnaga-state-v4";

const MEMBERS = [
  { id: "jw", name: "나" },
  { id: "partner", name: "예비신부" },
];

const ACCOUNTS = [
  { id: "cash", name: "현금", type: "cash" },
  { id: "debit-card", name: "체크카드", type: "debit" },
  { id: "credit-card", name: "카드", type: "credit" },
  { id: "bank-transfer", name: "계좌이체", type: "bank" },
  { id: "other", name: "기타", type: "other" },
];

const CATEGORY_META = {
  income: [
    { id: "월급", label: "월급", color: "#6ec9df" },
    { id: "용돈", label: "용돈", color: "#b9dc4f" },
    { id: "환급", label: "환급", color: "#8f86d4" },
    { id: "기타", label: "기타", color: "#58c3b7" },
  ],
  expense: [
    { id: "식비", label: "식비", color: "#6ed0b8" },
    { id: "교통비", label: "교통비", color: "#ff7f87" },
    { id: "문화생활", label: "여가", color: "#e27ab6" },
    { id: "생필품", label: "생활", color: "#f3a45d" },
    { id: "선물", label: "선물", color: "#6bc6db" },
    { id: "의류", label: "의류", color: "#ff8cb2" },
    { id: "의료/건강", label: "건강", color: "#72bf94" },
    { id: "교육", label: "교육", color: "#a893cb" },
    { id: "기타", label: "기타", color: "#f06d7c" },
    { id: "집세", label: "주거", color: "#f3b55d" },
  ],
  transfer: [
    { id: "저축", label: "저축", color: "#f3d45d" },
    { id: "이월", label: "이월", color: "#f09d6d" },
    { id: "계좌이체", label: "이체", color: "#7dc6ff" },
  ],
};

const BUDGETS = [
  { category: "생활비", items: ["식비", "교통비", "생필품"], limit: 900000 },
  { category: "고정지출", items: ["집세"], limit: 400000 },
  { category: "특별지출", items: ["선물", "문화생활", "의류"], limit: 500000 },
  { category: "저축", items: ["저축"], limit: 600000 },
];

const defaultTransactions = importedTransactions;

const refs = {
  monthTitleLabel: document.querySelector("#month-title-label"),
  incomeTotal: document.querySelector("#income-total"),
  expenseTotal: document.querySelector("#expense-total"),
  balanceTotal: document.querySelector("#balance-total"),
  cashExpenseTotal: document.querySelector("#cash-expense-total"),
  cardExpenseTotal: document.querySelector("#card-expense-total"),
  calendarGrid: document.querySelector("#calendar-grid"),
  selectedDateTitle: document.querySelector("#selected-date-title"),
  recordsList: document.querySelector("#records-list"),
  recordsCaption: document.querySelector("#records-caption"),
  listRecordsList: document.querySelector("#list-records-list"),
  listRecordsCaption: document.querySelector("#list-records-caption"),
  memoList: document.querySelector("#memo-list"),
  memoMonthLabel: document.querySelector("#memo-month-label"),
  memoAddButton: document.querySelector("#memo-add-button"),
  assetList: document.querySelector("#asset-list"),
  analysisMonthLabel: document.querySelector("#analysis-month-label"),
  analysisRangeLabel: document.querySelector("#analysis-range-label"),
  analysisModeSwitch: document.querySelector("#analysis-mode-switch"),
  analysisCopyButton: document.querySelector("#analysis-copy-button"),
  analysisCardSwitch: document.querySelector("#analysis-card-switch"),
  analysisExpenseTotal: document.querySelector("#analysis-expense-total"),
  analysisTransferTotal: document.querySelector("#analysis-transfer-total"),
  analysisEmptyText: document.querySelector("#analysis-empty-text"),
  budgetExpenseTotal: document.querySelector("#budget-expense-total"),
  budgetLimitTotal: document.querySelector("#budget-limit-total"),
  budgetList: document.querySelector("#budget-list"),
  cardTotalAmount: document.querySelector("#card-total-amount"),
  debitTotalAmount: document.querySelector("#debit-total-amount"),
  cardSummaryList: document.querySelector("#card-summary-list"),
  openAnalysisButton: document.querySelector("#open-analysis-button"),
  closeAnalysisButton: document.querySelector("#close-analysis-button"),
  openMemoButton: document.querySelector("#open-memo-button"),
  closeMemoButton: document.querySelector("#close-memo-button"),
  memoSearchButton: document.querySelector("#memo-search-button"),
  memoPrevMonthButton: document.querySelector("#memo-prev-month-button"),
  memoNextMonthButton: document.querySelector("#memo-next-month-button"),
  openMonthPickerButton: document.querySelector("#open-month-picker-button"),
  monthPickerDialog: document.querySelector("#month-picker-dialog"),
  closeMonthPickerButton: document.querySelector("#close-month-picker-button"),
  yearSelect: document.querySelector("#year-select"),
  monthGrid: document.querySelector("#month-grid"),
  openSearchButton: document.querySelector("#open-search-button"),
  searchDialog: document.querySelector("#search-dialog"),
  closeSearchButton: document.querySelector("#close-search-button"),
  searchForm: document.querySelector("#search-form"),
  searchQuery: document.querySelector("#search-query"),
  searchDateLabel: document.querySelector("#search-date-label"),
  searchIncomeTotal: document.querySelector("#search-income-total"),
  searchExpenseTotal: document.querySelector("#search-expense-total"),
  searchResults: document.querySelector("#search-results"),
  openFilterButton: document.querySelector("#open-filter-button"),
  filterDialog: document.querySelector("#filter-dialog"),
  closeFilterButton: document.querySelector("#close-filter-button"),
  filterForm: document.querySelector("#filter-form"),
  incomeCategoryChips: document.querySelector("#income-category-chips"),
  expenseCategoryChips: document.querySelector("#expense-category-chips"),
  transferCategoryChips: document.querySelector("#transfer-category-chips"),
  resetFilterButton: document.querySelector("#reset-filter-button"),
  openEntryButton: document.querySelector("#open-entry-button"),
  entryDialog: document.querySelector("#entry-dialog"),
  closeEntryButton: document.querySelector("#close-entry-button"),
  entryForm: document.querySelector("#entry-form"),
  typeField: document.querySelector("#type-field"),
  typeLabel: document.querySelector("#entry-type-label"),
  typeChips: [...document.querySelectorAll(".type-chip")],
  amountInput: document.querySelector(".amount-input"),
  categoryField: document.querySelector("#category-field"),
  memberField: document.querySelector("#member-field"),
  accountField: document.querySelector("#account-field"),
  dateField: document.querySelector("#date-field"),
  recordTemplate: document.querySelector("#record-item-template"),
  screens: [...document.querySelectorAll(".screen")],
  screenButtons: [...document.querySelectorAll("[data-screen-target]")],
  analysisTabButtons: [...document.querySelectorAll("[data-analysis-tab-target]")],
  analysisPanels: [...document.querySelectorAll("[data-analysis-tab]")],
  installDialog: document.querySelector("#install-dialog"),
  installButton: document.querySelector("#install-button"),
};

const state = loadState();
let deferredInstallPrompt = null;
let searchPeriod = "all";

boot();

function boot() {
  populateStaticOptions();
  renderFilterChips();
  bindEvents();
  render();
  registerServiceWorker();
}

function loadState() {
  const today = new Date();
  const initialMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const stored = localStorage.getItem(STORAGE_KEY);
  const defaults = {
    currentMonth: initialMonth,
    currentScreen: "calendar",
    selectedDate: todayISO(),
    analysisTab: "stats",
    transactions: defaultTransactions,
    editingId: null,
    filters: { types: ["income", "expense", "transfer"], categories: [] },
  };

  if (!stored) return defaults;
  try {
    const parsed = JSON.parse(stored);
    return {
      ...defaults,
      ...parsed,
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : defaultTransactions,
      filters: parsed.filters || defaults.filters,
      editingId: null,
    };
  } catch {
    return defaults;
  }
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      currentMonth: state.currentMonth,
      currentScreen: state.currentScreen,
      selectedDate: state.selectedDate,
      analysisTab: state.analysisTab,
      transactions: state.transactions,
      filters: state.filters,
    }),
  );
}

function bindEvents() {
  refs.openAnalysisButton.addEventListener("click", () => switchScreen("analysis"));
  refs.closeAnalysisButton.addEventListener("click", () => switchScreen("calendar"));
  refs.openMemoButton.addEventListener("click", () => switchScreen("memo"));
  refs.closeMemoButton.addEventListener("click", () => switchScreen("calendar"));
  refs.memoSearchButton.addEventListener("click", () => refs.searchDialog.showModal());
  refs.memoAddButton.addEventListener("click", openEntryDialog);
  refs.memoPrevMonthButton.addEventListener("click", () => shiftMonth(-1));
  refs.memoNextMonthButton.addEventListener("click", () => shiftMonth(1));

  refs.openMonthPickerButton.addEventListener("click", () => {
    renderMonthPicker();
    refs.monthPickerDialog.showModal();
  });
  refs.closeMonthPickerButton.addEventListener("click", () => refs.monthPickerDialog.close());
  refs.yearSelect.addEventListener("change", renderMonthPicker);

  refs.openSearchButton.addEventListener("click", () => refs.searchDialog.showModal());
  refs.closeSearchButton.addEventListener("click", () => refs.searchDialog.close());
  refs.searchForm.addEventListener("submit", onSearchSubmit);
  refs.searchDialog.addEventListener("click", (event) => {
    const button = event.target.closest("[data-search-period]");
    if (!button) return;
    searchPeriod = button.dataset.searchPeriod;
    refs.searchDialog.querySelectorAll("[data-search-period]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
  });

  refs.openFilterButton.addEventListener("click", () => refs.filterDialog.showModal());
  refs.closeFilterButton.addEventListener("click", () => refs.filterDialog.close());
  refs.filterForm.addEventListener("submit", onFilterSubmit);
  refs.resetFilterButton.addEventListener("click", resetFilters);

  refs.screenButtons.forEach((button) => {
    button.addEventListener("click", () => switchScreen(button.dataset.screenTarget));
  });

  refs.analysisTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.analysisTab = button.dataset.analysisTabTarget;
      saveState();
      renderAnalysis();
      renderIcons();
    });
  });

  refs.openEntryButton.addEventListener("click", openEntryDialog);
  refs.closeEntryButton.addEventListener("click", () => refs.entryDialog.close());
  refs.entryForm.addEventListener("submit", onSubmitEntry);
  refs.entryForm.addEventListener("reset", () => requestAnimationFrame(resetEntryForm));

  refs.typeChips.forEach((chip) => chip.addEventListener("click", () => setEntryType(chip.dataset.typeValue)));

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    refs.installDialog.showModal();
  });

  refs.installButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!deferredInstallPrompt) {
      refs.installDialog.close();
      return;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    refs.installDialog.close();
  });
}

function populateStaticOptions() {
  populateSelect(refs.memberField, MEMBERS, "id", "name");
  populateSelect(refs.accountField, ACCOUNTS, "id", "name");
  refs.dateField.value = todayISO();
  setEntryType("expense");
}

function populateSelect(select, items, valueKey, labelKey) {
  select.innerHTML = items.map((item) => `<option value="${item[valueKey]}">${item[labelKey]}</option>`).join("");
}

function render() {
  renderMonthLabels();
  renderSummary();
  renderCalendar();
  renderDailyRecords();
  renderListRecords();
  renderMemo();
  renderAssets();
  renderAnalysis();
  syncScreens();
  renderIcons();
}

function renderMonthLabels() {
  refs.monthTitleLabel.textContent = shortMonthLabel(state.currentMonth);
  refs.memoMonthLabel.textContent = shortMonthLabel(state.currentMonth);
  refs.analysisMonthLabel.textContent = shortMonthLabel(state.currentMonth);
  refs.analysisRangeLabel.textContent = monthRangeLabel(state.currentMonth);
  refs.listRecordsCaption.textContent = `${monthLabel(state.currentMonth)} 전체 내역`;
  refs.searchDateLabel.textContent = `- ${todayISO().replaceAll("-", ".")}`;
}

function renderSummary() {
  const transactions = getFilteredMonthTransactions();
  const income = sumByType(transactions, "income");
  const expense = sumByType(transactions, "expense");
  const cashExpense = transactions
    .filter((item) => item.type === "expense" && item.account === "cash")
    .reduce((sum, item) => sum + item.amount, 0);
  const cardExpense = transactions
    .filter((item) => item.type === "expense" && item.account !== "cash")
    .reduce((sum, item) => sum + item.amount, 0);

  refs.incomeTotal.textContent = formatCurrency(income);
  refs.expenseTotal.textContent = formatCurrency(expense);
  refs.balanceTotal.textContent = formatCurrency(income - expense);
  refs.cashExpenseTotal.textContent = formatCompactCurrency(cashExpense);
  refs.cardExpenseTotal.textContent = formatCompactCurrency(cardExpense);
}

function renderCalendar() {
  const [year, month] = state.currentMonth.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const expenseByDate = getFilteredMonthTransactions()
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      acc[item.date] = (acc[item.date] || 0) + item.amount;
      return acc;
    }, {});

  const cells = [];
  for (let index = 0; index < firstDay.getDay(); index += 1) {
    cells.push(`<div class="calendar-day is-empty"></div>`);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${state.currentMonth}-${String(day).padStart(2, "0")}`;
    const dateObj = new Date(`${date}T00:00:00`);
    const classes = ["calendar-day"];
    if (date === state.selectedDate) classes.push("is-selected");
    if (dateObj.getDay() === 0) classes.push("is-sunday");
    if (dateObj.getDay() === 6) classes.push("is-saturday");
    cells.push(`
      <button class="${classes.join(" ")}" type="button" data-date="${date}">
        <span class="calendar-day__date">${day}</span>
        <span class="calendar-day__amount">${expenseByDate[date] ? shortCurrency(expenseByDate[date]) : ""}</span>
      </button>
    `);
  }

  refs.calendarGrid.innerHTML = cells.join("");
  refs.calendarGrid.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDate = button.dataset.date;
      saveState();
      renderCalendar();
      renderDailyRecords();
      renderIcons();
    });
  });
}

function renderDailyRecords() {
  const items = getFilteredMonthTransactions().filter((item) => item.date === state.selectedDate);
  refs.selectedDateTitle.textContent = displaySelectedDate(state.selectedDate);
  refs.recordsCaption.textContent = items.length ? `${items.length}건의 내역` : "지출 내역이 없어요.";
  renderRecordCollection(refs.recordsList, items, "daily");
}

function renderListRecords() {
  renderRecordCollection(refs.listRecordsList, getFilteredMonthTransactions(), "daily");
}

function renderMemo() {
  const items = getMonthTransactions().filter((item) => item.note && item.note.trim());
  if (!items.length) {
    refs.memoList.innerHTML = emptyState("메모가 없습니다.", "메모가 있는 내역이 여기에 표시됩니다.");
    return;
  }
  refs.memoList.innerHTML = items
    .sort((left, right) => right.date.localeCompare(left.date))
    .map(
      (item) => `
        <article class="memo-row">
          <strong>${item.note}</strong>
          <p>${item.date} · ${item.category}</p>
        </article>
      `,
    )
    .join("");
}

function renderAssets() {
  const items = getFilteredMonthTransactions();
  refs.assetList.innerHTML = ACCOUNTS.map((account) => {
    const delta = items
      .filter((item) => item.account === account.id)
      .reduce((total, item) => total + (item.type === "expense" ? -item.amount : item.amount), 0);
    return `
      <article class="asset-row">
        <div class="stack">
          <strong>${account.name}</strong>
          <p>${account.type}</p>
        </div>
        <div class="stack">
          <strong>${formatCurrency(delta)}</strong>
          <p>${items.filter((item) => item.account === account.id).length}건</p>
        </div>
      </article>
    `;
  }).join("");
}

function renderAnalysis() {
  const items = getFilteredMonthTransactions();
  const expense = sumByType(items, "expense");
  const transfer = sumByType(items, "transfer");
  refs.analysisExpenseTotal.textContent = formatCurrency(expense);
  refs.analysisTransferTotal.textContent = formatCurrency(transfer);
  refs.analysisEmptyText.textContent = items.length ? "기록이 있습니다." : "내역이 없습니다.";

  const budgetExpense = sumByType(items, "expense");
  const budgetLimit = BUDGETS.reduce((sum, item) => sum + item.limit, 0);
  refs.budgetExpenseTotal.textContent = formatCurrency(budgetExpense);
  refs.budgetLimitTotal.textContent = formatCurrency(budgetLimit);
  refs.budgetList.innerHTML = BUDGETS.map((budget) => {
    const spent = items
      .filter((item) => budget.items.includes(item.category))
      .reduce((sum, item) => sum + item.amount, 0);
    return `
      <article class="budget-row">
        <div class="stack">
          <strong>${budget.category}</strong>
          <p>${formatCurrency(spent)} / ${formatCurrency(budget.limit)}</p>
        </div>
      </article>
    `;
  }).join("");

  const cardItems = items.filter((item) => item.account === "credit-card" || item.account === "debit-card");
  refs.cardTotalAmount.textContent = formatCurrency(
    cardItems.filter((item) => item.account === "credit-card").reduce((sum, item) => sum + item.amount, 0),
  );
  refs.debitTotalAmount.textContent = formatCurrency(
    cardItems.filter((item) => item.account === "debit-card").reduce((sum, item) => sum + item.amount, 0),
  );
  refs.cardSummaryList.innerHTML = [
    { label: "카드", amount: refs.cardTotalAmount.textContent },
    { label: "체크카드", amount: refs.debitTotalAmount.textContent },
    { label: "현금", amount: formatCurrency(items.filter((item) => item.account === "cash").reduce((sum, item) => sum + item.amount, 0)) },
  ]
    .map(
      (item) => `
        <article class="card-summary-row">
          <div class="stack">
            <strong>${item.label}</strong>
            <p>${item.amount}</p>
          </div>
        </article>
      `,
    )
    .join("");

  refs.analysisModeSwitch.classList.toggle("is-hidden", state.analysisTab !== "stats");
  refs.analysisCopyButton.classList.toggle("is-hidden", state.analysisTab !== "budget");
  refs.analysisCardSwitch.classList.toggle("is-hidden", state.analysisTab !== "card");

  refs.analysisPanels.forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.dataset.analysisTab !== state.analysisTab);
  });
  refs.analysisTabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.analysisTabTarget === state.analysisTab);
  });
}

function renderRecordCollection(container, items, mode) {
  if (!items.length) {
    container.innerHTML = emptyState("내역이 없어요.", "표시할 데이터가 없습니다.");
    return;
  }

  const groups = groupTransactions(items, mode);
  container.innerHTML = "";
  Object.entries(groups)
    .sort(([left], [right]) => (left < right ? 1 : -1))
    .forEach(([groupKey, groupItems]) => {
      const wrapper = document.createElement("section");
      wrapper.className = "records-group";
      wrapper.innerHTML = `
        <div class="records-group__header">
          <h3>${groupKey}</h3>
          <p class="muted">${formatCurrency(groupNetAmount(groupItems))}</p>
        </div>
      `;
      groupItems
        .slice()
        .sort((left, right) => right.date.localeCompare(left.date))
        .forEach((item) => wrapper.append(createRecordElement(item)));
      container.append(wrapper);
    });
}

function createRecordElement(item) {
  const fragment = refs.recordTemplate.content.cloneNode(true);
  fragment.querySelector(".record-card__category").textContent = `${memberName(item.member)} · ${item.category}`;
  fragment.querySelector(".record-card__note").textContent = item.note;
  const amount = fragment.querySelector(".record-card__amount");
  amount.textContent = `${item.type === "expense" ? "-" : "+"}${formatCurrency(item.amount)}`;
  amount.classList.add(`is-${item.type}`);
  fragment.querySelector(".record-card__meta").textContent = `${item.date} · ${accountName(item.account)}`;
  fragment.querySelector(".record-edit-button").addEventListener("click", () => startEdit(item.id));
  fragment.querySelector(".record-delete-button").addEventListener("click", () => deleteRecord(item.id));
  return fragment;
}

function renderMonthPicker() {
  const years = availableYears();
  refs.yearSelect.innerHTML = years.map((year) => `<option value="${year}">${year}년</option>`).join("");
  refs.yearSelect.value = state.currentMonth.slice(0, 4);
  const currentMonth = Number(state.currentMonth.slice(5, 7));
  const selectedYear = Number(refs.yearSelect.value);
  refs.monthGrid.innerHTML = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const isActive = selectedYear === Number(state.currentMonth.slice(0, 4)) && month === currentMonth;
    return `<button class="month-button ${isActive ? "is-active" : ""}" type="button" data-month-value="${month}">${month}월</button>`;
  }).join("");

  refs.monthGrid.querySelectorAll("[data-month-value]").forEach((button) => {
    button.addEventListener("click", () => {
      const month = String(button.dataset.monthValue).padStart(2, "0");
      state.currentMonth = `${refs.yearSelect.value}-${month}`;
      state.selectedDate = defaultSelectedDateForMonth(state.currentMonth);
      saveState();
      refs.monthPickerDialog.close();
      render();
    });
  });
}

function renderFilterChips() {
  renderCategoryChipGroup(refs.incomeCategoryChips, CATEGORY_META.income, "income");
  renderCategoryChipGroup(refs.expenseCategoryChips, CATEGORY_META.expense, "expense");
  renderCategoryChipGroup(refs.transferCategoryChips, CATEGORY_META.transfer, "transfer");
  syncFilterForm();
}

function renderCategoryChipGroup(container, items, type) {
  container.innerHTML = items
    .map(
      (item) => `
        <label class="icon-chip">
          <input type="checkbox" data-filter-category="${item.id}" data-filter-type="${type}" />
          <span class="icon-chip__badge" style="background:${item.color}">${item.label.slice(0, 2)}</span>
          <span class="icon-chip__label">${item.label}</span>
        </label>
      `,
    )
    .join("");
}

function syncFilterForm() {
  refs.filterForm.querySelectorAll("input[name='type']").forEach((input) => {
    input.checked = state.filters.types.includes(input.value);
  });
  refs.filterForm.querySelectorAll("[data-filter-category]").forEach((input) => {
    input.checked = state.filters.categories.length === 0 || state.filters.categories.includes(input.dataset.filterCategory);
  });
}

function onSearchSubmit(event) {
  event.preventDefault();
  const query = refs.searchQuery.value.trim().toLowerCase();
  const items = state.transactions.filter((item) => {
    const haystack = `${item.note} ${item.category} ${item.date}`.toLowerCase();
    return haystack.includes(query);
  });
  const filtered = filterBySearchPeriod(items, searchPeriod);
  refs.searchIncomeTotal.textContent = formatCompactCurrency(
    filtered.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0),
  );
  refs.searchExpenseTotal.textContent = formatCompactCurrency(
    filtered.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0),
  );
  refs.searchResults.innerHTML = filtered.length
    ? filtered
        .slice(0, 12)
        .map(
          (item) => `
            <article class="record-card">
              <div class="record-card__top">
                <div>
                  <p class="record-card__category">${item.category}</p>
                  <h3 class="record-card__note">${item.note}</h3>
                </div>
                <strong class="record-card__amount is-${item.type}">${formatCurrency(item.amount)}</strong>
              </div>
              <div class="record-card__meta">${item.date} · ${accountName(item.account)}</div>
            </article>
          `,
        )
        .join("")
    : emptyState("검색 결과가 없습니다.", "조건을 바꿔 다시 검색해 보세요.");
}

function filterBySearchPeriod(items, period) {
  if (period === "all") return items;
  const today = new Date(`${todayISO()}T00:00:00`);
  if (period === "month") return items.filter((item) => item.date.startsWith(state.currentMonth));
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);
  return items.filter((item) => new Date(`${item.date}T00:00:00`) >= weekAgo);
}

function onFilterSubmit(event) {
  event.preventDefault();
  state.filters.types = [...refs.filterForm.querySelectorAll("input[name='type']:checked")].map((input) => input.value);
  const categories = [...refs.filterForm.querySelectorAll("[data-filter-category]:checked")].map(
    (input) => input.dataset.filterCategory,
  );
  const allCategories = allCategoryIds();
  state.filters.categories = categories.length === allCategories.length ? [] : categories;
  saveState();
  refs.filterDialog.close();
  render();
}

function resetFilters() {
  state.filters = { types: ["income", "expense", "transfer"], categories: [] };
  syncFilterForm();
  saveState();
  render();
}

function switchScreen(screen) {
  state.currentScreen = screen;
  saveState();
  syncScreens();
  renderIcons();
}

function syncScreens() {
  refs.screens.forEach((screen) => {
    screen.classList.toggle("screen--active", screen.dataset.screen === state.currentScreen);
  });
  refs.screenButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screenTarget === state.currentScreen);
  });
}

function openEntryDialog() {
  refs.entryDialog.showModal();
  refs.amountInput.focus();
}

function onSubmitEntry(event) {
  event.preventDefault();
  const formData = new FormData(refs.entryForm);
  const entry = {
    id: state.editingId || crypto.randomUUID(),
    type: String(formData.get("type")),
    amount: Number(formData.get("amount")),
    category: String(formData.get("category")),
    member: String(formData.get("member")),
    account: String(formData.get("account")),
    date: String(formData.get("date")),
    note: String(formData.get("note") || "").trim() || defaultNote(formData.get("category")),
  };
  if (!entry.amount || !entry.date) return;
  if (state.editingId) {
    state.transactions = state.transactions.map((item) => (item.id === state.editingId ? entry : item));
  } else {
    state.transactions = [entry, ...state.transactions];
  }
  state.currentMonth = entry.date.slice(0, 7);
  state.selectedDate = entry.date;
  state.editingId = null;
  saveState();
  refs.entryDialog.close();
  resetEntryForm();
  render();
}

function startEdit(id) {
  const item = state.transactions.find((transaction) => transaction.id === id);
  if (!item) return;
  state.editingId = id;
  setEntryType(item.type);
  refs.amountInput.value = item.amount;
  refs.categoryField.value = item.category;
  refs.memberField.value = item.member;
  refs.accountField.value = item.account;
  refs.dateField.value = item.date;
  refs.entryForm.note.value = item.note;
  refs.entryDialog.showModal();
}

function deleteRecord(id) {
  state.transactions = state.transactions.filter((item) => item.id !== id);
  if (state.editingId === id) state.editingId = null;
  saveState();
  render();
}

function setEntryType(type) {
  refs.typeField.value = type;
  refs.typeLabel.textContent = typeLabel(type);
  refs.typeChips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.typeValue === type);
  });
  const categories = categoryIdsForType(type);
  refs.categoryField.innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");
}

function resetEntryForm() {
  refs.entryForm.reset();
  refs.dateField.value = todayISO();
  setEntryType("expense");
}

function renderIcons() {
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
}

function getMonthTransactions() {
  return state.transactions.filter((item) => item.date.startsWith(state.currentMonth));
}

function getFilteredMonthTransactions() {
  return applyFilters(getMonthTransactions());
}

function applyFilters(items) {
  return items.filter((item) => {
    const typeAllowed = state.filters.types.includes(item.type);
    const categoryAllowed = state.filters.categories.length === 0 || state.filters.categories.includes(item.category);
    return typeAllowed && categoryAllowed;
  });
}

function groupTransactions(items, mode) {
  return items.reduce((acc, item) => {
    const key = mode === "daily" ? displaySelectedDate(item.date) : item.date.slice(0, 7);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});
}

function sumByType(items, type) {
  return items.filter((item) => item.type === type).reduce((total, item) => total + item.amount, 0);
}

function groupNetAmount(items) {
  return items.reduce((total, item) => total + (item.type === "expense" ? -item.amount : item.amount), 0);
}

function availableYears() {
  const years = new Set(state.transactions.map((item) => Number(item.date.slice(0, 4))));
  const currentYear = Number(state.currentMonth.slice(0, 4));
  years.add(currentYear - 1);
  years.add(currentYear);
  years.add(currentYear + 1);
  return [...years].sort((left, right) => left - right);
}

function allCategoryIds() {
  return Object.values(CATEGORY_META)
    .flat()
    .map((item) => item.id);
}

function categoryIdsForType(type) {
  return (CATEGORY_META[type] || []).map((item) => item.id);
}

function defaultSelectedDateForMonth(monthKey) {
  const latest = state.transactions
    .filter((item) => item.date.startsWith(monthKey))
    .map((item) => item.date)
    .sort()
    .at(-1);
  return latest || `${monthKey}-01`;
}

function monthLabel(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return `${year}년 ${month}월`;
}

function shortMonthLabel(monthKey) {
  const [, month] = monthKey.split("-").map(Number);
  return `${month}월`;
}

function monthRangeLabel(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  return `${month}.1 - ${month}.${lastDay}`;
}

function displaySelectedDate(date) {
  const parsed = new Date(`${date}T00:00:00`);
  return `${parsed.getMonth() + 1}월 ${parsed.getDate()}일`;
}

function memberName(id) {
  return MEMBERS.find((member) => member.id === id)?.name || id;
}

function accountName(id) {
  return ACCOUNTS.find((account) => account.id === id)?.name || id;
}

function typeLabel(type) {
  return { expense: "지출", income: "수입", transfer: "이체" }[type] || type;
}

function defaultNote(category) {
  return `${category} 기록`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCompactCurrency(amount) {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(amount);
}

function shortCurrency(amount) {
  if (amount >= 10000) return `${Math.round(amount / 10000)}만`;
  return `${Math.max(1, Math.round(amount / 1000))}천`;
}

function emptyState(title, description) {
  return `
    <div class="empty-state">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;
}

function todayISO() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function shiftMonth(direction) {
  const [year, month] = state.currentMonth.split("-").map(Number);
  const next = new Date(year, month - 1 + direction, 1);
  state.currentMonth = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
  state.selectedDate = defaultSelectedDateForMonth(state.currentMonth);
  saveState();
  render();
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("./sw.js");
  } catch {
    // Ignore registration failures during local preview.
  }
}
