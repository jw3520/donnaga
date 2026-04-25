const STORAGE_KEY_V3 = "donnaga-state-v3";
const STORAGE_KEY_V4 = "donnaga-state-v4";
const AUTH_PIN_STORAGE_KEY = "DONNAGA_PIN";
const AUTH_ROLE_STORAGE_KEY = "DONNAGA_ROLE";
const UPDATE_SEEN_STORAGE_KEY = "DONNAGA_UPDATE_SEEN";
const LAST_UPDATE_CHECK_STORAGE_KEY = "DONNAGA_LAST_UPDATE_CHECK";
const UPDATE_BANNER_TOKEN_STORAGE_KEY = "DONNAGA_UPDATE_TOKEN";
const UPDATE_BANNER_DISMISSED_STORAGE_KEY = "DONNAGA_UPDATE_BANNER_DISMISSED";
const APP_VERSION = "1.26.04.25.03";
const GUEST_SEED_SIGNATURE_META_KEY = "guestSeedSignature";
const LOGIN_FAILS_STORAGE_KEY = "DONNAGA_LOGIN_FAILS";
const LOGIN_LOCK_UNTIL_STORAGE_KEY = "DONNAGA_LOCK_UNTIL";
const DB_NAME = "donnaga-db";
const SYNC_INTERVAL_MS = 60_000;
const SYNC_PUSH_BATCH_SIZE = 200;
const CALENDAR_SWIPE_THRESHOLD = 42;
const UPDATE_CHECK_ASSETS = ["./index.html", "./app.js", "./styles.css"];
const MEMBERS = [
  { id: "정우", name: "정우" },
  { id: "솔이", name: "솔이" },
];
const GUEST_MEMBERS = [
  { id: "철수", name: "철수" },
  { id: "영희", name: "영희" },
];

const ACCOUNTS = [
  { id: "cash", name: "현금", type: "cash" },
  { id: "debit-card", name: "체크카드", type: "debit" },
  { id: "credit-card", name: "신용카드", type: "credit" },
  { id: "bank-transfer", name: "계좌이체", type: "bank" },
  { id: "other", name: "기타", type: "other" },
];

const INCOME_CATEGORY_META = [
  { id: "월급", label: "월급", color: "#9adfd7", icon: "banknote" },
  { id: "당근", label: "당근", color: "#ffb26b", icon: "carrot" },
  { id: "용돈", label: "용돈", color: "#c8e58f", icon: "piggy-bank" },
  { id: "환급", label: "환급", color: "#d0c0f3", icon: "badge-percent" },
  { id: "기타", label: "기타", color: "#9edcc8", icon: "party-popper" },
];
const DEFAULT_BUDGET_LIMIT = 2_000_000;

const BUDGET_GROUPS = [
  {
    id: "living",
    label: "생활",
    fullLabel: "생활 지출",
    type: "expense",
    limit: DEFAULT_BUDGET_LIMIT,
    color: "#ffad6f",
    categories: [
      { id: "식비", label: "식비", color: "#ffd89b", icon: "utensils-crossed" },
      { id: "생필품", label: "생필품", color: "#f3c6a1", icon: "shopping-basket" },
      { id: "교통", label: "교통", color: "#ffb4bf", icon: "bus-front" },
      { id: "카페", label: "카페", color: "#c7b29b", icon: "coffee" },
      { id: "편의점", label: "편의점", color: "#c9ddb0", icon: "store" },
      { id: "반려동물", label: "반려동물", color: "#c9d7ff", icon: "paw-print" },
      { id: "문화생활", label: "문화생활", color: "#e6b8ef", icon: "gamepad-2" },
      { id: "취미", label: "취미", color: "#d6c8ff", icon: "palette" },
    ],
  },
  {
    id: "fixed",
    label: "고정",
    fullLabel: "고정 지출",
    type: "expense",
    limit: DEFAULT_BUDGET_LIMIT,
    color: "#e9bd67",
    categories: [
      { id: "주거비", label: "주거비", color: "#f1d7a6", icon: "house" },
      { id: "주유비", label: "주유비", color: "#ffc46b", icon: "fuel" },
      { id: "하이패스", label: "하이패스", color: "#8dc7ff", icon: "road" },
      { id: "통신비", label: "통신비", color: "#a8dff0", icon: "smartphone" },
      { id: "보험", label: "보험", color: "#c7e7a5", icon: "shield-check" },
      { id: "구독", label: "구독", color: "#f8c8a7", icon: "krw-note" },
      { id: "교육", label: "교육", color: "#d0c0f3", icon: "book-open-text" },
    ],
  },
  {
    id: "variable",
    label: "변동",
    fullLabel: "변동 지출",
    type: "expense",
    limit: DEFAULT_BUDGET_LIMIT,
    color: "#ef8fa2",
    categories: [
      { id: "의료/건강", label: "의료/건강", color: "#b3dec1", icon: "heart-pulse" },
      { id: "선물", label: "선물", color: "#a8dff0", icon: "gift" },
      { id: "경조사", label: "경조사", color: "#f4b2ba", icon: "hand-heart" },
      { id: "결혼준비", label: "결혼준비", color: "#f48fb1", icon: "gem" },
      { id: "의류/잡화", label: "의류/잡화", color: "#f6c4d1", icon: "shirt" },
      { id: "차량관리비", label: "차량관리비", color: "#b9d7fb", icon: "car-front" },
      { id: "술", label: "술", color: "#f4b2ba", icon: "wine" },
      { id: "미용", label: "미용", color: "#ffc2db", icon: "sparkles" },
      { id: "variable-other", label: "기타", color: "#d8c8ff", icon: "sparkles" },
    ],
  },
  {
    id: "savings",
    label: "저축",
    fullLabel: "저축",
    type: "investment",
    limit: DEFAULT_BUDGET_LIMIT,
    color: "#62d7b6",
    categories: [
      { id: "적금", label: "적금", color: "#f2de96", icon: "piggy-bank" },
      { id: "청약", label: "청약", color: "#efc2a8", icon: "building-2" },
      { id: "비상금", label: "비상금", color: "#c8e58f", icon: "wallet" },
      { id: "기타", label: "기타", color: "#d9d4a8", icon: "circle-ellipsis" },
    ],
  },
  {
    id: "investment",
    label: "투자",
    fullLabel: "투자",
    type: "investment",
    limit: DEFAULT_BUDGET_LIMIT,
    color: "#289eaf",
    categories: [
      { id: "금", label: "금", color: "#f4c95d", icon: "badge-cent" },
      { id: "국내주식", label: "국내 주식", color: "#8ec5ff", icon: "chart-candlestick" },
      { id: "해외주식", label: "해외 주식", color: "#74b5ff", icon: "globe" },
      { id: "ETF", label: "ETF", color: "#9bb6ff", icon: "chart-column-big" },
      { id: "가상자산", label: "가상자산", color: "#b08cff", icon: "coins" },
      { id: "investment-other", label: "기타", color: "#b7c2d0", icon: "circle-ellipsis" },
    ],
  },
];

const CATEGORY_META = {
  income: INCOME_CATEGORY_META,
  expense: BUDGET_GROUPS.filter((group) => group.type === "expense").flatMap((group) => group.categories),
  investment: BUDGET_GROUPS.filter((group) => group.type === "investment").flatMap((group) => group.categories),
};

const refs = {
  monthTitleLabel: document.querySelector("#month-title-label"),
  incomeTotal: document.querySelector("#income-total"),
  expenseTotal: document.querySelector("#expense-total"),
  savingsTotal: document.querySelector("#savings-total"),
  balanceTotal: document.querySelector("#balance-total"),
  cashExpenseTotal: document.querySelector("#cash-expense-total"),
  cardExpenseTotal: document.querySelector("#card-expense-total"),
  mainUpdateBanner: document.querySelector("#main-update-banner"),
  applyUpdateBannerButton: document.querySelector("#apply-update-banner-button"),
  dismissUpdateBannerButton: document.querySelector("#dismiss-update-banner-button"),
  memberFilterButtons: [...document.querySelectorAll("[data-member-filter]")],
  syncDot: document.querySelector("#sync-dot"),
  syncStatusLabel: document.querySelector("#sync-status-label"),
  storageStatusLabel: document.querySelector("#storage-status-label"),
  remoteStatusLabel: document.querySelector("#remote-status-label"),
  syncDetailLabel: document.querySelector("#sync-detail-label"),
  updateTimeLabel: document.querySelector("#update-time-label"),
  updateVersionLabel: document.querySelector("#update-version-label"),
  manualSyncButton: document.querySelector("#manual-sync-button"),
  clearWebCacheButton: document.querySelector("#clear-web-cache-button"),
  settingsUpdateBadge: document.querySelector("#settings-update-badge"),
  openInstallDialogButton: document.querySelector("#open-install-dialog-button"),
  logoutButton: document.querySelector("#logout-button"),
  calendarCard: document.querySelector("#calendar-card"),
  calendarGrid: document.querySelector("#calendar-grid"),
  selectedDateTitle: document.querySelector("#selected-date-title"),
  recordsList: document.querySelector("#records-list"),
  recordsCaption: document.querySelector("#records-caption"),
  listRecordsList: document.querySelector("#list-records-list"),
  listRecordsCaption: document.querySelector("#list-records-caption"),
  listSortButton: document.querySelector("#list-sort-button"),
  listSearchButton: document.querySelector("#list-search-button"),
  memoList: document.querySelector("#memo-list"),
  memoMonthLabel: document.querySelector("#memo-month-label"),
  memoAddButton: document.querySelector("#memo-add-button"),
  assetOverview: document.querySelector("#asset-overview"),
  assetList: document.querySelector("#asset-list"),
  analysisMonthLabel: document.querySelector("#analysis-month-label"),
  analysisRangeLabel: document.querySelector("#analysis-range-label"),
  analysisModeSwitch: document.querySelector("#analysis-mode-switch"),
  analysisPrimaryLabel: document.querySelector("#analysis-primary-label"),
  analysisSecondaryLabel: document.querySelector("#analysis-secondary-label"),
  analysisCopyButton: document.querySelector("#analysis-copy-button"),
  analysisCardSwitch: document.querySelector("#analysis-card-switch"),
  analysisExpenseTotal: document.querySelector("#analysis-expense-total"),
  analysisTransferTotal: document.querySelector("#analysis-transfer-total"),
  analysisDonutChart: document.querySelector("#analysis-donut-chart"),
  analysisDonutInner: document.querySelector("#analysis-donut-inner"),
  analysisCategoryBreakdown: document.querySelector("#analysis-category-breakdown"),
  analysisEmptyText: document.querySelector("#analysis-empty-text"),
  analysisBody: document.querySelector(".analysis-body"),
  budgetExpenseTotal: document.querySelector("#budget-expense-total"),
  budgetLimitTotal: document.querySelector("#budget-limit-total"),
  budgetList: document.querySelector("#budget-list"),
  cardTotalAmount: document.querySelector("#card-total-amount"),
  debitTotalAmount: document.querySelector("#debit-total-amount"),
  cardSummaryList: document.querySelector("#card-summary-list"),
  openAnalysisButton: document.querySelector("#open-analysis-button"),
  closeAnalysisButton: document.querySelector("#close-analysis-button"),
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
  investmentCategoryChips: document.querySelector("#investment-category-chips"),
  resetFilterButton: document.querySelector("#reset-filter-button"),
  openEntryButton: document.querySelector("#open-entry-button"),
  entryDialog: document.querySelector("#entry-dialog"),
  closeEntryButton: document.querySelector("#close-entry-button"),
  entryForm: document.querySelector("#entry-form"),
  entryDeleteButton: document.querySelector("#entry-delete-button"),
  resetFormButton: document.querySelector("#reset-form-button"),
  entrySubmitButton: document.querySelector("#entry-submit-button"),
  editingIdField: document.querySelector("#editing-id-field"),
  typeField: document.querySelector("#type-field"),
  budgetGroupField: document.querySelector("#budget-group-field"),
  typeLabel: document.querySelector("#entry-type-label"),
  typeChips: [...document.querySelectorAll(".type-chip")],
  amountInput: document.querySelector(".amount-input"),
  categoryField: document.querySelector("#category-field"),
  memberField: document.querySelector("#member-field"),
  accountField: document.querySelector("#account-field"),
  dateField: document.querySelector("#date-field"),
  entryBudgetGroupGrid: document.querySelector("#entry-budget-group-grid"),
  entryCategoryGrid: document.querySelector("#entry-category-grid"),
  memberButtons: [...document.querySelectorAll("[data-member-value]")],
  entryAccountToggle: document.querySelector("#entry-account-toggle"),
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
  loginGate: document.querySelector("#login-gate"),
  loginGateForm: document.querySelector("#login-gate-form"),
  loginGateInput: document.querySelector("#login-gate-input"),
  loginGateError: document.querySelector("#login-gate-error"),
  loginGateSubmit: document.querySelector(".login-gate__submit"),
  settingsScreen: document.querySelector('.screen[data-screen="settings"]'),
  settingsTabButton: document.querySelector('[data-screen-target="settings"]'),
  guestHiddenSettingsRows: [...document.querySelectorAll("[data-guest-hidden='true']")],
  adminOnlyElements: [...document.querySelectorAll("[data-admin-only='true']")],
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
  selectedDateByUser: false,
  analysisTab: "stats",
  analysisMode: "expense",
  listSortOrder: "desc",
  searchPeriod: "all",
  searchQuickCategory: "",
  searchQuickType: "",
  memberFilter: "all",
  filters: { types: ["income", "expense", "investment"], categories: [] },
  budgetLimits: {},
  authPin: "",
  role: "locked",
  updateAvailable: false,
  editingId: null,
  syncing: false,
  syncMessage: "로컬 준비 중",
  lastSyncedAt: null,
  lastUpdateCheckedAt: null,
  updateToken: "",
  syncDetailMessage: "",
  verifyingPin: false,
};

