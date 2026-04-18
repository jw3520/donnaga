import { importedTransactions } from "./seed-data.js";

const STORAGE_KEY = "donnaga-state-v3";

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

const CATEGORIES = {
  expense: ["식비", "교통비", "집세", "문화생활", "생필품", "선물", "의류", "의료/건강", "기타"],
  income: ["월급", "용돈", "환급", "기타"],
  transfer: ["이월", "저축", "계좌이체"],
};

const BUDGETS = [
  { category: "식비", limit: 700000 },
  { category: "교통비", limit: 180000 },
  { category: "생필품", limit: 180000 },
  { category: "문화생활", limit: 200000 },
  { category: "선물", limit: 400000 },
];

const defaultTransactions = importedTransactions;

const state = loadState();

const refs = {
  monthTitle: document.querySelector("#month-title"),
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
  categoryStats: document.querySelector("#category-stats"),
  budgetList: document.querySelector("#budget-list"),
  assetList: document.querySelector("#asset-list"),
  recordTemplate: document.querySelector("#record-item-template"),
  prevMonthButton: document.querySelector("#prev-month-button"),
  nextMonthButton: document.querySelector("#next-month-button"),
  openEntryButton: document.querySelector("#open-entry-button"),
  quickActionButton: document.querySelector("#quick-action-button"),
  seedDataButton: document.querySelector("#seed-data-button"),
  exportButton: document.querySelector("#export-button"),
  viewTabs: document.querySelector("#view-tabs"),
  tabbar: document.querySelector(".tabbar"),
  screens: [...document.querySelectorAll(".screen")],
  screenButtons: [...document.querySelectorAll("[data-screen-target]")],
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
  resetFormButton: document.querySelector("#reset-form-button"),
  installDialog: document.querySelector("#install-dialog"),
  installButton: document.querySelector("#install-button"),
};

let deferredInstallPrompt = null;

boot();

function boot() {
  populateStaticOptions();
  bindEvents();
  render();
  registerServiceWorker();
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const initialMonth = latestMonthFromTransactions(defaultTransactions);

  if (!stored) {
    return {
      currentMonth: initialMonth,
      currentView: "daily",
      currentScreen: "calendar",
      selectedDate: latestDateFromMonth(defaultTransactions, initialMonth),
      transactions: defaultTransactions,
      editingId: null,
    };
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      currentMonth: parsed.currentMonth || initialMonth,
      currentView: parsed.currentView || "daily",
      currentScreen: parsed.currentScreen || "calendar",
      selectedDate: parsed.selectedDate || latestDateFromMonth(defaultTransactions, parsed.currentMonth || initialMonth),
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : defaultTransactions,
      editingId: null,
    };
  } catch {
    return {
      currentMonth: initialMonth,
      currentView: "daily",
      currentScreen: "calendar",
      selectedDate: latestDateFromMonth(defaultTransactions, initialMonth),
      transactions: defaultTransactions,
      editingId: null,
    };
  }
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      currentMonth: state.currentMonth,
      currentView: state.currentView,
      currentScreen: state.currentScreen,
      selectedDate: state.selectedDate,
      transactions: state.transactions,
    }),
  );
}

function bindEvents() {
  refs.prevMonthButton.addEventListener("click", () => shiftMonth(-1));
  refs.nextMonthButton.addEventListener("click", () => shiftMonth(1));
  refs.seedDataButton.addEventListener("click", seedOriginalData);
  refs.exportButton.addEventListener("click", exportJson);
  refs.openEntryButton.addEventListener("click", openEntryDialog);
  refs.quickActionButton.addEventListener("click", () => {
    state.currentScreen = "stats";
    saveState();
    syncScreens();
  });
  refs.closeEntryButton.addEventListener("click", () => refs.entryDialog.close());

  refs.viewTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    state.currentView = button.dataset.view;
    saveState();
    renderRecords();
    syncViewTabs();
  });

  refs.screenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.currentScreen = button.dataset.screenTarget;
      saveState();
      syncScreens();
    });
  });

  refs.typeChips.forEach((chip) => {
    chip.addEventListener("click", () => setEntryType(chip.dataset.typeValue));
  });

  refs.entryForm.addEventListener("submit", onSubmitEntry);
  refs.entryForm.addEventListener("reset", onResetForm);
  refs.typeField.addEventListener("change", syncCategoryOptions);

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
  syncCategoryOptions();
  refs.dateField.value = todayISO();
  setEntryType("expense");
}

