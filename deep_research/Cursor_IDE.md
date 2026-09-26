# Cursor IDE – DSH Integration Research Report

**Date:** 2026-09-20  
**Subject:** Provider authentication, API access, pricing, geo / GDPR constraints and workarounds for Germany usage

## 1. Provider overview

Cursor is an AI-native code editor by Anysphere, Inc. built on VS Code. Account creation is via email/password or social OAuth (Google, GitHub). [Cursor · Pricing](https://cursor.com/pricing)

## 2. Authentication methods

### Desktop / CLI login
* **Browser-based login (recommended)** – `agent login` opens a browser and completes authentication with a Cursor account. Credentials are stored locally. `NO_OPEN_BROWSER=1` prints the login URL for manual opening. [Authentication | Cursor Docs](https://cursor.com/docs/cli/reference/authentication)
* **API key authentication** – For automation / CI:
  1. Generate a user API key from **Cursor Dashboard → API Keys** https://cursor.com/dashboard/api
  2. Use via environment variable `CURSOR_API_KEY` or `--api-key` flag. [Authentication | Cursor Docs](https://cursor.com/docs/cli/reference/authentication)

### API authentication
* **All Cursor APIs accept Basic Authentication** with the API key as username / password.
* **Cloud Agents API additionally accepts Bearer tokens** – pick whichever is convenient. [Cursor APIs Overview | Cursor Docs](https://cursor.com/docs/api)
* Admin API uses Basic Authentication with your API key as username. [Admin API | Cursor Docs](https://cursor.com/docs/account/teams/admin-api)
* No public OAuth2 authorization endpoint is documented for third-party DSH integration. The SDK login flow references an internal `/auth/poll` endpoint and Connect RPCs, defaults to `api.cursor.sh` / `api2.cursor.sh`. Public docs do not publish OAuth endpoints, scopes or token refresh parameters for external clients.

API base URLs documented publicly:
* Origin API: `https://api.cursor.com/v1/origin` [Origin API | Cursor Docs](https://cursor.com/docs/api/origin)
* Generic API examples use `https://api.cursor.com/teams/...` [Cursor APIs Overview | Cursor Docs](https://cursor.com/docs/api)

Token refresh: API keys are long-lived secrets; revocation is manual in Dashboard. No OAuth refresh token flow is exposed publicly.

## 3. Plans, free tier limits and pricing

### Plans – 2026
* **Hobby** – Free, no credit card required. Includes limited Agent requests and limited Tab completions, access to Composer. [Cursor · Pricing](https://cursor.com/pricing)
* **Pro** – $20/mo. Extended Agent limits, frontier models, Grok Bot access, MCPs/skills/hooks, Cloud agents, Bugbot usage-based. [Cursor · Pricing](https://cursor.com/pricing)
* **Pro+** – $60/mo. ~3× Pro Agent limits. [Cursor · Pricing](https://cursor.com/pricing)
* **Ultra** – $200/mo. ~20× Pro Agent limits, priority access. [Cursor · Pricing](https://cursor.com/pricing)
* Teams / Enterprise – per seat, pooled usage, SCIM, audit logs, invoice billing.

Usage model changed in 2025 from fixed “fast requests” to credit/usage pools:
* **Cursor Models pool** – Cursor Grok 4.6, Grok 4.5, Composer 2.5
* **Other Models pool** – third-party models charged at provider rates [Usage and limits | Cursor Docs](https://cursor.com/help/models-and-usage/usage-limits)
Pools reset monthly with billing cycle. On-demand pay-as-you-go available after included usage is consumed.

Public pages do not publish exact Hobby request counts; documentation states “limited Agent requests” and “limited Tab completions”. [Cursor · Pricing](https://cursor.com/pricing)

### Payment options
* Self-serve plans support major credit / debit cards via Stripe. Invoice / wire for Enterprise via sales contact. [Cursor · Pricing](https://cursor.com/pricing)
* PayPal is **not supported**. Forum response: “Sadly not.” [How to pay with PayPal? - Feature Requests - Cursor - Community Forum](https://forum.cursor.com/t/how-to-pay-with-paypal/3106)
* SEPA Direct Debit availability is Stripe-dependent; German bank accounts have reported issues in checkout. [SEPA Direct Debit for Kreissparkasse Reutlingen Not Available in Stripe Checkout - Bug Reports - Cursor](https://forum.cursor.com/t/sepa-direct-debit-for-kreissparkasse-reutlingen-not-available-in-stripe-checkout/87545)

## 4. Registration requirements

* Account creation via email, Google, or GitHub OAuth. [Cursor AI Phone Verification Guide 2026 | SMS-Act](https://sms-act.net/en/popular-services/cursor-sms-verification)
* Anti-abuse phone SMS verification is added at signup. Sources note “Cursor creates accounts via email, Google, or GitHub OAuth, and now adds a phone SMS verification step at signup as an anti-abuse control.” [Cursor AI Phone Verification Guide 2026 | SMS-Act](https://sms-act.net/en/popular-services/cursor-sms-verification)
* GitHub sign-in can sometimes skip the phone step if the GitHub account already has a verified phone. [Cursor AI Phone Verification Guide 2026 | SMS-Act](https://sms-act.net/en/popular-services/cursor-sms-verification)
* No phone number is required for the free Hobby tier after initial verification; no PayPal option.

## 5. Germany / geo restrictions

* Cursor does not block Germany outright. Model availability is provider-dependent. [Regions and model availability | Cursor Docs](https://cursor.com/help/security-and-privacy/regions)
* Some AI model providers have location-based restrictions; when a model is unavailable it is hidden, other models continue to work. [Regions and model availability | Cursor Docs](https://cursor.com/help/security-and-privacy/regions)
* Grok 4.5 is available in every country where Cursor normally offers models, including the EU. [Regions and model availability | Cursor Docs](https://cursor.com/help/security-and-privacy/regions)
* Cursor Start is India-only and requires Indian phone verification; accessing it outside India or via VPN may be blocked. [Regions and model availability | Cursor Docs](https://cursor.com/help/security-and-privacy/regions)

Access issues reported with VPN use:
* Users report “Cursor queries blocked” modals citing connection / VPN. [Cursor with VPN - Help - Cursor - Community Forum](https://forum.cursor.com/t/cursor-with-vpn/951)
* HTTP 403 diagnostics indicate network block. [Connection failed. Please try again, or contact support if the issue persists - Help - Cursor - Community Forum](https://forum.cursor.com/t/connection-failed-please-try-again-or-contact-support-if-the-issue-persists/170656)

## 6. GDPR / data residency

* Privacy Mode can be enabled to guarantee code data is not used for training by Cursor or model providers. [Cursor · Pricing](https://cursor.com/pricing)
* Data residency controls are available for Enterprise customers:
  * **US-only data residency** – inference, processing and storage stay in US for enrolled teams.
  * EU + Iceland inference-only coverage is available on request; broader EU support is in development. [Privacy and Data Governance | Cursor Docs](https://cursor.com/docs/enterprise/privacy-and-data-governance)
* What data residency covers: inference, data processing, data storage. Today only US-only is generally available. [Privacy and Data Governance | Cursor Docs](https://cursor.com/docs/enterprise/privacy-and-data-governance)
* DPA and sub-processors list published. [Cursor Docs](https://cursor.com/docs/enterprise/privacy-and-data-governance)
* Encryption: TLS 1.2+ in transit, AES-256 at rest; CMEK available for Enterprise. [Privacy and Data Governance | Cursor Docs](https://cursor.com/docs/enterprise/privacy-and-data-governance)

No general EU data residency for individual Hobby/Pro users; data processed via US infrastructure and model providers.

## 7. Workarounds for Germany usage with German mobile number only and no payment

Constraints identified:
* Free Hobby tier is usable in Germany without payment, but requires email/Google/GitHub signup and may trigger anti-abuse phone SMS verification. A German mobile number is generally accepted; pass rates reported ~88% for Germany per third-party SMS verification data. [Cursor AI Phone Verification Guide 2026 | SMS-Act](https://sms-act.net/en/popular-services/cursor-sms-verification)
* PayPal not supported; credit card required for Pro+. SEPA issues reported.
* No geo-block for Germany; VPN use can trigger connection blocks.

Practical workarounds:
* **Use Hobby free tier** with email or GitHub OAuth. If phone verification is required, use your German mobile number; avoid disposable VoIP numbers which are filtered. [Cursor AI Phone Verification Guide 2026 | SMS-Act](https://sms-act.net/en/popular-services/cursor-sms-verification)
* If VPN is needed for network access: use a reputable commercial VPN with a clean residential IP, avoid datacenter IPs flagged by Cursor’s anti-abuse. Forum reports suggest Cursor blocks certain VPN exits. No official VPN whitelist. [Cursor with VPN - Help - Cursor - Community Forum](https://forum.cursor.com/t/cursor-with-vpn/951)
* To avoid payment: stay on Hobby. Upgrade requires credit card; no PayPal. [How to pay with PayPal? - Feature Requests - Cursor - Community Forum](https://forum.cursor.com/t/how-to-pay-with-paypal/3106)
* For GDPR concerns on personal data: enable Privacy Mode in Settings. Individual users cannot enforce EU data residency; Enterprise data residency is required. [Privacy and Data Governance | Cursor Docs](https://cursor.com/docs/enterprise/privacy-and-data-governance)
* API integration for DSH: use API key Basic Auth against `https://api.cursor.com/...` endpoints. No OAuth scopes are published; assume key-only access. Token refresh not applicable.

## 8. Gaps / uncertainties

* No official public OAuth authorization endpoint, client ID/secret, scopes or refresh token spec found in public docs.
* Exact Hobby usage limits not published numerically.
* No official statement on phone verification mandatory rollout timeline; third-party reports indicate it is increasingly used.

## Sources

* Pricing and plans https://cursor.com/pricing
* Usage and limits https://cursor.com/help/models-and-usage/usage-limits
* Models & Pricing https://cursor.com/docs/models-and-pricing
* Authentication https://cursor.com/docs/cli/reference/authentication
* API Overview https://cursor.com/docs/api
* Origin API base URL https://cursor.com/docs/api/origin
* Privacy and Data Governance https://cursor.com/docs/enterprise/privacy-and-data-governance
* Regions and model availability https://cursor.com/help/security-and-privacy/regions
* PayPal not supported https://forum.cursor.com/t/how-to-pay-with-paypal/3106
* SEPA issues https://forum.cursor.com/t/sepa-direct-debit-for-kreissparkasse-reutlingen-not-available-in-stripe-checkout/87545
* VPN blocks https://forum.cursor.com/t/cursor-with-vpn/951
* Phone verification third-party guide https://sms-act.net/en/popular-services/cursor-sms-verification