let deferredInstallPrompt = null;
let syncTimerId = null;
let calendarTouchState = null;
let swRegistrationRef = null;
let reloadingForServiceWorker = false;
let loginLockTimerId = null;
await boot();

async function boot() {
  restoreAuthState();
  ensureLoginGate();
  populateStaticOptions();
  renderFilterChips();
  bindEvents();
  applyRoleToUI();
  syncUpdateUi();
  updateSyncUI("로컬 데이터베이스 준비 중", "idle");
  await migrateLegacyLocalState();
  await migrateLegacyMemberNames();
  await migrateLegacyBudgetReorg();
  await migrateLegacySavingsOtherCleanup();
  await purgeSeedTransactions();
  await loadUiMeta();
  await loadBudgetLimits();
  if (isGuest()) {
    await migrateGuestSandboxMembers();
    await syncGuestSandboxSeed();
  }
  await loadTransactionsFromDb();
  render();
  if (canReadServer()) {
    updateSyncUI(navigator.onLine ? "초기 동기화 중" : "오프라인", navigator.onLine ? "syncing" : "offline");
    await pullFromServer();
    if (navigator.onLine && canSyncServer()) {
      await pushPendingToServer();
    }
  } else if (isGuest()) {
    updateSyncUI("게스트 샌드박스", "offline");
  } else {
    updateSyncUI("비밀번호 입력 대기", "idle");
  }
  schedulePeriodicSync();
  registerConnectivityHooks();
  await registerServiceWorker();
  ensureLoginGate();
}

function populateStaticOptions() {
  renderEntryAccountOptions();
  clearEntrySelections();
}

function bindEvents() {
  refs.openAnalysisButton.addEventListener("click", () => switchScreen("analysis"));
  refs.closeAnalysisButton.addEventListener("click", () => switchScreen("calendar"));
  refs.closeMemoButton.addEventListener("click", () => switchScreen("calendar"));
  refs.memoSearchButton.addEventListener("click", openSearchDialog);
  refs.memoAddButton.addEventListener("click", openEntryDialog);
  refs.memoPrevMonthButton.addEventListener("click", () => shiftMonth(-1, { animate: true }));
  refs.memoNextMonthButton.addEventListener("click", () => shiftMonth(1, { animate: true }));
  refs.listSortButton.addEventListener("click", async () => {
    state.listSortOrder = state.listSortOrder === "desc" ? "asc" : "desc";
    await persistUiMeta();
    renderListRecords();
    syncListSortButton();
    renderIcons();
  });
  refs.listSearchButton.addEventListener("click", openSearchDialog);
  refs.memberFilterButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      state.memberFilter = button.dataset.memberFilter || "all";
      syncMemberFilterButtons();
      renderSummary();
      renderCalendar();
      renderDailyRecords();
      renderListRecords();
      renderAssets();
      renderAnalysis();
      await persistUiMeta();
      renderIcons();
    });
  });

  refs.openMonthPickerButton.addEventListener("click", () => {
    renderMonthPicker();
    refs.monthPickerDialog.showModal();
  });
  refs.closeMonthPickerButton.addEventListener("click", () => refs.monthPickerDialog.close());
  refs.yearSelect.addEventListener("change", renderMonthPicker);

  refs.openSearchButton.addEventListener("click", openSearchDialog);
  refs.closeSearchButton.addEventListener("click", () => refs.searchDialog.close());
  refs.searchForm.addEventListener("submit", onSearchSubmit);
  refs.searchQuery.addEventListener("input", () => {
    if (!state.searchQuickCategory && !state.searchQuickType) return;
    clearSearchQuickFilters();
  });
  refs.searchDialog.addEventListener("click", (event) => {
    const button = event.target.closest("[data-search-period]");
    if (!button) return;
    state.searchPeriod = button.dataset.searchPeriod;
    refs.searchDialog.querySelectorAll("[data-search-period]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
  });
  refs.searchDialog.addEventListener("close", () => {
    clearSearchQuickFilters();
    syncSearchPeriodChips();
  });
  refs.analysisCategoryBreakdown.addEventListener("click", (event) => {
    const row = event.target.closest("[data-analysis-category]");
    if (!row) return;
    openSearchDialog({
      query: row.dataset.analysisCategoryLabel || row.dataset.analysisCategory || "",
      period: "month",
      category: row.dataset.analysisCategory || "",
      type: row.dataset.analysisType || "",
      autoSubmit: true,
    });
  });

  refs.openFilterButton.addEventListener("click", () => refs.filterDialog.showModal());
  refs.closeFilterButton.addEventListener("click", () => refs.filterDialog.close());
  refs.filterForm.addEventListener("submit", onFilterSubmit);
  refs.filterForm.querySelectorAll("input[name='type']").forEach((input) => {
    input.addEventListener("change", () => syncFilterTypeGroup(input.value, input.checked));
  });
  refs.resetFilterButton.addEventListener("click", async () => {
    state.filters = { types: ["income", "expense", "investment"], categories: [] };
    syncFilterForm();
    await persistUiMeta();
    render();
  });

  refs.manualSyncButton.addEventListener("click", async () => {
    if (!isAdmin()) return;
    updateSyncUI("동기화 진행 중", "syncing");
    await runButtonFeedback(
      refs.manualSyncButton,
      { idle: "지금 동기화", busy: "확인 중...", done: "완료!" },
      () => fullSyncCycle(),
    );
  });
  refs.clearWebCacheButton.addEventListener("click", async () => {
    await clearWebCacheAndReload();
  });
  refs.applyUpdateBannerButton.addEventListener("click", async () => {
    await openSettingsAndTriggerUpdate();
  });
  refs.dismissUpdateBannerButton.addEventListener("click", dismissMainUpdateBanner);
  refs.openInstallDialogButton.addEventListener("click", () => {
    openInstallDialog();
  });
  refs.logoutButton.addEventListener("click", logoutAndReload);

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
  refs.resetFormButton.addEventListener("click", resetEntryForm);
  refs.entryDeleteButton.addEventListener("click", async () => {
    if (!canEditLocally()) return;
    if (!state.editingId) return;
    refs.entryDialog.close();
    await deleteRecord(state.editingId);
  });
  refs.typeChips.forEach((chip) => chip.addEventListener("click", () => setEntryType(chip.dataset.typeValue)));
  refs.memberButtons.forEach((button) => {
    button.addEventListener("click", () => setEntryMember(button.dataset.memberValue));
  });
  refs.entryBudgetGroupGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-budget-group-value]");
    if (!button) return;
    setEntryBudgetGroup(button.dataset.budgetGroupValue);
  });
  refs.entryAccountToggle.addEventListener("click", (event) => {
    const button = event.target.closest("[data-account-value]");
    if (!button) return;
    setEntryAccount(button.dataset.accountValue);
  });
  refs.entryCategoryGrid.addEventListener("pointerdown", () => refs.amountInput.blur());
  refs.entryCategoryGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category-value]");
    if (!button) return;
    event.preventDefault();
    setEntryCategory(button.dataset.categoryValue);
  });
  refs.assetList.addEventListener("submit", onBudgetLimitSubmit);
  refs.budgetList.addEventListener("submit", onBudgetLimitSubmit);
  refs.amountInput.addEventListener("input", () => {
    setAmountValue(refs.amountInput.value);
  });
  refs.calendarCard.addEventListener("touchstart", onCalendarTouchStart, { passive: true });
  refs.calendarCard.addEventListener("touchend", onCalendarTouchEnd, { passive: true });
  refs.analysisBody.addEventListener("touchstart", onAnalysisTouchStart, { passive: true });
  refs.analysisBody.addEventListener("touchend", onAnalysisTouchEnd, { passive: true });
  [refs.monthPickerDialog, refs.searchDialog, refs.filterDialog, refs.installDialog, refs.entryDialog].forEach(
    bindBackdropClose,
  );
  refs.loginGateForm.addEventListener("submit", onSubmitLoginGate);

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

function restoreAuthState() {
  const savedPin = localStorage.getItem(AUTH_PIN_STORAGE_KEY) || "";
  const savedRole = localStorage.getItem(AUTH_ROLE_STORAGE_KEY) || "";
  state.authPin = savedPin;
  state.role = savedPin && (savedRole === "admin" || savedRole === "readonly" || savedRole === "guest") ? savedRole : "locked";
}

function persistAuthState(pin, role) {
  localStorage.setItem(AUTH_PIN_STORAGE_KEY, pin);
  localStorage.setItem(AUTH_ROLE_STORAGE_KEY, role);
  state.authPin = pin;
  state.role = role;
}

function clearAuthState() {
  localStorage.removeItem(AUTH_PIN_STORAGE_KEY);
  localStorage.removeItem(AUTH_ROLE_STORAGE_KEY);
  state.authPin = "";
  state.role = "locked";
}

function isAdmin() {
  return state.role === "admin";
}

function isGuest() {
  return state.role === "guest";
}

function canEditLocally() {
  return state.role === "admin" || state.role === "guest";
}

function canSyncServer() {
  return state.role === "admin";
}

function canReadServer() {
  return state.role === "admin" || state.role === "readonly";
}

function hasAccess() {
  return state.role === "admin" || state.role === "readonly" || state.role === "guest";
}

function applyRoleToUI() {
  refs.adminOnlyElements.forEach((element) => {
    element.style.display = isAdmin() ? "" : "none";
    element.classList.toggle("is-hidden", !isAdmin());
  });
  refs.guestHiddenSettingsRows.forEach((element) => {
    element.style.display = isGuest() ? "none" : "";
    element.hidden = isGuest();
  });
  syncMemberLabels();
  document.body.dataset.role = state.role;
}

function ensureLoginGate() {
  const blocked = !hasAccess();
  refs.loginGate.hidden = !blocked;
  refs.loginGate.style.display = blocked ? "grid" : "none";
  refs.loginGate.setAttribute("aria-hidden", blocked ? "false" : "true");
  document.body.classList.toggle("is-auth-blocked", blocked);
  syncLoginGateLockUi();
  if (blocked) {
    refs.loginGateInput.value = "";
    if (getLoginLockRemainingMs() <= 0) {
      refs.loginGateError.hidden = true;
    }
    requestAnimationFrame(() => refs.loginGateInput.focus());
  }
}