function populateSelect(select, items, valueKey, labelKey) {
  select.innerHTML = items
    .map((item) => `<option value="${item[valueKey]}">${item[labelKey]}</option>`)
    .join("");
}

function setEntryType(type) {
  refs.typeField.value = type;
  refs.typeLabel.textContent = typeLabel(type);
  refs.amountInput.classList.remove("is-income", "is-expense", "is-transfer");
  refs.amountInput.classList.add(`is-${type}`);
  refs.typeChips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.typeValue === type);
  });
  syncCategoryOptions();
}

function syncCategoryOptions() {
  const categories = availableCategories(refs.typeField.value);
  refs.categoryField.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
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

function onResetForm() {
  state.editingId = null;
  requestAnimationFrame(resetEntryForm);
}

function resetEntryForm() {
  refs.entryForm.reset();
  refs.dateField.value = todayISO();
  setEntryType("expense");
}

function openEntryDialog() {
  refs.entryDialog.showModal();
  refs.amountInput.focus();
}

function startEdit(id) {
  const item = state.transactions.find((transaction) => transaction.id === id);
  if (!item) return;
  state.editingId = id;
  state.selectedDate = item.date;
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

function shiftMonth(direction) {
  const [year, month] = state.currentMonth.split("-").map(Number);
  const next = new Date(year, month - 1 + direction, 1);
  state.currentMonth = toMonthKey(next);
  state.selectedDate = latestDateFromMonth(state.transactions, state.currentMonth) || `${state.currentMonth}-01`;
  saveState();
  render();
}

function seedOriginalData() {
  state.transactions = defaultTransactions;
  state.currentMonth = latestMonthFromTransactions(defaultTransactions);
  state.selectedDate = latestDateFromMonth(defaultTransactions, state.currentMonth);
  state.currentView = "daily";
  saveState();
  render();
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state.transactions, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `donnaga-${state.currentMonth}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function render() {
  renderSummary();
  renderCalendar();
  renderRecords();
  renderListRecords();
  renderCategoryStats();
  renderBudgets();
  renderAssets();
  syncViewTabs();
  syncScreens();
  refs.monthTitleLabel.textContent = shortMonthLabel(state.currentMonth);
  renderIcons();
}

function renderSummary() {
  const transactions = getMonthTransactions();
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
  const monthTransactions = getMonthTransactions();
  const expenseByDate = monthTransactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      acc[item.date] = (acc[item.date] || 0) + item.amount;
      return acc;
    }, {});

  const cells = [];
  for (let index = 0; index < firstDay.getDay(); index += 1) {
    cells.push(`<div class="calendar-day is-empty"></div>`);
  }

  const selectedDate = state.selectedDate;
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${state.currentMonth}-${String(day).padStart(2, "0")}`;
    const expense = expenseByDate[date] || 0;
    const dateObj = new Date(`${date}T00:00:00`);
    const classes = ["calendar-day"];
    if (date === selectedDate) classes.push("is-selected");
    if (dateObj.getDay() === 0) classes.push("is-sunday");
    if (dateObj.getDay() === 6) classes.push("is-saturday");
    cells.push(`
      <button class="${classes.join(" ")}" type="button" data-date="${date}">
        <span class="calendar-day__date">${day}</span>
        <span class="calendar-day__amount">${expense ? shortCurrency(expense) : ""}</span>
      </button>
    `);
  }

  refs.calendarGrid.innerHTML = cells.join("");
  refs.calendarGrid.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDate = button.dataset.date;
      state.currentView = "daily";
      saveState();
      renderRecords();
      renderCalendar();
      syncViewTabs();
    });
  });
}

