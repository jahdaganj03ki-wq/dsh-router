# Anthropic Provider for DSH Integration – Research Report

**Date:** 2026-09-09

## 1. Authentication & Login Methods

### API Key – primary method
* API keys are static secrets generated in the Claude Console → Settings → API keys.
* Key format starts with `sk-ant-`.
* Sent on every request as `Authorization: Bearer <key>` or legacy `x-api-key` header. SDKs read `ANTHROPIC_API_KEY` environment variable automatically.
* Three key types:
  * **Personal key** – acts as you, stops working when you lose org access.
  * **Service account key** – acts as a service account, for CI/production.
  * **Workspace key** – legacy, belongs to workspace.
* No OAuth scopes for API access. Keys are long-lived until revoked/expired.

Sources:
* Get your Claude API key – Claude Platform Docs [https://platform.claude.com/docs/en/get-api-key](https://platform.claude.com/docs/en/get-api-key)
* Authentication – Claude Platform Docs [https://platform.claude.com/docs/en/manage-claude/authentication](https://platform.claude.com/docs/en/manage-claude/authentication)

### Workload Identity Federation
* Short-lived bearer tokens exchanged from your identity provider’s OIDC token.
* Best for production workloads on AWS/GCP/Azure, CI/CD, Kubernetes.
* Token lifetime is minutes, refreshed by the identity provider. No manual refresh in the API client.

Source: Authentication – Claude Platform Docs [https://platform.claude.com/docs/en/manage-claude/authentication](https://platform.claude.com/docs/en/manage-claude/authentication)

### App Attest
* Short-lived access token for genuine iOS/macOS apps.
* Not applicable for server-side DSH integration.

### OAuth for Claude Code / Console
* Claude Code CLI authenticates via OAuth 2.0 PKCE against `console.anthropic.com`. This is for user login to the Console, not for API calls.
* No public OAuth endpoints for programmatic API access are documented. API access remains API-key or WIF based.

## 2. API Base URLs & Endpoints

* Primary REST API: `https://api.anthropic.com`
* Messages endpoint examples: `POST /v1/messages`
* Admin API lives under the same base with `/v1/` paths.
* `ANTHROPIC_BASE_URL` env var can override the default host for proxies/gateways.

Source: API overview discussion → The Claude API is a RESTful API at `https://api.anthropic.com` [https://platform.claude.com/docs/en/api/overview](https://platform.claude.com/docs/en/api/overview)

## 3. Pricing, Free Tier & Limits

### Free trial
* One-time $5 free-credit trial for new Console accounts.
* No credit card required, SMS phone verification required.
* Credit expiry ~14 days after claim.
* No ongoing free tier; all usage is pay-as-you-go after credits exhausted.

Sources:
* Anthropic Free Tier 2026 — Price Per Token [https://pricepertoken.com/endpoints/anthropic/free](https://pricepertoken.com/endpoints/anthropic/free)
* How to Get a Free Anthropic API Key in 2026 – Get AI Perks [https://www.getaiperks.com/en/ai/free-anthropic-api-key](https://www.getaiperks.com/en/ai/free-anthropic-api-key)

### Paid pricing
Current model pricing USD per 1M tokens examples:
* Claude Sonnet 5: $2 /M input, $10 /M output
* Claude Haiku 4.5: $1 /M input, $5 /M output
* Claude Opus 5: $5 /M input, $25 /M output
Full table in docs.

Source: Pricing – Claude Platform Docs [https://platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing)

### Rate limits
New accounts start with strict limits, tiers increase with spend history: $5+, $40+, $400+.

## 4. Registration Requirements

* Account creation: email/password, Google sign-in, or GitHub sign-in.
* Phone verification required before granting API access and free credits. Must receive SMS code. VoIP/Google Voice numbers are rejected.
* No PayPal required. No credit card required for $5 trial; payment method only needed when spending beyond credit balance.
* Regional restrictions on phone verification may apply; some countries unsupported.

Sources:
* Phone verification help article [https://support.claude.com/en/articles/8287232-verify-your-phone-number](https://support.claude.com/en/articles/8287232-verify-your-phone-number)
* Free tier details [https://pricepertoken.com/endpoints/anthropic/free](https://pricepertoken.com/endpoints/anthropic/free)

## 5. Geo Restrictions

### Supported countries
Germany is explicitly listed as supported for commercial API access and Claude.ai.

Full API list includes: Germany, Austria, Netherlands, France, Spain, etc. Blocked regions include Iran, North Korea, Russia, and other sanctioned jurisdictions.

Source: Supported countries and regions – Anthropic [https://www.anthropic.com/supported-countries](https://www.anthropic.com/supported-countries)
Supported regions doc [https://platform.claude.com/docs/en/api/supported-regions](https://platform.claude.com/docs/en/api/supported-regions)

### Germany specific
No geo-blocking for Germany. German mobile number works for SMS verification.

## 6. GDPR & Data Residency

* Services in EU provided by Anthropic Ireland Limited.
* Data residency controls:
  * **Inference geo**: per-request parameter `inference_geo` = `global` default or `us`. Supported on Claude 4.6+ models. `inference_geo: "us"` applies 1.1x pricing multiplier.
  * **Workspace geo**: configures where data is stored at rest and where endpoint processing happens. Set in Console.
* First-party API does not currently offer guaranteed EU-only processing for inference; inference may run globally. For EU residency guarantees, use Amazon Bedrock regional endpoints or Google Cloud Vertex AI regional endpoints, which add ~10% premium.
* Zero data retention option available via API and data retention settings.

Sources:
* Data residency – Claude Platform Docs [https://platform.claude.com/docs/en/manage-claude/data-residency](https://platform.claude.com/docs/en/manage-claude/data-residency)
* Pricing page data residency pricing note [https://platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing)
* Supported countries page footer notes services in EU provided by Anthropic Ireland Limited [https://www.anthropic.com/supported-countries](https://www.anthropic.com/supported-countries)

GDPR approach: Anthropic acts as data processor for customers, provides DPA, Privacy Policy, and EU representation via Ireland.

## 7. Scopes & Token Refresh

* API keys: static, no scopes, no refresh.
* Workload Identity Federation: short-lived tokens, refreshed automatically by the identity provider; client exchanges OIDC token for Anthropic access token.
* App Attest: short-lived access token issued per app attestation, refreshed by SDK.

No OAuth scopes are exposed for the Messages API.

## 8. Workaround for Geo-blocking / German Mobile Only / No Payment

Germany is supported, so no geo-block circumvention needed for API access.

If SMS verification fails:
* Use a German mobile number capable of receiving SMS. VoIP numbers are blocked.
* If regional IP blocks occur during signup, a VPN to a supported country such as Germany, Netherlands, or United States can be used for the Console sign-up step only. API calls afterwards work from Germany.
* No payment method is required for the $5 trial. Keep usage within the $5 credit to avoid prompting for billing details.
* For ongoing free usage without payment, rely on the $5 trial per account or apply to startup credit programs. These may require business verification beyond phone.

Practical steps for DSH in Germany:
1. Sign up at console.anthropic.com using German mobile for SMS verification.
2. Create API key in Settings → API keys.
3. Set `ANTHROPIC_API_KEY` env var and `ANTHROPIC_BASE_URL=https://api.anthropic.com`.
4. Optionally pin `inference_geo: "us"` if you need US-only inference; otherwise leave default `global`.
5. Monitor usage to stay within $5 free credit.

## 9. DSH Integration Notes

* Authentication method for DSH: API key header `Authorization: Bearer <sk-ant-...>` or `x-api-key`.
* No OAuth client credentials flow for API.
* Token refresh not applicable for API key; for WIF, implement OIDC token refresh per cloud provider.
* Base URL configurable.
* Scopes not applicable.

---

**Citations**
* Get your Claude API key: https://platform.claude.com/docs/en/get-api-key
* Authentication: https://platform.claude.com/docs/en/manage-claude/authentication
* API overview: https://platform.claude.com/docs/en/api/overview
* Pricing: https://platform.claude.com/docs/en/about-claude/pricing
* Supported countries: https://www.anthropic.com/supported-countries
* Supported regions: https://platform.claude.com/docs/en/api/supported-regions
* Data residency: https://platform.claude.com/docs/en/manage-claude/data-residency
* Free tier: https://pricepertoken.com/endpoints/anthropic/free
* Phone verification: https://support.claude.com/en/articles/8287232-verify-your-phone-number
* Free key guide: https://www.getaiperks.com/en/ai/free-anthropic-api-key
