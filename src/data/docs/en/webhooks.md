# Webhooks

Register HTTPS endpoints in your workspace to receive **inbound messages**, **delivery status**, and **errors**.

## Registration

1. Open **Developer → Webhooks**.
2. Set your **URL** (HTTPS, publicly reachable).
3. Store the **signing secret** Notifyy provides.

## Verification

Verify the `X-Notifyy-Signature` header (or equivalent documented header) using your workspace secret before trusting the body. Reject requests that fail verification.

## Payloads

Payload shape depends on `event` type. Typical fields include `event`, `conversation_id`, timestamps, and channel-specific payloads. Log raw bodies during integration and map fields in your application.

## Retries

Notifyy retries failed deliveries with backoff when your endpoint returns **5xx** or times out. Return **2xx** quickly and process asynchronously when possible.

**See also:** [API overview](/docs/api-overview) · [Integrations](/docs/integrations)
