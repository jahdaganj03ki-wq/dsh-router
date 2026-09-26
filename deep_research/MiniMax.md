# MiniMax Provider – DSH Integration Research Report

**Date of research:** 2026-08-20  
**Scope:** Authentication, API access, pricing, registration, geo / GDPR constraints, workarounds for Germany with German mobile only and no payment.

---

## 1. Provider overview

MiniMax is operated by Nanonoble Pte. Ltd., 152 Beach Road, #14-02 Gateway East, Singapore 189721.  
Official developer platform: `https://platform.minimax.io` (Global) / `https://platform.minimaxi.com` (Mainland China).  
Docs: https://platform.minimax.io/docs

---

## 2. Authentication methods

### 2.1 API Key – Pay-as-you-go
* Credential type: **Pay-as-you-go API Key** and **Token Plan Subscription Key**.
* Where to create: *Account > API Keys > Create new secret key* → https://platform.minimax.io/user-center/basic-information/interface-key
* Token Plan key: *Billing > Token Plan* → https://platform.minimax.io/user-center/payment/token-plan
* Authentication header for OpenAI-compatible routes:  
  `Authorization: Bearer YOUR_API_KEY`  
  `Content-Type: application/json`
* Authentication for Anthropic-compatible `/anthropic/v1/messages`:  
  `Authorization: Bearer KEY` or `x-api-key: KEY` – Authorization takes precedence. Model list endpoint uses `X-Api-Key`.
* No scopes are published in the official docs; access is controlled by key type, team assignment, balance/quota and model entitlement.

Base URLs – International:
* OpenAI-compatible base: `https://api.minimax.io/v1`
* Anthropic-compatible base: `https://api.minimax.io/anthropic`
* China region: `https://api.minimaxi.com/v1` / `https://api.minimaxi.com/anthropic`

Examples:
* Chat Completions: `POST https://api.minimax.io/v1/chat/completions`
* Anthropic Messages: `POST https://api.minimax.io/anthropic/v1/messages`
* Model list: `GET https://api.minimax.io/v1/models` / `GET https://api.minimax.io/anthropic/v1/models`

