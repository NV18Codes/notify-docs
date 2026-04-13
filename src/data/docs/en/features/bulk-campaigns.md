# Campaigns

The campaign builder is where bulk template sends happen: audience, template, variables, schedule. It’s not magic — it’s WhatsApp’s rules with a spreadsheet-shaped hat on.

> IMPORTANT: **Unapproved templates don’t send.** The UI may still let you build the campaign. The failure is at send or queue time.

---

## What this feature does

- Targets **segments** or lists with a **template** message.
- Applies **send pacing** so you don’t spike traffic (helps quality rating).
- Surfaces **delivery / read / errors** per campaign.

---

## When to use it

- Scheduled promos, announcements, or utility blasts.
- When you want **one place** to see how a send performed.

If you’re sending from your backend only, you might barely touch this screen — that’s fine.

---

## Step-by-step (in-product)

1. **Campaigns → Create**.
2. Pick **template** + language; map **variables**.
3. Choose **audience** (segment / list).
4. Set **schedule** or send now.
5. After send: open **report**; fix obvious errors (bad numbers, template mismatch) before repeating.

> TIP: Sort errors by type once — usually it’s 2–3 root causes, not 500 unique bugs.

---

## Common mistakes

- **Huge first send** on a cold number quality rating — ramp up.
- **Ignoring “invalid user” buckets** — they’re often formatting or opt-out, not “WhatsApp is down.”
- **A/B everything at once** — if your plan supports variants, change one thing per test or you won’t know what moved.

---

## Example

**Glow Skincare** sends **`weekend_flash_sale`** to **12,000** people in segment **“Engaged — last 90d”** on **Saturday 11am**. They throttled to **2k/hour** because last month a flat blast dinged quality rating. Halfway through they paused, fixed **400** bad numbers from the error export, resumed — boring, but that’s the job.

---

## What’s next

**Next:** [Templates](/docs/features/whatsapp-templates) — variable naming and categories are where campaigns quietly die.
