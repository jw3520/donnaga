const STORAGE_KEY_V3 = "donnaga-state-v3";
const STORAGE_KEY_V4 = "donnaga-state-v4";
const DB_NAME = "donnaga-db";
const SYNC_INTERVAL_MS = 60_000;
const SYNC_PUSH_BATCH_SIZE = 200;

const MEMBERS = [
  { id: "정우", name: "정우" },
  { id: "솔이", name: "솔이" },
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
    { id: "월급", label: "월급", color: "#86d2d1", icon: "banknote" },
    { id: "용돈", label: "용돈", color: "#c7dc73", icon: "wallet" },
    { id: "환급", label: "환급", color: "#aea3d8", icon: "rotate-ccw" },
    { id: "기타", label: "기타", color: "#7acfc4", icon: "plus" },
  ],
  expense: [
    { id: "식비", label: "식비", color: "#e7c86a", icon: "utensils-crossed" },
    { id: "교통비", label: "교통비", color: "#f29aa0", icon: "bus-front" },
    { id: "문화생활", label: "여가/취미", color: "#d59ac3", icon: "music" },
    { id: "생필품", label: "생활용품", color: "#e7b27d", icon: "shopping-cart" },
    { id: "선물", label: "쇼핑", color: "#88c8d6", icon: "shopping-bag" },
    { id: "의류", label: "미용", color: "#f1a7c0", icon: "sparkles" },
    { id: "의료/건강", label: "의료/건강", color: "#8cc5a2", icon: "heart-pulse" },
    { id: "교육", label: "교육", color: "#b4a0d0", icon: "book-open" },
    { id: "기타", label: "기타", color: "#e48b95", icon: "minus" },
    { id: "집세", label: "주거/공과금", color: "#dfbc7c", icon: "building-2" },
  ],
  transfer: [
    { id: "저축", label: "저축", color: "#e4d07b", icon: "piggy-bank" },
    { id: "이월", label: "이월", color: "#e0ad86", icon: "corner-up-right" },
    { id: "계좌이체", label: "이체", color: "#97cbe9", icon: "landmark" },
  ],
};

const BUDGETS = [
  { category: "생활비", items: ["식비", "교통비", "생필품"], limit: 900000 },
  { category: "고정지출", items: ["집세"], limit: 400000 },
  { category: "특별지출", items: ["선물", "문화생활", "의류"], limit: 500000 },
  { category: "저축", items: ["저축"], limit: 600000 },
];

const refs = {
  monthTitleLabel: document.querySelector("#month-title-label"),
  incomeTotal: document.querySelector("#income-total"),
  expenseTotal: document.querySelector("#expense-total"),
  balanceTotal: document.querySelector("#balance-total"),
  cashExpenseTotal: document.querySelector("#cash-expense-total"),
  cardExpenseTotal: document.querySelector("#card-expense-total"),
  syncDot: document.querySelector("#sync-dot"),
  syncStatusLabel: document.querySelector("#sync-status-label"),
  storageStatusLabel: document.querySelector("#storage-status-label"),
  remoteStatusLabel: document.querySelector("#remote-status-label"),
  syncDetailLabel: document.querySelector("#sync-detail-label"),
  manualSyncButton: document.querySelector("#manual-sync-button"),
  clearWebCacheButton: document.querySelector("#clear-web-cache-button"),
  openInstallDialogButton: document.querySelector("#open-install-dialog-button"),
  calendarGrid: document.querySelector("#calendar-grid"),
  selectedDateTitle: document.querySelector("#selected-date-title"),
  recordsList: document.querySelector("#records-list"),
  recordsCaption: document.querySelector("#records-caption"),
  listRecordsList: document.querySelector("#list-records-list"),
  listRecordsCaption: document.querySelector("#list-records-caption"),
  listSearchButton: document.querySelector("#list-search-button"),
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
  searchCategorySummary: document.querySelector("#search-category-summary"),
  searchAccountSummary: document.querySelector("#search-account-summary"),
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
  entryDeleteButton: document.querySelector("#entry-delete-button"),
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
  analysisModeButtons: [...document.querySelectorAll("[data-analysis-mode]")],
  analysisPanels: [...document.querySelectorAll("[data-analysis-tab]")],
  installDialog: document.querySelector("#install-dialog"),
  installButton: document.querySelector("#install-button"),
  installLaterButton: document.querySelector("#install-later-button"),
  installDescription: document.querySelector("#install-description"),
  installSteps: document.querySelector("#install-steps"),
};

const db = new window.Dexie(DB_NAME);
db.version(1).stores({
  transactions: "id, type, amount, category, member, account, date, note, updated_at, sync_status, fingerprint",
  meta: "key",
});

