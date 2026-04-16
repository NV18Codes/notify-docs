# Chatbots

Rule-based flows: someone says X, you branch, maybe send a template, maybe hand off to a human. It’s not “AI” unless you plug something in — this is the boring, reliable layer.

> TIP: Prototype on **your own WhatsApp number** first. Keyword triggers feel obvious until you typo them in production.

---

## What this feature does

- Listens for **triggers** (keywords, inbound patterns, template replies — whatever your workspace exposes).
- Runs **branches** (if/else style on fields or user text).
- Fires **actions**: send template, set field, assign queue, open ticket, etc.

---

## When to use it

- FAQs that shouldn’t burn agent time.
- **Qualification** (“pick1 for sales”) before routing.
- After-hours **acknowledgement** when you’re honest about human hours.

Skip it when the flow changes weekly — you’ll maintain YAML-shaped spaghetti.

---

## Step-by-step (conceptual)

1. **Chatbots →** create flow (exact menu names vary).
2. Pick a **trigger** you can reproduce in testing.
3. Add **branches**; keep them shallow — deep trees are hard to debug.
4. Attach **actions** (template sends need approved templates, same as campaigns).
5. **Publish**; test from a real device.

> IMPORTANT: If a template send inside a bot fails, the whole step fails — check template + variable mapping before blaming “the bot engine.”

---

## Common mistakes

- **Overlapping triggers** — two rules firing feels random; narrow keywords.
- **No handoff path** — users get stuck in loops; always offer “talk to human” if you run support.
- **Editing live without version notes** — you’ll forget what changed; use whatever history your workspace gives you.

---

## Example

Someone types **TRACK**. The flow asks for **order ID** in free text, looks up status, sends template **`order_status_reply`** with the ETA, and if they type **HUMAN** the thread drops into queue **Support — Tier1** with the order ID already pasted into the internal note. No LLM — just keywords and branches.

---

## What’s next

**Next:** [Team inbox](/docs/features/live-chat) for when the bot should stop talking — or [API overview](/docs/api-overview) if you’re driving messages from code instead.
