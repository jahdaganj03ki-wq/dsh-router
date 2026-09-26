# Trae Provider Deep Research for DSH OAuth Integration

**Date:** 2026-09-20  
**Scope:** Official OAuth endpoints, authentication flow, device code support, pricing/free tier, registration requirements, geo restrictions, GDPR/data residency, API base URLs, scopes, token refresh.

---

## 1. Product & Auth Overview

Trae is ByteDance’s AI-native IDE / work assistant, marketed internationally as **TRAE - Collaborate with Intelligence** [https://www.trae.ai/](https://www.trae.ai/?_enter_from=new_home_page) and domestically as **TRAE - The Real AI Engineer** [https://www.trae.cn/](https://www.trae.cn/).

Authentication for programmatic access is **not standard OAuth2**. Reverse-engineered implementations describe a proprietary *Native IDE* authentication flow.

Key finding from community reverse engineering:
* *“Trae.ai does NOT use standard OAuth2. It uses a proprietary ‘Native IDE’ authentication flow.”* [https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md](https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md)

The flow uses:
* Authorization URL: `https://www.trae.ai/authorization`
* Callback to a local server on `http://127.0.0.1:{port}/authorize`
* Callback parameters: `userJwt`, `userInfo`, `host`, `userRegion`, `loginTraceID`
* Token structure contains `ClientID`, `RefreshToken`, `Token` (JWT), `TokenExpireAt`, `TokenExpireDuration`

Token lifetime observed ~14 days: `TokenExpireDuration: 1209600000` ms ≈ 14 days. [https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md](https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md)

**Device Code Flow:** Not supported. No official OAuth2 authorization code / device_code endpoints are published. The Native IDE flow delivers tokens directly in the callback URL and requires device fingerprinting and a local callback server. [https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md](https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md)

**Official OAuth documentation:** ❌ Not publicly available. No public Trae.ai OAuth documentation or API reference for authentication was found. [https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md](https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md)

Trae does expose GitHub OAuth for account linking inside the product, e.g. `https://www.trae.ai/github-oauth-callback` [https://www.trae.ai/github-oauth-callback](https://www.trae.ai/github-oauth-callback), but this is for user login to Trae, not an API provider OAuth for third-party apps.

---

## 2. API Base URLs

### Model / chat endpoint used by DSH connectors
From the community DSH plugin `dsh-connect-trae`:

* Domestic CN: `https://trae-api-cn.mchost.guru/api/agent/v3/llm_utils_chat`
* International: `https://coresg-normal.trae.ai/api/agent/v3/llm_utils_chat`

The plugin implements a per-region loopback shim -> `TraeSoloBridge` -> `llm_utils_chat` -> Trae SSE / pending function_call -> OpenAI SSE tool_calls. [https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/README.md](https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/README.md)

### Usage / billing read-only APIs
Documented in `USAGE_API_RESEARCH.md` for the domestic edition:

* Base host: `https://api.trae.cn`
* Auth header: `Authorization: Cloud-IDE-JWT <token>`
* Endpoints verified:
  * `POST /trae/api/v2/pay/web_user_ent_usage` – total available / consumed / entitlement packs
  * `POST /trae/api/v2/pay/cn_credits_billing_status`
  * `POST /trae/api/v2/pay/web_user_pay_status`
  * `POST /trae/api/v2/pay/expired_ents`
  * `POST /trae/api/v2/ug/checkin_credits/status`
  * `POST /trae/api/v2/ug/activity/info`
  * Attempted `POST /trae/api/v1/pay/query_user_usage_group_by_session` – returns 200 but `total:0`

All successful usage calls are read-only and do not consume credits. [https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/docs/USAGE_API_RESEARCH.md](https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/docs/USAGE_API_RESEARCH.md)

---

## 3. Scopes, Token Refresh

* **Scopes:** No standard OAuth scopes are published. Access is governed by the `Cloud-IDE-JWT` token extracted from the locally signed-in Trae desktop client. The token is used for both chat and usage APIs.
* **Token refresh:** The Native IDE callback includes a `RefreshToken` field alongside the access JWT. No public refresh endpoint has been documented; community research notes *“Refresh token provided but endpoint unknown”* and *“No Refresh Endpoint – Refresh token provided but endpoint unknown”* [https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md](https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md)
* Tokens are stored locally by DSH connectors at `$DSH_HOME/.trae-auth.cn.json` and `$DSH_HOME/.trae-auth.ai.json`. [https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/README.md](https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/README.md)

---

## 4. Free Tier Availability & Pricing

Official pricing page:

* **Free** – $0, Auto mode only, limited usage, limited autocomplete. [https://www.trae.ai/pricing](https://www.trae.ai/pricing)
* **Pro** – $20 / month, $20 usage / month, unlimited autocomplete, up to 10 concurrent cloud tasks in TraeWork. [https://www.trae.ai/pricing](https://www.trae.ai/pricing)
* **Pro+** – $60 / month, $60 usage / month, up to 15 concurrent cloud tasks. [https://www.trae.ai/pricing](https://www.trae.ai/pricing)
* **Ultra** – $200 / month, $200 usage / month, model early access, up to 20 concurrent cloud tasks. [https://www.trae.ai/pricing](https://www.trae.ai/pricing)

Plans & billing documentation lists five plans: Free, Lite, Pro, Pro+, and Ultra. [https://docs.trae.ai/ide/new-plans-and-billing](https://docs.trae.ai/ide/new-plans-and-billing)

Trae announced transition to token-based pricing effective 2026-02-24. [https://www.trae.ai/blog/trae_membership_0213](https://www.trae.ai/blog/trae_membership_0213)

Free tier exists internationally. Domestic CN edition offers credits via check-in, monthly login bonus, and entitlement packs; the plugin can read total available额度 e.g. `total_amount = 7500, consumed_amount 5879.63` for a real account. [https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/docs/USAGE_API_RESEARCH.md](https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/docs/USAGE_API_RESEARCH.md)

---

## 5. Registration Requirements

### International `trae.ai`
Sign up page offers:
* Continue with GitHub
* Continue with Google
* or with Email → Send Code → Sign Up

No phone number is required for the international flow. [https://www.trae.ai/sign-up](https://www.trae.ai/sign-up)

Payment methods: “Most payment methods supported for upgrade”. PayPal support was announced July 2025 in the r/Trae_ai community. [https://www.reddit.com/r/Trae_ai/comments/1luy19y/good_news_paypal_is_now_supported_in_trae/]

### Domestic `trae.cn`
Login page shows `+86` phone prefix. [https://www.trae.cn/login](https://www.trae.cn/login)

Community support topics discuss changing the bound login mobile number, confirming phone-based account binding. [https://forum.trae.cn/t/topic/2342](https://forum.trae.cn/t/topic/2342)

Thus:
* International: Email / OAuth via GitHub/Google, no mandatory phone; PayPal available.
* China domestic: Phone number binding is standard; Alipay is listed as a payment method in legacy billing docs. [https://docs.trae.ai/ide/billing](https://docs.trae.ai/ide/billing)

---

## 6. Geo Restrictions & Germany

Supported countries and regions documentation lists Germany under EU. Search snippet shows table with “Austria Belgium Bulgaria Czech Republic Germany Denmark Estonia Spain Finland”. [https://docs.trae.ai/ide/supported-countries-and-regions](https://docs.trae.ai/ide/supported-countries-and-regions)

Paid Plans and IDE access have been unlocked in more countries, including EU expansion announcements in July 2025. [https://www.reddit.com/r/Trae_ai/comments/1lpohhl/trae_is_available_in_more_countries_now/]

No explicit Germany block is documented; Germany is listed as supported.

---

## 7. GDPR & Data Residency

* Privacy Policy is published at [https://www.trae.ai/privacy-policy](https://www.trae.ai/privacy-policy). The policy explains collection/use/sharing of personal data. [https://www.trae.ai/privacy-policy](https://www.trae.ai/privacy-policy)
* Trae is a ByteDance product. Independent security analyses note code is processed on ByteDance servers and extensive telemetry exists. [https://vibeappscanner.com/is-trae-safe](https://vibeappscanner.com/is-trae-safe)
* No explicit public guarantee of EU-only data residency or GDPR-specific data localization is found in the official docs reviewed. Privacy Mode documentation exists for TraeWork/SOLO but describes opt-in privacy handling, not regional residency. [https://docs.trae.ai/solo/privacy-mode](https://docs.trae.ai/solo/privacy-mode)
* Community concerns about data processing in China are raised in forums. [https://www.reddit.com/r/Trae_ai/comments/1o80xd4/just_a_quick_reminder_that_trae_is_based_in_china/]

For DSH integration: tokens are obtained from the locally installed Trae client; no user data is sent to DSH beyond model calls. Usage APIs are read-only.

---

## 8. Summary for DSH OAuth Integration

* No standard OAuth2 provider endpoints are published for Trae.
* Integration relies on extracting the `Cloud-IDE-JWT` from a locally signed-in Trae desktop installation and using the proprietary `llm_utils_chat` endpoints.
* Device Code Flow is not supported.
* Free tier exists internationally; pricing is $0 / $20 / $60 / $200 per month.
* International registration does not require phone/PayPal is supported; domestic CN requires phone.
* Germany is listed as a supported EU country.
* GDPR data residency is not explicitly guaranteed; data is processed via ByteDance infrastructure.

---

### Citations
* Pricing page: [https://www.trae.ai/pricing](https://www.trae.ai/pricing)
* Plans & billing: [https://docs.trae.ai/ide/new-plans-and-billing](https://docs.trae.ai/ide/new-plans-and-billing)
* Supported countries: [https://docs.trae.ai/ide/supported-countries-and-regions](https://docs.trae.ai/ide/supported-countries-and-regions)
* Sign up: [https://www.trae.ai/sign-up](https://www.trae.ai/sign-up)
* China login: [https://www.trae.cn/login](https://www.trae.cn/login)
* dsh-connect-trae README: [https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/README.md](https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/README.md)
* Usage API research: [https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/docs/USAGE_API_RESEARCH.md](https://raw.githubusercontent.com/dingminhua/dsh-connect-trae/main/docs/USAGE_API_RESEARCH.md)
* Trae OAuth reverse engineering: [https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md](https://raw.githubusercontent.com/leic4u/CLIProxyAPIPlus/main/.sisyphus/notepads/trae-oauth-fix/RESEARCH_SUMMARY.md)
* Privacy Policy: [https://www.trae.ai/privacy-policy](https://www.trae.ai/privacy-policy)
