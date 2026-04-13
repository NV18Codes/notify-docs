# Contacts (CRM)

Contacts are phone-first records: E.164 number, fields, tags, consent flags. Everything downstream — segments, campaigns, inbox context — assumes this layer isn’t garbage.

> IMPORTANT: **Phone format matters.** `98xxxxxx` and `+9198xxxxxx` are not the same animal. Imports that “mostly work” leave landmines in segments.

---

## What this feature does

- Stores **profiles** (phone, name, locale, custom fields).
- Tracks **opt-in / opt-out** per how your workspace models consent.
- Feeds **segments** and campaign audiences.

---

## When to use it

- Before any serious **campaign** — hygiene beats clever creative.
- When syncing from another CRM or warehouse.

---

## Step-by-step

1. **Import** CSV or connect sync if available.
2. Map columns → fields; fix **country code** in the source if you can.
3. Tag a **test cohort** (you + colleagues).
4. Build a **segment** from tags/filters; preview counts.
5. Run a **tiny campaign** to the test cohort before a wide blast.

> TIP: Dedupe **before** import if your source is messy. Notifyy may dedupe, but “may” is not a data strategy.

---

## Common mistakes

- **Mixing personal and business numbers** in one workspace — reporting gets weird.
- **Over-tagging** — too many tags = nobody trusts filters.
- **Ignoring bounces** — repeated sends to dead numbers hurt quality.

---

## Example

You upload **`feb_import.csv`** with columns `mobile`, `city`, `last_order_date`. You map **`mobile`** to phone (add **+91** in the sheet first), tag everyone **`winter_sale_list`**, and build segment **city = Pune AND last_order_date < 2024-11-01**. That segment is **1,240** people — you send a **50-person** test, then the rest.

---

## What’s next

**Next:** [Lead tracking](/docs/features/lead-tracking) if you care about pipeline attribution — or jump to [Campaigns](/docs/features/bulk-campaigns) if contacts are clean enough.