const state = {
  transactions: [],
  currentMonth: monthKeyFromDate(new Date()),
  currentScreen: "calendar",
  selectedDate: todayISO(),
  analysisTab: "stats",
  analysisMode: "expense",
  searchPeriod: "all",
  filters: { types: ["income", "expense", "transfer"], categories: [] },
  editingId: null,
  syncing: false,
  syncMessage: "로컬 준비 중",
  lastSyncedAt: null,
  syncDetailMessage: "",
};

let deferredInstallPrompt = null;
let syncTimerId = null;

await boot();

async function boot() {
  populateStaticOptions();
  renderFilterChips();
  bindEvents();
  updateSyncUI("로컬 데이터베이스 준비 중", "idle");
  await migrateLegacyLocalState();
  await migrateLegacyMemberNames();
  await purgeSeedTransactions();
  await loadUiMeta();
  await loadTransactionsFromDb();
  render();
  updateSyncUI(navigator.onLine ? "초기 동기화 중" : "오프라인", navigator.onLine ? "syncing" : "offline");
  await pullFromServer();
  if (navigator.onLine) {
    await pushPendingToServer();
  }
  schedulePeriodicSync();
  registerConnectivityHooks();
  registerServiceWorker();
}

function populateStaticOptions() {
  populateSelect(refs.memberField, MEMBERS, "id", "name");
  populateSelect(refs.accountField, ACCOUNTS, "id", "name");
  clearEntrySelections();
}

function bindEvents() {
  refs.openAnalysisButton.addEventListener("click", () => switchScreen("analysis"));
  refs.closeAnalysisButton.addEventListener("click", () => switchScreen("calendar"));
  refs.openMemoButton.addEventListener("click", () => switchScreen("list"));
  refs.closeMemoButton.addEventListener("click", () => switchScreen("calendar"));
  refs.memoSearchButton.addEventListener("click", () => refs.searchDialog.showModal());
  refs.memoAddButton.addEventListener("click", openEntryDialog);
  refs.memoPrevMonthButton.addEventListener("click", () => shiftMonth(-1));
  refs.memoNextMonthButton.addEventListener("click", () => shiftMonth(1));
  refs.listSearchButton.addEventListener("click", () => refs.searchDialog.showModal());

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
    state.searchPeriod = button.dataset.searchPeriod;
    refs.searchDialog.querySelectorAll("[data-search-period]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
  });

  refs.openFilterButton.addEventListener("click", () => refs.filterDialog.showModal());
  refs.closeFilterButton.addEventListener("click", () => refs.filterDialog.close());
  refs.filterForm.addEventListener("submit", onFilterSubmit);
  refs.resetFilterButton.addEventListener("click", async () => {
    state.filters = { types: ["income", "expense", "transfer"], categories: [] };
    syncFilterForm();
    await persistUiMeta();
    render();
  });

  refs.manualSyncButton.addEventListener("click", async () => {
    await fullSyncCycle();
  });
  refs.clearWebCacheButton.addEventListener("click", async () => {
    await clearWebCacheAndReload();
  });
  refs.openInstallDialogButton.addEventListener("click", () => {
    openInstallDialog();
  });

  refs.screenButtons.forEach((button) => {
    button.addEventListener("click", () => switchScreen(button.dataset.screenTarget));
  });

  refs.analysisTabButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      state.analysisTab = button.dataset.analysisTabTarget;
      await persistUiMeta();
      renderAnalysis();
      renderIcons();
    });
  });

  refs.analysisModeButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      state.analysisMode = button.dataset.analysisMode;
      refs.analysisModeButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      await persistUiMeta();
      renderAnalysis();
    });
  });

  refs.openEntryButton.addEventListener("click", openEntryDialog);
  refs.closeEntryButton.addEventListener("click", () => refs.entryDialog.close());
  refs.entryForm.addEventListener("submit", onSubmitEntry);
  refs.entryForm.addEventListener("reset", () => requestAnimationFrame(resetEntryForm));
  refs.entryDeleteButton.addEventListener("click", async () => {
    if (!state.editingId) return;
    refs.entryDialog.close();
    await deleteRecord(state.editingId);
  });
  refs.typeChips.forEach((chip) => chip.addEventListener("click", () => setEntryType(chip.dataset.typeValue)));

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    refs.installDialog.close();
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
  refs.installLaterButton.addEventListener("click", () => refs.installDialog.close());
}

async function migrateLegacyLocalState() {
  const migrated = await getMeta("legacyMigrated");
  if (migrated) return;

  const legacyKeys = [STORAGE_KEY_V4, STORAGE_KEY_V3];
  let migratedCount = 0;
  for (const key of legacyKeys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.transactions)) {
        const normalized = parsed.transactions.map((item) => normalizeTransaction(item, false));
        await db.transactions.bulkPut(normalized);
        migratedCount += normalized.length;
      }
      if (parsed.currentMonth) state.currentMonth = parsed.currentMonth;
      if (parsed.currentScreen) state.currentScreen = parsed.currentScreen;
      if (parsed.selectedDate) state.selectedDate = parsed.selectedDate;
      if (parsed.analysisTab) state.analysisTab = parsed.analysisTab;
      localStorage.removeItem(key);
    } catch {
      // Ignore malformed legacy state.
    }
  }
  await setMeta("legacyMigrated", true);
  if (migratedCount) {
    state.syncDetailMessage = `기존 localStorage 데이터 ${migratedCount}건을 IndexedDB로 이전했습니다.`;
  }
}

