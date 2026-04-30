export const YEAR_END_TAX_USERS = [
  { id: "철수", label: "철수", source: "mock" },
  { id: "영희", label: "영희", source: "mock" },
  { id: "정우", label: "정우", source: "real" },
  { id: "솔이", label: "솔이", source: "real" },
];

export const YEAR_END_TAX_DEDUCTION_RATES = {
  "credit-card": 0.15,
  "debit-card": 0.3,
  cash: 0.3,
  "local-currency": 0.3,
};

export function defaultYearEndTaxUser(role = "") {
  return role === "guest" ? "철수" : "정우";
}

export function yearEndTaxUsersForRole(role = "") {
  if (role === "guest") {
    return YEAR_END_TAX_USERS.filter((user) => user.source === "mock");
  }
  return YEAR_END_TAX_USERS.filter((user) => user.source === "real");
}

export function normalizeYearEndTaxUser(userId, role = "") {
  const allowedUsers = yearEndTaxUsersForRole(role);
  return allowedUsers.some((user) => user.id === userId) ? userId : defaultYearEndTaxUser(role);
}

export function salaryMonthsFromTransactions(transactions = [], year = "") {
  const salaryRows = transactions.filter((item) => {
    if (!item || item.deleted) return false;
    if (item.type !== "income" || item.category !== "월급") return false;
    if (!year) return true;
    return String(item.date || "").startsWith(`${year}-`);
  });
  const byMonth = salaryRows.reduce((acc, item) => {
    const monthKey = String(item.date || "").slice(0, 7);
    if (!monthKey) return acc;
    acc[monthKey] = (acc[monthKey] || 0) + Number(item.amount || 0);
    return acc;
  }, {});
  const months = Object.entries(byMonth).map(([month, amount]) => ({ month, amount }));
  const averageMonthlyNetSalary = months.length
    ? Math.round(months.reduce((sum, item) => sum + item.amount, 0) / months.length)
    : 0;
  return {
    months,
    count: months.length,
    averageMonthlyNetSalary,
  };
}

function estimateTakeHomeRatio(monthlyNetSalary = 0) {
  if (monthlyNetSalary >= 6_000_000) return 0.8;
  if (monthlyNetSalary >= 4_000_000) return 0.84;
  if (monthlyNetSalary >= 2_500_000) return 0.87;
  return 0.9;
}

export function estimateAnnualIncomeFromMonthlyNet(monthlyNetSalary = 0) {
  const safeMonthlyNet = Math.max(0, Number(monthlyNetSalary || 0));
  const annualNet = safeMonthlyNet * 12;
  const takeHomeRatio = estimateTakeHomeRatio(safeMonthlyNet);
  const annualGross = takeHomeRatio ? Math.round(annualNet / takeHomeRatio) : annualNet;
  const estimatedTaxAndInsurance = Math.max(0, annualGross - annualNet);
  return {
    monthlyNetSalary: safeMonthlyNet,
    annualNet,
    annualGross,
    estimatedTaxAndInsurance,
    takeHomeRatio,
  };
}

function normalizeQualifiedTransactions(transactions = [], year = "") {
  return transactions.filter((item) => {
    if (!item || item.deleted) return false;
    if (item.type !== "expense") return false;
    if (!YEAR_END_TAX_DEDUCTION_RATES[item.account]) return false;
    if (!year) return true;
    return String(item.date || "").startsWith(`${year}-`);
  });
}

function spendingByAccount(transactions = []) {
  return Object.keys(YEAR_END_TAX_DEDUCTION_RATES).reduce((acc, account) => {
    acc[account] = transactions
      .filter((item) => item.account === account)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    return acc;
  }, {});
}

function allocateThresholdExcess(spending = {}, threshold = 0) {
  let remainingThreshold = Math.max(0, Number(threshold || 0));
  const accountOrder = ["credit-card", "debit-card", "cash", "local-currency"];
  const deductibleBaseByAccount = {};

  accountOrder.forEach((account) => {
    const amount = Math.max(0, Number(spending[account] || 0));
    const consumedForThreshold = Math.min(amount, remainingThreshold);
    remainingThreshold = Math.max(0, remainingThreshold - amount);
    deductibleBaseByAccount[account] = Math.max(0, amount - consumedForThreshold);
  });

  return deductibleBaseByAccount;
}

export function buildYearEndTaxSnapshot({
  member,
  source,
  transactions = [],
  year = "",
  monthlyNetSalary = 0,
}) {
  const salarySource = salaryMonthsFromTransactions(transactions, year);
  const resolvedMonthlyNetSalary = Math.max(0, Number(monthlyNetSalary || salarySource.averageMonthlyNetSalary || 0));
  const incomeEstimate = estimateAnnualIncomeFromMonthlyNet(resolvedMonthlyNetSalary);
  const deductionThreshold = Math.round(incomeEstimate.annualGross * 0.25);
  const qualifiedTransactions = normalizeQualifiedTransactions(transactions, year);
  const spending = spendingByAccount(qualifiedTransactions);
  const totalQualifiedSpend = Object.values(spending).reduce((sum, amount) => sum + amount, 0);
  const deductibleBaseByAccount = allocateThresholdExcess(spending, deductionThreshold);
  const estimatedDeduction = Object.entries(deductibleBaseByAccount).reduce((sum, [account, amount]) => {
    return sum + amount * YEAR_END_TAX_DEDUCTION_RATES[account];
  }, 0);
  const progressRatio = deductionThreshold > 0 ? Math.min(totalQualifiedSpend / deductionThreshold, 1) : 0;
  const remainingToThreshold = Math.max(0, deductionThreshold - totalQualifiedSpend);
  const overThresholdAmount = Math.max(0, totalQualifiedSpend - deductionThreshold);

  return {
    member,
    source,
    year,
    monthlyNetSalary: resolvedMonthlyNetSalary,
    annualNet: incomeEstimate.annualNet,
    annualGross: incomeEstimate.annualGross,
    estimatedTaxAndInsurance: incomeEstimate.estimatedTaxAndInsurance,
    takeHomeRatio: incomeEstimate.takeHomeRatio,
    deductionThreshold,
    totalQualifiedSpend,
    remainingToThreshold,
    overThresholdAmount,
    progressRatio,
    salaryMonths: salarySource.months,
    salaryMonthCount: salarySource.count,
    qualifiedTransactionCount: qualifiedTransactions.length,
    spending,
    deductibleBaseByAccount,
    estimatedDeduction: Math.round(estimatedDeduction),
  };
}
