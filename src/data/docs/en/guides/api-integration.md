# API integration guide

Integrate your backend with Notifyy using HTTPS JSON APIs and signed webhooks.

![Engineering and ops collaboration](/docs/images/team-collaboration.jpg "Illustrative: align product, engineering, and support around API rollouts and webhooks.")

## Authentication

```http
Authorization: Bearer live_xxxxxxxx
X-Notifyy-Workspace: ws_xxxxxxxx
```

Create keys under **Developer → API keys**. Rotate keys quarterly.

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

## Webhooks

Register HTTPS endpoints to receive inbound messages, status updates, and errors. Verify `X-Notifyy-Signature` using your workspace secret.

## Rate limits

Default **100 requests/second** per workspace; burst allowed for short spikes. Contact support for higher ceilings.

---

**Related:** [WhatsApp Business API](/docs/features/whatsapp-business-api)
