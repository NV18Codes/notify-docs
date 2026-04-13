# Webhooks

Your server gets POSTed when messages arrive, statuses change, or things break. The integration is “easy” until signature verification disagrees with your framework’s body parsing.

> IMPORTANT: Verify **signatures** on every request before doing work. Test with a fake payload once — it should fail closed.

---

## What this is

An HTTPS endpoint you register in Notifyy. We call it on events; you return **2xx** quickly and process async if you can.

---

## When to use webhooks

- Driving **internal workflows** off inbound WhatsApp (tickets, CRM updates).
- **Reconciling delivery** with your own ledger.

If you only send outbound blasts and don’t care about replies, you might postpone this — that’s a valid choice.

---

## Setup sketch

1. **Developer → Webhooks** → add URL.
2. Store the **signing secret** somewhere real (not `.env` on your laptop only).
3. In your app: raw body → verify signature → parse JSON.
4. Return **200** fast; queue heavy work.

> TIP: If verification fails, log **raw body length** and headers (redact secrets). Nine times out of ten it’s middleware mutating the body.

---

## Retries

We retry on **5xx** and timeouts with backoff. **4xx** is usually your bug — fix forward.

---

## Common mistakes

- Parsing JSON before verifying — breaks HMAC style checks.
- **Idempotency** ignored — you’ll duplicate tickets on retries.

---

## Example

A **`message.inbound`** hits your **`https://api.yourco.com/notifyy/hook`**. You verify **`X-Notifyy-Signature`**, enqueue a job, return **200** in **80ms**. The worker creates a **Zendesk** ticket titled **`WA- conv_01ABC — refund ask`** and attaches the raw text. When delivery webhooks duplicate because of a retry, your idempotency key **`event_id`** drops the duplicate ticket — otherwise you get twin tickets and angry agents.

---

## What’s next

**Next:** [Integrations](/docs/integrations) for higher-level patterns — or back to [API overview](/docs/api-overview) if you’re still on auth basics.
