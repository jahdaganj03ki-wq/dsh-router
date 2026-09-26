# Fireworks AI Research Report for 9Router / OmniRoute Integration – Germany Compatibility

**Project:** dsh-oauthproextended  
**Provider:** Fireworks AI  
**Focus:** Germany compatibility with German mobile number only, no payment  
**Date:** 2026-08-14

## 1. Authentication method, API key / OAuth, Base URL

* Authentication for the Fireworks AI REST API requires an `Authorization` header with a valid `Bearer` token using your API key, along with `Content-Type: application/json`. [https://docs.fireworks.ai/api-reference/introduction](https://docs.fireworks.ai/api-reference/introduction)
* An API key can be obtained via the `firectl api-key create` command or generated through the Fireworks AI dashboard at https://app.fireworks.ai/settings/users/api-keys. [https://docs.fireworks.ai/api-reference/introduction](https://docs.fireworks.ai/api-reference/introduction)
* No OAuth flow is documented for API access; authentication is API-key Bearer only. Provider documentation notes the provider keeps Fireworks credentials isolated and reads `FIREWORKS_API_KEY`. [https://docs.pipecat.ai/api-reference/server/services/llm/fireworks](https://docs.pipecat.ai/api-reference/server/services/llm/fireworks)
* Base URL for OpenAI-compatible inference:
  * Base URL: `https://api.fireworks.ai/inference/v1` [https://www.promptfoo.dev/docs/providers/fireworks/](https://www.promptfoo.dev/docs/providers/fireworks/)
  * The REST API base URL is `https://api.fireworks.ai/inference/v1` and all requests require a Bearer token. [https://dlthub.com/context/source/fireworks-ai](https://dlthub.com/context/source/fireworks-ai)
* API format is OpenAI-compatible `/chat/completions`, `/embeddings`. [https://www.promptfoo.dev/docs/providers/fireworks/](https://www.promptfoo.dev/docs/providers/fireworks/)

**9Router / OmniRoute relevance:** 9Router lists a Fireworks AI provider `open-sse/providers/registry/fireworks.js` with models that are currently reported deprecated/unavailable in issue #2139. [https://github.com/decolua/9router/issues/2139](https://github.com/decolua/9router/issues/2139) OmniRoute supports Fireworks as one of 352 providers via one OpenAI-compatible endpoint. [https://omniroute.online/](https://omniroute.online/)

## 2. Free tier – details, limits, requires payment?

* Serverless inference pricing page states: “Get started with $1 in free credits.” [https://fireworks.ai/pricing](https://fireworks.ai/pricing)
* Free access description: “Fireworks gives new accounts $1 in free starter credits to test serverless inference”. [https://pricepertoken.com/endpoints/fireworks/free](https://pricepertoken.com/endpoints/fireworks/free)
* Account quotas:
  * No payment method or no credits → 10 RPM
  * Payment method and active credits → 6,000 RPM ceiling [https://docs.fireworks.ai/guides/quotas_usage/account-quotas](https://docs.fireworks.ai/guides/quotas_usage/account-quotas)
  * Rate Limit (No Card) 10 req/min without a payment method; rises to a 6,000 req/min ceiling after adding a card/credits. [https://pricepertoken.com/endpoints/fireworks/free](https://pricepertoken.com/endpoints/fireworks/free)
* Billing migration to prepaid:
  * Starting July 1st 2026, Fireworks is moving all self-serve accounts to prepaid billing. Credits are used first for all usage. [https://fireworks.ai/blog/billing-migration-to-prepaid](https://fireworks.ai/blog/billing-migration-to-prepaid)
  * If balance reaches $0 and auto reload is off, usage pauses until credits are added. [https://fireworks.ai/blog/billing-migration-to-prepaid](https://fireworks.ai/blog/billing-migration-to-prepaid)
* What happens when $1 credit finishes:
  * Without payment method: account will be suspended until you add a payment method. [https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit](https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit)
  * With payment method: add credits to continue usage; account-wide request limits and serverless TPM upper bounds increase with spend tier. [https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit](https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit)
* Payment Method Requirements: Adding a payment method is required to continue service after credit depletion. [https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit](https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit)
* Credit card required for free $1 credit: No for the $1 credit; card needed to lift the 10 req/min cap. [https://pricepertoken.com/endpoints/fireworks/free](https://pricepertoken.com/endpoints/fireworks/free)

Conclusion: Free tier exists with $1 starter credits, no card needed to create account and use credits, but rate limited to 10 RPM. Continued use after $1 exhausts requires payment method and credit top-up.

## 3. Registration – email / phone requirements, German mobile acceptance, SMS verification

* Sign up page: Create an account on Fireworks AI. [https://app.fireworks.ai/signup](https://app.fireworks.ai/signup)
* Privacy Notice lists information you directly submit: “Contact Information. Basic contact details, such as name, address, phone number, and email.” [https://fireworks.ai/privacy-policy](https://fireworks.ai/privacy-policy)
* Account Information collected: name, username, email and password. [https://fireworks.ai/privacy-policy](https://fireworks.ai/privacy-policy)
* No public documentation mandates phone number or SMS verification for account creation. Guides for adding users reference email-based invites: `firectl user create --email="alice@example..."` [https://docs.fireworks.ai/accounts/users](https://docs.fireworks.ai/accounts/users)
* How to get API key guides describe login with email address and verify account to access dashboard; no phone/SMS step is described. [https://www.getmaxim.ai/bifrost/guides/api-keys/how-to-get-a-fireworks-api-key](https://www.getmaxim.ai/bifrost/guides/api-keys/how-to-get-a-fireworks-api-key)

German mobile number only: Registration does not require phone number. Email-based signup is sufficient. German mobile acceptance is therefore not a blocker; phone is not required and SMS verification is not documented.

## 4. Germany / EU geo restrictions, GDPR compliance

* US-only Serverless: “Serverless serves inference exclusively from the US, making it a good fit for compliance needs.” [https://docs.fireworks.ai/serverless/us-only-serverless](https://docs.fireworks.ai/serverless/us-only-serverless)
* Serverless serves inference exclusively from the US. [https://docs.fireworks.ai/serverless/us-only-serverless](https://docs.fireworks.ai/serverless/us-only-serverless)
* Data residency documentation exists: Account admins can set data residency in the Fireworks console at Settings → Governances → Data Residency. [https://docs.fireworks.ai/accounts/data-residency](https://docs.fireworks.ai/accounts/data-residency)
* GDPR compliance profile:
  * Fireworks AI GDPR compliance: EU data residency, DPA available, training on customer data no. Verified 2026-04-07. [https://infercheck.eu/en/provider/fireworks-ai](https://infercheck.eu/en/provider/fireworks-ai)
* Privacy Notice:
  * Key commitments: No AI Training on Your Data; You Control Your Data; Zero Data Retention. [https://fireworks.ai/privacy-policy](https://fireworks.ai/privacy-policy)
  * Personal data processing includes cross-border transfer to countries outside the jurisdiction, including US servers. [https://fireworks.ai/privacy-policy](https://fireworks.ai/privacy-policy)
  * For EEA/UK users, the European Commission’s model contracts for the transfer of personal information to third countries (i.e., the standard contractual clauses) are referenced. [https://fireworks.ai/privacy-policy](https://fireworks.ai/privacy-policy)
  * GDPR Local appointed as privacy representative for EEA/EU and UK. [https://fireworks.ai/privacy-policy](https://fireworks.ai/privacy-policy)
* Data security page maps controls to GDPR, CCPA, and other international data protection frameworks. [https://docs.fireworks.ai/guides/security_compliance/data_security](https://docs.fireworks.ai/guides/security_compliance/data_security)

Geo restriction summary: General serverless inference is globally accessible but runs primarily in US regions. US-only serverless option exists. EU data residency is available for enterprise accounts; standard free accounts process data in US with SCCs.

## 5. Workarounds for Germany with German mobile only, no payment

* Account creation does not require phone/SMS; email signup suffices. German mobile number is not needed.
* Free $1 starter credits can be used without adding a payment method initially. Rate limit is 10 RPM, no card required for the $1 credit. [https://pricepertoken.com/endpoints/fireworks/free](https://pricepertoken.com/endpoints/fireworks/free)
* After $1 credit is exhausted without a payment method, account will be suspended until a payment method is added. [https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit](https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit)
* Workarounds:
  1. Use email-only registration with a German email provider; no German mobile required.
  2. Use the $1 free credit for evaluation / limited routing tests via 9Router/OmniRoute with rate limit 10 RPM.
  3. Avoid adding payment method to stay within “no payment” constraint; accept suspension after credit depletion.
  4. For longer use without payment, rely on alternative free credit programs, e.g., AMD AI Developer Program offers $50 free credits with no credit card requirement. [https://www.studentoffers.co/blog/amd-ai-developer-program-fireworks-credits](https://www.studentoffers.co/blog/amd-ai-developer-program-fireworks-credits)
  5. Route traffic through 9Router fallback chain to only hit Fireworks when cheaper/free, minimizing credit burn.
* GDPR concern: Standard free accounts default to US processing. If EU data residency is required for German users, an enterprise contract with data residency setting is needed, which implies payment and DPA.

## 6. 20-day free long sessions viability

* Free tier provides $1 credit. Actual session length depends on model pricing and request volume. With 10 RPM rate limit and per-token pricing, $1 is exhausted quickly under sustained use.
* Prepaid billing migration requires credit balance to remain positive; otherwise usage pauses. [https://fireworks.ai/blog/billing-migration-to-prepaid](https://fireworks.ai/blog/billing-migration-to-prepaid)
* Without payment method, account is suspended after $1 credit finishes, preventing continuation. [https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit](https://docs.fireworks.ai/faq-new/billing-pricing/what-happens-when-i-finish-my-1-dollar-credit)
* Long sessions of 20 days with no payment are not viable on the standard free tier. Possible only with external free credit promotions or by keeping usage extremely low to stretch $1 over 20 days, which is impractical for interactive long sessions.
* 20-day free long sessions viability: Not sustainable without payment or additional free credits.

## 7. Integration notes for 9Router / OmniRoute

* Fireworks AI is OpenAI-compatible, so 9Router/OmniRoute can route to `https://api.fireworks.ai/inference/v1` using an API key. [https://www.promptfoo.dev/docs/providers/fireworks/](https://www.promptfoo.dev/docs/providers/fireworks/)
* 9Router currently reports Fireworks models as deprecated/unavailable in the provider registry. [https://github.com/decolua/9router/issues/2139](https://github.com/decolua/9router/issues/2139)
* OmniRoute supports Fireworks among 352 providers. [https://omniroute.online/](https://omniroute.online/)

## Citations summary

All claims above are supported by the sources cited inline.

---

*Report generated from public documentation and third-party compliance profiles as of 2026-08-14.*
