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

async function ensureSchema(db) {
  await db.prepare(TABLE_SQL).run();
  await db.prepare("CREATE INDEX IF NOT EXISTS idx_transactions_updated_at ON transactions(updated_at)").run();
}

export async function onRequest(context) {
  try {
    if (!context.env.DB) {
      return new Response(
        JSON.stringify({
          error: "DB binding not found. Check your Settings > Functions > D1 bindings.",
        }),
        { status: 500 },
      );
    }

    await ensureSchema(context.env.DB);
    const { results } = await context.env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name",
    ).all();

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "DB is connected!",
        tables: results,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
