# OpenCode Free Provider – DSH Integration Research Report

**Date:** 2026-09-24  
**Scope:** OpenCode Zen / OpenCode.ai provider as used for DeepSeek Harness (DSH) integration. Focus on authentication, free tier, registration, geo / GDPR, API surface, and Germany-specific workarounds.

## 1. Provider Overview

OpenCode is an open-source AI coding agent. The commercial gateway for verified models is **OpenCode Zen**.
* “OpenCode 是一个开源代理，帮助您在终端、IDE 或桌面端编写代码。” [https://opencode.ai/zh](https://opencode.ai/zh)
* Zen: “为编程代理打造的可靠、优化模型” – curated model list tested by OpenCode. [https://opencode.ai/zh/zen](https://opencode.ai/zh/zen)

Zen is optional: “Zen 的工作方式与 OpenCode 中的任何其他提供商相同。你登录 OpenCode Zen 并获取 API 密钥。它是完全可选的，即使不用它，你也可以照常使用 OpenCode。” [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)

## 2. Login / Authentication Method

* **Sign-in entry:** `https://opencode.ai/auth`  
  “开始使用 Zen” links to `/auth`. [https://opencode.ai/zh/zen](https://opencode.ai/zh/zen)
* **How it works:**  
  1. 登录 OpenCode Zen，添加你的账单信息，然后复制你的 API 密钥。  
  2. 在客户端中粘贴 API 密钥。  
  [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
* **API authentication:** Bearer token in HTTP Authorization header.  
  Example from docs:  
  `curl https://opencode.ai/zen/v1/systemone -H "Authorization: Bearer $OPENCODE_API_KEY" …` [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
* **OAuth endpoints:** No public OAuth / OIDC endpoints documented for Zen. Authentication is API-key based, not OAuth 2.0 Authorization Code / PKCE.
* **Token refresh:** API key is static long-lived. No refresh token flow documented. Key rotation is manual in account settings.

## 3. API Base URLs & Scopes

Base domain: `https://opencode.ai/zen/v1`

Endpoints documented:

* Model list: `https://opencode.ai/zen/v1/models`  
  “你可以从以下地址获取可用模型及其元数据的完整列表： https://opencode.ai/zen/v1/models” [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
* OpenAI-compatible responses: `https://opencode.ai/zen/v1/responses`
* Anthropic-compatible messages: `https://opencode.ai/zen/v1/messages`
* OpenAI-compatible chat completions: `https://opencode.ai/zen/v1/chat/completions`
* System One / Jev: `https://opencode.ai/zen/v1/systemone`

Model IDs use `opencode/<model-id>` format in OpenCode config:  
“在你的 OpenCode 配置中，模型 ID 使用 `opencode/<model-id>` 格式。” [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)

Scopes / permissions: Not documented as OAuth scopes. Access control is at workspace / model enable/disable level:
* Admin can enable/disable specific models per workspace. [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
* Roles: Admin – manage models, members, API keys, billing; Member – manage own API keys. [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)

## 4. Free Tier / Pricing

Zen is pay-as-you-go with optional free models.

* **Initial funding:** “注册并充值 $20 - 遵循 设置说明” [https://opencode.ai/zh/zen](https://opencode.ai/zh/zen)
* Auto-recharge: “如果你的余额低于 $5，Zen 将自动充值 $20。” [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
* Monthly limits configurable per workspace/member. [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)

**Free models – limited time free, no per-token charge:**

* Big Pickle – Free
* MiMo-V2.5 Free – Free
* Ling 3.0 Flash Fin Free – Free
* Nemotron 3 Ultra Free – Free
* Nemotron 3.5 Lightning Free – Free
* Muse Spark 1.3 Contributor Free – Free
* Jev 1.13 Free – 免费

Pricing table shows Free / Free / Free for those models. [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)

Free model notes:
* “MiMo-V2.5 Free 目前在 OpenCode 上限时免费提供。” [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
* Similar notes for Ling, Nemotron, Big Pickle, Muse Spark Contributor Free, Jev 1.13 Free. [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)

**Important limitation:** To obtain an API key you must create an account and add billing information. The docs state “登录 OpenCode Zen，添加你的账单信息，然后复制你的 API 密钥。” [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)  
Thus “free provider” usage in practice requires an account with payment method on file, even if you only call free models.

## 5. Registration Requirements

Public docs list:

* Account creation via `https://opencode.ai/auth`.
* Billing information required for Zen activation.
* Payment processor: Stripe, Inc.  
  “Currently, we use Stripe, Inc. as our Payment Processor.” [https://opencode.ai/zh/legal/terms-of-service](https://opencode.ai/zh/legal/terms-of-service)
* Stripe Terms of Service and Privacy Policy referenced. [https://opencode.ai/zh/legal/terms-of-service](https://opencode.ai/zh/legal/terms-of-service)

No explicit requirement for phone number or PayPal found in public documentation. Privacy Policy collects:
* Profile/Contact Data: first/last name, email, phone number, mailing address.
* Payment Data: financial account information, payment card type, full number, last 4, bank account, billing address/phone/email. [https://opencode.ai/zh/legal/privacy-policy](https://opencode.ai/zh/legal/privacy-policy)

Phone is listed as collected category, not mandatory for sign-up in docs. PayPal is not mentioned; Stripe card is primary.

## 6. Germany Geo-Restrictions, GDPR & Data Residency

* **Hosting location:** “我们所有模型都托管在 US。” [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
* Privacy Policy is US-state focused: CCPA, CPA, CTDPA, DPDPA, ICPA, MCDPA, NDPA, NHPA, NJPA, OCPA, TDPSA, UCPA, VCDPA. No dedicated GDPR section found in fetched pages.
* Data processing notes:
  * Providers follow zero-retention policy, except exceptions listed. [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
  * OpenAI APIs retain requests 30 days per OpenAI Data Policies. [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
  * Anthropic APIs retain requests 30 days per Anthropic Data Policies. [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
  * NVIDIA free endpoints: “仅供试用 — 请勿提交个人或机密数据。” [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
* No public statement of EU data residency or GDPR Standard Contractual Clauses found in the reviewed pages.

Geo-blocking: No official geo-restriction list published. Access to `opencode.ai/auth` and API is generally IP-accessible. Payment via Stripe may be region-restricted by card issuer / Stripe availability.

## 7. Workaround for Germany with German mobile only, no payment

Constraints:
* Account creation for Zen requires billing info on file per docs. Free models still require an API key, which requires account + billing.
* No documented free sign-up without payment method.

Possible practical approaches:

1. **Use free models without paid usage**  
   Create account via email, add payment method. If the service allows zero-balance usage for free models, you can set monthly limit to $0 and disable auto-recharge. Docs allow monthly limits: “你还可以为整个工作区以及团队中的每位成员设置月度使用限额。” [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
   Risk: Account creation may still require valid card; Stripe may decline German prepaid cards without billing address verification.

2. **VPN to US**  
   If access to auth portal or API is IP-blocked in Germany, using a VPN exit in US/EU typically resolves it. No explicit block documented, but VPN is standard mitigation for Stripe 3DS / geo-fraud checks.

3. **Avoid Zen entirely**  
   OpenCode core is open source and can run with self-hosted models or other providers. The free models are Zen-specific. If no payment is possible, use OpenCode with local models or other free LLM providers supported by the agent.

4. **Alternative payment**  
   Stripe supports German cards and SEPA. PayPal is not mentioned. No evidence PayPal is supported. Phone verification not required per docs.

Recommendation: Confirm with support `help@anoma.ly` whether an account can be created with zero balance for free models only, and whether German mobile number / no credit card is acceptable. Current public docs require billing info.

## 8. Limitations & Gaps

* No OAuth endpoints documented.
* No explicit GDPR / EU data residency commitment found.
* No public documentation on Germany-specific restrictions or phone/PayPal requirements.
* Free tier is time-limited promotional, not a guaranteed perpetual free plan.

## 9. Citations

* OpenCode homepage & Zen overview: [https://opencode.ai/zh](https://opencode.ai/zh)
* Zen landing: [https://opencode.ai/zh/zen](https://opencode.ai/zh/zen)
* Zen docs – how it works, endpoints, pricing, privacy: [https://opencode.ai/docs/zh-cn/zen/](https://opencode.ai/docs/zh-cn/zen/)
* Privacy Policy: [https://opencode.ai/zh/legal/privacy-policy](https://opencode.ai/zh/legal/privacy-policy)
* Terms of Service – Stripe payment processor: [https://opencode.ai/zh/legal/terms-of-service](https://opencode.ai/zh/legal/terms-of-service)

---
*Report generated by research subagent. Send result to parent agent for DSH integration planning.*
