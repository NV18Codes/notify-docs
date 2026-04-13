# Getting started

Follow this checklist to launch your first compliant campaign on Notifyy.

![Team aligning on launch checklist and inbox workflows](/docs/images/team-collaboration.jpg "Cross-functional teams use Notifyy for campaigns, inbox, and CRM — concept imagery.")

## 1. Create your workspace

Sign up at Notifyy and create an **Organization** and **Workspace**. Invite teammates with roles (Admin, Marketer, Agent) so permissions match how you operate.

## 2. Connect WhatsApp Business

Link your **Meta Business Portfolio** and complete **WhatsApp Business Account (WABA)** setup:

- Verify your business and display name.
- Add a phone number dedicated to Notifyy (not a personal WhatsApp line).
- Configure webhooks (Notifyy provides the callback URL and verify token).

## 3. Submit templates

Create **Marketing**, **Utility**, or **Authentication** templates in Meta and sync them into Notifyy. Use variables consistently (`{{1}}`, `{{2}}`) so contact imports map cleanly.

## 4. Import contacts

Upload CSV or connect your CRM. Map phone numbers to **E.164** format (e.g. `+9198xxxxxx`). Tag segments (city, product interest, lifecycle stage) for targeting.

## 5. Send a test campaign

1. Open **Campaigns → New campaign**.
2. Pick an approved template and audience segment.
3. Schedule or send immediately.
4. Review **delivery**, **reads**, and **clicks** in Analytics.

## Environment variables (API users)

```bash
NOTIFYY_API_KEY=live_xxx
NOTIFYY_BASE_URL=https://api.notifyy.com
WABA_PHONE_ID=1234567890
```

---

**Then read:** [WhatsApp campaign guide](/docs/guides/whatsapp-campaigns) · [Pricing](/docs/pricing)