function getLoginLockRemainingMs() {
  const lockUntil = Number(localStorage.getItem(LOGIN_LOCK_UNTIL_STORAGE_KEY) || 0);
  return Math.max(0, lockUntil - Date.now());
}

function clearLoginFailures() {
  localStorage.removeItem(LOGIN_FAILS_STORAGE_KEY);
  localStorage.removeItem(LOGIN_LOCK_UNTIL_STORAGE_KEY);
}

function registerLoginFailure() {
  const nextFails = Number(localStorage.getItem(LOGIN_FAILS_STORAGE_KEY) || 0) + 1;
  if (nextFails >= 3) {
    localStorage.setItem(LOGIN_FAILS_STORAGE_KEY, "0");
    localStorage.setItem(LOGIN_LOCK_UNTIL_STORAGE_KEY, String(Date.now() + 60_000));
    syncLoginGateLockUi();
    return;
  }
  localStorage.setItem(LOGIN_FAILS_STORAGE_KEY, String(nextFails));
  refs.loginGateError.textContent = `비밀번호가 틀렸습니다. (${nextFails}/3)`;
  refs.loginGateError.hidden = false;
}

function syncLoginGateLockUi() {
  const remainingMs = getLoginLockRemainingMs();
  const isLocked = remainingMs > 0;
  refs.loginGateInput.disabled = isLocked;
  refs.loginGateSubmit.disabled = isLocked || state.verifyingPin;
  if (loginLockTimerId) {
    window.clearTimeout(loginLockTimerId);
    loginLockTimerId = null;
  }
  if (isLocked) {
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    refs.loginGateError.textContent = `3회 오류로 ${remainingSeconds}초 동안 잠깁니다.`;
    refs.loginGateError.hidden = false;
    loginLockTimerId = window.setTimeout(syncLoginGateLockUi, 1000);
    return;
  }
  if (!refs.loginGateError.hidden && refs.loginGateError.textContent.includes("잠깁니다")) {
    refs.loginGateError.hidden = true;
    refs.loginGateError.textContent = "비밀번호가 틀렸습니다.";
  }
}

async function onSubmitLoginGate(event) {
  event.preventDefault();
  const pin = String(refs.loginGateInput.value || "").trim();
  if (getLoginLockRemainingMs() > 0) {
    syncLoginGateLockUi();
    return;
  }
  if (!pin) {
    refs.loginGateError.textContent = "비밀번호를 입력해 주세요.";
    refs.loginGateError.hidden = false;
    refs.loginGateInput.select();
    return;
  }
  state.verifyingPin = true;
  setButtonBusy(refs.loginGateSubmit, true, { idleLabel: "입장하기", busyLabel: "확인 중" });
  refs.loginGateError.hidden = true;
  let role = "";
  try {
    if (pin === "0000") {
      role = "guest";
    } else {
      role = await verifyPinOnServer(pin);
    }
    persistAuthState(pin, role);
    clearLoginFailures();
  } catch {
    registerLoginFailure();
    refs.loginGateInput.select();
    return;
  } finally {
    state.verifyingPin = false;
    setButtonBusy(refs.loginGateSubmit, false, { idleLabel: "입장하기" });
    syncLoginGateLockUi();
  }
  applyRoleToUI();
  ensureLoginGate();
  if (isGuest()) {
    await migrateGuestSandboxMembers();
    await syncGuestSandboxSeed();
  }
  await loadTransactionsFromDb();
  render();
  if (canReadServer() && navigator.onLine) {
    try {
      await pullFromServer();
      if (canSyncServer()) {
        await pushPendingToServer();
      }
    } catch {
      updateSyncUI("서버 연결 실패", "error");
    }
  } else if (isGuest()) {
    updateSyncUI("게스트 샌드박스", "offline");
  }
}

function logoutAndReload() {
  clearAuthState();
  window.location.reload();
}

function showUpdateAvailableUI() {
  ensureUpdateToken();
  setUpdateAvailable(true);
}

function hideUpdateAvailableUI() {
  state.updateToken = "";
  localStorage.removeItem(UPDATE_BANNER_TOKEN_STORAGE_KEY);
  localStorage.removeItem(UPDATE_BANNER_DISMISSED_STORAGE_KEY);
  setUpdateAvailable(false);
}

function ensureUpdateToken() {
  if (state.updateToken) return state.updateToken;
  const stored = localStorage.getItem(UPDATE_BANNER_TOKEN_STORAGE_KEY);
  if (stored) {
    state.updateToken = stored;
    return stored;
  }
  const nextToken = `update-${Date.now()}`;
  state.updateToken = nextToken;
  localStorage.setItem(UPDATE_BANNER_TOKEN_STORAGE_KEY, nextToken);
  return nextToken;
}

function shouldShowMainUpdateBanner() {
  if (!state.updateAvailable) return false;
  if (state.currentScreen !== "calendar") return false;
  const dismissedToken = localStorage.getItem(UPDATE_BANNER_DISMISSED_STORAGE_KEY);
  return !dismissedToken || dismissedToken !== state.updateToken;
}

function dismissMainUpdateBanner() {
  const token = ensureUpdateToken();
  localStorage.setItem(UPDATE_BANNER_DISMISSED_STORAGE_KEY, token);
  syncUpdateUi();
}

async function openSettingsAndTriggerUpdate() {
  await switchScreen("settings");
  window.setTimeout(() => {
    refs.clearWebCacheButton?.click();
  }, 180);
}

function setUpdateAvailable(isAvailable) {
  state.updateAvailable = Boolean(isAvailable);
  if (state.updateAvailable) {
    localStorage.setItem(UPDATE_SEEN_STORAGE_KEY, "1");
  } else {
    localStorage.removeItem(UPDATE_SEEN_STORAGE_KEY);
  }
  syncUpdateUi();
}

function syncUpdateUi() {
  if (refs.settingsUpdateBadge) {
    refs.settingsUpdateBadge.hidden = !state.updateAvailable;
  }
  if (refs.mainUpdateBanner) {
    refs.mainUpdateBanner.classList.toggle("is-hidden", !shouldShowMainUpdateBanner());
  }
  if (!refs.clearWebCacheButton) return;
  refs.clearWebCacheButton.classList.toggle("primary-button", state.updateAvailable);
  refs.clearWebCacheButton.classList.toggle("secondary-button", !state.updateAvailable);
  refs.clearWebCacheButton.classList.toggle("is-pulsing", state.updateAvailable && state.currentScreen === "settings");
  refs.applyUpdateBannerButton?.classList.toggle("is-pulsing", shouldShowMainUpdateBanner());
  syncUpdateTimestampUi();
}

function syncUpdateTimestampUi() {
  if (refs.updateVersionLabel) {
    refs.updateVersionLabel.textContent = `ver ${APP_VERSION}`;
  }
  if (!refs.updateTimeLabel) return;
  refs.updateTimeLabel.textContent = state.lastUpdateCheckedAt
    ? `마지막 확인: ${formatRelativeSyncTime(state.lastUpdateCheckedAt)}`
    : "마지막 확인: 아직 기록이 없어요.";
}

async function markUpdateChecked() {
  state.lastUpdateCheckedAt = Date.now();
  localStorage.setItem(LAST_UPDATE_CHECK_STORAGE_KEY, String(state.lastUpdateCheckedAt));
  await setMeta("lastUpdateCheckedAt", state.lastUpdateCheckedAt);
  syncUpdateTimestampUi();
}

async function detectCachedAssetUpdate() {
  if (!("caches" in window)) return false;
  for (const asset of UPDATE_CHECK_ASSETS) {
    try {
      const [cachedResponse, networkResponse] = await Promise.all([
        caches.match(asset),
        fetch(`${asset}${asset.includes("?") ? "&" : "?"}t=${Date.now()}`, { cache: "no-store" }),
      ]);
      if (!cachedResponse || !networkResponse.ok) continue;
      const [cachedText, networkText] = await Promise.all([cachedResponse.text(), networkResponse.text()]);
      if (cachedText !== networkText) {
        return true;
      }
    } catch {
      // Ignore transient update-check failures and keep current UI state.
    }
  }
  return false;
}

async function clearAppCaches() {
  if (!("caches" in window)) return;
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
}

async function verifyPinOnServer(pin) {
  const response = await fetch("/api/verify-pin", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin }),
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok || !payload?.role) {
    throw new Error(payload?.error || `verify failed: ${response.status}`);
  }
  return payload.role;
}

function setButtonBusy(button, isBusy, options = {}) {
  if (!button) return;
  const idleLabel = options.idleLabel || button.dataset.idleLabel || button.textContent.trim();
  button.dataset.idleLabel = idleLabel;
  button.disabled = isBusy;
  button.classList.toggle("button--busy", isBusy);
  button.setAttribute("aria-busy", isBusy ? "true" : "false");
  button.textContent = isBusy ? (options.busyLabel || idleLabel) : idleLabel;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function runButtonFeedback(button, labels, task) {
  const idleLabel = labels.idle;
  const busyLabel = labels.busy;
  const doneLabel = labels.done || "완료!";
  setButtonBusy(button, true, { idleLabel, busyLabel });
  try {
    const result = await task();
    await wait(2200);
    button.textContent = doneLabel;
    await wait(1000);
    return result;
  } finally {
    setButtonBusy(button, false, { idleLabel });
  }
}

function bindBackdropClose(dialog) {
  if (!dialog) return;
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    dialog.close();
  });
}

function openSearchDialog(options = {}) {
  if (options.category || options.type) {
    state.searchQuickCategory = options.category || "";
    state.searchQuickType = options.type || "";
  } else {
    clearSearchQuickFilters();
  }
  if (typeof options.period === "string") {
    state.searchPeriod = options.period;
  }
  if (typeof options.query === "string") {
    refs.searchQuery.value = options.query;
  } else if (!options.preserveQuery) {
    refs.searchQuery.value = "";
  }
  syncSearchPeriodChips();
  refs.searchDialog.showModal();
  if (options.autoSubmit) {
    void executeSearch();
  }
}

function clearSearchQuickFilters() {
  state.searchQuickCategory = "";
  state.searchQuickType = "";
}

function syncSearchPeriodChips() {
  refs.searchDialog.querySelectorAll("[data-search-period]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.searchPeriod === state.searchPeriod);
  });
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
      if (parsed.currentScreen) state.currentScreen = parsed.currentScreen === "memo" ? "list" : parsed.currentScreen;
      if (parsed.selectedDate) state.selectedDate = parsed.selectedDate;
      if (typeof parsed.selectedDateByUser === "boolean") state.selectedDateByUser = parsed.selectedDateByUser;
      if (parsed.analysisTab) state.analysisTab = parsed.analysisTab;
      if (parsed.listSortOrder === "asc" || parsed.listSortOrder === "desc") state.listSortOrder = parsed.listSortOrder;
      if (parsed.filters) state.filters = normalizeFilterState(parsed.filters);
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

async function syncGuestSandboxSeed() {
  const module = await import("./guest/dummy-data.js");
  const dummyTransactions = Array.isArray(module.dummyTransactions) ? module.dummyTransactions : [];
  if (!dummyTransactions.length) return;
  const guestRows = await db.transactions.filter((item) => item.scope === "guest" && !item.deleted).toArray();
  const nextSignature = buildGuestSeedSignature(dummyTransactions);
  const currentSignature = String((await getMeta(GUEST_SEED_SIGNATURE_META_KEY)) || "");
  if (guestRows.length && currentSignature === nextSignature) return;
  const seeded = dummyTransactions.map((item, index) =>
    normalizeTransaction(
      {
        ...item,
        id: item.id || `guest-${index + 1}`,
        date: remapDateToCurrentMonth(item.date),
        scope: "guest",
        sync_status: "synced",
        updated_at: Date.now() + index,
      },
      false,
    ),
  );
  await db.transaction("rw", db.transactions, db.meta, async () => {
    if (guestRows.length) {
      const guestIds = guestRows.map((item) => item.id);
      await db.transactions.bulkDelete(guestIds);
    }
    await db.transactions.bulkPut(seeded);
    await setMeta(GUEST_SEED_SIGNATURE_META_KEY, nextSignature);
  });
}

