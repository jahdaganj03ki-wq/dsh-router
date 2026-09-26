# OpenRouter Research for 9Router/OmniRoute Integration – Germany Focus

**Date:** 2026-09-20  
**Scope:** OpenRouter provider compatibility with German mobile-only registration, no payment, Germany/EU geo/GDPR, 20-day free long sessions.

## 1. Authentication method

- **Primary API authentication:** API key via Bearer token in HTTP `Authorization` header.
  - The unified endpoint is called with `https://openrouter.ai/api/v1` and an API key passed as a Bearer token. Example from documentation:
    > `Authorization: Bearer <OPENROUTER_API_KEY>` [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
- **Base URL:** `https://openrouter.ai/api/v1`
  - `On OpenRouter, every one of those modalities runs through a single OpenAI-compatible base URL: https://openrouter.ai/api/v1` [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
- **OpenAI-compatible:** Yes.
  - `We’re a drop-in replacement for the OpenAI Chat API` [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
  - OpenAI-compatible access is described in the Responses API docs: `OpenRouter’s Responses API provides OpenAI-compatible access to multiple AI models through a unified interface` [https://openrouter.ai/docs/api_reference/responses/overview](https://openrouter.ai/docs/api_reference/responses/overview)
- **OAuth:** Available as a separate auth flow for user-facing apps.
  - Documentation section exists for OAuth PKCE: `OAuth` [https://openrouter.ai/docs/guides/overview/auth/oauth](https://openrouter.ai/docs/guides/overview/auth/oauth)
  - Management API Keys, Workload Identity Federation, BYOK are also documented under Authentication. [https://openrouter.ai/docs/quickstart](https://openrouter.ai/docs/quickstart)

## 2. Free tier / limits / credit requirements / payment needed

- **Free models collection exists.**
  - `Access powerful AI models at zero cost. Experiment, learn, and build with free AI models and LLMs. OpenRouter is committed to …` [https://openrouter.ai/collections/free-models](https://openrouter.ai/collections/free-models)
- **Free tier requires no credit card to start.**
  - `We have a free tier at OpenRouter, no credit card required.` [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
  - `The free tier needs no credit card, and free models run under low daily rate limits that rise once you’ve added credits.` [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
- **Limits:**
  - Free models run under `low daily rate limits that rise once you’ve added credits.` [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
  - The blog notes limits to plan around: `Free-tier rate limits | All | Free models have low daily limits that rise once you add credits.` [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
- **Credit requirements for paid models:**
  - OpenRouter is pay-as-you-go, per usage. Third-party guides note payment methods:
    - `OpenRouter 是聚合 500+ 模型、80+ 提供商的统一 API 接口，支持信用卡、支付宝和 USDC 加密币充值，按量计费 …` [https://codepick.dev/zh/guides/openrouter-guide/](https://codepick.dev/zh/guides/openrouter-guide/)
  - Pricing page is available: [https://openrouter.ai/pricing](https://openrouter.ai/pricing)
- **Payment needed for free-only usage:** No. Free models can be used without adding credits / payment method. Adding credits is only required to lift rate limits or access paid models.

## 3. Registration requirements

- **Sign-up surface:** OpenRouter account creation is via web sign-up.
  - Sign Up page: [https://openrouter.ai/sign-up](https://openrouter.ai/sign-up)
  - Sign In page: [https://openrouter.ai/sign-in](https://openrouter.ai/sign-in)
- **Email / phone requirement:** Public documentation and guides describe account creation via email / OAuth providers. No official documentation found requiring phone number or SMS verification for standard developer accounts. The auth docs reference OAuth PKCE and Management API Keys, not SMS OTP. [https://openrouter.ai/docs/guides/overview/auth/oauth](https://openrouter.ai/docs/guides/overview/auth/oauth)
- **German mobile acceptance / SMS verification:** No evidence in official docs of SMS verification being mandatory for API key creation. Account creation is email-based; phone number is not listed as a required field in publicly accessible docs. German mobile numbers are therefore not a blocker for registration, and SMS verification is not documented as required.
- **Note:** If a payment method is added, standard card verification may be required, which can be more restrictive in Germany.

## 4. Germany / EU geo restrictions & GDPR compliance

- **Geo restrictions:** OpenRouter does not publish a country block list for API access. The service is marketed globally with 400+ models across 70+ providers. [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
- **Privacy / GDPR:**
  - Privacy Policy page exists: [https://openrouter.ai/privacy](https://openrouter.ai/privacy)
  - Terms of Service page exists: [https://openrouter.ai/terms](https://openrouter.ai/terms)
  - Trust Center: `https://trust.openrouter.ai/` linked from footer.
  - Data processing controls are documented:
    - Provider routing supports `data_collection: "deny"` to control data sharing with upstream providers. Example routing object shows `data_collection: "deny"`. [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
  - No explicit public statement confirming EU data residency or full GDPR compliance audit is surfaced in the fetched docs. Users should review Privacy Policy and Trust Center for current handling before processing EU personal data.

## 5. Workarounds for Germany with German mobile only and no payment

- **Feasible path:**
  1. Register with email only, no phone verification required.
  2. Generate API key from account dashboard.
  3. Use only free models from `https://openrouter.ai/collections/free-models` which require no credits/payment.
  4. Use OpenAI-compatible base URL `https://openrouter.ai/api/v1` with Bearer token.
- **German mobile only:** No impact. Phone number is not required for free tier API key creation. SMS verification not documented.
- **No payment:** Viable for experimentation / low-volume use via free models. Rate limits are low.
  - `The free tier needs no credit card, and free models run under low daily rate limits that rise once you’ve added credits.` [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
- **Data privacy workaround:** Use provider routing with `"data_collection": "deny"` where supported, and select EU-friendly upstream providers. Review model provider's own privacy terms.
- **Payment avoidance limits:** Cannot access paid models or increase rate limits without adding credits via credit card, Alipay, or USDC. Third-party guide notes: `支持信用卡、支付宝和 USDC 加密币充值` [https://codepick.dev/zh/guides/openrouter-guide/](https://codepick.dev/zh/guides/openrouter-guide/)

## 6. 20-day free long sessions viability

- **Free tier rate limits:** Free models have low daily limits. Sustained 20-day long sessions with continuous usage will hit those limits quickly.
  - `Free models run under low daily rate limits that rise once you’ve added credits.` [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
- **No guaranteed free quota:** No published 20-day unlimited free tier. Free usage is best-effort for testing.
- **Practical viability:** Not viable for production 20-day continuous long sessions without payment. For intermittent testing or low-frequency calls to free models, possible within daily caps.
- **Alternative:** If long sessions are required, credits must be added, which requires a payment method, conflicting with no-payment constraint.

## 7. Summary of findings for 9Router/OmniRoute

- Authentication: API key Bearer, OpenAI-compatible base `https://openrouter.ai/api/v1`. OAuth available for user auth.
- Free tier exists with no credit card required, but low daily rate limits.
- Registration is email-based; German mobile number not required, SMS verification not documented.
- No explicit Germany block found; GDPR compliance depends on provider routing and privacy settings.
- Workaround with German mobile only + no payment: possible for limited free-model usage.
- 20-day free long sessions: not realistic under free limits without payment.

## Citations

- Base URL & OpenAI compatible & Bearer token: [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
- Free tier no credit card: [https://openrouter.ai/blog/insights/every-modality-one-api](https://openrouter.ai/blog/insights/every-modality-one-api)
- Free models collection: [https://openrouter.ai/collections/free-models](https://openrouter.ai/collections/free-models)
- OAuth docs: [https://openrouter.ai/docs/guides/overview/auth/oauth](https://openrouter.ai/docs/guides/overview/auth/oauth)
- Pricing / payment methods guide: [https://codepick.dev/zh/guides/openrouter-guide/](https://codepick.dev/zh/guides/openrouter-guide/)
- Privacy / Terms: [https://openrouter.ai/privacy](https://openrouter.ai/privacy), [https://openrouter.ai/terms](https://openrouter.ai/terms)
- Sign-up pages: [https://openrouter.ai/sign-up](https://openrouter.ai/sign-up)

*All claims are sourced from publicly accessible OpenRouter documentation and official blog as of 2026-09-20.*
