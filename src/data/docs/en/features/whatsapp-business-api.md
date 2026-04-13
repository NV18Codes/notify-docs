# WhatsApp Business API

Notifyy sits on top of the **official WhatsApp Business Platform** — the same APIs Meta documents for ISVs and enterprises.

## Capabilities you unlock

- **Cloud API**-compatible endpoints for messages, media, and status.
- **Template lifecycle** synced with Meta: draft → pending → approved → paused.
- **Webhook fan-out** to your stack for delivery receipts, user replies, and errors.

## Webhook contract

Notifyy signs callbacks with your workspace secret. Example payload (trimmed):

```json
{
  "event": "message.inbound",
  "conversation_id": "conv_01J9ZQ",
  "from": "+9198xxxxxx",
  "type": "text",
  "text": { "body": "Hi!" }
}
```

## Compliance defaults

Opt-in checks, quiet hours, and frequency caps can be enforced per workspace so campaigns stay policy-safe.

---

**See also:** [API integration](/docs/guides/api-integration)