function buildGuestSeedSignature(items) {
  return items
    .map((item) =>
      [
        item.id || "",
        item.type || "",
        item.amount || 0,
        item.category || "",
        item.member || "",
        item.account || "",
        item.date || "",
        item.note || "",
        item.memo || "",
      ].join("|"),
    )
    .join("::");
}

async function migrateGuestSandboxMembers() {
  const guestRows = await db.transactions.filter((item) => item.scope === "guest").toArray();
  if (!guestRows.length) return;
  const rewritten = guestRows
    .map((item) => {
      const nextMember = item.member === "정우" ? "철수" : item.member === "솔이" ? "영희" : item.member;
      if (nextMember === item.member) return null;
      return normalizeTransaction(
        {
          ...item,
          member: nextMember,
          updated_at: Date.now(),
          scope: "guest",
        },
        true,
      );
    })
    .filter(Boolean);
  if (!rewritten.length) return;
  await db.transactions.bulkPut(rewritten);
}

function remapDateToCurrentMonth(date) {
  const currentMonth = monthKeyFromDate(new Date());
  const [year, month] = currentMonth.split("-").map(Number);
  const sourceDay = Number(String(date || "").slice(8, 10) || "1");
  const lastDay = new Date(year, month, 0).getDate();
  const safeDay = String(Math.min(Math.max(sourceDay, 1), lastDay)).padStart(2, "0");
  return `${currentMonth}-${safeDay}`;
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
  state.currentScreen = savedUi.currentScreen === "memo" ? "list" : (savedUi.currentScreen || state.currentScreen);
  state.selectedDate = savedUi.selectedDate || state.selectedDate;
  state.selectedDateByUser = savedUi.selectedDateByUser || false;
  state.analysisTab = savedUi.analysisTab || state.analysisTab;
  state.analysisMode = savedUi.analysisMode || state.analysisMode;
  state.memberFilter = sanitizeMemberFilter(savedUi.memberFilter);
  state.filters = normalizeFilterState(savedUi.filters || state.filters);
  state.listSortOrder = savedUi.listSortOrder === "asc" ? "asc" : "desc";
  state.lastSyncedAt = (await getMeta("lastSyncedAt")) || null;
  state.lastUpdateCheckedAt = Number(localStorage.getItem(LAST_UPDATE_CHECK_STORAGE_KEY) || 0) || (await getMeta("lastUpdateCheckedAt")) || null;
  syncUpdateTimestampUi();
}

function defaultBudgetLimits() {
  return Object.fromEntries(BUDGET_GROUPS.map((group) => [group.id, group.limit]));
}

async function loadBudgetLimits() {
  const saved = (await getMeta("budgetLimits")) || {};
  state.budgetLimits = {
    ...defaultBudgetLimits(),
    ...Object.fromEntries(
      Object.entries(saved).map(([key, value]) => [key, Math.max(0, Number(value || 0))]),
    ),
  };
}

async function persistUiMeta() {
  await setMeta("uiState", {
    currentMonth: state.currentMonth,
    currentScreen: state.currentScreen,
    selectedDate: state.selectedDate,
    selectedDateByUser: state.selectedDateByUser,
    analysisTab: state.analysisTab,
    analysisMode: state.analysisMode,
    memberFilter: state.memberFilter,
    filters: state.filters,
    listSortOrder: state.listSortOrder,
  });
}

async function persistBudgetLimits() {
  await setMeta("budgetLimits", state.budgetLimits);
}

async function loadTransactionsFromDb() {
  const allRows = await db.transactions.orderBy("date").reverse().toArray();
  state.transactions = allRows.filter(matchesCurrentDataScope);
  refs.storageStatusLabel.textContent = `총 ${state.transactions.filter((item) => !item.deleted).length}건`;
  refs.remoteStatusLabel.textContent = isGuest() ? "게스트 로컬" : (navigator.onLine ? "연결됨" : "오프라인");
  refs.syncDetailLabel.textContent = state.lastSyncedAt
    ? formatRelativeSyncTime(state.lastSyncedAt)
    : "아직 동기화 기록이 없어요.";
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
  renderFilterChips();
  applyRoleToUI();
  syncScreens();
  syncFilterForm();
  renderIcons();
}

function renderMonthLabels() {
  refs.monthTitleLabel.textContent = shortMonthLabel(state.currentMonth);
  if (refs.memoMonthLabel) refs.memoMonthLabel.textContent = shortMonthLabel(state.currentMonth);
  refs.analysisMonthLabel.textContent = shortMonthLabel(state.currentMonth);
  refs.analysisRangeLabel.textContent = monthRangeLabel(state.currentMonth);
  refs.listRecordsCaption.textContent = `${monthLabel(state.currentMonth)} ${memberFilterLabel()} 내역`;
  refs.searchDateLabel.textContent = `- ${todayISO().replaceAll("-", ".")}`;
  syncMemberFilterButtons();
}

function renderSummary() {
  const transactions = getMemberScopedMonthTransactions();
  const income = sumByType(transactions, "income");
  const expense = sumByType(transactions, "expense");
  const investment = sumByType(transactions, "investment");
  const cashExpense = transactions
    .filter((item) => item.type === "expense" && item.account === "cash")
    .reduce((sum, item) => sum + item.amount, 0);
  const cardExpense = transactions
    .filter((item) => item.type === "expense" && item.account !== "cash")
    .reduce((sum, item) => sum + item.amount, 0);
  refs.incomeTotal.textContent = formatCurrency(income);
  refs.expenseTotal.textContent = formatCurrency(expense);
  refs.savingsTotal.textContent = formatCurrency(investment);
  refs.balanceTotal.textContent = formatCurrency(income - expense - investment);
  refs.cashExpenseTotal.textContent = formatCompactCurrency(cashExpense);
  refs.cardExpenseTotal.textContent = formatCompactCurrency(cardExpense);
}

function renderCalendar() {
  const [year, month] = state.currentMonth.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthTransactions = getMemberScopedMonthTransactions();
  const expenseByDate = monthTransactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      acc[item.date] = (acc[item.date] || 0) + item.amount;
      return acc;
    }, {});
  const calendarEventsByDate = monthTransactions.reduce((acc, item) => {
    acc[item.date] ??= { income: false, savings: false, investment: false };
    if (item.type === "income") {
      acc[item.date].income = true;
      return acc;
    }
    if (budgetGroupMatchesCategory("savings", item.category)) {
      acc[item.date].savings = true;
      return acc;
    }
    if (budgetGroupMatchesCategory("investment", item.category)) {
      acc[item.date].investment = true;
    }
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
    const dayEvents = calendarEventsByDate[date] || {};
    const eventIcons = [
      dayEvents.income
        ? `<span class="calendar-day__event-icon calendar-day__event-icon--income" aria-label="수입"><i data-lucide="coins"></i></span>`
        : "",
      dayEvents.savings
        ? `<span class="calendar-day__event-icon calendar-day__event-icon--savings" aria-label="저축"><i data-lucide="piggy-bank"></i></span>`
        : "",
      dayEvents.investment
        ? `<span class="calendar-day__event-icon calendar-day__event-icon--investment" aria-label="투자"><i data-lucide="trending-up"></i></span>`
        : "",
    ]
      .filter(Boolean)
      .slice(0, 3)
      .join("");
    cells.push(`
      <button class="${classes.join(" ")}" type="button" data-date="${date}">
        ${eventIcons ? `<span class="calendar-day__events">${eventIcons}</span>` : ""}
        <span class="calendar-day__header">
          <span class="calendar-day__date">${day}</span>
        </span>
        <span class="calendar-day__amount">${expenseByDate[date] ? shortCurrency(expenseByDate[date]) : ""}</span>
      </button>
    `);
  }
  while (cells.length < 42) {
    cells.push(`<div class="calendar-day is-empty"></div>`);
  }
  refs.calendarGrid.innerHTML = cells.join("");
  refs.calendarGrid.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.selectedDate = button.dataset.date;
      state.selectedDateByUser = true;
      await persistUiMeta();
      renderCalendar();
      renderDailyRecords();
      renderIcons();
    });
  });
}

function renderDailyRecords() {
  const items = getMemberScopedMonthTransactions().filter((item) => item.date === state.selectedDate);
  refs.selectedDateTitle.textContent = displaySelectedDate(state.selectedDate);
  refs.recordsCaption.textContent = items.length ? `${items.length}건의 내역` : "지출 내역이 없어요.";
  renderRecordCollection(refs.recordsList, items, "daily");
}

