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

function json(body, init = {}) {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json; charset=utf-8" },
    ...init,
  });
}

async function ensureSchema(db) {
  await db.prepare(TABLE_SQL).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_transactions_updated_at ON transactions(updated_at)").run();
}

export async function onRequestGet(context) {
  const { env } = context;
  await ensureSchema(env.DB);
  const result = await env.DB.prepare(
    `SELECT id, type, amount, category, sub_category, member, account, payment_method, card_name, memo, note, date, updated_at, fingerprint, deleted
     FROM transactions
     ORDER BY updated_at DESC`,
  ).all();
  return json({ transactions: result.results || [] });
}

export async function onRequestPost(context) {
  const { env, request } = context;
  await ensureSchema(env.DB);

  try {
    const payload = await request.json();
    const transactions = Array.isArray(payload.transactions) ? payload.transactions : [];
    if (!transactions.length) {
      return json({ ok: true, upserted: 0 });
    }

    let upserted = 0;
    for (let index = 0; index < transactions.length; index += DB_BATCH_SIZE) {
      const chunk = transactions.slice(index, index + DB_BATCH_SIZE);
      const statements = chunk.map((item) =>
        env.DB.prepare(
          `INSERT INTO transactions (
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
          WHERE excluded.updated_at >= transactions.updated_at`,
        ).bind(
          item.id,
          item.type,
          item.amount,
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
        ),
      );
      await env.DB.batch(statements);
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
