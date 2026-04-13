# API overview

HTTPS JSON for sends, contact updates, whatever your workspace exposes. Webhooks fire the other direction. Nothing here replaces reading your **actual** OpenAPI / reference if we publish one in-product — this page is orientation.

> IMPORTANT: **Rotate API keys** like passwords. Old keys in git history have ended more careers than clever exploits.

---

## What it’s for

- Sending **template messages** from your backend.
- Syncing **contacts** or reading state without clicking the UI.
- Pairing with **webhooks** for inbound events.

---

## When to use the API vs the UI

- **API** — high volume, tight integration with your systems, strict idempotency needs.
- **UI** — one-off sends, marketing ops, humans in the loop.

Hybrids are normal.

---

## Authentication

```http
Authorization: Bearer live_xxxxxxxx
X-Notifyy-Workspace: ws_xxxxxxxx
```

Keys live under **Developer → API keys** (or equivalent).

---

## Example: template send

```http
POST /v1/messages
Content-Type: application/json

{
  "to": "+9198xxxxxxxx",
  "template_name": "order_shipped",
  "language": "en",
  "components": [
    { "type": "body", "parameters": [{ "type": "text", "text": "Jane" }] }
  ]
}
```

> TIP: Log **request id** / response body on failures. Support will ask for it.

---

## Rate limits

Default is often **~100 req/s** per workspace with burst — confirm in your contract / dashboard. If you’re planning flash sales, talk to us **before** not during.

---

## Common mistakes

- **Wrong workspace header** — silent wrong-brand sends or hard403s.
- **Template mismatch** — same failures as the UI, less hand-holding in JSON.
- **No retry strategy** — use backoff; don’t hammer 500s.

---

## Example

Your backend fires **`POST /v1/messages`** with template **`otp_login`**, language **`en`**, and body parameter **`482193`** to **`+9198xxxxxxxx`** right after the user taps “Send code” on your app. If the response is **429**, you backoff **2s / 4s / 8s** instead of tight-looping — your logs will thank you.

---

## What’s next

**Next:** [Webhooks](/docs/webhooks) for inbound — or [Integrations](/docs/integrations) if you’re stitching systems together without writing much code.