function renderListRecords() {
  renderRecordCollection(refs.listRecordsList, getMemberScopedMonthTransactions(), "daily", state.listSortOrder);
  syncListSortButton();
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
          <p>${item.date} · ${categoryAppearance(item.category, item.type).label}</p>
        </article>
      `,
    )
    .join("");
}

function renderAssets() {
  const items = getFilteredMonthTransactions();
  refs.assetOverview.innerHTML = renderBudgetOverview(items);
  refs.assetList.innerHTML = renderBudgetGroupCards(items, { variant: "asset" });
  renderIcons();
}

function renderAnalysis() {
  const items = getFilteredMonthTransactions();
  const sourceItems =
    state.analysisMode === "income" ? items.filter((item) => item.type === "income") : items.filter((item) => item.type !== "income");
  if (state.analysisMode === "income") {
    refs.analysisPrimaryLabel.textContent = `${Number(state.currentMonth.slice(5, 7))}월 수입`;
    refs.analysisSecondaryLabel.textContent = "건수";
    refs.analysisExpenseTotal.textContent = formatCurrency(sumByType(sourceItems, "income"));
    refs.analysisTransferTotal.textContent = `${sourceItems.length}건`;
  } else {
    refs.analysisPrimaryLabel.textContent = `${Number(state.currentMonth.slice(5, 7))}월 지출`;
    refs.analysisSecondaryLabel.textContent = "저축/투자";
    refs.analysisExpenseTotal.textContent = formatCurrency(sumByType(sourceItems, "expense"));
    refs.analysisTransferTotal.textContent = formatCurrency(sumByType(items, "investment"));
  }
  refs.analysisEmptyText.textContent = sourceItems.length ? "기록이 있습니다." : "내역이 없습니다.";
  renderAnalysisDonut(sourceItems, state.analysisMode);

  const budgetExpense = sumByType(items, "expense");
  refs.budgetExpenseTotal.textContent = formatCurrency(budgetExpense);
  refs.budgetLimitTotal.textContent = formatCurrency(
    BUDGET_GROUPS.reduce((sum, item) => sum + (state.budgetLimits[item.id] || item.limit), 0),
  );
  refs.budgetList.innerHTML = renderBudgetGroupCards(items, { variant: "budget" });

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
    { label: "신용카드", amount: formatCurrency(creditTotal) },
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
  renderIcons();
}

function renderBudgetGroupCards(items, options = {}) {
  const variant = options.variant || "asset";
  const editable = isAdmin();
  return budgetGroupsForItems(items)
    .map((group) => {
      const rawProgress = Math.round((group.spent / Math.max(group.limit, 1)) * 100) || 0;
      const overflow = Math.max(0, rawProgress - 100);
      const withinBarWidth = rawProgress > 100 ? (100 / rawProgress) * 100 : Math.min(100, rawProgress);
      const overflowWidth = rawProgress > 100 ? ((rawProgress - 100) / rawProgress) * 100 : 0;
      const markerOffset = rawProgress > 100 ? withinBarWidth : Math.min(100, rawProgress);
      const categoryRows = group.categories
        .slice()
        .sort((left, right) => right.amount - left.amount || left.label.localeCompare(right.label, "ko-KR"))
        .map((category) => {
          const appearance = categoryAppearance(category.id, group.type);
          return `
            <div class="asset-category-row">
              <div class="asset-category-row__label">
                <span class="asset-category-pill" style="--pill-color:${appearance.color}">
                  ${renderIconMarkup(appearance.icon)}
                  <span>${appearance.label}</span>
                </span>
              </div>
              <strong>${formatCurrency(category.amount)}</strong>
            </div>
          `;
        })
        .join("");
      return `
        <details class="${variant === "budget" ? "budget-row" : "asset-row"} asset-row--expandable">
          <summary class="asset-row__summary">
            <div class="asset-row__top">
              <div class="asset-row__text">
                <strong>${group.fullLabel}</strong>
                <p>${formatCurrency(group.spent)} / ${formatCurrency(group.limit)}</p>
              </div>
              <strong>${rawProgress}%</strong>
            </div>
            <div class="${variant === "budget" ? "budget-row__progress" : "asset-row__progress"}">
              <div class="${variant === "budget" ? "budget-row__progress-bar" : "asset-row__progress-bar"}" style="width:${withinBarWidth}%"></div>
              ${overflow
                ? `<div class="budget-row__progress-overflow" style="left:${withinBarWidth}%; width:${overflowWidth}%"></div>`
                : ""}
              ${overflow ? `<span class="budget-row__progress-marker" aria-hidden="true" style="left:${markerOffset}%"></span>` : ""}
            </div>
          </summary>
          <div class="asset-row__details">
            <p class="asset-row__caption">세부 태그별 사용금액</p>
            <div class="asset-category-breakdown">
              ${categoryRows}
            </div>
            ${editable
              ? `
                <form class="asset-budget-form" data-budget-group-form="${group.id}">
                  <label class="asset-budget-form__label">
                    <span>예산 수정</span>
                    <input name="limit" type="number" min="0" step="10000" value="${group.limit}" inputmode="numeric" />
                  </label>
                  <button class="secondary-button" type="submit">저장</button>
                </form>
              `
              : ""}
          </div>
        </details>
      `;
    })
    .join("");
}

function renderBudgetOverview(items) {
  const groups = budgetGroupsForItems(items);
  const totalLimit = groups.reduce((sum, group) => sum + Math.max(group.limit, 0), 0);
  const totalSpent = groups.reduce((sum, group) => sum + group.spent, 0);

  const segments = groups.map((group) => {
    const ratio = totalLimit > 0 ? (group.limit / totalLimit) * 100 : 0;
    return {
      ...group,
      ratio,
      percentText: totalLimit > 0 ? ((group.limit / totalLimit) * 100).toFixed(1) : "0.0",
    };
  });

  const segmentMarkup = segments.map((group) => `
    <div class="budget-overview__segment" style="width:${Math.max(group.ratio, 0)}%">
      <div class="budget-overview__segment-base" style="--segment-color:${group.color}; --segment-soft:${hexToRgba(group.color, 0.24)}"></div>
    </div>
  `).join("");

  const legendMarkup = segments.map((group) => `
    <article class="budget-overview__legend-item">
      <div class="budget-overview__legend-head">
        <span class="budget-overview__legend-dot" style="--segment-color:${group.color}"></span>
        <strong>${group.fullLabel}</strong>
      </div>
      <p>${formatCurrency(group.limit)} · ${group.percentText}%</p>
    </article>
  `).join("");

  return `
    <section class="budget-overview__card">
      <div class="budget-overview__title-row">
        <div class="stack">
          <strong>전체 예산 현황</strong>
          <p>총 예산 ${formatCurrency(totalLimit)} · 사용 ${formatCurrency(totalSpent)}</p>
        </div>
      </div>
      <div class="budget-overview__bar" aria-label="예산 그룹별 사용량">
        ${segmentMarkup}
      </div>
      <div class="budget-overview__legend">
        ${legendMarkup}
      </div>
    </section>
  `;
}

function renderRecordCollection(container, items, mode, sortOrder = "desc") {
  if (!items.length) {
    container.innerHTML = emptyState("내역이 없어요.", "표시할 데이터가 없습니다.");
    return;
  }
  const groups = groupTransactions(items, mode);
  container.innerHTML = "";
  Object.entries(groups)
    .sort(([left], [right]) => (sortOrder === "asc" ? left.localeCompare(right) : right.localeCompare(left)))
    .forEach(([groupKey, groupItems]) => {
      const wrapper = document.createElement("section");
      wrapper.className = "records-group";
      wrapper.innerHTML = `
        <div class="records-group__header">
          <h3>${mode === "daily" ? displaySelectedDate(groupKey) : groupKey}</h3>
          <p class="muted">${formatCurrency(groupNetAmount(groupItems))}</p>
        </div>
      `;
      groupItems
        .slice()
        .sort((left, right) => (sortOrder === "asc" ? left.date.localeCompare(right.date) : right.date.localeCompare(left.date)))
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
  fragment.querySelector(".record-card__category").textContent = `${memberName(item.member)} · ${categoryAppearance(item.category, item.type).label}`;
  fragment.querySelector(".record-card__note").textContent = item.note;
  const amount = fragment.querySelector(".record-card__amount");
  amount.textContent = `${item.type === "income" ? "+" : "-"}${formatCurrency(item.amount)}`;
  amount.classList.add(`is-${item.type}`);
  fragment.querySelector(".record-card__meta").textContent = `${item.date} · ${accountName(item.account)}`;
  card.addEventListener("click", () => {
    if (!canEditLocally()) return;
    startEdit(item.id);
  });
  fragment.querySelector(".record-delete-button").addEventListener("click", (event) => {
    event.stopPropagation();
    if (!canEditLocally()) return;
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
      const nextMonth = `${refs.yearSelect.value}-${month}`;
      refs.monthPickerDialog.close();
      await setCurrentMonth(nextMonth, { animate: true });
    });
  });
}

function renderFilterChips() {
  renderCategoryChipGroup(refs.incomeCategoryChips, categoryOptionsForType("income"), "income");
  renderCategoryChipGroup(refs.expenseCategoryChips, categoryOptionsForType("expense"), "expense");
  renderCategoryChipGroup(refs.investmentCategoryChips, categoryOptionsForType("investment"), "investment");
}

function renderCategoryChipGroup(container, items, type) {
  container.innerHTML = items
    .map(
      (item) => `
        <label class="icon-chip">
          <input type="checkbox" data-filter-category="${item.id}" data-filter-type="${type}" />
          <span class="icon-chip__badge" style="background:${item.color}">
            ${renderIconMarkup(item.icon || "circle")}
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
    const typeChecked = refs.filterForm.querySelector(`input[name='type'][value='${input.dataset.filterType}']`)?.checked;
    input.checked = Boolean(typeChecked) && (
      state.filters.categories.length === 0 || state.filters.categories.includes(input.dataset.filterCategory)
    );
  });
  refs.searchCategorySummary.textContent =
    state.filters.categories.length === 0 ? "전체 카테고리" : `${state.filters.categories.length}개 선택`;
  refs.searchAccountSummary.textContent = "전체";
}

function syncFilterTypeGroup(type, checked) {
  refs.filterForm.querySelectorAll(`[data-filter-type='${type}']`).forEach((input) => {
    input.checked = checked;
  });
}

async function onFilterSubmit(event) {
  event.preventDefault();
  state.filters.types = [...refs.filterForm.querySelectorAll("input[name='type']:checked")].map((input) => input.value);
  const categories = [...refs.filterForm.querySelectorAll("[data-filter-category]:checked")].map(
    (input) => input.dataset.filterCategory,
  );
  const allCategories = state.filters.types.flatMap((type) => categoryIdsForType(type));
  state.filters.categories = categories.length === allCategories.length ? [] : categories;
  await persistUiMeta();
  refs.filterDialog.close();
  render();
}

async function onSearchSubmit(event) {
  event.preventDefault();
  await executeSearch();
}