function renderRecords() {
  const transactions = getMonthTransactions();
  const filtered =
    state.currentView === "daily"
      ? transactions.filter((item) => item.date === state.selectedDate)
      : transactions;
  const groups = groupTransactions(filtered, state.currentView);
  const count = Object.values(groups).reduce((total, items) => total + items.length, 0);
  refs.selectedDateTitle.textContent =
    state.currentView === "daily"
      ? displaySelectedDate(state.selectedDate)
      : `${monthLabel(state.currentMonth)} ${viewLabel(state.currentView)}`;
  refs.recordsCaption.textContent =
    state.currentView === "daily"
      ? count
        ? `${count}건의 내역`
        : "지출 내역이 없어요."
      : `${monthLabel(state.currentMonth)} · ${viewLabel(state.currentView)} · ${count}건`;

  if (!count) {
    refs.recordsList.innerHTML = emptyState("지출 내역이 없어요.", "하단 + 버튼으로 새 내역을 입력하세요.");
    return;
  }

  refs.recordsList.innerHTML = "";
  Object.entries(groups)
    .sort(([left], [right]) => (left < right ? 1 : -1))
    .forEach(([groupKey, items]) => {
      const wrapper = document.createElement("section");
      wrapper.className = "records-group";
      wrapper.innerHTML = `
        <div class="records-group__header">
          <h3>${groupKey}</h3>
          <p class="muted">${formatCurrency(groupNetAmount(items))}</p>
        </div>
      `;
      items
        .slice()
        .sort((left, right) => right.date.localeCompare(left.date))
        .forEach((item) => wrapper.append(createRecordElement(item)));
      refs.recordsList.append(wrapper);
    });
}

