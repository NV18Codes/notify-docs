# Set up WhatsApp API

You’re linking Meta’s WhatsApp Business Platform to a Notifyy workspace. The happy path is boring; the edge cases (wrong portfolio, stale template sync) are where people lose afternoons.

> TIP: Do this in a **real browser session** with access to Meta Business Suite. Half-done phone auth is the #1 reason people bounce between tabs for an hour.

---

## What this flow does

You get a working **WABA + phone number** inside Notifyy, webhooks that receive inbound events, and a place to sync **message templates** before anyone hits “send.”

---

## When to use this guide

- First workspace setup.
- Moving from another BSP or reconnecting after Meta changes.
- Before your first campaign or API send — same prerequisites.

You can skip sections marked *optional* if you’re not using the REST API yet.

---

## Step-by-step

### 1. Workspace (2–3 minutes)

1. Sign in and pick **Organization** / **Workspace** (names don’t matter technically, pick something your team recognises).
2. Invite teammates under **Settings → Team** if you want — not required to finish WhatsApp.

> RECOMMENDATION: One **Admin** who owns Meta access, plus whoever will submit templates. Fewer cooks, fewer “who approved this?” moments.

---

### 2. Connect Meta and the WABA

1. Open **Settings → WhatsApp** (wording may vary slightly by release).
2. Start the Meta connection flow; log into the **Business Portfolio** that owns the WhatsApp asset.
3. Select or create a **WhatsApp Business Account**.
4. Assign a **phone number** you control — not your personal WhatsApp.

> IMPORTANT: That number is basically married to this integration. Swapping later is possible but painful; pick something you’re willing to keep.

---

### 3. Webhooks

Meta needs a **callback URL** and **verify token** from Notifyy. Paste them in the developer console, complete verification, then subscribe to the message/status fields you actually need.

> TIP: If verification fails once, copy-paste the token again — whitespace typos happen constantly.

Example payload shape (fields vary):

```json
{
  "event": "message.inbound",
  "conversation_id": "conv_01J9ZQ",
  "from": "+9198xxxxxxxx",
  "type": "text",
  "text": { "body": "Hi" }
}
```

---

### 4. Templates

1. Draft templates in **Meta Business Manager** (category matters for pricing and policy).
2. Sync them into Notifyy and wait for **approved** status.
3. Keep variable order consistent (`{{1}}`, `{{2}}`, …) or your CSV/API mapping will look “right” and still fail at send time.

---

### 5. API keys *(optional)*

Under **Developer → API keys**:

```http
Authorization: Bearer live_xxxxxxxx
X-Notifyy-Workspace: ws_xxxxxxxx
```

```bash
NOTIFYY_API_KEY=live_xxx
NOTIFYY_BASE_URL=https://api.notifyy.com
WABA_PHONE_ID=1234567890
```

---

## Common mistakes

- **Unverified or wrong Meta portfolio** — symptoms: connection spins, or WABA list is empty.
- **Template “approved” in Meta but not visible in Notifyy** — hit sync / wait a minute; Meta’s status lags sometimes.
- **Personal WhatsApp number** — Meta will reject or you’ll fight quality rating later.

---

## Example

**Acme Retail** uses portfolio “Acme Holdings”, WABA phone **+91 98xxx xxxxx**, and a template **`diwali_offer_v1`** approved in Meta. In Notifyy they see that template turn **green / approved**, map `{{1}}` to first name, and only then let marketing touch **Campaigns**. Until the template shows up, they don’t waste time building audiences.

---

## What’s next

**Next:** [Send your first campaign](/docs/send-first-campaign) once at least one template is approved — otherwise you’ll stall at the last step, which is normal.