async function executeSearch() {
  const query = refs.searchQuery.value.trim().toLowerCase();
  const filtered = filterBySearchPeriod(
    state.transactions.filter((item) => {
      const searchText = `${item.note} ${categoryAppearance(item.category, item.type).label} ${item.memo || ""}`.toLowerCase();
      const normalizedCategory = normalizeCategoryId(item.category || "", item.type || "");
      const quickCategoryMatches = !state.searchQuickCategory || normalizedCategory === state.searchQuickCategory;
      const quickTypeMatches = !state.searchQuickType || normalizeTypeId(item.type || "") === state.searchQuickType;
      return searchText.includes(query) && quickCategoryMatches && quickTypeMatches;
    }),
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
                  ${renderIconMarkup(categoryAppearance(item.category, item.type).icon)}
                </div>
                <div class="record-card__content">
                  <p class="record-card__category">${categoryAppearance(item.category, item.type).label}</p>
                  <h3 class="record-card__note">${item.note}</h3>
                  <div class="record-card__meta">${item.date} · ${memberName(item.member)} · ${accountName(item.account)}</div>
                </div>
                <strong class="record-card__amount is-${item.type}">${item.type === "income" ? "+" : "-"}${formatCurrency(item.amount)}</strong>
              </div>
            </article>
          `,
        )
        .join("")
    : emptyState("검색 결과가 없습니다.", "조건을 바꿔 다시 검색해 보세요.");
}

async function onSubmitEntry(event) {
  event.preventDefault();
  if (!canEditLocally()) return;
  const editingId = String(refs.editingIdField.value || state.editingId || "");
  const existingTransaction = editingId ? state.transactions.find((item) => item.id === editingId) || null : null;
  const category = String(refs.categoryField.value || existingTransaction?.category || "");
  const type = String(refs.typeField.value || existingTransaction?.type || "");
  const member = String(refs.memberField.value || existingTransaction?.member || "");
  const account = String(refs.accountField.value || existingTransaction?.account || "");
  const date = String(refs.dateField.value || existingTransaction?.date || "");
  const amount = Number(refs.amountInput.value || 0);
  const note = String(refs.entryForm.elements.note.value || "").trim();
  const transaction = normalizeTransaction(
    {
      ...(existingTransaction || {}),
      id: existingTransaction?.id || editingId || crypto.randomUUID(),
      type,
      amount: amount || existingTransaction?.amount || 0,
      category,
      member,
      account,
      date,
      note: note || existingTransaction?.note || defaultNote(category),
      scope: existingTransaction?.scope || currentDataScope(),
    },
    true,
  );
  if (!transaction.amount || !transaction.date || !transaction.type || !transaction.category || !transaction.member || !transaction.account) {
    window.alert("금액, 분류, 사용자, 지불수단, 날짜를 모두 확인해 주세요.");
    return;
  }
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
  refs.typeLabel.textContent = type ? `${typeLabel(type)} 입력` : "내역 추가";
  refs.typeChips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.typeValue === type);
  });
  const currentGroup = refs.budgetGroupField.value;
  const budgetGroup = type === "income"
    ? ""
    : (budgetGroupsForType(type).some((group) => group.id === currentGroup) ? currentGroup : defaultBudgetGroupForType(type));
  refs.budgetGroupField.value = budgetGroup;
  renderEntryBudgetGroups(type, budgetGroup);
  renderEntryCategories(type, refs.categoryField.value, budgetGroup);
  if (!categoryOptionsForEntry(type, budgetGroup).some((item) => item.id === refs.categoryField.value)) {
    setEntryCategory("");
  } else {
    syncEntrySelectionUI();
  }
}

function renderEntryBudgetGroups(type, selectedGroup = "") {
  if (!type) {
    refs.entryBudgetGroupGrid.innerHTML = `<div class="entry-category-empty">먼저 수입, 지출, 저축/투자 중 하나를 선택하세요.</div>`;
    return;
  }
  if (type === "income") {
    refs.entryBudgetGroupGrid.innerHTML = `<div class="entry-category-empty">수입은 세부 태그만 바로 선택하면 됩니다.</div>`;
    return;
  }
  const groups = budgetGroupsForType(type);
  refs.entryBudgetGroupGrid.innerHTML = groups.map((group) => `
    <button
      class="entry-budget-group-chip ${group.id === selectedGroup ? "is-active" : ""}"
      type="button"
      data-budget-group-value="${group.id}"
      style="--group-color:${group.color}; --group-soft:${hexToRgba(group.color, 0.18)}; --group-shadow:${hexToRgba(group.color, 0.26)}"
    >
      <strong>${group.label}</strong>
      <span>${group.fullLabel}</span>
    </button>
  `).join("");
}

function renderEntryCategories(type, selectedCategory = "", budgetGroup = "") {
  const categories = categoryOptionsForEntry(type, budgetGroup);
  refs.entryCategoryGrid.innerHTML = categories.length
    ? categories.map((item) => {
      const isActive = item.id === selectedCategory;
      return `
        <button
          class="entry-category-chip ${isActive ? "is-active" : ""}"
          type="button"
          data-category-value="${item.id}"
          aria-pressed="${isActive ? "true" : "false"}"
          style="--category-color:${item.color}; --category-soft:${hexToRgba(item.color, 0.18)}; --category-shadow:${hexToRgba(item.color, 0.34)}"
        >
          <span class="entry-category-chip__icon">
            ${renderIconMarkup(item.icon)}
          </span>
          <span class="entry-category-chip__label">${item.label}</span>
        </button>
      `;
    }).join("")
    : `<div class="entry-category-empty">${type ? "먼저 예산 그룹을 선택하세요." : "먼저 타입을 선택하세요."}</div>`;
  renderIcons();
}

function renderEntryAccountOptions() {
  refs.entryAccountToggle.innerHTML = ACCOUNTS.map((account) => `
    <button class="entry-mini-chip entry-mini-chip--account" type="button" data-account-value="${account.id}">
      ${account.name}
    </button>
  `).join("");
}

function syncEntrySelectionUI() {
  refs.memberButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.memberValue === refs.memberField.value);
  });
  refs.entryAccountToggle.querySelectorAll("[data-account-value]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.accountValue === refs.accountField.value);
  });
  refs.entryBudgetGroupGrid.querySelectorAll("[data-budget-group-value]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.budgetGroupValue === refs.budgetGroupField.value);
  });
  refs.entryCategoryGrid.querySelectorAll("[data-category-value]").forEach((button) => {
    const isActive = button.dataset.categoryValue === refs.categoryField.value;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function setEntryCategory(category) {
  refs.categoryField.value = category || "";
  if (category) {
    refs.budgetGroupField.value = budgetGroupForCategory(category, refs.typeField.value)?.id || refs.budgetGroupField.value;
  }
  syncEntrySelectionUI();
}

function setEntryBudgetGroup(groupId) {
  refs.budgetGroupField.value = groupId || "";
  renderEntryBudgetGroups(refs.typeField.value, refs.budgetGroupField.value);
  renderEntryCategories(refs.typeField.value, refs.categoryField.value, refs.budgetGroupField.value);
  if (!categoryOptionsForEntry(refs.typeField.value, refs.budgetGroupField.value).some((item) => item.id === refs.categoryField.value)) {
    refs.categoryField.value = "";
  }
  syncEntrySelectionUI();
}

function setEntryMember(member) {
  refs.memberField.value = member || "";
  syncEntrySelectionUI();
}

function setEntryAccount(account) {
  refs.accountField.value = account || "";
  syncEntrySelectionUI();
}

function setAmountValue(value) {
  const digits = String(value ?? "").replace(/[^\d]/g, "").replace(/^0+(?=\d)/, "");
  refs.amountInput.value = digits;
}

function resetEntryForm() {
  state.editingId = null;
  refs.editingIdField.value = "";
  refs.entryDeleteButton.classList.add("is-hidden");
  refs.entrySubmitButton.textContent = "저장";
  clearEntrySelections();
  refs.entryForm.elements.note.value = "";
}

function openEntryDialog() {
  if (!canEditLocally()) return;
  resetEntryForm();
  refs.dateField.value = state.selectedDateByUser && state.selectedDate ? state.selectedDate : todayISO();
  requestAnimationFrame(() => refs.entryDialog.showModal());
}

function startEdit(id) {
  const transaction = state.transactions.find((item) => item.id === id);
  if (!transaction) return;
  resetEntryForm();
  state.editingId = id;
  refs.editingIdField.value = id;
  refs.entryDeleteButton.classList.remove("is-hidden");
  refs.entrySubmitButton.textContent = "수정 완료";
  refs.typeLabel.textContent = "내역 수정";
  setEntryType(transaction.type);
  setEntryBudgetGroup(budgetGroupForCategory(transaction.category, transaction.type)?.id || defaultBudgetGroupForType(transaction.type));
  setAmountValue(transaction.amount);
  setEntryCategory(transaction.category);
  setEntryMember(transaction.member);
  setEntryAccount(normalizeAccountId(transaction.account || transaction.payment_method || ""));
  refs.dateField.value = transaction.date;
  refs.entryForm.elements.note.value = transaction.note || "";
  requestAnimationFrame(() => refs.entryDialog.showModal());
}

async function deleteRecord(id) {
  if (!canEditLocally()) return;
  const transaction = state.transactions.find((item) => item.id === id);
  if (!transaction) return;
  const confirmed = window.confirm(
    `'${transaction.note || transaction.category}' 내역을 삭제할까요?\n삭제 후 동기화되면 되돌리기 어렵습니다.`,
  );
  if (!confirmed) return;
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
  const normalizedScreen = screen === "memo" ? "list" : screen;
  state.currentScreen = normalizedScreen;
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
  refs.openEntryButton.classList.toggle("is-hidden", state.currentScreen === "memo" || state.currentScreen === "analysis" || !canEditLocally());
  refs.memoAddButton.classList.toggle("is-hidden", state.currentScreen !== "memo" || !canEditLocally());
  syncUpdateUi();
}

function syncListSortButton() {
  if (!refs.listSortButton) return;
  const isAsc = state.listSortOrder === "asc";
  refs.listSortButton.setAttribute("aria-label", isAsc ? "날짜 오름차순 정렬" : "날짜 내림차순 정렬");
  refs.listSortButton.dataset.sortOrder = state.listSortOrder;
  refs.listSortButton.innerHTML = isAsc
    ? '<span>과거순</span><i data-lucide="arrow-up-narrow-wide"></i>'
    : '<span>최신순</span><i data-lucide="arrow-down-wide-narrow"></i>';
}

function groupTransactions(items, mode) {
  return items.reduce((acc, item) => {
    const key = mode === "daily" ? item.date : item.date.slice(0, 7);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});
}

function budgetGroupsForItems(items) {
  const groups = BUDGET_GROUPS.map((group) => ({
    ...group,
    categories: group.categories.map((category) => ({ ...category, amount: 0 })),
    limit: state.budgetLimits[group.id] || group.limit,
    spent: 0,
  }));

  items.forEach((item) => {
    const normalizedType = normalizeTypeId(item.type || "");
    if (!item.category || item.deleted || !["expense", "investment"].includes(normalizedType)) return;
    const normalizedCategory = normalizeCategoryId(item.category, normalizedType);
    const target = groups.find((group) =>
      group.type === normalizedType && budgetGroupMatchesCategory(group.id, normalizedCategory, normalizedType)
    );
    if (!target) return;
    const categoryRow = target.categories.find((category) => category.id === normalizedCategory);
    if (!categoryRow) return;
    target.spent += item.amount;
    categoryRow.amount += item.amount;
  });

  return groups;
}

function budgetGroupMatchesCategory(groupId, category, type = "") {
  const normalizedType = normalizeTypeId(type);
  const normalizedCategory = normalizeCategoryId(category, normalizedType);
  const group = BUDGET_GROUPS.find((item) => item.id === groupId);
  if (!group) return false;
  if (normalizedType && group.type !== normalizedType) return false;
  return Boolean(group?.categories.some((item) => item.id === normalizedCategory));
}

function categoryTypeForBudget(category) {
  const normalizedCategory = normalizeCategoryId(category);
  if (CATEGORY_META.investment.some((item) => item.id === normalizedCategory)) return "investment";
  if (CATEGORY_META.income.some((item) => item.id === normalizedCategory)) return "income";
  return "expense";
}

async function onBudgetLimitSubmit(event) {
  event.preventDefault();
  if (!isAdmin()) return;
  const form = event.target.closest("[data-budget-group-form]");
  if (!form) return;
  const groupId = form.dataset.budgetGroupForm;
  const limit = Math.max(0, Number(form.elements.limit.value || 0));
  state.budgetLimits[groupId] = limit;
  await persistBudgetLimits();
  renderAssets();
  if (state.currentScreen === "analysis" && state.analysisTab === "budget") {
    renderAnalysis();
  }
}

function getMonthTransactions() {
  return state.transactions.filter((item) => !item.deleted && item.date.startsWith(state.currentMonth));
}

function getMemberScopedMonthTransactions() {
  return applyMemberFilter(applyFilters(getMonthTransactions()));
}

function getFilteredMonthTransactions() {
  return applyMemberFilter(applyFilters(getMonthTransactions()));
}

function applyMemberFilter(items) {
  if (state.memberFilter === "all") return items;
  return items.filter((item) => normalizeMemberId(item.member) === state.memberFilter);
}

function applyFilters(items) {
  return items.filter((item) => {
    const normalizedCategory = normalizeCategoryId(item.category);
    const categoryAllowed = state.filters.categories.length === 0 || state.filters.categories.includes(normalizedCategory);
    const typeAllowed = state.filters.types.includes(item.type) || (
      state.filters.categories.length > 0 && state.filters.categories.includes(normalizedCategory)
    );
    return typeAllowed && categoryAllowed;
  });
}

function syncMemberFilterButtons() {
  refs.memberFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.memberFilter === state.memberFilter);
  });
}

function memberFilterLabel() {
  return state.memberFilter === "all" ? "전체" : memberName(state.memberFilter);
}

function filterBySearchPeriod(items, period) {
  if (period === "all") return items;
  if (period === "month") return items.filter((item) => item.date.startsWith(state.currentMonth));
  const today = new Date(`${todayISO()}T00:00:00`);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  return items.filter((item) => new Date(`${item.date}T00:00:00`) >= weekStart);
}

function normalizeTransaction(item, markPending) {
  const normalizedType = normalizeTypeId(item.type || "");
  const normalizedCategory = normalizeCategoryId(item.category || "", normalizedType);
  const normalized = {
    id: item.id || crypto.randomUUID(),
    type: normalizedType,
    amount: Number(item.amount || 0),
    category: normalizedCategory,
    sub_category: item.sub_category || "",
    member: normalizeMemberId(item.member),
    account: normalizeAccountId(item.account || item.payment_method || ""),
    payment_method: item.payment_method || "",
    card_name: item.card_name || "",
    date: item.date || todayISO(),
    note: item.note || defaultNote(normalizedCategory || "기타"),
    memo: item.memo || "",
    updated_at: markPending ? Date.now() : Number(item.updated_at || Date.now()),
    sync_status: markPending ? "pending" : (item.sync_status || "synced"),
    deleted: item.deleted ? 1 : 0,
    scope: item.scope === "guest" ? "guest" : "admin",
  };
  normalized.fingerprint = buildFingerprint(normalized);
  return normalized;
}

function currentDataScope() {
  if (isGuest()) return "guest";
  if (hasAccess()) return "admin";
  return "locked";
}

function matchesCurrentDataScope(item) {
  const scope = item?.scope === "guest" ? "guest" : "admin";
  return currentDataScope() === scope;
}

function clearEntrySelections() {
  refs.typeField.value = "";
  refs.budgetGroupField.value = "";
  refs.categoryField.value = "";
  refs.memberField.value = "";
  refs.accountField.value = "";
  refs.typeLabel.textContent = "내역 추가";
  refs.typeChips.forEach((chip) => chip.classList.remove("is-active"));
  refs.dateField.value = "";
  setAmountValue("");
  renderEntryBudgetGroups("");
  renderEntryCategories("", "");
  syncEntrySelectionUI();
}

function normalizeTypeId(type) {
  if (!type) return "";
  if (type === "transfer") return "investment";
  return type;
}

function normalizeFilterState(filters) {
  const normalizedTypes = [...new Set((filters?.types || ["income", "expense", "investment"]).map((type) => normalizeTypeId(type)))];
  return {
    types: normalizedTypes.length ? normalizedTypes : ["income", "expense", "investment"],
    categories: (filters?.categories || []).map((category) => normalizeCategoryId(category)).filter(Boolean),
  };
}

function normalizeMemberId(value) {
  if (value == null || value === "") return "";
  const normalized = String(value).trim();
  if (normalized === "영희") return "영희";
  if (normalized === "철수") return "철수";
  if (normalized === "partner" || normalized === "솔이" || normalized === "예비신부") return "솔이";
  if (normalized === "jw" || normalized === "정우" || normalized === "나" || normalized === "Default") return "정우";
  return normalized;
}

function memberDisplayName(id) {
  const normalized = normalizeMemberId(id);
  return membersForCurrentRole().find((member) => member.id === normalized)?.name || normalized;
}

function syncMemberLabels() {
  const activeMembers = membersForCurrentRole().slice();
  refs.memberFilterButtons.forEach((button) => {
    if ((button.dataset.memberFilter || "") === "all") {
      button.textContent = "전체";
      return;
    }
    const member = activeMembers.shift();
    if (!member) return;
    button.dataset.memberFilter = member.id;
    button.textContent = member.name;
  });
  refs.memberButtons.forEach((button) => {
    const member = membersForCurrentRole()[refs.memberButtons.indexOf(button)];
    if (!member) return;
    button.dataset.memberValue = member.id;
    button.textContent = member.name;
  });
  state.memberFilter = sanitizeMemberFilter(state.memberFilter);
  if (refs.memberField.value) {
    refs.memberField.value = sanitizeMemberIdForCurrentRole(refs.memberField.value);
  }
}

function membersForCurrentRole() {
  return isGuest() ? GUEST_MEMBERS : MEMBERS;
}

function sanitizeMemberFilter(value) {
  const normalized = normalizeMemberId(value);
  const allowed = membersForCurrentRole().map((member) => member.id);
  return normalized === "all" || allowed.includes(normalized) ? normalized : "all";
}

function sanitizeMemberIdForCurrentRole(value) {
  const normalized = normalizeMemberId(value);
  const allowed = membersForCurrentRole().map((member) => member.id);
  if (allowed.includes(normalized)) return normalized;
  return allowed[0] || "";
}

function normalizeAccountId(value) {
  if (value == null || value === "") return "";
  const normalized = String(value).trim();
  if (["cash", "debit-card", "credit-card", "bank-transfer", "other"].includes(normalized)) return normalized;
  if (normalized === "현금") return "cash";
  if (normalized === "체크카드" || normalized === "debit" || normalized === "check-card") return "debit-card";
  if (normalized === "신용카드" || normalized === "credit" || normalized === "card") return "credit-card";
  if (normalized === "계좌이체" || normalized === "transfer" || normalized === "bank") return "bank-transfer";
  return "other";
}

async function migrateLegacyBudgetReorg() {
  const migrated = await getMeta("legacyBudgetReorgMigrated");
  if (migrated) return;

  const rows = await db.transactions.toArray();
  const rewritten = rows
    .map((item) => {
      const normalizedType = normalizeTypeId(item.type || "");
      const normalizedCategory = normalizeCategoryId(item.category || "", normalizedType);
      if (normalizedType === item.type && normalizedCategory === item.category) return null;
      return normalizeTransaction(
        {
          ...item,
          type: normalizedType,
          category: normalizedCategory,
          updated_at: Date.now(),
        },
        true,
      );
    })
    .filter(Boolean);

  if (rewritten.length) {
    await db.transactions.bulkPut(rewritten);
    state.syncDetailMessage = `기존 데이터 ${rewritten.length}건을 5대 예산 체계로 변환했습니다.`;
  }
  await setMeta("legacyBudgetReorgMigrated", true);
}

async function migrateLegacySavingsOtherCleanup() {
  const migrated = await getMeta("legacySavingsOtherCleanupMigrated");
  if (migrated) return;

  const rows = await db.transactions.toArray();
  const rewritten = rows
    .map((item) => {
      const normalizedType = normalizeTypeId(item.type || "");
      const normalizedCategory = normalizeCategoryId(item.category || "", normalizedType);
      if (normalizedCategory === item.category) return null;
      return normalizeTransaction(
        {
          ...item,
          type: normalizedType,
          category: normalizedCategory,
          updated_at: Date.now(),
        },
        true,
      );
    })
    .filter(Boolean);

  if (rewritten.length) {
    await db.transactions.bulkPut(rewritten);
    state.syncDetailMessage = `기존 데이터 ${rewritten.length}건의 기타 카테고리를 정리했습니다.`;
  }
  await setMeta("legacySavingsOtherCleanupMigrated", true);
}

function buildFingerprint(item) {
  return [item.date, item.type, item.amount, item.note || "", item.member || "", item.category || ""].join("|");
}

async function fullSyncCycle() {
  if (canSyncServer()) {
    await pushPendingToServer();
  }
  if (canReadServer()) {
    await pullFromServer();
  }
}

async function pushPendingToServer() {
  if (!canSyncServer()) return;
  if (!navigator.onLine) {
    updateSyncUI("오프라인", "offline");
    return;
  }
  const pending = (await db.transactions.where("sync_status").equals("pending").toArray())
    .filter((item) => (item.scope === "guest" ? "guest" : "admin") === "admin")
    .map((item) => ({
    ...item,
    member: normalizeMemberId(item.member),
  }));
  if (!pending.length) {
    updateSyncUI("동기화 완료", "success");
    return;
  }

  state.syncing = true;
  updateSyncUI(`동기화 중 (${pending.length}건)`, "syncing");
  try {
    let syncedCount = 0;
    for (let index = 0; index < pending.length; index += SYNC_PUSH_BATCH_SIZE) {
      const chunk = pending.slice(index, index + SYNC_PUSH_BATCH_SIZE);
      const response = await fetch("/api/sync", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "X-Donnaga-Pin": state.authPin,
        },
        body: JSON.stringify({ transactions: chunk, pin: state.authPin }),
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
  } finally {
    state.syncing = false;
  }
}

async function pullFromServer() {
  if (!canReadServer()) return;
  if (!navigator.onLine) {
    updateSyncUI("오프라인", "offline");
    return;
  }
  state.syncing = true;
  updateSyncUI("최신 데이터 확인 중", "syncing");
  try {
    const response = await fetch("/api/sync", { cache: "no-store" });
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
  } finally {
    state.syncing = false;
  }
}

function updateSyncUI(message, status) {
  state.syncMessage = message;
  refs.syncStatusLabel.textContent = message;
  refs.syncDot.dataset.status = status;
  if (isGuest()) {
    refs.remoteStatusLabel.textContent = "게스트 로컬";
    refs.syncDetailLabel.textContent = "이 기기에서만 체험 중";
    return;
  }
  refs.remoteStatusLabel.textContent = status === "offline" ? "오프라인" : "연결됨";
  if (status === "error" && state.syncDetailMessage) {
    refs.syncDetailLabel.textContent = state.syncDetailMessage;
    return;
  }
  state.syncDetailMessage = "";
  refs.syncDetailLabel.textContent = state.lastSyncedAt
    ? formatRelativeSyncTime(state.lastSyncedAt)
    : "아직 동기화 기록이 없어요.";
}

function schedulePeriodicSync() {
  clearInterval(syncTimerId);
  syncTimerId = window.setInterval(() => {
    if (!hasAccess()) return;
    void fullSyncCycle();
  }, SYNC_INTERVAL_MS);
}

function registerConnectivityHooks() {
  window.addEventListener("online", () => {
    refs.remoteStatusLabel.textContent = "연결됨";
    if (!hasAccess()) return;
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
      <li>홈 화면에서 DonNaGa 아이콘을 찾아 실행합니다.</li>
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
      <li>설치 후 홈 화면에서 DonNaGa를 실행합니다.</li>
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

async function setCurrentMonth(monthKey, options = {}) {
  const direction = monthDirection(state.currentMonth, monthKey);
  state.currentMonth = monthKey;
  state.selectedDate = defaultSelectedDateForMonth(state.currentMonth);
  state.selectedDateByUser = false;
  await persistUiMeta();
  render();
}

async function shiftMonth(direction, options = {}) {
  const [year, month] = state.currentMonth.split("-").map(Number);
  const next = new Date(year, month - 1 + direction, 1);
  await setCurrentMonth(monthKeyFromDate(next), options);
}

function monthDirection(currentMonth, nextMonth) {
  const current = new Date(`${currentMonth}-01T00:00:00`);
  const next = new Date(`${nextMonth}-01T00:00:00`);
  if (next > current) return 1;
  if (next < current) return -1;
  return 0;
}

function onCalendarTouchStart(event) {
  const touch = event.changedTouches?.[0];
  if (!touch) return;
  calendarTouchState = { x: touch.clientX, y: touch.clientY };
}

function onCalendarTouchEnd(event) {
  const touch = event.changedTouches?.[0];
  if (!touch || !calendarTouchState) return;
  const deltaX = touch.clientX - calendarTouchState.x;
  const deltaY = touch.clientY - calendarTouchState.y;
  calendarTouchState = null;
  if (Math.abs(deltaX) < CALENDAR_SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
  void shiftMonth(deltaX < 0 ? 1 : -1, { animate: true });
}

function onAnalysisTouchStart(event) {
  if (state.currentScreen !== "analysis") return;
  onCalendarTouchStart(event);
}

function onAnalysisTouchEnd(event) {
  if (state.currentScreen !== "analysis") return;
  onCalendarTouchEnd(event);
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

function renderAnalysisDonut(items, mode = "expense") {
  const chartItems = items.filter((item) => item.type === mode);
  const total = chartItems.reduce((sum, item) => sum + item.amount, 0);
  if (!total) {
    refs.analysisDonutChart.style.background = "radial-gradient(circle at center, #fff 0 26%, transparent 27%), #f6f6f6";
    refs.analysisDonutInner.textContent = "0.0%";
    refs.analysisCategoryBreakdown.innerHTML = "";
    refs.analysisEmptyText.textContent = "내역이 없습니다.";
    return;
  }

  const grouped = Object.entries(
    chartItems.reduce((acc, item) => {
      const normalizedCategory = normalizeCategoryId(item.category);
      acc[normalizedCategory] = (acc[normalizedCategory] || 0) + item.amount;
      return acc;
    }, {}),
  )
    .map(([category, amount]) => ({
      category,
      amount,
      percent: (amount / total) * 100,
      appearance: categoryAppearance(category, mode),
    }))
    .sort((left, right) => right.amount - left.amount);

  let angle = 0;
  const gradient = grouped
    .map((item) => {
      const start = angle;
      angle += item.percent * 3.6;
      return `${item.appearance.color} ${start.toFixed(1)}deg ${angle.toFixed(1)}deg`;
    })
    .join(", ");

  refs.analysisDonutChart.style.background = `
    radial-gradient(circle at center, #fff 0 26%, transparent 27%),
    conic-gradient(${gradient})
  `;
  refs.analysisDonutInner.textContent = `${grouped[0].percent.toFixed(1)}%`;
  refs.analysisCategoryBreakdown.innerHTML = grouped
    .map((item) => `
      <article class="analysis-category-row" data-analysis-category="${item.category}" data-analysis-category-label="${item.appearance.label}" data-analysis-type="${mode}">
        <div class="analysis-category-row__label">
          <span class="analysis-category-row__dot" style="background:${item.appearance.color}"></span>
          <strong>${item.appearance.label}</strong>
        </div>
        <div class="analysis-category-row__meta">
          <span>${item.percent.toFixed(1)}%</span>
          <em>${formatCurrency(item.amount)}</em>
        </div>
      </article>
    `)
    .join("");
  refs.analysisEmptyText.textContent = `${grouped.length}개 카테고리`;
}

function displaySelectedDate(date) {
  const parsed = new Date(`${date}T00:00:00`);
  return `${parsed.getMonth() + 1}월 ${parsed.getDate()}일`;
}

function sumByType(items, type) {
  return items.filter((item) => item.type === type).reduce((sum, item) => sum + item.amount, 0);
}

function categoryOptionsForType(type) {
  const base = CATEGORY_META[type] || [];
  const seen = new Set(base.map((item) => item.id));
  const usageCounts = state.transactions
    .filter((item) => !item.deleted && item.type === type && item.category)
    .reduce((acc, item) => {
      const normalizedCategory = normalizeCategoryId(item.category);
      acc[normalizedCategory] = (acc[normalizedCategory] || 0) + 1;
      return acc;
    }, {});
  const dynamic = state.transactions
    .filter((item) => !item.deleted && item.type === type && item.category)
    .map((item) => normalizeCategoryId(item.category))
    .filter((category) => {
      if (seen.has(category)) return false;
      seen.add(category);
      return true;
    })
    .sort((left, right) => left.localeCompare(right, "ko-KR"))
    .map((category) => {
      const appearance = inferredCategoryMeta(category, type) || {
        label: category,
        color: "#b8c1cc",
        icon: "circle",
      };
      return { id: category, label: appearance.label, color: appearance.color, icon: appearance.icon };
    });
  return [...base, ...dynamic]
    .map((item, index) => ({ ...item, _order: index, _count: usageCounts[item.id] || 0 }))
    .sort((left, right) => {
      if (right._count !== left._count) return right._count - left._count;
      return left._order - right._order;
    })
    .map(({ _order, _count, ...item }) => item);
}

function budgetGroupsForType(type) {
  return BUDGET_GROUPS.filter((group) => group.type === type);
}

function defaultBudgetGroupForType(type) {
  return budgetGroupsForType(type)[0]?.id || "";
}

function budgetGroupForCategory(category, type = "") {
  const normalizedCategory = normalizeCategoryId(category);
  if (!normalizedCategory) return null;
  return BUDGET_GROUPS.find((group) =>
    (!type || group.type === normalizeTypeId(type)) && group.categories.some((item) => item.id === normalizedCategory)
  ) || null;
}

function categoryOptionsForEntry(type, budgetGroupId = "") {
  if (type === "income") return categoryOptionsForType("income");
  const group = BUDGET_GROUPS.find((item) => item.id === budgetGroupId && item.type === type);
  return group?.categories || [];
}

function groupNetAmount(items) {
  return items.reduce((total, item) => total + (item.type === "income" ? item.amount : -item.amount), 0);
}

function typeLabel(type) {
  return { expense: "지출", income: "수입", investment: "저축/투자" }[type] || type;
}

function categoryIdsForType(type) {
  return categoryOptionsForType(type).map((item) => item.id);
}

function allCategoryIds() {
  return Object.values(CATEGORY_META)
    .flat()
    .map((item) => item.id);
}

function memberName(id) {
  return memberDisplayName(id);
}

function accountName(id) {
  const normalizedId = normalizeAccountId(id);
  return ACCOUNTS.find((account) => account.id === normalizedId)?.name || id;
}

function categoryAppearance(category, type) {
  const normalizedCategory = normalizeCategoryId(category);
  return CATEGORY_META[type]?.find((item) => item.id === normalizedCategory)
    || CATEGORY_META.expense.find((item) => item.id === normalizedCategory)
    || CATEGORY_META.income.find((item) => item.id === normalizedCategory)
    || CATEGORY_META.investment.find((item) => item.id === normalizedCategory)
    || inferredCategoryMeta(normalizedCategory, type)
    || { color: "#b8c1cc", icon: "circle", label: normalizedCategory };
}

function inferredCategoryMeta(category, type) {
  const inferred = {
    expense: {
      "가전": { color: "#a8dff0", icon: "smartphone", label: "가전" },
      "건강": { color: "#b7e4c7", icon: "heart-pulse", label: "건강" },
      "교통": { color: "#ffb4bf", icon: "bus-front", label: "교통" },
      "주유비": { color: "#ffc46b", icon: "fuel", label: "주유비" },
      "하이패스": { color: "#8dc7ff", icon: "road", label: "하이패스" },
      "결혼준비": { color: "#f48fb1", icon: "gem", label: "결혼준비" },
      "미용": { color: "#ffc2db", icon: "sparkles", label: "미용" },
      "문화": { color: "#e6b8ef", icon: "clapperboard", label: "문화" },
      "문화생활": { color: "#e6b8ef", icon: "gamepad-2", label: "문화생활" },
      "술": { color: "#f4b2ba", icon: "wine", label: "술" },
      "오락": { color: "#d8c8ff", icon: "ticket", label: "오락" },
      "자동차": { color: "#b9d7fb", icon: "car-front", label: "차량관리비" },
      "자동차유지비": { color: "#b9d7fb", icon: "car-front", label: "차량관리비" },
      "차량관리비": { color: "#b9d7fb", icon: "car-front", label: "차량관리비" },
      "경조사": { color: "#f4b2ba", icon: "hand-heart", label: "경조사" },
      "주거비": { color: "#f1d7a6", icon: "house", label: "주거비" },
      "생활용품": { color: "#f3c6a1", icon: "shopping-basket", label: "생필품" },
      "쇼핑": { color: "#a8dff0", icon: "gift", label: "선물" },
      "취미": { color: "#d6c8ff", icon: "palette", label: "취미" },
      "여가/취미": { color: "#e6b8ef", icon: "gamepad-2", label: "취미" },
      "카페": { color: "#c7b29b", icon: "coffee", label: "카페" },
      "편의점": { color: "#c9ddb0", icon: "store", label: "편의점" },
      "주거/공과금": { color: "#f1d7a6", icon: "house", label: "주거비" },
    },
    income: {},
    investment: {},
  };
  return inferred[type]?.[category] || inferred.expense[category] || null;
}

function normalizeCategoryId(category, type = "") {
  if (!category) return "";
  let normalized = category;
  if (normalized === "레이") normalized = "반려동물";
  else if (normalized === "의류") normalized = "미용";
  else if (normalized === "의류/잡화") normalized = "의류/잡화";
  else if (normalized === "교통비") normalized = "교통";
  else if (normalized === "주유" || normalized === "기름값" || normalized === "유류비") normalized = "주유비";
  else if (normalized === "톨게이트비" || normalized === "통행료" || normalized === "하이패스비") normalized = "하이패스";
  else if (normalized === "웨딩" || normalized === "결혼" || normalized === "웨딩준비") normalized = "결혼준비";
  else if (normalized === "주거/공과금" || normalized === "집세") normalized = "주거비";
  else if (normalized === "생활용품") normalized = "생필품";
  else if (normalized === "여가/취미" || normalized === "오락" || normalized === "문화") normalized = "취미";
  else if (normalized === "쇼핑") normalized = "선물";
  else if (normalized === "회비") normalized = "구독";
  else if (normalized === "저축") normalized = "적금";
  else if (normalized === "이월" || normalized === "savings-other") normalized = "기타";
  else if (normalized === "계좌이체") normalized = "investment-other";
  else if (normalized === "투자" || normalized === "주식" || normalized === "국내 주식") normalized = "국내주식";
  else if (normalized === "해외 주식") normalized = "해외주식";
  else if (normalized === "코인" || normalized === "가상 화폐") normalized = "가상자산";
  else if (normalized === "자동차유지비" || normalized === "자동차") normalized = "차량관리비";
  else if (["가전", "기부", "여행"].includes(normalized)) normalized = "variable-other";

  const normalizedType = normalizeTypeId(type);
  if (normalizedType && CATEGORY_META[normalizedType]?.some((item) => item.id === normalized)) {
    return normalized;
  }
  if (normalized === "기타") {
    if (normalizedType === "expense") return "variable-other";
    if (normalizedType === "investment") return "기타";
    return "기타";
  }
  if (normalizedType === "income") return "기타";
  if (normalizedType === "expense") return "variable-other";
  if (normalizedType === "investment") return "기타";
  return normalized;
}

function renderCategoryIcon(category, type) {
  const appearance = categoryAppearance(category, type);
  return renderIconMarkup(appearance.icon);
}

function renderIconMarkup(icon) {
  if (icon === "krw-note") {
    return `
      <svg class="custom-icon custom-icon--krw-note" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2.75"></rect>
        <path d="M7.2 8.5h9.6"></path>
        <path d="M7.2 15.5h9.6"></path>
        <circle cx="12" cy="12" r="2.35"></circle>
        <path d="M5.6 9.7c.9 0 1.65-.75 1.65-1.65"></path>
        <path d="M18.4 14.3c-.9 0-1.65.75-1.65 1.65"></path>
        <path d="M10.9 12h2.2"></path>
      </svg>
    `;
  }
  return `<i data-lucide="${icon}"></i>`;
}

function defaultNote(category) {
  return `${categoryAppearance(category, categoryTypeForBudget(category)).label} 기록`;
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const safe = normalized.length === 3
    ? normalized.split("").map((value) => `${value}${value}`).join("")
    : normalized.padEnd(6, "0").slice(0, 6);
  const red = Number.parseInt(safe.slice(0, 2), 16);
  const green = Number.parseInt(safe.slice(2, 4), 16);
  const blue = Number.parseInt(safe.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
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
  if (amount >= 10000) return `${(amount / 10000).toFixed(1).replace(/\.0$/, "")}만`;
  return `${Math.max(0.1, amount / 1000).toFixed(1).replace(/\.0$/, "")}천`;
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

function formatRelativeSyncTime(timestamp) {
  const diffMs = Date.now() - Number(timestamp || 0);
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffMinutes < 24 * 60) return `${Math.floor(diffMinutes / 60)}시간 전`;
  const date = new Date(timestamp);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${day} ${hour}:${minute}`;
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
    if (localStorage.getItem(UPDATE_SEEN_STORAGE_KEY) === "1") {
      showUpdateAvailableUI();
    }
    const registration = await navigator.serviceWorker.register("./sw.js");
    swRegistrationRef = registration;
    if (registration.waiting) {
      showUpdateAvailableUI();
      await markUpdateChecked();
    }
    registration.addEventListener("updatefound", () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;
      installingWorker.addEventListener("statechange", () => {
        if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
          showUpdateAvailableUI();
          void markUpdateChecked();
        }
      });
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloadingForServiceWorker) return;
      reloadingForServiceWorker = true;
      hideUpdateAvailableUI();
      window.location.reload();
    });
    await registration.update();
    if (registration.waiting) {
      showUpdateAvailableUI();
      await markUpdateChecked();
    } else {
      const hasAssetUpdate = await detectCachedAssetUpdate();
      if (hasAssetUpdate) {
        showUpdateAvailableUI();
      } else {
        hideUpdateAvailableUI();
      }
      await markUpdateChecked();
    }
    console.info("[PWA] service worker registered:", registration.scope);
  } catch (error) {
    console.error("[PWA] service worker registration failed:", error);
  }
}

