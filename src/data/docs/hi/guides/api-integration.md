# API एकीकरण गाइड

HTTPS JSON API और हस्ताक्षरित वेबहुक से अपना बैकएंड जोड़ें।

## प्रमाणीकरण

```http
Authorization: Bearer live_xxxxxxxx
X-Notifyy-Workspace: ws_xxxxxxxx
```

कुंजियाँ **Developer → API keys** में बनाएँ।

## टेम्पलेट भेजें

```http
POST /v1/messages
Content-Type: application/json

{
  "to": "+9198xxxxxxxx",
  "template_name": "order_shipped",
  "language": "en",
  "components": [
    { "type": "body", "parameters": [{ "type": "text", "text": "Jane" }] }
  ]
}
```

## वेबहुक

`X-Notifyy-Signature` से सत्यापित करें।

## दर सीमा

डिफ़ॉल्ट **100 अनुरोध/सेकंड** प्रति वर्कस्पेस।
