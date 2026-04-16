# Templates

Templates are Meta’s gate for most business-initiated messages. Think of them as pre-approved wireframes: body, optional header, buttons, variables — all reviewed.

> RECOMMENDATION: Name templates so humans know what they are (`order_shipped_en_v2`), not `template_37`. Future-you is the one who suffers.

---

## What they do

- Define **what you’re allowed to push** outside the customer service window.
- Carry **category** (marketing / utility / authentication) which drives **pricing and policy**.

---

## When to use which category

- **Utility** — order updates, appointments, “your package is here” stuff. Tighter copy, usually cheaper per conversation.
- **Marketing** — promos. Higher scrutiny and different pricing.
- **Authentication** — OTP-style flows where supported.

If you’re unsure, start **utility**-shaped until legal/marketing says otherwise.

---

## Step-by-step (typical)

1. Draft in **Meta Business Manager** with correct **category** and **language codes**.
2. Submit for approval; wait for **approved** (or rejected with a reason — read the reason).
3. **Sync** into Notifyy; confirm status matches Meta.
4. Only then wire the template into **campaigns** or **API** payloads.

> TIP: Keep body copy short. Long blocks render badly on small screens and hurt read rates — not a moral lecture, just how people read chat.

---

## Common mistakes

- **Variables don’t line up** — `{{1}}` in Meta must match what you send from Notifyy / API.
- **Wrong language variant** — `en` vs `en_US` style mismatches cause silent failures depending on setup.
- **Marketing copy in a utility template** — rejections waste days.

---

## Example

**ShipKaro** ships parcels nationwide. Their utility template **`parcel_out_for_delivery`** has body: “Hi {{1}}, your package is out for delivery today. Track: {{2}}.” Variables map to customer name and tracking URL. Marketing tried to sneak a **“20% off”** line into the same template — Meta **rejected** it; they split a separate **marketing** template instead.

---

## What’s next

**Next:** [Send first campaign](/docs/send-first-campaign) to see templates in context, or [Campaigns](/docs/features/bulk-campaigns) for audience + send behaviour.
