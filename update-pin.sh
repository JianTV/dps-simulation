curl -X POST https://visionary-nasturtium-8059cd.netlify.app/.netlify/functions/update-pin \
  -H "Content-Type: application/json" \
  -d '{"accountId": "1111a", "oldPin": "11111", "newPin": "12345"}'