Source: MiniMax API guide – base URLs and auth [https://minimax-ai.chat/docs/api/][https://minimax-ai.chat/docs/minimax-api-key-base-url/]  
Official prerequisites: https://platform.minimax.io/docs/guides/quickstart-preparation

### 2.2 OAuth – third-party implementations
MiniMax does not document a public OAuth 2.0 authorization server for programmatic API access in its official docs.  
Community agents implement a browser OAuth / device-code flow against internal endpoints. Example from Hermes Agent:

* Provider ID `minimax-oauth`
* Auth type: Browser OAuth PKCE redirect / device code
* Flow: `POST {base_url}/oauth/code` → user_code / verification_uri → poll `{base_url}/oauth/token`
* Tokens: `access_token`, `refresh_token` with automatic refresh on expiry
* Models supported via OAuth: `MiniMax-M2.7`, `MiniMax-M2.7-highspeed`
* Global endpoint: `https://api.minimax.io/anthropic`

Source: https://raw.githubusercontent.com/NousResearch/hermes-agent/main/website/docs/guides/minimax-oauth.md

For DSH integration the stable, documented method is API Key Bearer auth. OAuth is not officially published for general integration and should not be relied upon without written commitment from MiniMax.

### 2.3 Token refresh
* API Keys: static secret, no refresh. Rotate by creating a new key in console and revoking old.
* Subscription Keys: tied to Token Plan seat / Credits; validity follows subscription status.
* OAuth implementations refresh via standard `refresh_token` grant; automatic refresh is performed by the client library before expiry.

---

## 3. Registration & login requirements

* Registration route: https://platform.minimax.io/login?source=platform_docs
* Official guide shows sign-up via email or OAuth with Google / GitHub. Example tutorial: “Register with email or OAuth (Google/GitHub), verify your email address” https://apidog.com/blog/how-to-use-minimax-m2-7-free/
* No documented requirement for phone number verification at account creation in the public prerequisites. A 2024 security analysis notes the open platform registration lacked SMS/graphic verification, indicating no mandatory phone verification was enforced at that time.
* Payment methods for top-up: Online Payment and Bank Transfer via Account > Billing > Balance. No PayPal is mentioned in the official FAQ. Auto-billing can be configured.
* Free trial credits are offered on new sign-up. Amount varies by promotion and expires ~30 days. No guaranteed permanent free tier.

Sources:
* Prerequisites: https://platform.minimax.io/docs/guides/quickstart-preparation
* API key guide: https://minimax-ai.chat/docs/minimax-api-key-base-url/
* Free tier tutorial: https://apidog.com/blog/how-to-use-minimax-m2-7-free/

---

## 4. Pricing & free tier limits

### Pay-as-you-go – LLM
Rates verified July 31, 2026, per 1M tokens:
* MiniMax-M3 Standard ≤512K context: Input $0.30, Output $1.20, Cache read $0.06
* MiniMax-M3 Standard >512K context: Input $0.60, Output $2.40, Cache read $0.12
* MiniMax-M3 Priority 1.5× standard
* MiniMax-M2.7: Input $0.30, Output $1.20
* MiniMax-M2.7-highspeed: Input $0.60, Output $2.40

Source: https://platform.minimax.io/docs/guides/pricing-paygo and https://minimax-ai.chat/docs/api/

### Token Plan – Subscription
Monthly plans:
* Plus $22/mo
* Max $55/mo
* Ultra $132/mo
Usage quota shown as rolling 5-hour and weekly windows. Covers language, image, speech models. Some models e.g., H3, voice design, rapid voice cloning are excluded. Credits can be purchased separately.

Source: https://platform.minimax.io/docs/token-plan/intro

No permanent free tier for production use. Trial credits are time-limited and require account creation.

---

## 5. API base URLs, scopes, token refresh summary

| Item | Global | China |
|------|--------|-------|
| Developer portal | https://platform.minimax.io | https://platform.minimaxi.com |
| OpenAI base | https://api.minimax.io/v1 | https://api.minimaxi.com/v1 |
| Anthropic base | https://api.minimax.io/anthropic | https://api.minimaxi.com/anthropic |
| Auth header | Authorization: Bearer | Authorization: Bearer |
| Model list | GET /v1/models | GET /v1/models |

Token refresh: not applicable for API Keys. OAuth implementations use refresh_token grant.

---

## 6. Germany geo restrictions

* MiniMax video model H3 has regional licensing restrictions. Reports as of August 2026:
  * “H3 model enters the generative video battleground, but licensing carve-outs restrict use in US, EU, UK and South Korea” – South China Morning Post, 2026-08-04
  * “MiniMax H3 Model Adds Regional Restrictions for U.S., EU, UK, and South Korea Users on August 3” – Gate News, 2026-08-03
* Restriction applies to the open-source / public access to the H3 video model. Language API access is generally available globally via platform.minimax.io, but users should verify model-specific availability in console.
* No blanket ban on API access for Germany is documented for text models, but model availability can change without notice.

Sources:
* https://www.scmp.com/tech/tech-trends/article/3362951/chinas-minimax-curbs-overseas-access-new-ai-video-model-over-copyright-disputes
* https://www.gate.com/news/detail/minimax-h3-model-adds-regional-restrictions-for-us-eu-uk-and-south-korea-23178895

---

## 7. GDPR & data residency

* API Privacy Policy effective March 30, 2026, controller: Nanonoble Pte. Ltd., Singapore.
* Personal data described in the API policy is stored in a data center located in the **United States** and processed by MiniMax or third-party vendors under GDPR requirements.
* International transfers are described with EU-US Data Privacy Framework references, SCCs where appropriate, and technical safeguards.
* No EU-only data residency option is published for the API. One third-party article notes MiniMax-M3 is recorded in eu-north1, but official policy states US storage for API personal data.
* No public DPA/SCC template is linked in the summary; enterprise customers should request a Data Processing Agreement.

Sources:
* Independent privacy summary: https://minimax-ai.chat/privacy-security/minimax-privacy-policy
* Official API Privacy Policy: https://platform.minimax.io/protocol/privacy-policy

---

## 8. Workaround for geo-blocking in Germany with German mobile only and no payment

### Current constraints
* No payment method = no pay-as-you-go balance and no Token Plan subscription.
* Free trial credits can be obtained after email/Google/GitHub registration; no phone verification required officially.
* H3 video model is restricted in EU; text models remain accessible.

### Practical steps
1. Register on the Global platform using email or Google OAuth. German mobile number not required for registration.
2. Claim free trial credits. Use them only for testing; they expire.
3. For production without payment: not viable. Pay-as-you-go requires balance top-up; Token Plan requires subscription.
4. If geo-restriction blocks certain models:
   * Use a VPN to a permitted region only to access the platform console or model endpoints that are region-locked. This may violate Terms of Service and local law. MiniMax Terms prohibit circumvention of access controls.
   * No official “Germany-only free tier” exists.
5. Alternative access:
   * Use third-party aggregators such as OpenRouter which may host MiniMax models behind their own billing; this still requires payment.
   * Hugging Face community demos may offer limited free access but are unofficial and unstable.

### Recommendation for DSH
* Implement API Key Bearer auth with `https://api.minimax.io/v1` and `https://api.minimax.io/anthropic`.
* Support both Pay-as-you-go API Key and Subscription Key.
* Do not assume OAuth is officially supported; if DSH requires OAuth, request written confirmation from MiniMax.
* Warn users in Germany about H3 video model unavailability and US data residency under GDPR.
* Provide clear error handling for 401/403/404 with messages about region/key mismatch.

---

## 9. Citations

* API guide base URLs & auth: https://minimax-ai.chat/docs/api/
* API key base URLs & regions: https://minimax-ai.chat/docs/minimax-api-key-base-url/
* Official prerequisites: https://platform.minimax.io/docs/guides/quickstart-preparation
* API overview: https://platform.minimax.io/docs/api-reference/api-overview
* Pricing pay-as-you-go: https://platform.minimax.io/docs/guides/pricing-paygo
* Token Plan overview: https://platform.minimax.io/docs/token-plan/intro
* Free tier tutorial: https://apidog.com/blog/how-to-use-minimax-m2-7-free/
* OAuth implementation example: https://raw.githubusercontent.com/NousResearch/hermes-agent/main/website/docs/guides/minimax-oauth.md
* H3 regional restrictions SCMP: https://www.scmp.com/tech/tech-trends/article/3362951/chinas-minimax-curbs-overseas-access-new-ai-video-model-over-copyright-disputes
* H3 regional restrictions Gate News: https://www.gate.com/news/detail/minimax-h3-model-adds-regional-restrictions-for-us-eu-uk-and-south-korea-23178895
* Privacy policy summary: https://minimax-ai.chat/privacy-security/minimax-privacy-policy
* Official API Privacy Policy: https://platform.minimax.io/protocol/privacy-policy

---

**Limitations:** Some official pages require JavaScript rendering; information extracted from public docs and independent guides verified as of 2026-08-20. Terms and availability may change. Confirm with MiniMax support before production deployment.
