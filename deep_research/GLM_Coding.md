# GLM Coding Provider – Zhipu AI / Z.ai Deep Research for DSH Integration

**Date:** 2026-09-10  
**Provider:** Zhipu AI 智谱AI, international brand Z.ai / BigModel open platform  
**Scope:** Authentication, OAuth, API keys, pricing/free tier, registration, geo-restrictions, GDPR/data residency, base URLs, scopes, token refresh, Germany workaround.

---

## 1. Provider overview

Zhipu AI provides commercial LLM APIs and open-weight GLM models via two portals:
* Mainland portal: `open.bigmodel.cn` / `bigmodel.cn` – CNY billing, +86 phone required.
* International portal: `z.ai` – USD billing, email registration, no Chinese phone required.

> International developers can register on z.ai with standard email and pay in USD with foreign credit cards, bypassing the +86 phone requirements of bigmodel.cn. [https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/](https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/)

## 2. Authentication methods

### API Key – Bearer

Z.AI API uses standard HTTP Bearer for authentication.

* Z.ai docs:  
  `API Endpoint: https://api.z.ai/api/paas/v4`  
  `Authorization: Bearer ZAI_API_KEY` [https://docs.z.ai/api-reference/introduction](https://docs.z.ai/api-reference/introduction)
* BigModel docs:  
  `智谱开放平台的通用 API 端点` and  
  `开放平台 API 使用标准的 HTTP Bearer 进行身份验证。您可以在 API Keys 页面 创建或管理密钥。` [https://docs.bigmodel.cn/cn/api/introduction](https://docs.bigmodel.cn/cn/api/introduction)

API key creation: login → Personal center → API Keys → create new key. Keep secret, use env vars.  
`获取 API Key 1. 访问 智谱开放平台 2. 注册并登录您的账户` [https://docs.bigmodel.cn/cn/guide/develop/http/introduction](https://docs.bigmodel.cn/cn/guide/develop/http/introduction)

No OAuth scopes are documented for the standard Model API; authentication is API-Key Bearer only. Token refresh is not applicable – API keys are long-lived until manually revoked.

### OAuth – ZCode / GLM Coding Plan

For GLM Coding Plan / ZCode integration, OAuth is used:

Constants from community reverse engineering:
```
ZCODE_TOKEN_URL: https://zcode.z.ai/api/v1/oauth/token
ZAI_AUTHORIZE_URL: https://chat.z.ai/api/oauth/authorize
ZAI_USER_INFO_URL: https://chat.z.ai/api/oauth/userinfo
ZAI_BUSINESS_LOGIN_URL: https://api.z.ai/api/auth/z/login
ZAI_CLIENT_ID: client_P8X5CMWmlaRO9gyO-KSqtg
ZAI_REDIRECT_URI: zcode://zai-auth/callback
BIGMODEL_AUTHORIZE_URL: https://bigmodel.cn/login
BIGMODEL_REDIRECT_URI: zcode://oauth/callback
```
Source: `src-tauri/src/modules/zcode_oauth.rs` [https://raw.githubusercontent.com/jlcodes99/cockpit-tools/466e3f6daf711e4c89b9e184e272256ba5cf0c25/src-tauri/src/modules/zcode_oauth.rs](https://raw.githubusercontent.com/jlcodes99/cockpit-tools/466e3f6daf711e4c89b9e184e272256ba5cf0c25/src-tauri/src/modules/zcode_oauth.rs)

Flow:
1. Build authorize URL with `client_id`, `redirect_uri`, `response_type=code`, `state`.
2. User signs in via `chat.z.ai/api/oauth/authorize` or `bigmodel.cn/login?appId=zcode`.
3. Callback `zcode://zai-auth/callback` returns `code`.
4. POST to `https://zcode.z.ai/api/v1/oauth/token` with provider, code, redirect_uri, state → returns `zcode_jwt_token`, provider `access_token`, optional `refresh_token`, `expires_in`.
5. For Z.ai provider, exchange provider access token via `https://api.z.ai/api/auth/z/login` to get business access token.

Refresh: OAuth token envelope includes `expires_in` and optionally `refresh_token` for BigModel provider. Z.ai provider currently returns `expires_in` without a documented refresh token in the observed envelope.

## 3. API base URLs

* International Z.ai Model API: `https://api.z.ai/api/paas/v4` [https://docs.z.ai/api-reference/introduction](https://docs.z.ai/api-reference/introduction)
* BigModel generic API: `https://open.bigmodel.cn/api/paas/v4`  
  `核心事实 - Base URL：通用API地址为 https://open.bigmodel.cn/api/paas/v4/` [https://www.chooseai.net/news/6760/](https://www.chooseai.net/news/6760/)
* Coding Plan / ZCode Anthropic-compatible endpoint reported: `https://api.z.ai/a...`  
  `Bottom line: your ZCode subscription is usable from any client via the Anthropic-compatible endpoint https://api.z.ai/a` [https://cdn.jsdelivr.net/npm/pi-zcode-provider@0.1.0/PROTOCOL.md](https://cdn.jsdelivr.net/npm/pi-zcode-provider@0.1.0/PROTOCOL.md)

## 4. Free tier limits, pricing, registration requirements

### Free trial / credits
* New user free trial pack advertised: `新用户免费赠送专享 2000万 tokens体验包！` [https://bigmodel.cn/trialcenter](https://bigmodel.cn/trialcenter)
* Z.ai international free Flash models:  
  `GLM-4.7-Flash / GLM-4.5-Flash: $0.00 / Free` [https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/](https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/)

### Pay-as-you-go API rates USD, Aug 2026
* GLM-5 Flagship: $1.00 /1M input | $0.20 cached | $3.20 /1M output
* GLM-5-Turbo: $1.20 input | $0.24 cached | $4.00 output
* GLM-4.7: $0.60 input | $0.11 cached | $2.20 output
* GLM-4.7-Flash: $0.00
Source: [https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/](https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/)

### GLM Coding Plans
* Lite $18/mo, Pro $72/mo, Max $160/mo. [https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/](https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/)

### Registration requirements
* BigModel mainland: phone + SMS verification required.  
  `为了创建大模型开放平台账户，您需要向我们提供您的手机号和短信验证码。` [https://docs.bigmodel.cn/cn/terms/privacy-policy](https://docs.bigmodel.cn/cn/terms/privacy-policy)
* Overseas phone support:  
  `Q：是否支持海外手机号注册？ A：智谱开放平台是支持海外手机号注册的。在注册过程中，请您选择相应的国家区号，并通过短信验证码进行验证，即可完成注册。` [https://docs.bigmodel.cn/cn/faq/registration-login](https://docs.bigmodel.cn/cn/faq/registration-login)
* International portal z.ai: `Registration requires only a standard email address... Billing is handled entirely in US Dollars via standard international Visa, Mastercard, and PayPal.` [https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/](https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/)

Phone/PayPal: Mainland requires +86 phone, Alipay/WeChat Pay. International z.ai accepts email, credit card/PayPal, no Chinese phone.

## 5. Germany geo-restrictions

* Official international portal z.ai works worldwide with email + USD payment.
* BigModel open.bigmodel.cn is China-centric: requires +86 phone, CNY billing. Access may be limited by DNS / geo blocking from Europe.
* Issue reported: `open.z.ai DNS not resolving via DNS from Europe` [https://github.com/openclaw/openclaw/issues/63687](https://github.com/openclaw/openclaw/issues/63687)
* General regulatory context: Beijing considering curbing overseas access to China AI models. [https://www.reuters.com/world/beijing-is-looking-curbing-overseas-access-chinas-top-ai-models-sources-say-2026-07-07/](https://www.reuters.com/world/beijing-is-looking-curbing-overseas-access-chinas-top-ai-models-sources-say-2026-07-07/)

Practical impact for Germany:
* `z.ai` international API endpoints are reachable, but latency may be higher.
* `open.bigmodel.cn` may require VPN for login/registration from German IP.
* DNS issues for `open.z.ai` observed in Europe.

## 6. GDPR / data residency

* Storage location:  
  `我们在中国境内运营中收集和产生的个人信息存储在中国境内。目前，我们委托基础云服务商存储您的个人信息，采用公有云服务作为底层资源支持。` [https://docs.bigmodel.cn/cn/terms/privacy-policy](https://docs.bigmodel.cn/cn/terms/privacy-policy)
* `目前我们不会跨境传输或存储您的个人信息` [https://docs.bigmodel.cn/cn/terms/privacy-policy](https://docs.bigmodel.cn/cn/terms/privacy-policy)
* Privacy policy states data processor is Beijing Zhipu Huazhang Technology. Compliance is under PIPL/CSL, not GDPR.
* StackMatchup notes:  
  `API requests made through open.bigmodel.cn are routed through and stored within data centers located in mainland China.` [https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/](https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/)
* No-training protection claimed for paid API, but data remains subject to Chinese corporate data compliance frameworks. No EU data residency guarantee.
* For absolute data sovereignty, self-host MIT-licensed open weights.

## 7. Scopes, token refresh

* Standard Model API: no scopes, Bearer API key; no refresh.
* ZCode OAuth:  
  * Authorization code flow with `state`.
  * Token response includes `zcode_jwt_token`, provider `access_token`, optional `refresh_token`, `expires_in`.
  * Z.ai business login exchange via `https://api.z.ai/api/auth/z/login`.
* No public documentation of OAuth scopes; client_id is fixed for ZCode: `client_P8X5CMWmlaRO9gyO-KSqtg`.

## 8. Workaround for geo-blocking in Germany with German mobile only, no payment

Goal: use GLM Coding provider from Germany without Chinese phone and without payment.

Options:
1. Use international portal z.ai with email registration.
   * Sign up at `z.ai` with Gmail/GitHub email, no SMS.
   * Use free Flash tier `glm-4.7-flash` at $0.00.
   * API base `https://api.z.ai/api/paas/v4`, Bearer API key.
   * No PayPal/payment required for free usage.

2. If BigModel open.bigmodel.cn blocks login:
   * Use VPN to mainland China or Hong Kong IP to access `open.bigmodel.cn` for registration.
   * Registration still requires phone SMS. Overseas phone is supported per FAQ, but SMS delivery to German mobile may be unreliable. Use email-based z.ai instead.
   * Avoid payment: stay on free trial 20M tokens or free Flash models.

3. DNS workaround for `open.z.ai` resolution failures in Europe:
   * Change DNS to public resolver e.g., 1.1.1.1 / 8.8.8.8, or use VPN with exit in Asia/US.
   * The issue `open.z.ai DNS not resolving via DNS from Europe` suggests using VPN or alternate resolver.

4. No-payment constraint:
   * Do not create paid billing profile on z.ai; use free tier only.
   * Do not subscribe to GLM Coding Plan $18/mo.

5. GDPR concern:
   * If data residency is a requirement, do not send personal data to hosted API. Use self-hosted open weights instead.

Recommended DSH integration path:
* Use Z.ai international API key auth.
* Base URL `https://api.z.ai/api/paas/v4`.
* Model `glm-4.7-flash` for zero cost.
* Fallback to OpenAI-compatible SDK by swapping base_url.

---

## 9. Sources

* Z.ai API introduction & Bearer auth [https://docs.z.ai/api-reference/introduction](https://docs.z.ai/api-reference/introduction)
* BigModel API intro & Bearer auth [https://docs.bigmodel.cn/cn/api/introduction](https://docs.bigmodel.cn/cn/api/introduction)
* Registration overseas phone support [https://docs.bigmodel.cn/cn/faq/registration-login](https://docs.bigmodel.cn/cn/faq/registration-login)
* Privacy policy storage China [https://docs.bigmodel.cn/cn/terms/privacy-policy](https://docs.bigmodel.cn/cn/terms/privacy-policy)
* Pricing / data residency / access overview [https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/](https://stackmatchup.com/zhipu-ai-pricing-data-residency-access/)
* Base URL reference [https://www.chooseai.net/news/6760/](https://www.chooseai.net/news/6760/)
* ZCode OAuth constants [https://raw.githubusercontent.com/jlcodes99/cockpit-tools/466e3f6daf711e4c89b9e184e272256ba5cf0c25/src-tauri/src/modules/zcode_oauth.rs](https://raw.githubusercontent.com/jlcodes99/cockpit-tools/466e3f6daf711e4c89b9e184e272256ba5cf0c25/src-tauri/src/modules/zcode_oauth.rs)
* Free trial pack [https://bigmodel.cn/trialcenter](https://bigmodel.cn/trialcenter)
* DNS issue Europe [https://github.com/openclaw/openclaw/issues/63687](https://github.com/openclaw/openclaw/issues/63687)

---

*Report generated for DSH OAuthProExtended integration research.*
