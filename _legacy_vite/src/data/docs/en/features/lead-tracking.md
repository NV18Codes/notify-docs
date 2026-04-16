# Lead tracking

This is the “what happened after we messaged them?” layer — events, stages, maybe revenue fields. It’s only as honest as your team’s discipline clicking buttons.

> TIP: If sales won’t log outcomes, buy-in beats tooling. No CRM magically attributes WhatsApp touches without human signal.

---

## What it does

- Records **events** from campaigns, bots, or agent actions (exact event set depends on your plan and wiring).
- Supports **first / last touch** style thinking for “which send nudged the deal.”
- Can **export** or push to BI via CSV / webhooks / API (check what your workspace actually exposes).

---

## When to use it

- You run **pipeline** sales and need proof WhatsApp mattered.
- You’re reconciling marketing sends with **CRM stages**.

---

## Step-by-step (practical)

1. Define **what counts** as a qualified reply or meeting booked — write it down.
2. Map Notifyy **events or tags** to those definitions (don’t overfit on day one).
3. Train agents to **tag outcomes** or move stages when appropriate.
4. Pull a **weekly export**; sanity-check counts against reality.

> RECOMMENDATION: Start with **one campaign tag** and **one stage change**. Expand when that’s boring and correct.

---

## Common mistakes

- **Too many event types** — dashboards look smart, nobody trusts them.
- **Attribution fights** between marketing and sales — solve politically, not with more fields.
- **Ignoring timezone** on exports — weekly reports drift.

---

## Example

Campaign **“Q1 webinar invite”** gets UTM-ish tracking via a custom field **`source_campaign = webinar_q1`**. When a rep marks **Meeting booked** in the CRM, your weekly export shows **14** last-touch conversions from that send — not proof of genius creative, just a number you can defend in a meeting.

---

## What’s next

**Next:** [Analytics](/docs/features/analytics) for aggregate charts — or back to [Contacts](/docs/features/contacts) if your data model is still messy.
