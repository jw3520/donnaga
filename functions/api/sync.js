const TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT,
    sub_category TEXT,
    member TEXT,
    account TEXT,
    payment_method TEXT,
    card_name TEXT,
    memo TEXT,
    note TEXT,
    date TEXT NOT NULL,
    updated_at INTEGER NOT NULL,
    fingerprint TEXT,
    deleted INTEGER DEFAULT 0
  )
`;
const DB_BATCH_SIZE = 100;
const UPSERT_SQL = `INSERT INTO transactions (
  id, type, amount, category, sub_category, member, account, payment_method, card_name, memo, note, date, updated_at, fingerprint, deleted
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(id) DO UPDATE SET
  type = excluded.type,
  amount = excluded.amount,
  category = excluded.category,
  sub_category = excluded.sub_category,
  member = excluded.member,
  account = excluded.account,
  payment_method = excluded.payment_method,
  card_name = excluded.card_name,
  memo = excluded.memo,
  note = excluded.note,
  date = excluded.date,
  updated_at = excluded.updated_at,
  fingerprint = excluded.fingerprint,
  deleted = excluded.deleted
WHERE excluded.updated_at >= updated_at`;
const REQUIRED_COLUMNS = [
  ["category", "TEXT"],
  ["sub_category", "TEXT"],
  ["member", "TEXT"],
  ["account", "TEXT"],
  ["payment_method", "TEXT"],
  ["card_name", "TEXT"],
  ["memo", "TEXT"],
  ["note", "TEXT"],
  ["date", "TEXT NOT NULL DEFAULT ''"],
  ["updated_at", "INTEGER NOT NULL DEFAULT 0"],
  ["fingerprint", "TEXT"],
  ["deleted", "INTEGER DEFAULT 0"],
];

function json(body, init = {}) {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json; charset=utf-8" },
    ...init,
  });
}

async function ensureSchema(db) {
  await db.prepare(TABLE_SQL).run();
  const tableInfo = await db.prepare("PRAGMA table_info(transactions)").all();
  const existingColumns = new Set((tableInfo.results || []).map((row) => row.name));
  for (const [name, definition] of REQUIRED_COLUMNS) {
    if (existingColumns.has(name)) continue;
    await db.prepare(`ALTER TABLE transactions ADD COLUMN ${name} ${definition}`).run();
  }
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_transactions_updated_at ON transactions(updated_at)").run();
}

export async function onRequestGet(context) {
  const { env } = context;
  try {
    if (!env.DB) {
      return json({ ok: false, error: "DB binding not found" }, { status: 500 });
    }
    await ensureSchema(env.DB);
    const result = await env.DB.prepare(
      `SELECT id, type, amount, category, sub_category, member, account, payment_method, card_name, memo, note, date, updated_at, fingerprint, deleted
       FROM transactions
       ORDER BY updated_at DESC`,
    ).all();
    return json({ ok: true, transactions: result.results || [] });
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to load transactions" },
      { status: 500 },
    );
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  try {
    if (!env.DB) {
      return json({ ok: false, error: "DB binding not found" }, { status: 500 });
    }
    await ensureSchema(env.DB);
    const payload = await request.json();
    const suppliedPin = request.headers.get("X-Donnaga-Pin") || payload?.pin || "";
    const adminPin = env.SECRET_PIN || "0501";
    if (suppliedPin !== adminPin) {
      return json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const transactions = Array.isArray(payload.transactions) ? payload.transactions : [];
    if (!transactions.length) {
      return json({ ok: true, upserted: 0 });
    }

    let upserted = 0;
    for (let index = 0; index < transactions.length; index += DB_BATCH_SIZE) {
      const chunk = transactions.slice(index, index + DB_BATCH_SIZE);
      for (let chunkIndex = 0; chunkIndex < chunk.length; chunkIndex += 1) {
        const item = chunk[chunkIndex];
        try {
          await env.DB.prepare(UPSERT_SQL).bind(
            item.id,
            item.type,
            Number(item.amount || 0),
            item.category || "",
            item.sub_category || "",
            item.member || "",
            item.account || "",
            item.payment_method || "",
            item.card_name || "",
            item.memo || "",
            item.note || "",
            item.date,
            Number(item.updated_at || Date.now()),
            item.fingerprint || "",
            Number(item.deleted || 0),
          ).run();
        } catch (error) {
          return json(
            {
              ok: false,
              error: error instanceof Error ? error.message : "Failed to upsert transaction",
              failedIndex: index + chunkIndex,
              failedId: item?.id || null,
            },
            { status: 500 },
          );
        }
      }
      upserted += chunk.length;
    }

    return json({ ok: true, upserted });
  } catch (error) {
    return json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to sync transactions",
      },
      { status: 500 },
    );
  }
}
