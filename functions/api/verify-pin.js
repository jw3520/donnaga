function json(body, init = {}) {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json; charset=utf-8" },
    ...init,
  });
}

export async function onRequestPost(context) {
  const { env, request } = context;
  try {
    if (!env.ADMIN_PIN) {
      return json({ ok: false, error: "ADMIN_PIN is not configured" }, { status: 500 });
    }
    const payload = await request.json();
    const pin = String(payload?.pin || "").trim();
    if (!pin) {
      return json({ ok: false, error: "PIN is required" }, { status: 400 });
    }
    if (pin === env.ADMIN_PIN) {
      return json({ ok: true, role: "admin" });
    }
    if (env.READONLY_PIN && pin === env.READONLY_PIN) {
      return json({ ok: true, role: "readonly" });
    }
    return json({ ok: false, error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to verify PIN" },
      { status: 500 },
    );
  }
}
