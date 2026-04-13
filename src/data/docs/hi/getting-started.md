# शुरुआत करें

अपना पहला अनुपालन योग्य अभियान लॉन्च करने के लिए यह चेकलिस्ट अपनाएँ।

## 1. वर्कस्पेस बनाएँ

Notifyy पर साइन अप करें और **Organization** व **Workspace** बनाएँ। भूमिकाएँ (Admin, Marketer, Agent) आमंत्रित करें।

## 2. WhatsApp Business कनेक्ट करें

अपना **Meta Business Portfolio** लिंक करें और **WABA** सेटअप पूरा करें — व्यवसाय सत्यापन, डिस्प्ले नाम, समर्पित फ़ोन नंबर और वेबहुक (Notifyy URL व verify token प्रदान करता है)।

## 3. टेम्पलेट सबमिट करें

**Marketing / Utility / Authentication** टेम्पलेट Meta में बनाएँ और Notifyy में सिंक करें। वेरिएबल (`{{1}}`, `{{2}}`) लगातार रखें।

## 4. संपर्क आयात करें

CSV अपलोड करें या CRM जोड़ें। फ़ोन **E.164** प्रारूप में हों (उदा. `+9198xxxxxx`)। टैग लगाएँ।

## 5. टेस्ट अभियान भेजें

**Campaigns → New campaign** से टेम्पलेट और ऑडियंस चुनें, शेड्यूल करें, फिर **Analytics** में डिलीवरी और क्लिक देखें।

## API उपयोगकर्ताओं के लिए

```bash
NOTIFYY_API_KEY=live_xxx
NOTIFYY_BASE_URL=https://api.notifyy.com
WABA_PHONE_ID=1234567890
```

---

**पढ़ें:** [WhatsApp अभियान गाइड](/docs/guides/whatsapp-campaigns) · [मूल्य निर्धारण](/docs/pricing)
