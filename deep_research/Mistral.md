# Mistral AI Provider – DSH Integration Research

**Date:** 2026-09-16
**Scope:** Login / authentication, OAuth, API key, free tier, pricing, registration, Germany geo restrictions, GDPR data residency, base URLs, scopes, token refresh, workarounds.

## 1. Authentication method

### API access

* Mistral API uses **API key authentication** only for direct API calls.
* Request header: `Authorization: Bearer $MISTRAL_API_KEY`  
  Authenticates the request with an API key created in Studio or the Admin panel. The key carries the workspace: a request is billed and rate-limited against the workspace the key was created in. [ai.impaxsys.com](https://ai.impaxsys.com/cheatsheets/mistral-api/)
* API keys are created in Studio / Admin Panel and are shown once on creation. They cannot be retrieved afterwards. [docs.mistral.ai](https://docs.mistral.ai/admin/identity-access/api-keys)

### First request flow

* Create account at console.mistral.ai, activate Studio, generate API key.
* Set environment variable `MISTRAL_API_KEY` and call `https://api.mistral.ai/v1/chat/completions`. [docs.mistral.ai](https://docs.mistral.ai/getting-started/quickstarts/developer/first-api-request)

### OAuth

* The public Mistral API documentation does not expose a standard OAuth 2.0 authorization server for API access. Authentication is API-key based.
* OAuth concepts appear in Mistral’s connector / MCP ecosystem for third-party tools and human-in-the-loop flows, not for the core inference API. No public OAuth endpoints, scopes, or token refresh flow are published for API key authentication.

## 2. API key management

* **Types:** Studio, Vibe, Mistral Code legacy. [docs.mistral.ai](https://docs.mistral.ai/admin/identity-access/api-keys)
* **Creation steps:** Admin Panel › API › API Keys › Create new key → choose Workspace, Expiration date, Connector access scope. After creation Workspace / scope / expiration are immutable; rotate by creating new key and deleting old. [docs.mistral.ai](https://docs.mistral.ai/admin/identity-access/api-keys)
* **Expiration policy:** Organization / Workspace admins can set max validity for newly created keys. Existing keys keep working until revoked or original expiry. [docs.mistral.ai](https://docs.mistral.ai/admin/identity-access/api-keys)
* **Scope:**
  * Workspace-scoped: requests use that Workspace’s quota, rate limits, resources.
  * Connector access scope: `Shared connectors only` vs `Private and shared connectors`. Default is shared only. [docs.mistral.ai](https://docs.mistral.ai/admin/identity-access/api-keys)
* **Token refresh:** Not applicable. API keys are static bearer secrets with optional expiration date set at creation. No refresh token flow.

## 3. API base URLs

* Production inference API: `https://api.mistral.ai/v1`
* Examples:
  * `POST /v1/chat/completions`
  * `POST /v1/fim/completions`
  * `POST /v1/embeddings`
  * `GET /v1/models` [ai.impaxsys.com](https://ai.impaxsys.com/cheatsheets/mistral-api/)
* OpenAPI spec available at docs.mistral.ai/openapi.yaml.

## 4. Free tier limits & pricing

### Le Chat consumer

* Free tier ≈ 25 messages per day on Mistral Medium / Small, includes code interpreter, document uploads, AFP-verified news search. No access to Mistral Large, Flash Answers, No Telemetry, expanded storage. [www.grizzlypeaksoftware.com](https://www.grizzlypeaksoftware.com/articles/p/mistral-ai-pricing-in-2026-pro-costs-free-tier-limits-and-api-rates-lx4o2n2v)
* Pro: $14.99/mo, ~150 messages/day soft cap, access to all models, No Telemetry Mode, 15GB storage, 1,000 projects. Student: $7.04/mo with .edu verification. [www.grizzlypeaksoftware.com](https://www.grizzlypeaksoftware.com/articles/p/mistral-ai-pricing-in-2026-pro-costs-free-tier-limits-and-api-rates-lx4o2n2v)

### API

* Free / Experiment mode: no credit card required. Rate limits enforced per Organization: requests per second, tokens per minute, tokens per month. Exact numbers are not published; view on Admin Panel › Limits. Conservative limits for evaluation/prototyping. [anarlog.so](https://anarlog.so/blog/mistral-api-key/)
* Pay-as-you-go removes evaluation ceilings. Limits scale with cumulative billed amount: Tier 1 → Tier 2 at $20, Tier 3 at $100, Tier 4 at $500. [anarlog.so](https://anarlog.so/blog/mistral-api-key/)
* Per-token pricing 2026, examples:
  * Mistral Small 4: $0.15 /M input, $0.60 /M output
  * Mistral Large 3: $0.50 /M input, $2.00 /M output
  * Mistral Nemo: $0.02 /M input, $0.06 /M output [www.grizzlypeaksoftware.com](https://www.grizzlypeaksoftware.com/articles/p/mistral-ai-pricing-in-2026-pro-costs-free-tier-limits-and-api-rates-lx4o2n2v)
* Batch API: 50% discount for async jobs. [ai.impaxsys.com](https://ai.impaxsys.com/cheatsheets/mistral-api/)

## 5. Registration requirements

* Account creation via console.mistral.ai
* Sign-up options: email address, or faster via Google, GitHub, Microsoft, Apple. [anarlog.so](https://anarlog.so/blog/mistral-api-key/)
* Phone verification: required for email signups to gate Free mode. SMS verification code sent to mobile number; one phone per plan. [anarlog.so](https://anarlog.so/blog/mistral-api-key/)
* No credit card required for Free / Experiment mode. [anarlog.so](https://anarlog.so/blog/mistral-api-key/)
* Pay-as-you-go / paid subscriptions require payment method. Billing page supports payment methods management; no explicit PayPal listing in docs; standard card payments assumed. [docs.mistral.ai](https://docs.mistral.ai/admin/billing-usage/billing)
* Training opt-out: Free mode may use inputs/outputs for model training unless opted out. Pay-as-you-go accounts get training opt-out toggle and Zero Data Retention for stateless endpoints. [anarlog.so](https://anarlog.so/blog/mistral-api-key/)

## 6. Germany geo restrictions

* No documented geo-block for Germany. Mistral AI SAS is a French company; services are offered EU-wide.
* Registration and API access are available from Germany. Phone verification SMS delivery issues reported anecdotally; users have resorted to temporary SMS services for verification. [smsxr.com](https://smsxr.com/services/mistral-ai)
* No official Germany-only restriction or IP block found in current documentation.

## 7. GDPR data residency

* Operational entity for API: Mistral AI SAS, Paris, France. DPA specifies French law and EU GDPR as governing framework. [sota.io](https://sota.io/blog/mistral-ai-eu-native-llm-api-gdpr-no-cloud-act-2026)
* Data processor: Mistral AI SAS, not a US entity. US CLOUD Act direct reach does not apply; any US request would need MLAT with judicial oversight. [sota.io](https://sota.io/blog/mistral-ai-eu-native-llm-api-gdpr-no-cloud-act-2026)
* Inference infrastructure hosted in Europe, primarily France/Germany via providers like Scaleway/OVHcloud. [sota.io](https://sota.io/blog/mistral-ai-eu-native-llm-api-gdpr-no-cloud-act-2026)
* Prompt data not used for training by default; retained 30 days for abuse detection then deleted. Enterprise can request zero retention. [sota.io](https://sota.io/blog/mistral-ai-eu-native-llm-api-gdpr-no-cloud-act-2026)
* EU AI Act compliance engagement noted; model cards published.

## 8. Scopes & token lifecycle

* API key scope = Workspace + Connector access scope. No OAuth scopes.
* No refresh token: API keys are long-lived secrets until expiration/revocation.
* Errors return `object: "error"` with type `authentication_error`, `rate_limit_error`, etc., and Retry-After header on 429. [ai.impaxsys.com](https://ai.impaxsys.com/cheatsheets/mistral-api/)

## 9. Workaround for geo-blocking / German mobile only / no payment

* **Geo-blocking:** Not required. Germany is supported. If IP-based issues occur, using a EU VPN exit node does not circumvent a block as none is documented; VPN is not needed for access.
* **Phone verification without payment:**
  * Use social login via Google/GitHub/Microsoft/Apple to create account; reduces friction vs email + SMS.
  * If SMS verification is required and delivery fails, users report temporary SMS/OTP services available for Mistral AI verification. This is unofficial and risks account security.
  * Free mode requires only email + phone verification; no payment method needed. Keep organization on Free/Experiment mode and avoid enabling pay-as-you-go to avoid card requirement. [anarlog.so](https://anarlog.so/blog/mistral-api-key/)
* **No payment workaround:** Stay on Free mode. Do not add payment method. Rate limits will apply. For higher limits without payment, self-host open-weight models Mistral 7B / Mixtral 8x7B under Apache 2.0 license on EU infrastructure. [sota.io](https://sota.io/blog/mistral-ai-eu-native-llm-api-gdpr-no-cloud-act-2026)

## 10. Citations

* API key auth & headers – [ai.impaxsys.com](https://ai.impaxsys.com/cheatsheets/mistral-api/)
* API keys admin docs – [docs.mistral.ai](https://docs.mistral.ai/admin/identity-access/api-keys)
* First API request quickstart – [docs.mistral.ai](https://docs.mistral.ai/getting-started/quickstarts/developer/first-api-request)
* Free key guide, phone verification, no credit card – [anarlog.so](https://anarlog.so/blog/mistral-api-key/)
* Pricing & free tier limits – [www.grizzlypeaksoftware.com](https://www.grizzlypeaksoftware.com/articles/p/mistral-ai-pricing-in-2026-pro-costs-free-tier-limits-and-api-rates-lx4o2n2v)
* GDPR / CLOUD Act analysis – [sota.io](https://sota.io/blog/mistral-ai-eu-native-llm-api-gdpr-no-cloud-act-2026)
* Billing payment methods – [docs.mistral.ai](https://docs.mistral.ai/admin/billing-usage/billing)

---

*Report generated for DSH integration planning. Verify live documentation before implementation as limits and policies change.*
