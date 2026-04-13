# Send your first campaign

A campaign here means: pick an **approved template**, map variables, choose people, send (or schedule). If your template isn’t ready, the UI might still let you click around — the failure shows up late. That trips people up.

> IMPORTANT: Go to **Campaigns → Create**. If the template you want isn’t in the list, it’s not usable yet — fix that in Meta / template sync first, not in the campaign builder.

---

## What this is for

Sending a **template message** to a **segment** or list, with basic reporting after. Same mental model as email, except WhatsApp says “no” a lot more often when something’s off-policy.

---

## When to use it

- Marketing or utility blasts to opted-in contacts.
- A dry run to your **test segment** before a big send.

Not the right tool for one-off chats inside the 24h session window — that’s usually inbox / session messaging.

---

## Step-by-step

1. **Campaigns → Create** (sometimes labelled **New campaign**).
2. Choose **template** + **language**. If something’s greyed out, it’s not approved for that workspace — no secret workaround.
3. **Map variables** to contact fields or static text. Preview if the UI offers it.
4. Pick **audience** (segment or upload — whatever your workspace supports).
5. **Schedule** or send **now**.
6. Open the **campaign report** for delivery errors. Read the errors literally (“template mismatch” almost always means variables).

> TIP: First send to **10–50 contacts** you know are real. Full-list sends on day one are how you learn about duplicate E.164 formatting the hard way.

---

## Common mistakes

- **Skipping opt-in** — you’ll get sends rejected or worse; policy is on you.
- **Wrong template category** — marketing copy on a utility template is a common foot-gun.
- **Variable count mismatch** — the campaign composer doesn’t always stop you early; WhatsApp does at send time.

---

## Example

Send a **festival offer** to about **500** Mumbai customers: you use the pre-approved marketing template **`festive_sale_en`**, pick segment **“Mumbai — marketing opt-in”**, map `{{1}}` to `first_name` and `{{2}}` to the coupon code **DIWALI24**, schedule for **6pm IST**, then watch the campaign report for “invalid user” rows before you scale to the full 40k list.

---

## What’s next

**Next:** [Campaigns](/docs/features/bulk-campaigns) for how throttling and reporting behave on bigger sends — or [Templates](/docs/features/whatsapp-templates) if you’re still fighting Meta approvals.