function renderListRecords() {
  const grouped = groupTransactions(getMonthTransactions(), "daily");
  const count = Object.values(grouped).reduce((total, items) => total + items.length, 0);
  refs.listRecordsCaption.textContent = `${monthLabel(state.currentMonth)} · ${count}건`;

  if (!count) {
    refs.listRecordsList.innerHTML = emptyState("내역이 없어요.", "이번 달 기록을 추가해 보세요.");
    return;
  }

  refs.listRecordsList.innerHTML = "";
  Object.entries(grouped)
    .sort(([left], [right]) => (left < right ? 1 : -1))
    .forEach(([groupKey, items]) => {
      const wrapper = document.createElement("section");
      wrapper.className = "records-group";
      wrapper.innerHTML = `
        <div class="records-group__header">
          <h3>${groupKey}</h3>
          <p class="muted">${formatCurrency(groupNetAmount(items))}</p>
        </div>
      `;
      items
        .slice()
        .sort((left, right) => right.date.localeCompare(left.date))
        .forEach((item) => wrapper.append(createRecordElement(item)));
      refs.listRecordsList.append(wrapper);
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

function renderCategoryStats() {
  const expenses = getMonthTransactions().filter((item) => item.type === "expense");
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  if (!expenses.length) {
    refs.categoryStats.innerHTML = emptyState("지출 통계가 없습니다.", "지출이 생기면 카테고리 비중이 표시됩니다.");
    return;
  }

  const grouped = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  refs.categoryStats.innerHTML = Object.entries(grouped)
    .sort(([, left], [, right]) => right - left)
    .slice(0, 8)
    .map(([category, amount]) => {
      const percent = Math.round((amount / total) * 100);
      return `
        <article class="stats-row">
          <div class="stack">
            <strong>${category}</strong>
            <p>${formatCurrency(amount)} · ${percent}%</p>
            <div class="stats-bar"><span style="width:${percent}%"></span></div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderBudgets() {
  const expenses = getMonthTransactions().filter((item) => item.type === "expense");
  refs.budgetList.innerHTML = BUDGETS.map((budget) => {
    const spent = expenses
      .filter((item) => item.category === budget.category)
      .reduce((sum, item) => sum + item.amount, 0);
    const rate = budget.limit ? Math.min(100, Math.round((spent / budget.limit) * 100)) : 0;
    return `
      <article class="budget-row">
        <div class="stack">
          <strong>${budget.category}</strong>
          <p>${formatCurrency(spent)} / ${formatCurrency(budget.limit)}</p>
          <div class="budget-meter"><span style="width:${rate}%"></span></div>
        </div>
      </article>
    `;
  }).join("");
}

function renderAssets() {
  const monthTransactions = getMonthTransactions();
  refs.assetList.innerHTML = ACCOUNTS.map((account) => {
    const delta = monthTransactions
      .filter((item) => item.account === account.id)
      .reduce((total, item) => {
        if (item.type === "expense") return total - item.amount;
        return total + item.amount;
      }, 0);
    const count = monthTransactions.filter((item) => item.account === account.id).length;
    return `
      <article class="asset-row">
        <div class="stack">
          <strong>${account.name}</strong>
          <p>${account.type}</p>
        </div>
        <div class="stack">
          <strong>${formatCurrency(delta)}</strong>
          <p>${count}건</p>
        </div>
      </article>
    `;
  }).join("");
}

function syncViewTabs() {
  refs.viewTabs.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.currentView);
  });
}

function syncScreens() {
  refs.screens.forEach((screen) => {
    screen.classList.toggle("screen--active", screen.dataset.screen === state.currentScreen);
  });
  refs.screenButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screenTarget === state.currentScreen);
  });
}

function getMonthTransactions() {
  return state.transactions.filter((item) => item.date.startsWith(state.currentMonth));
}

function groupTransactions(transactions, view) {
  return transactions.reduce((acc, item) => {
    const date = new Date(`${item.date}T00:00:00`);
    const key =
      view === "monthly"
        ? item.date.slice(0, 7)
        : view === "weekly"
          ? `${date.getFullYear()}년 ${weekOfMonth(date)}주차`
          : formatDisplayDate(date);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});
}

function groupNetAmount(items) {
  return items.reduce((total, item) => {
    if (item.type === "expense") return total - item.amount;
    return total + item.amount;
  }, 0);
}

function sumByType(items, type) {
  return items.filter((item) => item.type === type).reduce((total, item) => total + item.amount, 0);
}

function availableCategories(type) {
  const fromData = [...new Set(state.transactions.filter((item) => item.type === type).map((item) => item.category))];
  const defaults = CATEGORIES[type] || [];
  return [...new Set([...fromData, ...defaults])].sort((left, right) => left.localeCompare(right, "ko"));
}

function latestMonthFromTransactions(transactions) {
  return transactions.reduce((latest, item) => {
    const month = item.date.slice(0, 7);
    return month > latest ? month : latest;
  }, "0000-00");
}

function latestDateFromMonth(transactions, monthKey) {
  const dates = transactions
    .filter((item) => item.date.startsWith(monthKey))
    .map((item) => item.date)
    .sort();
  return dates.at(-1) || `${monthKey}-01`;
}

function monthLabel(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return `${year}년 ${month}월`;
}

function shortMonthLabel(monthKey) {
  const [, month] = monthKey.split("-").map(Number);
  return `${month}월`;
}

function typeLabel(type) {
  return (
    {
      expense: "지출",
      income: "수입",
      transfer: "이체",
    }[type] || type
  );
}

function memberName(id) {
  return MEMBERS.find((member) => member.id === id)?.name || id;
}

function accountName(id) {
  return ACCOUNTS.find((account) => account.id === id)?.name || id;
}

function viewLabel(view) {
  return (
    {
      daily: "일간",
      weekly: "주간",
      monthly: "월간",
    }[view] || view
  );
}

function defaultNote(category) {
  return `${category} 기록`;
}

function weekOfMonth(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() + start.getDay()) / 7);
}

function formatDisplayDate(date) {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
}

function shortCurrency(amount) {
  if (amount >= 10000) return `${Math.round(amount / 10000)}만`;
  return `${Math.round(amount / 1000)}천`;
}

function formatCompactCurrency(amount) {
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0,
  }).format(amount);
}

function displaySelectedDate(date) {
  if (!date) return monthLabel(state.currentMonth);
  const parsed = new Date(`${date}T00:00:00`);
  return `${parsed.getMonth() + 1}월 ${parsed.getDate()}일`;
}

function todayISO() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function toMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function emptyState(title, description) {
  return `
    <div class="empty-state">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;
}

function renderIcons() {
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("./sw.js");
  } catch {
    // Ignore registration failures during local preview.
  }
}
