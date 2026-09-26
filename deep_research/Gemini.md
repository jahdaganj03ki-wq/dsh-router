# Gemini Provider Research for DSH Integration

## Overview
Research on Google Gemini API / Google AI Studio integration requirements for DSH. Focus on authentication, pricing, limits, registration, geo/GDPR, API endpoints, scopes, token refresh, and workarounds for Germany usage.

## Authentication Methods

### API Key
Easiest method. API key is tied to a Google Cloud project for billing/quotas.
- Create/get key at https://aistudio.google.com/apikey
- Usage: header `x-goog-api-key: <KEY>` or client SDK env var `GEMINI_API_KEY` / `GOOGLE_API_KEY`
- Standard API key vs Authorization API key. Transition from standard to auth key:
  - From 28 May 2026 new keys in AI Studio are auth keys by default.
  - Unrestricted standard keys are rejected; standard keys with explicit restrictions continue to work.
  - From September 2026 standard keys will be rejected entirely. Migrate to auth key. [https://ai.google.dev/gemini-api/docs/api-key](https://ai.google.dev/gemini-api/docs/api-key)

API key authentication docs: [https://ai.google.dev/gemini-api/docs/api-key](https://ai.google.dev/gemini-api/docs/api-key)

### OAuth 2.0
For stricter access controls, use OAuth with Google Cloud project.
Prerequisites:
- Google Cloud project with Generative Language API enabled
- OAuth consent screen configured
- OAuth 2.0 Client ID for desktop app

Setup steps from official quickstart:
1. Enable API: console.cloud.google.com/flows/enableapi?apiid=generativelanguage.googleapis.com
2. Configure OAuth consent screen
3. Create OAuth client ID
4. Use `gcloud auth application-default login --client-id-file=client_secret.json --scopes='https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/generative-language.retriever'`

Scopes used:
- `https://www.googleapis.com/auth/cloud-platform`
- `https://www.googleapis.com/auth/generative-language.retriever`

Token handling: `gcloud auth application-default print-access-token` for curl; client libraries auto-discover ADC.
Refresh: standard OAuth2 refresh token flow via `https://oauth2.googleapis.com/token`. Libraries such as `google-auth-oauthlib` manage refresh automatically; token.json caches access + refresh tokens.

Docs: [https://ai.google.dev/gemini-api/docs/oauth](https://ai.google.dev/gemini-api/docs/oauth)

## API Base URLs & Endpoints

Generative Language API:
- Base: `https://generativelanguage.googleapis.com`
- v1beta: `https://generativelanguage.googleapis.com/v1beta/...`
- Example: `POST https://generativelanguage.googleapis.com/v1beta/interactions` with header `x-goog-api-key`
- Traditional model endpoint: `https://generativelanguage.googleapis.com/v1beta/models/<model>:generateContent`

Interactions API:
- `https://generativelanguage.googleapis.com/v1beta/interactions`

OpenAPI reference: [https://ai.google.dev/api](https://ai.google.dev/api)

## Scopes & Token Refresh

OAuth scopes for Gemini API:
- `https://www.googleapis.com/auth/cloud-platform`
- `https://www.googleapis.com/auth/generative-language.retriever`

Token refresh is handled by Google OAuth2 token endpoint `https://oauth2.googleapis.com/token` with refresh_token grant. Client libraries refresh transparently. Application Default Credentials store tokens in `~/.config/gcloud/application_default_credentials.json`.

## Free Tier Limits & Pricing

### Free Tier
- Access to limited models in Gemini API and AI Studio up to free tier rate limits.
- No input/output token charges for free quota.
- Content may be used to improve Google products.

Free tier qualification: active project or free trial. No billing cap.

### Paid Tiers
Billing is via Google Cloud Billing account linked to project.

Usage tiers:
- **Free**: Active project or free trial. N/A cap.
- **Tier 1**: Billing account linked. Spend cap $250
- **Tier 2**: Paid $100 + 3 days. Spend cap $2,000
- **Tier 3**: Paid $1,000 + 30 days. Spend cap $20,000 - $100,000+

Billing plans:
- Prepay: purchase credits in advance, minimum $5, max $5,000 per purchase. Credits expire after 12 months, non-refundable except on switch to Postpay. Effective 23 March 2026.
- Postpay: pay-as-you-go, charged monthly or at spend cap.

Rate limits measured as RPM, TPM, RPD per project.
Spend-based rate limits per 10 min sliding window:
- Tier 1: $10
- Tier 2: $200
- Tier 3: $200

Free tier rate limits vary by model, typically 5-15 RPM, ~250k TPM, 100-1000 RPD. Exact values visible in AI Studio rate limit page.

Docs:
- Pricing: [https://ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing)
- Billing: [https://ai.google.dev/gemini-api/docs/billing](https://ai.google.dev/gemini-api/docs/billing)
- Rate limits: [https://ai.google.dev/gemini-api/docs/rate-limits](https://ai.google.dev/gemini-api/docs/rate-limits)

## Registration Requirements

Account creation:
- Google Account required, minimum age 18 per Terms of Service.
- AI Studio login via Google Account.
- No explicit phone number requirement for free API key creation, but Google Account may require phone verification for security or suspicious activity.
- Payment method required only when setting up billing: credit card / Google Pay. PayPal is not listed as primary payment method for Gemini API billing; Google Cloud Billing accepts cards and bank transfer.
- No phone/PayPal mandatory for free tier usage.

Terms note: Use of Google AI Studio and Gemini API is for developers building for professional/business purposes, not consumer use. [https://ai.google.dev/gemini-api/terms](https://ai.google.dev/gemini-api/terms)

## Germany Geo Restrictions

Available regions list includes Germany.
Official available regions page lists Germany as supported. [https://ai.google.dev/gemini-api/docs/available-regions](https://ai.google.dev/gemini-api/docs/available-regions)

Notes:
- AI Studio may redirect to region page if account location, IP, or account age verification fails.
- Some users report intermittent "region not supported" redirects from Germany, often related to account age verification or IP detection anomalies. Forum discussions indicate Germany is supported but issues occur with new accounts or Colab instance region mismatch.
- For EEA/Switzerland/UK, Terms require Paid Services when making API Clients available to users in those regions. [https://ai.google.dev/gemini-api/terms](https://ai.google.dev/gemini-api/terms)

## GDPR Data Residency

Free / Unpaid Services:
- When using Unpaid Services, Google may use content to improve products and services. Human reviewers may process data after disconnecting from account/API key.
- Do NOT submit sensitive personal data to Unpaid Services.

Paid Services:
- Prompts/responses are not used to improve products.
- Data processed per Data Processing Addendum for Products Where Google is a Data Processor.
- Logs retained limited time for safety/security.
- For EEA/Switzerland/UK, paid data processing terms apply even to free quota.

Enterprise data residency:
- Gemini Enterprise Agent Platform allows data residency controls; data at rest can be kept in customer-selected location.
- Standard Gemini API via AI Studio does not guarantee EU-only processing for free tier; processing may occur globally.

Docs:
- Terms data use: [https://ai.google.dev/gemini-api/terms](https://ai.google.dev/gemini-api/terms)
- Data residency: [https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency)

## Workaround for Geo-Blocking with VPN

Germany is officially supported, so VPN is generally not needed for compliance. If facing region block:

Potential causes:
- Account created with non-EU IP or flagged location.
- Age verification not completed.
- Billing account country mismatch.

Workarounds:
1. Ensure Google Account age is confirmed >=18 and account is active.
2. Access AI Studio from German IP; avoid VPN to non-supported region.
3. If blocked, clear cookies and try incognito; ensure Colab instance region matches user's location if using Colab.
4. Create Google Cloud project with billing country set to Germany. Use project-linked API key rather than unrestricted key.
5. For uninterrupted access with German mobile number only and no payment:
   - Use free tier API key without billing setup. Free tier works in Germany per region list.
   - Avoid enabling billing if no payment method available; billing setup requires payment method.
   - If forced to use VPN, use German exit node to match account region, not foreign node. Using VPN to exit outside supported regions will trigger block.
   - Do not use VPN to spoof non-German location to bypass payment requirements; Terms prohibit access from unsupported regions.

No reliable workaround for free usage without payment method beyond free tier limits. If higher limits needed, payment method is mandatory.

## Summary Table

| Item | Detail |
|------|--------|
| Auth methods | API key, OAuth2 with service account / user credentials |
| OAuth endpoints | `https://oauth2.googleapis.com/token`, `https://accounts.google.com/o/oauth2/v2/auth` |
| Scopes | `cloud-platform`, `generative-language.retriever` |
| API base URL | `https://generativelanguage.googleapis.com/v1beta/` |
| Free tier | Limited RPM/TPM, no cost, data may be used for training |
| Paid tiers | Tier1 $250 cap, Tier2 $2k, Tier3 $20k+ |
| Registration | Google Account, 18+, billing requires card |
| Germany | Supported per official list |
| GDPR | Paid = DPA, no training use; Free = training use allowed, EEA requires paid terms |
| Token refresh | OAuth2 refresh token via Google token endpoint, auto-managed by client libs |

## Citations
- API Key docs: https://ai.google.dev/gemini-api/docs/api-key
- OAuth quickstart: https://ai.google.dev/gemini-api/docs/oauth
- Pricing: https://ai.google.dev/gemini-api/docs/pricing
- Billing: https://ai.google.dev/gemini-api/docs/billing
- Rate limits: https://ai.google.dev/gemini-api/docs/rate-limits
- Available regions: https://ai.google.dev/gemini-api/docs/available-regions
- Terms of Service: https://ai.google.dev/gemini-api/terms
- Data residency: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency
