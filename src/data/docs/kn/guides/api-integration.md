# API ಏಕೀಕರಣ ಮಾರ್ಗದರ್ಶಿ

HTTPS JSON API ಮತ್ತು ಸಹಿ ಮಾಡಿದ ವೆಬ್‌ಹುಕ್‌ಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಬ್ಯಾಕೆಂಡ್ ಸಂಪರ್ಕಿಸಿ.

## ದೃಢೀಕರಣ

```http
Authorization: Bearer live_xxxxxxxx
X-Notifyy-Workspace: ws_xxxxxxxx
```

ಕೀಗಳನ್ನು **Developer → API keys** ನಲ್ಲಿ ರಚಿಸಿ.

## ಟೆಂಪ್ಲೇಟ್ ಕಳುಹಿಸಿ

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

## ವೆಬ್‌ಹುಕ್

`X-Notifyy-Signature` ಬಳಸಿ ಪರಿಶೀಲಿಸಿ.

## ದರ ಮಿತಿ

ಡೀಫಾಲ್ಟ್ **100 ವಿನಂತಿಗಳು/ಸೆಕೆಂಡ್** ಪ್ರತಿ ವರ್ಕ್‌ಸ್ಪೇಸ್.
