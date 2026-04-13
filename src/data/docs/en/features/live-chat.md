# Team inbox

Shared queue for WhatsApp conversations: assign, reply, leave notes, escalate. It’s the human layer on top of templates and bots.

> IMPORTANT: **First response time** is the metric customers feel. Everything else is internal theatre.

---

## What it does

- Routes threads to **queues** or agents.
- Shows **CRM context** next to the chat (when integrated).
- Supports **internal notes** so you don’t narrate your process to the customer.

---

## When to use it

- Any team where **more than one person** answers WhatsApp.
- When bots should **hand off** cleanly instead of dumping users in limbo.

---

## Step-by-step

1. Define **queues** (by product, language, tier — keep it simple).
2. Set **assignment rules** (round-robin vs load-based — pick one and stick with it).
3. Train agents: **claim → resolve → tag**.
4. Review **SLA / wait** reports weekly; move the threshold if it’s fantasy.

> TIP: If two agents reply to the same customer by accident, that’s usually a routing gap, not “people not caring.”

---

## Common mistakes

- **VIP rules nobody maintains** — stale routing is worse than none.
- **Notes instead of CRM updates** — notes help agents, CRM helps the company.
- **No supervisor view** — escalations become DMs.

---

## Example

**Support-IN** queue: Hindi + English agents, round-robin. A message comes in speaking **Tamil** — nobody’s staffed for it, so the supervisor drags the thread to **Escalation** and leaves a note: *“Need Tamil — customer ID 8821.”* First response time that day was **4m** median; the one outlier was that ticket at **47m**, which is the story leadership actually remembers.

---

## What’s next

**Next:** [Chatbots](/docs/features/chatbot-builder) to reduce inbox noise — or [Analytics](/docs/features/analytics) if you’re measuring agent load.
