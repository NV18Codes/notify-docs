# Introduction

This is the practical side of Notifyy — how to wire WhatsApp, send campaigns, and not trip over Meta’s rules. If you’re looking for signup or contracts, that lives on the website, not here.

> TIP: If you’re new, **Set up WhatsApp API** → **Send first campaign** is the path most teams follow. You can skip ahead to API docs if you’re only integrating headless.

---

## What this doc is for

- Connecting a **WhatsApp Business Account** and templates.
- Day-to-day product flows: campaigns, bots, inbox, CRM, analytics.
- **HTTP APIs and webhooks** when you’re automating from your own backend.

We won’t sell you on “growth” here — just what to click and what usually breaks.

> RECOMMENDATION: Keep a **test customer** (your own number) saved as a segment. You’ll use it constantly.

---

## Before you blame the product

WhatsApp is strict: template category, opt-in, and phone formatting all matter. When something fails, the error message is often the real answer — screenshot it before opening a ticket.

> IMPORTANT: **Templates must be approved in Meta** before most business-initiated sends. If Create Campaign feels “broken,” check template status first.

---

## Where to go next

Account stuff (billing, trials, seats) is on [notifyy.io](https://www.notifyy.io/). Everything in this site is about **using the product and APIs**.

---

## Example

You run a small retail brand: you connect Meta once, import **200** customers who actually opted in to Diwali promos, send **one** utility template (“order shipped”) to prove the pipe works, *then* you try a festival offer blast. Skipping that proof send makes the first campaign debug painful.

---

## What’s next

**Next:** [Set up WhatsApp API](/docs/setup-whatsapp-api) — connecting Meta usually takes a few minutes; verification can drag.