async function clearWebCacheAndReload() {
  updateSyncUI(state.updateAvailable ? "새 버전 적용 중" : "최신 버전 확인 중", "syncing");
  try {
    const result = await runButtonFeedback(
      refs.clearWebCacheButton,
      { idle: "업데이트", busy: "확인 중...", done: "완료!" },
      async () => {
        const shouldActivateWaitingWorker = state.updateAvailable && Boolean(swRegistrationRef?.waiting);
        if (shouldActivateWaitingWorker) {
          hideUpdateAvailableUI();
          await markUpdateChecked();
          return { mode: "activate-waiting" };
        }
        if (swRegistrationRef) {
          await swRegistrationRef.update();
          await markUpdateChecked();
          if (swRegistrationRef.waiting) {
            showUpdateAvailableUI();
            updateSyncUI("새 버전이 준비됐어요", "success");
            return { mode: "activate-waiting" };
          }

          const hasAssetUpdate = await detectCachedAssetUpdate();
          if (hasAssetUpdate) {
            showUpdateAvailableUI();
            updateSyncUI("새 버전이 준비됐어요", "success");
            return { mode: "clear-cache-reload" };
          } else {
            hideUpdateAvailableUI();
            updateSyncUI("이미 최신 버전입니다", "success");
          }
        }
        return { mode: "noop" };
      },
    );

    if (result?.mode === "activate-waiting" && swRegistrationRef?.waiting) {
      swRegistrationRef.waiting.postMessage({ type: "SKIP_WAITING" });
      window.setTimeout(() => {
        if (!reloadingForServiceWorker) {
          window.location.reload();
        }
      }, 300);
      return;
    }

    if (result?.mode === "clear-cache-reload") {
      hideUpdateAvailableUI();
      await clearAppCaches();
      window.location.reload();
      return;
    }

    syncUpdateUi();
  } catch (error) {
    console.error("[PWA] failed to apply update:", error);
    updateSyncUI("업데이트 확인 실패", "error");
    syncUpdateUi();
  }
}
