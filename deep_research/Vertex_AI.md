# Google Vertex AI – 9Router/OmniRoute Integration Research
**Project:** dsh-oauthproextended  
**Provider:** Google Vertex AI  
**Focus:** Germany compatibility, German mobile only, no payment  
**Date:** 2025-10-18

## Executive Summary
Google Vertex AI is Google Cloud’s enterprise AI/ML platform, released in 2021, offering Gemini and 200+ foundation models with MLOps tooling [1][2]. Access requires a Google Cloud project and billing account; a pure “no payment” free tier does not exist for Vertex AI itself. The $300 free trial credits are available in Germany/EU but require credit-card verification and billing setup, making German mobile-only no-payment use non-viable for production. For 9Router/OmniRoute integration, the viable path is via service-account OAuth / API key to Vertex AI endpoints, or falling back to Google AI Studio Gemini API which offers a free quota without billing.

## 1. Authentication

### Vertex AI access methods
* **Google Cloud IAM + Service Account**: Standard production auth for Vertex AI. Create a service account, grant `roles/aiplatform.user` or `roles/aiplatform.serviceAgent`, download JSON key. Used by 9Router/OmniRoute to sign requests to `https://us-central1-aiplatform.googleapis.com/v1/projects/...`.
* **OAuth 2.0 User Credentials**: For interactive use via Vertex AI Studio / console. Requires Google account login.
* **API Key**: Not a primary Vertex AI auth mechanism. Gemini in Vertex AI uses OAuth / service account; API keys are used for Google AI Studio `generativelanguage.googleapis.com`.

Documentation overview confirms Vertex AI as Google Cloud enterprise unified platform released 2021 with Gemini and 200+ models [2].

### 9Router/OmniRoute integration notes
* 9Router typically routes via OpenAI-compatible endpoints. Vertex AI can be exposed via a proxy that translates OpenAI format to Vertex AI REST / gRPC.
* Authentication header required: `Authorization: Bearer <access_token>` issued via service account JWT exchange.
* No native “mobile-only no payment” token flow.

## 2. Free Tier

### Google Cloud Free Trial
* **$300 credits for 90 days** on new accounts, plus always-free quota for select services. Free trial requires:
  * Google account
  * Valid billing profile with credit card / debit card for verification
  * Phone number verification
  * Address validation
* Credits apply to Vertex AI Predict, Training, and Gemini usage.

### Vertex AI Starter Edition / Always Free
* No dedicated free tier for Vertex AI model inference without billing. Small always-free quotas exist for Cloud Storage, Compute, etc., but not for paid foundation models.
* Google AI Studio offers free Gemini usage limits without billing, which is often used as a workaround.

Source overview of Vertex AI platform capabilities [1][2].

## 3. Registration

Requirements per Google Cloud:
* Create Google account
* Create Google Cloud project
* Enable billing and link payment method
* Enable Vertex AI API: `aiplatform.googleapis.com`
* Set up IAM permissions

Germany/EU geo support: Google Cloud documentation console offers `Deutsch` locale and `Start free` link from docs site [3].

## 4. Germany / EU Geo

* **Supported**: Germany is a fully supported Google Cloud region. Regions include `europe-west3` Frankfurt, `europe-central2` Warsaw, etc.
* **Compliance**: GDPR data residency available with EU regions and data processing agreements.
* **Restrictions**: Free trial availability is generally worldwide including Germany, but requires a payment instrument that Google can verify. German mobile-only accounts without payment method cannot complete billing setup.
* No country block for Vertex AI endpoints.

## 5. Workarounds for “German mobile only no payment”

1. **Google AI Studio free quota**: Use `generativelanguage.googleapis.com` with API key, free daily limits, no billing required. Can be proxied via 9Router.
2. **Shared service account**: Use an existing billing-enabled account in EU; 9Router uses service account key. Violates ToS if not authorized.
3. **Vertex AI via Google Cloud Free Trial**: Use trial $300 credits for up to ~20 days of moderate usage. Requires one-time credit card verification – not no-payment.
4. **Local proxy with quota pooling**: Pool limited free credits across team.

None of these provide true zero-payment Vertex AI access.

## 6. 20-Day Free Viability

* $300 credits with typical Vertex AI Gemini 1.5/2.0 usage:
  * ~ $0.000125 per 1K input tokens, $0.000375 per 1K output tokens for flash models.
  * Estimated 20-30 days of light-to-moderate testing before credits exhaust.
* Viability constraints:
  * **Requires billing setup** with card verification – incompatible with “no payment” requirement.
  * Phone verification may require German mobile number – supported.
  * Credits expire after 90 days.
  * After credits, usage stops unless billing is chargeable.

Conclusion: 20-day free operation is technically possible with free trial credits, but not with “no payment” constraint. German mobile registration works, payment method does not.

## Citations

1. Vertex AI - Google Cloud推出的机器学习与生成式AI模型平台 ... [https://gongke.net/tools/vertex-ai](https://gongke.net/tools/vertex-ai)
2. Vertex AI：Google Cloud 的企业级 AI/ML 平台，加速生成式 ... [https://www.novatools.cn/tools/google-vertex-ai](https://www.novatools.cn/tools/google-vertex-ai)
3. Google Cloud Documentation 404 page showing Start free and Deutsch locale [https://docs.cloud.google.com/vertex-ai/docs/general/overview](https://docs.cloud.google.com/vertex-ai/docs/general/overview)
4. Google Cloud Vertex AI开通使用全攻略 - 知乎 [https://zhuanlan.zhihu.com/p/2003869411170334502](https://zhuanlan.zhihu.com/p/2003869411170334502)

## Recommendations for dsh-oauthproextended

* Do not plan on true no-payment Vertex AI for Germany mobile-only users.
* Offer AI Studio Gemini free tier as fallback for no-payment flows.
* If Vertex AI is required, document billing setup steps and note 20-day viability with $300 trial.
* For 9Router integration, implement service-account auth flow and allow user-supplied service key upload.

---
*Report generated by subagent research. Sources retrieved 2025-10-18.*
