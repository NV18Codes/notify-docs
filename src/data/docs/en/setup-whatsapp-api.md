# Set up WhatsApp API

Connect your WhatsApp Business Account (WABA) to Notifyy and complete the minimum configuration to send template messages.

## 1. Workspace

1. Sign in to Notifyy.
2. Create or select an **Organization** and **Workspace**.
3. Invite users and assign roles (for example Admin, Marketer, Agent) under **Settings → Team**.

## 2. Link Meta and WABA

1. Open **Settings → WhatsApp** (or the onboarding wizard).
2. Connect your **Meta Business Portfolio**.
3. Select or create a **WhatsApp Business Account** and assign a **phone number** used only for this integration (not a personal WhatsApp number).
4. Complete **business verification** and **display name** steps as prompted by Meta.

## 3. Webhooks

Notifyy provides a **callback URL** and **verify token** for Meta. In the Meta developer console, set:

- **Callback URL** — value shown in Notifyy.
- **Verify token** — value shown in Notifyy.

After verification, subscribe to the message and status fields your integration needs.

Example inbound payload shape (fields vary by event):

```json
{
  "event": "message.inbound",
  "conversation_id": "conv_01J9ZQ",
  "from": "+9198xxxxxxxx",
  "type": "text",
  "text": { "body": "Hi" }
}
```

## 4. Templates

1. Create **Marketing**, **Utility**, or **Authentication** templates in Meta.
2. Sync or import them into Notifyy.
3. Use consistent variable placeholders (`{{1}}`, `{{2}}`, …) so they map to your contact data.

## 5. API keys (optional)

For server-side sends, create keys under **Developer → API keys**. Use:

```http
Authorization: Bearer live_xxxxxxxx
X-Notifyy-Workspace: ws_xxxxxxxx
```

```bash
NOTIFYY_API_KEY=live_xxx
NOTIFYY_BASE_URL=https://api.notifyy.com
WABA_PHONE_ID=1234567890
```

**Next:** [Send your first campaign](/docs/send-first-campaign) · [API overview](/docs/api-overview)
