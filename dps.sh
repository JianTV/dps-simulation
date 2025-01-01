curl -X POST https://visionary-nasturtium-8059cd.netlify.app/.netlify/functions/dps \
  -H "Content-Type: application/json" \
  -d '{"request": "getCallerSetting", "phone_number": "+16502768941"}'
