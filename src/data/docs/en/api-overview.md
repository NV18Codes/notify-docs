# API overview

Notifyy exposes **HTTPS JSON APIs** for sending messages, managing contacts, and reading workspace data. Incoming events are delivered via **webhooks**.

## Authentication

```http
Authorization: Bearer live_xxxxxxxx
X-Notifyy-Workspace: ws_xxxxxxxx
```

Create and rotate keys under **Developer → API keys**.

## Send a template message

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

## Rate limits

Default **100 requests/second** per workspace with short bursts allowed. Request a higher limit through support if needed.

**See also:** [Webhooks](/docs/webhooks) · [Set up WhatsApp API](/docs/setup-whatsapp-api)
