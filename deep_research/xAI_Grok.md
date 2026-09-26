# xAI Grok Provider Deep Research for DSH Integration

## Executive Summary
xAI provides Grok models via a developer API that is OpenAI-compatible. Authentication is API-key based with Bearer token. No public OAuth endpoints are documented for API access; consumer Grok access is tied to X/Twitter accounts. Free tier includes $25 sign-up credits and optional data-sharing credits. Germany/EU access has been subject to regional restrictions and regulatory scrutiny.

---

## 1. Authentication & Login Methods

### API Authentication
- **Method**: Static API key, Bearer token in HTTP `Authorization` header.
- **Example from docs**: `Authorization: Bearer $XAI_API_KEY`
- Documentation shows curl examples with `-H "Authorization: Bearer $XAI_API_KEY"` [docs.x.ai/overview](https://docs.x.ai/overview)
- REST API Reference table lists `Authenticate with` column for Inference API. [docs.x.ai/developers/rest-api-reference/inference](https://docs.x.ai/developers/rest-api-reference/inference)

### OAuth / Scopes
- No public OAuth endpoints are published for the Grok inference API. Authentication is API-key only.
- Consumer Grok chatbot access is accessed via `grok.com` and is tied to X / Twitter authentication flows. xAI does not publish OAuth scopes for third-party DSH integration.
- Token refresh is not applicable to API keys; keys are long-lived until revoked in console.x.ai. SDK clients may refresh access tokens for voice/ephemeral tokens internally, but not for standard chat completions.

### Base URLs
- **Inference API base URL**: `https://api.x.ai/v1`
  - Confirmed in beginner guides: "Base URL: https://api.x.ai/v1" [theneuralbase.com/xai-grok/learn/beginner/base-url-https-api-x-ai-v1](https://theneuralbase.com/xai-grok/learn/beginner/base-url-https-api-x-ai-v1)
- OpenAI SDK usage:
  ```python
  client = OpenAI(api_key="xai-...", base_url="https://api.x.ai/v1")
  ```
- API Console: `https://console.x.ai`

---

## 2. Free Tier Limits & Pricing

### Credits
- **Sign-up promo**: xAI gives every new account $25 in promotional API credits on signup at console.x.ai. No X Premium subscription is required. [aitoolsrecap.com/Blog/how-to-get-free-grok-api-key-2026-step-by-step](https://aitoolsrecap.com/Blog/how-to-get-free-grok-api-key-2026-step-by-step)
- Data-sharing program: Some sources report up to $150/month additional credits via data-sharing opt-in, totaling ~$175/month free for qualifying users. [getaiperks.com/en/blogs/22-xai-grok-free-credits](https://getaiperks.com/en/blogs/22-xai-grok-free-credits)
- Alternative reports state $25 sign-up + $175/month data-sharing. [getaiperks.com/en/blogs/27-ai-api-free-tier-credits-2026](https://getaiperks.com/en/blogs/27-ai-api-free-tier-credits-2026)

### Pricing page
Official pricing is documented at `docs.x.ai/developers/pricing`. Pricing is per 1k tokens / calls, varies by model e.g., Grok 4.6, Grok 4.5, image, video, voice. Exact rates require console access.

### Rate limits
Docs indicate tier-based rate limits. No public free-tier RPD is guaranteed; limits are enforced per API key and increase with payment.

---

## 3. Registration Requirements

### API Console registration
- Create account at `console.x.ai`.
- Free credits are tied to linking xAI team to X developer account per X API pay-per-usage pricing notes: "To receive free xAI credits, you must link your xAI team to your X developer account." [docs.x.com/x-api/getting-started/pricing](https://docs.x.com/x-api/getting-started/pricing)
- No phone/PayPal mandatory for API key generation; payment method is required only when upgrading beyond free credits.

### Consumer Grok registration
- Grok chatbot `grok.com` can be accessed with X login or email/password.
- Phone verification has been reported during signup for some regions. Third-party guides discuss virtual numbers for AI sign-ups, indicating phone verification can be triggered. [esimpy.com/blog/grok-wont-accept-your-phone-number](https://esimpy.com/blog/grok-wont-accept-your-phone-number)
- German mobile number is acceptable for SMS OTP where required. No mandatory PayPal for free tier.

---

## 4. Germany Geo Restrictions & GDPR

### Geo availability
Conflicting reports exist:
- Guides in mid-2026 reported Grok 4.5 blocked across the EU at launch: "Grok 4.5 launched July 8 and is blocked across the EU, in every SpaceXAI product and the API console." [thebestvpn.com/how-to-access-grok](https://thebestvpn.com/how-to-access-grok)
- Later release notes indicate EU access rollout: "Grok 4.5 is now available in the API console for EU users, according to xAI’s July 17, 2026 release note." [moclaw.ai/blog/grok-4-5-eu-release-date](https://moclaw.ai/blog/grok-4-5-eu-release-date)
- Access may vary by model and product. API console access may be subject to IP-based gating.

### Regulatory scrutiny
- Irish Data Protection Commission opened investigation into X over use of EU personal data to train Grok AI, April 2025. [reuters.com/technology/irish-regulator-investigates-x-over-use-eu-personal-data-train-grok-ai-2025-04-11](https://www.reuters.com/technology/irish-regulator-investigates-x-over-use-eu-personal-data-train-grok-ai-2025-04-11)
- GDPR compliance guides note Grok carries highest risk score for European teams due to data processing location. [sonomos.ai/blog/is-grok-gdpr-compliant-2026](https://sonomos.ai/blog/is-grok-gdpr-compliant-2026)

### Data Processing Addendum
xAI publishes a Data Processing Addendum: 
- EU Transfers: "In relation to Personal Data that is subject to the GDPR: (i) Module Two (Controller to Processor)..." [x.ai/legal/data-processing-addendum](https://x.ai/legal/data-processing-addendum)
- No explicit EU data residency guarantee is published; processing is primarily US-based with Standard Contractual Clauses referenced.

---

## 5. API Details

### Endpoints
- Chat completions: `POST /v1/chat/completions`
- Responses: `POST /v1/responses`
- Embeddings, images, video, voice under `/v1/...`

### Scopes
No OAuth scopes. API key grants access to all enabled models per account.

### Token refresh
- API keys are static. No refresh token flow.
- For voice ephemeral tokens, docs mention ephemeral tokens with short TTL, but these are generated server-side, not client-refreshable.

---

## 6. Workaround for Geo-blocking in Germany

**Scenario**: User in Germany with German mobile number only, no payment method.

1. **API access**:
   - Register at `console.x.ai` using email + optional German mobile for 2FA.
   - Use VPN with US/EU exit node to access console if IP blocked. API calls to `api.x.ai` may succeed from German IP if model is enabled for EU; otherwise route traffic via VPN.
   - Free $25 credits allow testing without payment. No PayPal required.
   - Use OpenAI-compatible client with base_url `https://api.x.ai/v1`.

2. **Consumer Grok access**:
   - If `grok.com` is blocked locally, use reputable VPN to US. Browser fingerprint and X account country may still trigger blocks.
   - Phone verification can use German mobile; virtual numbers are sometimes used per guides.

3. **GDPR considerations**:
   - Data processed outside EU. If processing personal data of EU residents, assess DPA and SCCs. Consider data minimization and avoid uploading sensitive PII.

4. **Limitations**:
   - No guarantee of persistent free tier; credits may be exhausted.
   - VPN use may violate xAI Terms of Service if used to circumvent regional restrictions.
   - No official German language support for registration beyond standard.

---

## 7. DSH Integration Recommendations

- Integrate via OpenAI-compatible provider with base_url `https://api.x.ai/v1` and header `Authorization: Bearer <XAI_API_KEY>`.
- Store API key as secret; no OAuth flow needed.
- Implement fallback for 403/geo errors with retry via alternative egress IP.
- Log usage against free credit balance; alert on depletion.
- Document GDPR risk and obtain user consent if personal data is sent.

---

## Sources

- Grok API Documentation overview: https://docs.x.ai/overview
- REST API Reference Inference: https://docs.x.ai/developers/rest-api-reference/inference
- Base URL confirmation: https://theneuralbase.com/xai-grok/learn/beginner/base-url-https-api-x-ai-v1
- Free credits $25 sign-up: https://aitoolsrecap.com/Blog/how-to-get-free-grok-api-key-2026-step-by-step
- Free credits summary: https://getaiperks.com/en/blogs/22-xai-grok-free-credits
- X API pay-per-usage credits linking: https://docs.x.com/x-api/getting-started/pricing
- Irish regulator investigation: https://www.reuters.com/technology/irish-regulator-investigates-x-over-use-eu-personal-data-train-grok-ai-2025-04-11
- Data Processing Addendum: https://x.ai/legal/data-processing-addendum
- EU availability report: https://moclaw.ai/blog/grok-4-5-not-available-eu
- EU release date: https://moclaw.ai/blog/grok-4-5-eu-release-date
- VPN access guide: https://thebestvpn.com/how-to-access-grok
- Phone verification guide: https://esimpy.com/blog/grok-wont-accept-your-phone-number

*Report generated 2026-08-18. Information subject to change as xAI updates pricing, availability, and compliance posture.*
