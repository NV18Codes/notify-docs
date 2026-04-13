# Integrations

Glue between Notifyy and everything else: CRMs, data warehouses, custom backends. There’s no universal recipe — this page is how teams usually wire things without drama.

> RECOMMENDATION: Prefer **one source of truth** for phone numbers. If both Salesforce and Notifyy “own” mobile, you’ll merge forever.

---

## Patterns that work

- **CRM → Notifyy**: scheduled or event-driven contact sync; segments in Notifyy for sends.
- **Notifyy → CRM**: webhooks on inbound / tags; update lead status with human rules.
- **Warehouse**: nightly CSV or ELT job; analytics stay in BI, ops stay in Notifyy.

---

## When to build custom

- You need **tight SLAs** or **complex branching** across systems.
- Off-the-shelf connectors don’t exist for your stack.

When an official connector exists in-product, use it unless you enjoy maintaining OAuth.

---

## Website entry points

Click-to-chat links and QR codes are mostly **Meta-side** patterns — generate them consistently, track UTM params if marketing cares.

> TIP: You can skip deep integration on day one. Plenty of teams run **CSV export → spreadsheet → import** longer than they admit publicly.

---

## Common mistakes

- **Bi-directional sync** on day one — start one direction.
- **Secret sprawl** — API keys in five repos; rotate pain later.

---

## Example

Every night at **02:00 IST**, a script pulls **Salesforce** leads with **`WhatsApp_Opt_In__c = true`** into a CSV, uploads to Notifyy, and tags them **`sf_sync`**. When someone replies **STOP**, your webhook calls Salesforce and flips the same field to **false** so the next nightly doesn’t resurrect them. Crude, but it’s been running **14 months** without a spreadsheet war.

---

## What’s next

**Next:** [Webhooks](/docs/webhooks) if events are your main bus — or [Set up WhatsApp API](/docs/setup-whatsapp-api) if you jumped here too early.
