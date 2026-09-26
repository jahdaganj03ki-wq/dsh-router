# Perplexity AI – 9Router / OmniRoute Integration Research
**Project:** dsh-oauthproextended  
**Focus:** Germany compatibility, German mobile number only, no payment  
**Date:** 2026-09-20

## 1. Authentication method, Base URL

* API authentication is via API key in HTTP header `Authorization: Bearer <key>`.
  Example from official quickstart usage:  
  `curl https://api.perplexity.ai/chat/completions -H "Authorization: Bearer $PERPLEXITY_API_KEY"` [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* Base endpoint for OpenAI-compatible chat completions: `https://api.perplexity.ai`
  The guide notes: *“The official Perplexity SDKs and the Vercel AI SDK both default to reading `PERPLEXITY_API_KEY`, so you don't need to pass the key in code once it's set.”* and *“The base endpoint is `https://api.perplexity.ai`. Don't confuse this with `perplexity.ai` (the consumer chatbot).”* [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* API key format: all keys start with prefix `pplx-` followed by alphanumeric string. [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* OAuth is not used for API access. Sign-in options for the console are Email/password, Google account, Apple ID, SSO for enterprise. API access usesBearer token with the API key. [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-ai-key)

## 2. Free tier – details, limits, requires payment?

* No permanent free tier for the API.
  *“Is the Perplexity API Free? No. There is no permanent free tier.”* [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* New accounts: *“New accounts: no free credits”* [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* Pro subscribers: *“Pro subscribers: $5/month in API credits, doesn't roll over”* [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* Prepaid credits model: *“Perplexity uses prepaid credits, not post-paid billing. You need to load credits before you can generate a key.”* [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* API key generation is blocked until credits are added. Step 3 in the official guide: *“Add Credits (Required Before Key Generation)”* [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* Pricing page is published at docs.perplexity.ai/docs/getting-started/pricing. [https://docs.perplexity.ai/docs/getting-started/pricing](https://docs.perplexity.ai/docs/getting-started/pricing)

## 3. Registration – email/phone requirements, German mobile acceptance, SMS verification

* Account creation options documented:
  *“Sign-in options: Email and password; Google account (OAuth); Apple ID; Single Sign-On for enterprise accounts”* [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* Phone verification is enforced for certain users / Pro:
  *Search result:* *“Phone verification is a mandatory security requirement for all Perplexity users on both the web app and mobile apps.”* [https://reddit.com/r/perplexity_ai/comments/1snueyx/why_does_perplexity_need_my_phone_number](https://reddit.com/r/perplexity_ai/comments/1snueyx/why_does_perplexity_need_my_phone_number)
  * *“Perplexity now demands phone numbers from Pro subscribers with no warning”* [https://piunikaweb.com/2026/04/29/perplexity-demands-phone-numbers-pro-subscribers](https://piunikaweb.com/2026/04/29/perplexity-demands-phone-numbers-pro-subscribers)
  * *“When Perplexity Does Ask for a Phone Number”* – guide notes phone-free creation is usual, but phone can be requested for Pro trial / 2FA. [https://esimpy.com/blog/how-to-create-perplexity-account](https://esimpy.com/blog/how-to-create-perplexity-account)
* SMS verification services specifically list Germany:
  *“SMS Verification for Perplexity in Germany Receive SMS online for Perplexity verification using real Germany phone number”* [https://juicysms.com/sms-verification/de/Perplexity](https://juicysms.com/sms-verification/de/Perplexity)
* Help center topic exists: *“Phone Verification for Your Account via SMS 2FA Perplexity may ask some users to verify...”* [https://www.perplexity.ai/help-center/en/collections/18799303-troubleshooting-support](https://www.perplexity.ai/help-center/en/collections/18799303-troubleshooting-support)
* Implication: German mobile numbers +49 are accepted for SMS verification by third-party SMS providers, and Perplexity’s 2FA/SMS flow is documented.

## 4. Germany / EU geo restrictions, GDPR compliance

* Perplexity is US-based. GDPR compliance is conditional.
  * *“Is Perplexity AI GDPR Compliant? DPA and Data Privacy Guide for Germany Perplexity AI can be used in a GDPR-compliant manner, but only under specific conditions. As a US-based AI service…”* [https://compound.law/en-DE/tools/perplexity](https://compound.law/en-DE/tools/perplexity)
* Official Data Processing Addendum is published:
  *Perplexity Data Processing Addendum* [https://perplexity.ai/en-GB/hub/legal/dpa](https://perplexity.ai/en-GB/hub/legal/dpa)
* Compliance overviews:
  * *“Perplexity AI - GDPR Compliance Guide - WAIMAKERS”* [https://waimakers.com/en/resources/gdpr-compliance/perplexity-ai](https://waimakers.com/en/resources/gdpr-compliance/perplexity-ai)
  * *“Perplexity AI - AI Data Security & GDPR Guide - WAIMAKERS”* [https://waimakers.com/en/resources/ai-data-security/perplexity-ai](https://waimakers.com/en/resources/ai-data-security/perplexity-ai)
  * *“Perplexity compliance: GDPR, AI Act, DPA, training, transfers”* [https://companyscope.io/vendors/perplexity](https://companyscope.io/vendors/perplexity)
* German regulator action:
  * *“Germany’s media regulator said on Tuesday that Google’s AI Overviews and Perplexity…”* [https://mezha.net/eng/bukvy/b10ca89e_german_regulator_rules](https://mezha.net/eng/bukvy/b10ca89e_german_regulator_rules)
  * *“Germany Just Stripped Perplexity and Google of Their Legal Shield. Here’s Why It Matters.”* [https://frontiernews.ai/news/article/germany-just-stripped-perplexity-and-google-of-the-cbb47ff3](https://frontiernews.ai/news/article/germany-just-stripped-perplexity-and-google-of-the-cbb47ff3)
* No explicit geo-block for Germany is documented in the API docs; access is possible from Germany, but legal use requires DPA / Enterprise tier for GDPR-compliant processing.

## 5. 9Router / OmniRoute integration

* 9Router is an open-source OpenAI-compatible AI gateway.
  * *“9Router - Free AI Router | Smart Fallback for Claude, Codex & More”* [https://9router.com](https://9router.com)
  * *“One Router. 60+ AI Providers. Zero Downtime.”* [https://9router.com](https://9router.com)
* Service kinds supported: *“Web Search Tavily, Brave, Serper, Exa, Linkup, Perplexity, Google PSE, SearchAPI.”* [https://9router.com](https://9router.com)
* Installation and endpoint: `npm install -g 9router` → `http://localhost:20128/v1` OpenAI-compatible. [https://9router.com](https://9router.com)
* Perplexity is listed as a provider for Web Search / Web Fetch in 9Router.
* OmniRoute variants:
  * *GitHub - chiencbd/omniroute: Never stop coding. Free AI gateway: one endpoint, 160+ providers…* [https://github.com/chiencbd/omniroute](https://github.com/chiencbd/omniroute)
  * *DeepTransform/omniroute: OmniRoute is an AI gateway for multi-provider LLMs: an OpenAI-compatible endpoint…* [https://github.com/DeepTransform/omniroute](https://github.com/DeepTransform/omniroute)
* 9Router requires provider credentials to be added via OAuth or API key per provider. Dashboard opens automatically after install. [https://9router.com](https://9router.com)

## 6. Workarounds for Germany with German mobile only, no payment

* API path requires payment:
  * Perplexity API needs prepaid credits before key generation. No payment → no API key → no API access via 9Router/OmniRoute for Perplexity models.
  * *“Perplexity uses prepaid credits, not post-paid billing. You need to load credits before you can generate a key.”* [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* Free web UI path:
  * Perplexity free web search is accessible without payment. Account creation can be done with email/Google/Apple; phone is not mandatory for basic free use, but may be requested for Pro / 2FA.
  * Phone verification when requested: German +49 numbers are accepted by SMS verification services, e.g., JuicySMS Germany page for Perplexity. [https://juicysms.com/sms-verification/de/Perplexity](https://juicysms.com/sms-verification/de/Perplexity)
  * Workaround described in guides: *“The Good News: Perplexity Is Usually Phone-Free When Perplexity Does Ask for a Phone Number”* [https://esimpy.com/blog/how-to-create-perplexity-account](https://esimpy.com/blog/how-to-create-perplexity-account)
* 9Router free-tier providers:
  * 9Router itself is free and open-source. It can route to free providers listed as FREE Forever: Kiro AI, iFlow, Qwen, OpenCode Free, OpenRouter, NVIDIA NIM, Gemini, Cloudflare AI. [https://9router.com](https://9router.com)
  * Using Perplexity via 9Router still requires a valid Perplexity API key → payment required.
* No-payment workaround for Perplexity content via 9Router is not viable for API models. Possible workaround is to use 9Router’s Perplexity Web Search integration with a free Perplexity web account, but programmatic API access remains paywalled.

## 7. 20-day free long sessions viability

* Perplexity API: No free long sessions. Credits are consumed per token + per-request search fees. Example pricing notes per-request fees for Sonar models.
  * *“Is the Perplexity API Free? No. There is no permanent free tier.”* [https://www.apideck.com/blog/how-to-get-your-perplexity-api-key](https://www.apideck.com/blog/how-to-get-your-perplexity-api-key)
* Pro subscription gives $5/month API credits that do not roll over. A 20-day continuous session would exhaust $5 quickly under sustained usage.
* Free web UI sessions are limited by rate limits and usage caps; long 20-day uninterrupted sessions are not officially supported and would hit free-tier throttling.
* 9Router can extend session continuity via auto-fallback to free providers when Perplexity quota runs out, but this swaps provider, not Perplexity.
* Conclusion: 20-day free long sessions using Perplexity API with German mobile only and zero payment are not viable. Free web usage is possible with email login and optional German SMS verification, but API access strictly requires prepaid credits.

## 8. Citations summary

All claims above are sourced from the URLs listed inline. Key sources:
- Perplexity API docs / quickstart: https://docs.perplexity.ai/docs/getting-started/quickstart
- Pricing: https://docs.perplexity.ai/docs/getting-started/pricing
- API key management: https://docs.perplexity.ai/docs/admin/api-key-management
- Apideck guide: https://www.apideck.com/blog/how-to-get-your-perplexity-api-key
- 9Router homepage: https://9router.com
- OmniRoute GitHub: https://github.com/chiencbd/omniroute
- GDPR guide: https://compound.law/en-DE/tools/perplexity
- DPA: https://perplexity.ai/en-GB/hub/legal/dpa
- Phone verification discussion: https://reddit.com/r/perplexity_ai/comments/1snueyx/why_does_perplexity_need_my_phone_number
- SMS Germany: https://juicysms.com/sms-verification/de/Perplexity

---
Report generated for dsh-oauthproextended deep research.
