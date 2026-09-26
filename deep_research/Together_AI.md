# Together AI – 9Router / OmniRoute Integration Research
**Project:** dsh-oauthproextended  
**Date:** 2026-09-20  
**Scope:** Germany compatibility, German mobile number only, no payment

## 1. Authentication method, base URL

* **API authentication:** API Key Bearer token. Together API is OpenAI-compatible. Docs describe “Together with two changes: the API key and base URL” for OpenAI compatibility. [https://docs.together.ai/docs/inference/openai-compatibility](https://docs.together.ai/docs/inference/openai-compatibility)
* **Base URL:** `https://api.together.ai/v1`  
  * “Base URL: https://api.together.ai/v1” [https://github.com/api-evangelist/together-ai](https://github.com/api-evangelist/together-ai)  
  * Distilabel docs: `TOGETHER_BASE_URL` defaults to `https://api.together.xyz/v1` for the Together API. [https://distilabel.argilla.io/1.3.0/api/llm/together/](https://distilabel.argilla.io/1.3.0/api/llm/together/)
* **OAuth for account sign-in:** Account sign-in uses OAuth / social login. Sign-in page offers “Continue with Google, Continue with GitHub, Continue with SSO”. [https://api.together.ai/signin](https://api.together.ai/signin)
* **API key flow:** Create account → add billing → Settings → API Keys → `+ Create key`. Key shown once. [https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/](https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/)

## 2. Free tier – details, limits, requires payment?

* **No free tier / no free trial credits.**  
  “Together AI no longer offers free trial credits. Per its official docs, there are no free trials and using the platform requires a minimum $5 credit purchase upfront.” [https://pricepertoken.com/endpoints/together/free](https://pricepertoken.com/endpoints/together/free)
* Free Tier Details from Price Per Token:
  * No free tier
  * requires a paid plan to use
  * Free Credits / Trial: None — no free trial (policy changed July 2025)
  * Minimum to Start: $5 prepaid credit purchase required to use the platform
  * Credit Card Required: Yes
  * Earlier $25 signup credit retired July 2025. [https://pricepertoken.com/endpoints/together/free](https://pricepertoken.com/endpoints/together/free)
* Official docs confirm: “Together AI does not currently offer free trials. Access to the Together platform re...” [https://docs.together.ai/docs/billing-credits](https://docs.together.ai/docs/billing-credits)
* Tutorial prerequisites: “A payment method — Together AI's API is usage-based” [https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/](https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/)
* “Before your API key will work for production use, you'll need to set up billing. Go to your account settings and add a payment method or purchase credits. Together AI charges per token” [https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/](https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/)

## 3. Registration – email/phone requirements, German mobile acceptance, SMS verification

* **Sign-up methods:** “Go to api.together.ai. Click and create your account using your Google account, GitHub, or email.” [https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/](https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/)
* Sign-in options: Continue with Google / Continue with GitHub / Continue with SSO. [https://api.together.ai/signin](https://api.together.ai/signin)
* **Phone number:** No phone number field is documented for sign-up; authentication is OAuth/email based. Account management docs reference email addresses can’t be changed directly. [https://docs.together.ai/docs/account-management](https://docs.together.ai/docs/account-management)
* **SMS verification:** No evidence of SMS/phone verification requirement in official docs or tutorials. Registration is email / Google / GitHub OAuth only.
* **German mobile number:** Not required for registration. Since no phone verification is used, German mobile acceptance is moot. Payment method is the gating factor, not phone.

## 4. Germany / EU geo restrictions, GDPR compliance

* **Geo restrictions:** No explicit Germany block found in public docs. Terms of Service applies globally. [https://www.together.ai/terms-of-service](https://www.together.ai/terms-of-service)
* **Privacy / GDPR:**  
  * Privacy Policy covers website, platform, and services for model training, fine-tuning, serving. [https://www.together.ai/privacy](https://www.together.ai/privacy)
  * Docs: “For customers with data-residency, regulatory, or compliance requirements (for example, GDPR-driven EU-region deployment” [https://docs.together.ai/docs/privacy-and-security](https://docs.together.ai/docs/privacy-and-security)
* Together offers privacy and security controls, zero data retention options, and GDPR-related compliance documentation. No public statement of a country ban for Germany.

## 5. 9Router / OmniRoute integration with Together AI

* **9Router:** “9Router is a smart gateway between your tools (Cursor, Claude Code, Codex, Cline, Copilot…) and 60+ AI providers.” [https://9router.com/](https://9router.com/)
* GitHub: “Unlimited FREE AI coding. Connect Claude Code, Codex, Cursor, Cline, Copilot, Antigravity to FREE Claude/GPT/Gemini via 40+ providers. Auto-fallback, RTK -40% tokens” [https://github.com/decolua/9router](https://github.com/decolua/9router)
* **OmniRoute:** “Open Source AI Router Route across 352 providers through one OpenAI-compatible endpoint, with automatic fallback.” [https://omniroute.online/](https://omniroute.online/)
* Integration pattern: Both routers accept OpenAI-compatible providers. Together AI provides OpenAI-compatible endpoint at `https://api.together.ai/v1`. Therefore 9Router/OmniRoute can route to Together AI by adding provider with Together API key and base URL.

## 6. Workarounds for Germany with German mobile only, no payment

* **Feasibility:** Not viable under current policy.
  * Together requires a payment method and minimum $5 prepaid credit to use API. [https://pricepertoken.com/endpoints/together/free](https://pricepertoken.com/endpoints/together/free)
  * “Creating an API key is free, but using it requires paying for what you run.” [https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/](https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/)
  * No phone verification bypasses payment requirement.
* **Potential mitigations:**
  * Use 9Router/OmniRoute fallback to truly free providers for the free tier portion, while Together remains gated behind payment.
  * Puter.js user-pays model can expose Together models without managing keys, but usage is still billed to end users, not free. [https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/](https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/)
* **German mobile only:** Since no SMS verification is required, a German mobile number does not unlock access; payment method is the blocker.

## 7. 20-day free long sessions viability

* **Not viable.** Together AI has no free tier and no free trial credits as of July 2025. Minimum $5 prepaid credit required before any API usage. [https://pricepertoken.com/endpoints/together/free](https://pricepertoken.com/endpoints/together/free)
* Rate limits scale with spend; without payment, API returns 402 Payment Required. Tutorial notes: “402, Payment Required: the account hit its monthly spending limit. Add a payment method or raise the limit in billing, then retry.” [https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/](https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/)
* Therefore 20-day free long sessions via Together AI alone cannot be sustained without payment.

## 8. Summary of findings

* Authentication: API key Bearer, OpenAI-compatible, base URL `https://api.together.ai/v1`.
* Free tier: None. Minimum $5 prepaid credit, credit card required. $25 signup credit retired July 2025.
* Registration: Email / Google / GitHub OAuth, no phone/SMS verification required. German mobile irrelevant.
* Germany/EU: No explicit geo block; GDPR compliance controls documented.
* 9Router/OmniRoute: Can route to Together via OpenAI-compatible endpoint, but Together usage remains paid.
* Workaround with German mobile only and no payment: Not possible. Payment is mandatory for any usage.
* 20-day free long sessions: Not viable with Together AI directly.

---
**Citations:** All claims above are sourced from the URLs listed inline. Key sources: Together docs, Puter tutorial, PricePerToken, GitHub 9Router, OmniRoute site.
