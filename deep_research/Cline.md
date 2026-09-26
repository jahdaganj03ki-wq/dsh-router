# Cline Provider Research for DSH Integration

**Date:** 2025-12-16
**Scope:** Authentication, API, pricing, registration, geo/GDPR, workarounds for Germany

## 1. Overview

Cline offers two main access paths relevant to DSH integration:

* **Cline (usage-billing)** – pay-as-you-go with built-in billing and free model options
* **Cline API** – OpenAI-compatible Chat Completions endpoint at `api.cline.bot`

Source: Cline Overview [https://docs.cline.bot/cline-overview](https://docs.cline.bot/cline-overview)

## 2. Login / Authentication Method

### Account sign-in
* Sign in once with **Google, GitHub, or email** for Cline usage-billing and ClinePass.
* IDE Setup: Open Cline Settings → select provider → Click **Sign In** and complete OAuth.
* `Cline (usage-billing)` – One sign-in, no key management. Built-in billing and free model options.
* `ClinePass` – Select ClinePass, click Sign In, subscribe if prompted.

Source: Authorization [https://docs.cline.bot/getting-started/authorizing-with-cline](https://docs.cline.bot/getting-started/authorizing-with-cline)
Source: Cline (usage-billing) [https://docs.cline.bot/getting-started/cline-provider](https://docs.cline.bot/getting-started/cline-provider)

### API authentication
* Every request requires a Bearer token in `Authorization` header.
* Two methods documented:
  * **API key** – for direct API calls, scripts, CI/CD. Create at [app.cline.bot](https://app.cline.bot) Settings > API Keys
  * **Account auth token** – generated automatically when you sign in to extension/CLI

```http
Authorization: Bearer YOUR_TOKEN
```

Source: Authentication [https://docs.cline.bot/api/authentication](https://docs.cline.bot/api/authentication)

* API key creation steps: Sign in to app.cline.bot → Settings → API Keys → Create API Key. Key is shown once.
* Keys can be revoked immediately. Enterprise API allows programmatic listing/deletion at `https://api.cline.bot/api/v1/api-keys`.

Source: Authentication [https://docs.cline.bot/api/authentication](https://docs.cline.bot/api/authentication)

### OAuth endpoints / scopes
* No public OAuth authorization endpoints for third-party DSH integration are documented.
* Sign-in uses first-party OAuth with Google/GitHub for account creation.
* API access is API-key based, not OAuth 2.0 authorization code flow.
* No documented scopes. API key grants access to models enabled for the account / purchased credits.

### Token refresh
* API keys are static until revoked; no refresh token flow documented.
* Account auth tokens are managed automatically by Cline extension/CLI after initial sign-in.

## 3. API Base URLs, Endpoints

* Base domain: `api.cline.bot`
* Chat Completions endpoint:
  ```
  POST https://api.cline.bot/api/v1/chat/completions
  ```
* Authentication header: `Authorization: Bearer YOUR_API_KEY`
* Optional headers: `HTTP-Referer`, `X-Title` for usage tracking

Example:

```bash
curl -X POST https://api.cline.bot/api/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-4-6",
    "messages": [{"role":"user","content":"Hello!"}]
  }'
```

Source: API Overview [https://docs.cline.bot/api/overview](https://docs.cline.bot/api/overview)
Source: Getting Started [https://docs.cline.bot/api/getting-started](https://docs.cline.bot/api/getting-started)
Source: Chat Completions [https://docs.cline.bot/api/chat-completions](https://docs.cline.bot/api/chat-completions)

Model ID format: `provider/model-name` e.g. `anthropic/claude-sonnet-4-6`, `minimax/minimax-m2.5`

Source: Models [https://docs.cline.bot/api/models](https://docs.cline.bot/api/models)

## 4. Free tier limits, pricing, registration requirements

### Free models
* Cline periodically offers free model promotions for users with a Cline account, limited-time rotating quotas.
* Models tagged **FREE** in selector under Cline provider.
* After free quota exhausted, options: ClinePass or Cline credits.

Source: Cline Free Models [https://docs.cline.bot/getting-started/free-models](https://docs.cline.bot/getting-started/free-models)

### ClinePass
* Flat **$9.99/month** subscription.
* Offers 2-5x usage on popular open coding models vs standard API rate.
* Separate provider in Cline.

Source: ClinePass [https://docs.cline.bot/getting-started/clinepass](https://docs.cline.bot/getting-started/clinepass)

### Cline usage-billing
* Pay-as-you-go with Cline credits.
* Add credits from Cline dashboard https://app.cline.bot/dashboard
* Access to 100+ models.

Source: Cline (usage-billing) [https://docs.cline.bot/getting-started/cline-provider](https://docs.cline.bot/getting-started/cline-provider)

### Registration requirements
* Documented sign-in methods: Google, GitHub, email.
* No public documentation requiring phone number for basic account creation.
* Payment for credits / ClinePass requires payment method. Payment options not explicitly listed; typical is credit card. PayPal support not confirmed in public docs.
* No KYC/phone requirement identified in docs.

### Limits
* No published hard free API tier limits; free models are promotional and quota-limited.
* Usage tracked in Cline Settings → View Usage.

## 5. Germany geo restrictions, GDPR data residency

* No public geo-blocking statements found in docs.
* Service appears globally accessible via cline.bot and app.cline.bot.
* Privacy / GDPR data residency not specified in fetched documentation.
* No explicit EU data residency guarantee found. Data processing likely via US-based infrastructure of Cline and upstream model providers.
* Recommendation: Request Data Processing Agreement from Cline sales/support for GDPR compliance.

## 6. Workaround for Germany with German mobile number only, no payment

Objective: Use Cline in Germany without payment and with German mobile number only.

Findings:
* Account creation does not require phone number; email/Google/GitHub sufficient.
* Free model promotions allow usage without adding credits or subscribing.
* ClinePass and credits require payment; can be avoided by staying on free models.

Practical steps:
1. Create account at https://app.cline.bot with email or Google/GitHub.
2. Sign in via IDE/CLI and select provider **Cline**.
3. Choose models tagged FREE in selector.
4. Do not add credits or subscribe to ClinePass.
5. For API access: create API key at Settings > API Keys and use `api.cline.bot/api/v1/chat/completions` with free model IDs e.g. `minimax/minimax-m2.5`.

If geo-blocking is encountered:
* No evidence of Germany block currently.
* If access to app.cline.bot or api.cline.bot is restricted, use a VPN egress to US/EU allowed region.
* API key authentication works regardless of location once obtained.
* German mobile number not required; email is sufficient.

Limitations:
* Free model availability rotates and quota is limited.
* No guarantee of long-term free usage for production workloads.
* No official GDPR data residency; consider proxying prompts or using BYOK provider with EU residency for sensitive data.

## 7. Gaps / Unknowns

* Exact OAuth authorization URLs and scopes for first-party sign-in not published.
* PayPal support, phone verification requirements undocumented.
* Explicit EU data residency / GDPR compliance statement not found.
* Token refresh interval / expiration for account auth tokens not documented.

## Citations

* Cline Overview - https://docs.cline.bot/cline-overview
* Cline usage-billing - https://docs.cline.bot/getting-started/cline-provider
* Authorization - https://docs.cline.bot/getting-started/authorizing-with-cline
* API Overview - https://docs.cline.bot/api/overview
* API Authentication - https://docs.cline.bot/api/authentication
* API Getting Started - https://docs.cline.bot/api/getting-started
* Chat Completions - https://docs.cline.bot/api/chat-completions
* Models - https://docs.cline.bot/api/models
* Cline Free Models - https://docs.cline.bot/getting-started/free-models
* ClinePass - https://docs.cline.bot/getting-started/clinepass

---
*Report generated by deep research subagent. Information reflects public docs as of 2025-12-16.*