async function purgeSeedTransactions() {
  const seedRows = await db.transactions.filter((item) => String(item.id || "").startsWith("seed-")).toArray();
  if (!seedRows.length) return;
  const tombstones = seedRows.map((item) =>
    normalizeTransaction(
      {
        ...item,
        deleted: 1,
        updated_at: Date.now(),
      },
      true,
    ),
  );
  await db.transactions.bulkPut(tombstones);
  state.syncDetailMessage = `기존 더미 데이터 ${seedRows.length}건을 정리했습니다.`;
}

async function migrateLegacyMemberNames() {
  const migrated = await getMeta("legacyMemberNamesMigrated");
  if (migrated) return;

  const rows = await db.transactions.toArray();
  if (!rows.length) {
    await setMeta("legacyMemberNamesMigrated", true);
    return;
  }

  const rewritten = rows
    .map((item) => {
      const normalizedMember = normalizeMemberId(item.member);
      if (normalizedMember === item.member) return null;
      return normalizeTransaction(
        {
          ...item,
          member: normalizedMember,
          updated_at: Date.now(),
        },
        true,
      );
    })
    .filter(Boolean);

  if (rewritten.length) {
    await db.transactions.bulkPut(rewritten);
    state.syncDetailMessage = `기존 데이터 ${rewritten.length}건의 사용자 이름을 정우/솔이로 정리했습니다.`;
  }
  await setMeta("legacyMemberNamesMigrated", true);
}

async function loadUiMeta() {
  const savedUi = (await getMeta("uiState")) || {};
  state.currentMonth = savedUi.currentMonth || state.currentMonth;
  state.currentScreen = savedUi.currentScreen || state.currentScreen;
  state.selectedDate = savedUi.selectedDate || state.selectedDate;
  state.analysisTab = savedUi.analysisTab || state.analysisTab;
  state.analysisMode = savedUi.analysisMode || state.analysisMode;
  state.filters = savedUi.filters || state.filters;
  state.lastSyncedAt = (await getMeta("lastSyncedAt")) || null;
}

async function persistUiMeta() {
  await setMeta("uiState", {
    currentMonth: state.currentMonth,
    currentScreen: state.currentScreen,
    selectedDate: state.selectedDate,
    analysisTab: state.analysisTab,
    analysisMode: state.analysisMode,
    filters: state.filters,
  });
}

async function loadTransactionsFromDb() {
  state.transactions = await db.transactions.orderBy("date").reverse().toArray();
  refs.storageStatusLabel.textContent = `IndexedDB에 ${state.transactions.filter((item) => !item.deleted).length}건 저장됨`;
  refs.remoteStatusLabel.textContent = navigator.onLine ? "Cloudflare D1 동기화 가능" : "오프라인";
  refs.syncDetailLabel.textContent = state.lastSyncedAt
    ? `마지막 동기화 ${formatDateTime(state.lastSyncedAt)}`
    : "마지막 동기화 기록 없음";
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
  syncFilterForm();
  renderIcons();
}

function renderMonthLabels() {
  refs.monthTitleLabel.textContent = shortMonthLabel(state.currentMonth);
  if (refs.memoMonthLabel) refs.memoMonthLabel.textContent = shortMonthLabel(state.currentMonth);
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
    if (date === todayISO()) classes.push("is-today");
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
    button.addEventListener("click", async () => {
      state.selectedDate = button.dataset.date;
      await persistUiMeta();
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
    refs.memoList.innerHTML = `
      <div class="memo-empty-state">
        <div class="memo-empty-state__icon"></div>
        <p>메모가 없습니다.</p>
      </div>
    `;
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
  refs.assetList.innerHTML = BUDGETS.map((budget) => {
    const spent = items.filter((item) => budget.items.includes(item.category)).reduce((sum, item) => sum + item.amount, 0);
    const progress = Math.min(100, Math.round((spent / budget.limit) * 100) || 0);
    return `
      <article class="asset-row">
        <div class="asset-row__top">
          <div class="asset-row__text">
            <strong>${budget.category}</strong>
            <p>${formatCurrency(spent)} / ${formatCurrency(budget.limit)}</p>
          </div>
          <strong>${progress}%</strong>
        </div>
        <div class="asset-row__progress">
          <div class="asset-row__progress-bar" style="width:${progress}%"></div>
        </div>
      </article>
    `;
  }).join("");
}

function renderAnalysis() {
  const items = getFilteredMonthTransactions();
  const sourceItems =
    state.analysisMode === "income" ? items.filter((item) => item.type === "income") : items.filter((item) => item.type !== "income");
  refs.analysisExpenseTotal.textContent = formatCurrency(
    sourceItems.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0),
  );
  refs.analysisTransferTotal.textContent = formatCurrency(
    sourceItems.filter((item) => item.type === "transfer").reduce((sum, item) => sum + item.amount, 0),
  );
  refs.analysisEmptyText.textContent = sourceItems.length ? "기록이 있습니다." : "내역이 없습니다.";

  const budgetExpense = sumByType(items, "expense");
  refs.budgetExpenseTotal.textContent = formatCurrency(budgetExpense);
  refs.budgetLimitTotal.textContent = formatCurrency(BUDGETS.reduce((sum, item) => sum + item.limit, 0));
  refs.budgetList.innerHTML = BUDGETS.map((budget) => {
    const spent = items.filter((item) => budget.items.includes(item.category)).reduce((sum, item) => sum + item.amount, 0);
    const progress = Math.min(100, Math.round((spent / budget.limit) * 100) || 0);
    return `
      <article class="budget-row">
        <div class="asset-row__top">
          <div class="asset-row__text">
            <strong>${budget.category}</strong>
            <p>${formatCurrency(spent)} / ${formatCurrency(budget.limit)}</p>
          </div>
          <strong>${progress}%</strong>
        </div>
        <div class="budget-row__progress">
          <div class="budget-row__progress-bar ${spent > budget.limit ? "is-over" : ""}" style="width:${progress}%"></div>
        </div>
      </article>
    `;
  }).join("");

  const creditTotal = items
    .filter((item) => item.account === "credit-card" && item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);
  const debitTotal = items
    .filter((item) => item.account === "debit-card" && item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);
  const cashTotal = items
    .filter((item) => item.account === "cash" && item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);
  refs.cardTotalAmount.textContent = formatCurrency(creditTotal);
  refs.debitTotalAmount.textContent = formatCurrency(debitTotal);
  refs.cardSummaryList.innerHTML = [
    { label: "카드", amount: formatCurrency(creditTotal) },
    { label: "체크카드", amount: formatCurrency(debitTotal) },
    { label: "현금", amount: formatCurrency(cashTotal) },
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

  refs.analysisModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.analysisMode === state.analysisMode);
  });
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
  const card = fragment.querySelector(".record-card");
  const categoryIcon = fragment.querySelector("[data-category-icon]");
  const appearance = categoryAppearance(item.category, item.type);
  categoryIcon.style.background = appearance.color;
  categoryIcon.innerHTML = renderCategoryIcon(item.category, item.type);
  fragment.querySelector(".record-card__category").textContent = `${memberName(item.member)} · ${item.category}`;
  fragment.querySelector(".record-card__note").textContent = item.note;
  const amount = fragment.querySelector(".record-card__amount");
  amount.textContent = `${item.type === "expense" ? "-" : "+"}${formatCurrency(item.amount)}`;
  amount.classList.add(`is-${item.type}`);
  fragment.querySelector(".record-card__meta").textContent = `${item.date} · ${accountName(item.account)}`;
  card.addEventListener("click", () => startEdit(item.id));
  fragment.querySelector(".record-delete-button").addEventListener("click", (event) => {
    event.stopPropagation();
    void deleteRecord(item.id);
  });
  return fragment;
}

function renderMonthPicker() {
  const years = availableYears();
  refs.yearSelect.innerHTML = years.map((year) => `<option value="${year}">${year}년</option>`).join("");
  refs.yearSelect.value = state.currentMonth.slice(0, 4);
  const currentYear = Number(state.currentMonth.slice(0, 4));
  const currentMonth = Number(state.currentMonth.slice(5, 7));
  const selectedYear = Number(refs.yearSelect.value);
  refs.monthGrid.innerHTML = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const isActive = selectedYear === currentYear && month === currentMonth;
    return `<button class="month-button ${isActive ? "is-active" : ""}" type="button" data-month-value="${month}">${month}월</button>`;
  }).join("");
  refs.monthGrid.querySelectorAll("[data-month-value]").forEach((button) => {
    button.addEventListener("click", async () => {
      const month = String(button.dataset.monthValue).padStart(2, "0");
      state.currentMonth = `${refs.yearSelect.value}-${month}`;
      state.selectedDate = defaultSelectedDateForMonth(state.currentMonth);
      await persistUiMeta();
      refs.monthPickerDialog.close();
      render();
    });
  });
}

function renderFilterChips() {
  renderCategoryChipGroup(refs.incomeCategoryChips, CATEGORY_META.income, "income");
  renderCategoryChipGroup(refs.expenseCategoryChips, CATEGORY_META.expense, "expense");
  renderCategoryChipGroup(refs.transferCategoryChips, CATEGORY_META.transfer, "transfer");
}

function renderCategoryChipGroup(container, items, type) {
  container.innerHTML = items
    .map(
      (item) => `
        <label class="icon-chip">
          <input type="checkbox" data-filter-category="${item.id}" data-filter-type="${type}" />
          <span class="icon-chip__badge" style="background:${item.color}">
            <i data-lucide="${item.icon || "circle"}"></i>
          </span>
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
  refs.searchCategorySummary.textContent =
    state.filters.categories.length === 0 ? "전체 카테고리" : `${state.filters.categories.length}개 선택`;
  refs.searchAccountSummary.textContent = "전체";
}

async function onFilterSubmit(event) {
  event.preventDefault();
  state.filters.types = [...refs.filterForm.querySelectorAll("input[name='type']:checked")].map((input) => input.value);
  const categories = [...refs.filterForm.querySelectorAll("[data-filter-category]:checked")].map(
    (input) => input.dataset.filterCategory,
  );
  const allCategories = allCategoryIds();
  state.filters.categories = categories.length === allCategories.length ? [] : categories;
  await persistUiMeta();
  refs.filterDialog.close();
  render();
}

async function onSearchSubmit(event) {
  event.preventDefault();
  const query = refs.searchQuery.value.trim().toLowerCase();
  const filtered = filterBySearchPeriod(
    state.transactions.filter((item) => `${item.note} ${item.category} ${item.memo || ""}`.toLowerCase().includes(query)),
    state.searchPeriod,
  );
  refs.searchIncomeTotal.textContent = formatCompactCurrency(sumByType(filtered, "income"));
  refs.searchExpenseTotal.textContent = formatCompactCurrency(sumByType(filtered, "expense"));
  refs.searchResults.innerHTML = filtered.length
    ? filtered
        .slice(0, 20)
        .map(
          (item) => `
            <article class="record-card">
              <div class="record-card__leading">
                <div class="record-card__icon" style="background:${categoryAppearance(item.category, item.type).color}">
                  <i data-lucide="${categoryAppearance(item.category, item.type).icon}"></i>
                </div>
                <div class="record-card__content">
                  <p class="record-card__category">${item.category}</p>
                  <h3 class="record-card__note">${item.note}</h3>
                  <div class="record-card__meta">${item.date} · ${accountName(item.account)}</div>
                </div>
                <strong class="record-card__amount is-${item.type}">${item.type === "expense" ? "-" : "+"}${formatCurrency(item.amount)}</strong>
              </div>
            </article>
          `,
        )
        .join("")
    : emptyState("검색 결과가 없습니다.", "조건을 바꿔 다시 검색해 보세요.");
}

async function onSubmitEntry(event) {
  event.preventDefault();
  const formData = new FormData(refs.entryForm);
  const transaction = normalizeTransaction(
    {
      id: state.editingId || crypto.randomUUID(),
      type: String(formData.get("type")),
      amount: Number(formData.get("amount")),
      category: String(formData.get("category")),
      member: String(formData.get("member")),
      account: String(formData.get("account")),
      date: String(formData.get("date")),
      note: String(formData.get("note") || "").trim() || defaultNote(formData.get("category")),
    },
    true,
  );
  if (!transaction.amount || !transaction.date || !transaction.type || !transaction.category || !transaction.member || !transaction.account) return;
  await db.transactions.put(transaction);
  state.currentMonth = transaction.date.slice(0, 7);
  state.selectedDate = transaction.date;
  state.editingId = null;
  await persistUiMeta();
  await loadTransactionsFromDb();
  refs.entryDialog.close();
  resetEntryForm();
  render();
  void pushPendingToServer();
}

function setEntryType(type) {
  refs.typeField.value = type;
  refs.typeLabel.textContent = type ? typeLabel(type) : "유형 선택";
  refs.typeChips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.typeValue === type);
  });
  const categories = type ? categoryIdsForType(type) : [];
  refs.categoryField.innerHTML = [
    `<option value="">분류 선택</option>`,
    ...categories.map((item) => `<option value="${item}">${item}</option>`),
  ].join("");
  refs.categoryField.value = "";
}

function resetEntryForm() {
  refs.entryForm.reset();
  state.editingId = null;
  refs.entryDeleteButton.classList.add("is-hidden");
  clearEntrySelections();
}

function openEntryDialog() {
  state.editingId = null;
  refs.entryDeleteButton.classList.add("is-hidden");
  refs.entryDialog.showModal();
  refs.amountInput.focus();
}

function startEdit(id) {
  const transaction = state.transactions.find((item) => item.id === id);
  if (!transaction) return;
  state.editingId = id;
  refs.entryDeleteButton.classList.remove("is-hidden");
  setEntryType(transaction.type);
  refs.amountInput.value = transaction.amount;
  refs.categoryField.value = transaction.category;
  refs.memberField.value = transaction.member;
  refs.accountField.value = transaction.account;
  refs.dateField.value = transaction.date;
  refs.entryForm.note.value = transaction.note;
  refs.entryDialog.showModal();
}

async function deleteRecord(id) {
  const transaction = state.transactions.find((item) => item.id === id);
  if (!transaction) return;
  if (state.editingId === id) {
    state.editingId = null;
    refs.entryDeleteButton.classList.add("is-hidden");
  }
  await db.transactions.delete(id);
  state.transactions = state.transactions.filter((item) => item.id !== id);
  render();
  const tombstone = { ...transaction, deleted: 1, sync_status: "pending", updated_at: Date.now() };
  await db.transactions.put(tombstone);
  await loadTransactionsFromDb();
  void pushPendingToServer();
}

async function switchScreen(screen) {
  state.currentScreen = screen;
  await persistUiMeta();
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
  refs.openEntryButton.classList.toggle("is-hidden", state.currentScreen === "memo" || state.currentScreen === "analysis");
  refs.memoAddButton.classList.toggle("is-hidden", state.currentScreen !== "memo");
}

function groupTransactions(items, mode) {
  return items.reduce((acc, item) => {
    const key = mode === "daily" ? displaySelectedDate(item.date) : item.date.slice(0, 7);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});
}

function getMonthTransactions() {
  return state.transactions.filter((item) => !item.deleted && item.date.startsWith(state.currentMonth));
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

function filterBySearchPeriod(items, period) {
  if (period === "all") return items;
  if (period === "month") return items.filter((item) => item.date.startsWith(state.currentMonth));
  const today = new Date(`${todayISO()}T00:00:00`);
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);
  return items.filter((item) => new Date(`${item.date}T00:00:00`) >= weekAgo);
}

function normalizeTransaction(item, markPending) {
  const normalized = {
    id: item.id || crypto.randomUUID(),
    type: item.type || "",
    amount: Number(item.amount || 0),
    category: item.category || "",
    sub_category: item.sub_category || "",
    member: normalizeMemberId(item.member),
    account: item.account || "",
    payment_method: item.payment_method || "",
    card_name: item.card_name || "",
    date: item.date || todayISO(),
    note: item.note || defaultNote(item.category || "기타"),
    memo: item.memo || "",
    updated_at: Number(item.updated_at || Date.now()),
    sync_status: item.sync_status || (markPending ? "pending" : "synced"),
    deleted: item.deleted ? 1 : 0,
  };
  normalized.fingerprint = buildFingerprint(normalized);
  return normalized;
}

function clearEntrySelections() {
  refs.typeField.value = "";
  refs.typeLabel.textContent = "유형 선택";
  refs.typeChips.forEach((chip) => chip.classList.remove("is-active"));
  refs.categoryField.innerHTML = `<option value="">분류 선택</option>`;
  refs.memberField.innerHTML = [
    `<option value="">사용자 선택</option>`,
    ...MEMBERS.map((member) => `<option value="${member.id}">${member.name}</option>`),
  ].join("");
  refs.accountField.innerHTML = [
    `<option value="">지불수단 선택</option>`,
    ...ACCOUNTS.map((account) => `<option value="${account.id}">${account.name}</option>`),
  ].join("");
  refs.memberField.value = "";
  refs.accountField.value = "";
  refs.categoryField.value = "";
  refs.dateField.value = "";
}

function normalizeMemberId(value) {
  if (value == null || value === "") return "";
  if (value === "partner" || value === "솔이" || value === "예비신부") return "솔이";
  if (value === "jw" || value === "정우" || value === "나" || value === "Default") return "정우";
  return "정우";
}

function buildFingerprint(item) {
  return [item.date, item.type, item.amount, item.note || "", item.member || "", item.category || ""].join("|");
}

async function fullSyncCycle() {
  await pushPendingToServer();
  await pullFromServer();
}

async function pushPendingToServer() {
  if (!navigator.onLine) {
    updateSyncUI("오프라인", "offline");
    return;
  }
  const pending = (await db.transactions.where("sync_status").equals("pending").toArray()).map((item) => ({
    ...item,
    member: normalizeMemberId(item.member),
  }));
  if (!pending.length) {
    updateSyncUI("동기화 완료", "success");
    return;
  }

  updateSyncUI(`동기화 중 (${pending.length}건)`, "syncing");
  try {
    let syncedCount = 0;
    for (let index = 0; index < pending.length; index += SYNC_PUSH_BATCH_SIZE) {
      const chunk = pending.slice(index, index + SYNC_PUSH_BATCH_SIZE);
      const response = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions: chunk }),
      });
      let payload = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }
      if (!response.ok || payload?.ok === false) {
        throw new Error(payload?.error || `push failed: ${response.status}`);
      }
      await Promise.all(chunk.map((item) => db.transactions.update(item.id, { sync_status: "synced" })));
      syncedCount += chunk.length;
      updateSyncUI(`동기화 중 (${syncedCount}/${pending.length}건)`, "syncing");
    }
    state.lastSyncedAt = Date.now();
    await setMeta("lastSyncedAt", state.lastSyncedAt);
    await loadTransactionsFromDb();
    updateSyncUI("동기화 완료", "success");
  } catch (error) {
    const message = error instanceof Error ? error.message : "알 수 없는 오류";
    state.syncDetailMessage = `동기화 실패: ${message}`;
    updateSyncUI("동기화 실패", "error");
  }
}

async function pullFromServer() {
  if (!navigator.onLine) {
    updateSyncUI("오프라인", "offline");
    return;
  }
  updateSyncUI("최신 데이터 확인 중", "syncing");
  try {
    const response = await fetch("/api/sync");
    if (!response.ok) throw new Error(`pull failed: ${response.status}`);
    const payload = await response.json();
    const remoteTransactions = Array.isArray(payload.transactions) ? payload.transactions.map((item) => normalizeTransaction(item, false)) : [];
    if (remoteTransactions.length) {
      const localMap = new Map(state.transactions.map((item) => [item.id, item]));
      const toWrite = remoteTransactions.filter((remote) => {
        const local = localMap.get(remote.id);
        return !local || Number(remote.updated_at) >= Number(local.updated_at);
      });
      if (toWrite.length) {
        await db.transactions.bulkPut(toWrite.map((item) => ({ ...item, sync_status: "synced" })));
      }
    }
    state.lastSyncedAt = Date.now();
    await setMeta("lastSyncedAt", state.lastSyncedAt);
    await loadTransactionsFromDb();
    render();
    updateSyncUI("동기화 완료", "success");
  } catch {
    updateSyncUI("서버 연결 실패", "error");
  }
}

function updateSyncUI(message, status) {
  state.syncMessage = message;
  refs.syncStatusLabel.textContent = message;
  refs.syncDot.dataset.status = status;
  refs.remoteStatusLabel.textContent =
    status === "offline" ? "Cloudflare D1 연결 대기" : "Cloudflare D1 동기화 활성";
  if (status === "error" && state.syncDetailMessage) {
    refs.syncDetailLabel.textContent = state.syncDetailMessage;
    return;
  }
  state.syncDetailMessage = "";
  refs.syncDetailLabel.textContent = state.lastSyncedAt
    ? `마지막 동기화 ${formatDateTime(state.lastSyncedAt)}`
    : "마지막 동기화 기록 없음";
}

function schedulePeriodicSync() {
  clearInterval(syncTimerId);
  syncTimerId = window.setInterval(() => {
    void fullSyncCycle();
  }, SYNC_INTERVAL_MS);
}

function registerConnectivityHooks() {
  window.addEventListener("online", () => {
    refs.remoteStatusLabel.textContent = "Cloudflare D1 동기화 활성";
    void fullSyncCycle();
  });
  window.addEventListener("offline", () => {
    updateSyncUI("오프라인", "offline");
  });
}

function renderIcons() {
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
}

function populateSelect(select, items, valueKey, labelKey) {
  select.innerHTML = items.map((item) => `<option value="${item[valueKey]}">${item[labelKey]}</option>`).join("");
}

function openInstallDialog() {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isSamsung = /SamsungBrowser/i.test(ua);

  if (isStandalone) {
    refs.installDescription.textContent = "이미 홈 화면에 추가되어 앱처럼 사용할 수 있습니다.";
    refs.installButton.textContent = "확인";
    refs.installButton.disabled = true;
    refs.installSteps.innerHTML = `
      <li>홈 화면에서 DonnaGa 아이콘을 찾아 실행합니다.</li>
      <li>브라우저가 아닌 앱처럼 전체 화면으로 열립니다.</li>
    `;
    refs.installDialog.showModal();
    return;
  }

  refs.installButton.disabled = !deferredInstallPrompt;
  refs.installButton.textContent = deferredInstallPrompt ? "설치하기" : "브라우저 설치창 없음";

  if (deferredInstallPrompt) {
    refs.installDescription.textContent = "이 브라우저는 설치 창을 바로 띄울 수 있습니다. 아래 버튼을 누르세요.";
    refs.installSteps.innerHTML = `
      <li>아래 설치하기 버튼을 누릅니다.</li>
      <li>브라우저 설치 창에서 확인을 누릅니다.</li>
      <li>홈 화면 아이콘으로 바로 실행할 수 있습니다.</li>
    `;
  } else if (isIOS) {
    refs.installDescription.textContent = "iPhone/iPad에서는 Safari의 공유 메뉴에서 직접 홈 화면에 추가해야 합니다.";
    refs.installSteps.innerHTML = `
      <li>Safari 하단의 공유 버튼을 누릅니다.</li>
      <li>'홈 화면에 추가'를 선택합니다.</li>
      <li>가능하면 'Open as Web App'를 켠 뒤 추가합니다.</li>
    `;
  } else if (isSamsung || isAndroid) {
    refs.installDescription.textContent = isSamsung
      ? "Samsung Internet 메뉴 또는 주소창 설치 아이콘으로 추가해 주세요."
      : "Chrome 메뉴에서 홈 화면 추가 또는 앱 설치를 선택해 주세요.";
    refs.installSteps.innerHTML = isSamsung
      ? `
          <li>주소창 또는 메뉴의 설치 아이콘을 누릅니다.</li>
          <li>'Install on your Apps screen' 또는 비슷한 항목을 선택합니다.</li>
          <li>확인하면 홈 화면에 앱 아이콘이 생깁니다.</li>
        `
      : `
          <li>브라우저 오른쪽 위 메뉴를 엽니다.</li>
          <li>'홈 화면에 추가' 또는 'Install app'를 선택합니다.</li>
          <li>설치 확인 후 홈 화면 아이콘으로 실행합니다.</li>
        `;
  } else {
    refs.installDescription.textContent = "브라우저 메뉴에서 홈 화면에 추가 또는 앱 설치 항목을 찾아 주세요.";
    refs.installSteps.innerHTML = `
      <li>브라우저 메뉴를 엽니다.</li>
      <li>'홈 화면에 추가' 또는 '앱 설치'를 선택합니다.</li>
      <li>설치 후 홈 화면에서 DonnaGa를 실행합니다.</li>
    `;
  }

  refs.installDialog.showModal();
}

function availableYears() {
  const years = new Set(state.transactions.map((item) => Number(item.date.slice(0, 4))));
  const currentYear = Number(state.currentMonth.slice(0, 4));
  years.add(currentYear - 1);
  years.add(currentYear);
  years.add(currentYear + 1);
  return [...years].sort((left, right) => left - right);
}

function defaultSelectedDateForMonth(monthKey) {
  const existing = state.transactions
    .filter((item) => !item.deleted && item.date.startsWith(monthKey))
    .map((item) => item.date)
    .sort()
    .at(-1);
  return existing || `${monthKey}-01`;
}

async function shiftMonth(direction) {
  const [year, month] = state.currentMonth.split("-").map(Number);
  const next = new Date(year, month - 1 + direction, 1);
  state.currentMonth = monthKeyFromDate(next);
  state.selectedDate = defaultSelectedDateForMonth(state.currentMonth);
  await persistUiMeta();
  render();
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

function monthKeyFromDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function displaySelectedDate(date) {
  const parsed = new Date(`${date}T00:00:00`);
  return `${parsed.getMonth() + 1}월 ${parsed.getDate()}일`;
}

function sumByType(items, type) {
  return items.filter((item) => item.type === type).reduce((sum, item) => sum + item.amount, 0);
}

function groupNetAmount(items) {
  return items.reduce((total, item) => total + (item.type === "expense" ? -item.amount : item.amount), 0);
}

function typeLabel(type) {
  return { expense: "지출", income: "수입", transfer: "이체" }[type] || type;
}

function categoryIdsForType(type) {
  return (CATEGORY_META[type] || []).map((item) => item.id);
}

function allCategoryIds() {
  return Object.values(CATEGORY_META)
    .flat()
    .map((item) => item.id);
}

function memberName(id) {
  return MEMBERS.find((member) => member.id === id)?.name || id;
}

function accountName(id) {
  return ACCOUNTS.find((account) => account.id === id)?.name || id;
}

function categoryAppearance(category, type) {
  return CATEGORY_META[type]?.find((item) => item.id === category)
    || CATEGORY_META.expense.find((item) => item.id === category)
    || CATEGORY_META.income.find((item) => item.id === category)
    || CATEGORY_META.transfer.find((item) => item.id === category)
    || { color: "#b8c1cc", icon: "circle", label: category };
}

function renderCategoryIcon(category, type) {
  const appearance = categoryAppearance(category, type);
  return `<i data-lucide="${appearance.icon}"></i>`;
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

function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
}

function todayISO() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

async function getMeta(key) {
  const row = await db.meta.get(key);
  return row?.value;
}

async function setMeta(key, value) {
  await db.meta.put({ key, value });
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.warn("[PWA] serviceWorker not supported in this browser.");
    return;
  }
  try {
    const registration = await navigator.serviceWorker.register("./sw.js");
    console.info("[PWA] service worker registered:", registration.scope);
  } catch (error) {
    console.error("[PWA] service worker registration failed:", error);
  }
}

async function clearWebCacheAndReload() {
  refs.clearWebCacheButton.disabled = true;
  refs.clearWebCacheButton.textContent = "삭제 중";
  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
    updateSyncUI("웹 캐시 삭제 완료", "success");
    window.setTimeout(() => {
      window.location.reload();
    }, 300);
  } catch (error) {
    console.error("[PWA] failed to clear cache:", error);
    updateSyncUI("웹 캐시 삭제 실패", "error");
    refs.clearWebCacheButton.disabled = false;
    refs.clearWebCacheButton.textContent = "캐시 삭제";
  }
}
