# iFlow Provider Research for DSH Integration

**Provider:** 心流·搜索 / iFlow Search API – platform.iflow.cn  
**Operator:** 杭州星辰千寻科技有限公司 (StarChain Qianxun) – Alibaba affiliated  
**Last updated:** 2026-01-08

---

## Authentication & API access

### Login method
- Account based access. Sign up / login on platform.iflow.cn, then create an API Key in **API Key Management**.
- Registration supports email / phone / WeChat. Forum guidance lists “注册账号（支持邮箱/手机号）”【https://vibex.iflow.cn/t/topic/254】
- Authentication is API-Key only. No OAuth 2.0 / OAuth endpoints documented for the Search API.
- Request header:
  ```
  Authorization: Bearer YOUR_API_KEY
  ```
- API Key has full account permissions. Do not share.【https://platform.iflow.cn/en/docs】

### API base URLs
- Base URL: `https://platform.iflow.cn`【https://platform.iflow.cn/en/docs/api-reference】
- Endpoints:
  - Web Search: `POST /api/search/webSearch` – 1 credit/call
  - Image Search: `POST /api/search/imageSearch` – 3 credits/call
  - Web Fetch: `POST /api/search/webFetch` – 2 credits/call
- Credits only deducted for successful requests `success: true`.【https://platform.iflow.cn/en/docs/credits】

### Response format
- `Accept: text/markdown` – default markdown
- `Accept: application/json` – JSON
- Unified `BizResult` structure with `success, code, message, data, extra`.【https://platform.iflow.cn/en/docs/api-reference】

### Rate limits
- 1000 RPM per user, shared across all search endpoints.
- Exceed → error `40303` “请求频率超限”.【https://platform.iflow.cn/en/docs/credits】

### Scopes / Token refresh
- No OAuth scopes, no refresh token flow documented. API Key is long-lived; key does not expire per forum discussion: “key不会过期”【https://vibex.iflow.cn/t/topic/5826】
- Error codes:
  - `90402` API Key 无效
  - `60400` 用户积分不足
  - `40303` 频率超限【https://platform.iflow.cn/docs/error-codes】

---

## Pricing, free tier & registration requirements

### Free tier
- Registration bonus: “注册即送100积分”【https://vibex.iflow.cn/t/topic/5826】
- Credit consumption:
  - Web Search 1 credit
  - Image Search 3 credits
  - Web Fetch 2 credits【https://platform.iflow.cn/en/docs/credits】
- No monthly fee, pay-as-you-go, credits never expire.
- Three credit packages offered, “按需选择，永不过期”【https://vibex.iflow.cn/t/topic/5826】

### Payment & registration
- Payment method reported by community: currently only Alipay. Forum comment: “对 当前仅支持支付宝”【https://vibex.iflow.cn/t/topic/5826】
- No PayPal mentioned in public docs.
- Phone registration requires SMS verification per privacy policy: account creation based on “真实有效的手机号码及手机号码所接收的验证码”【https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20240604172547146/20240604172547146.html】
- No explicit requirement for Chinese mobile number in docs, but SMS verification and Alipay limit practical use for non-China users.

### Free tier limits
- 100 bonus credits at sign-up.
- 1000 RPM rate limit.
- Concurrent request limit documented elsewhere: “每个用户最多只能同时发起一个请求，超出限制的请求会返回429错误码”【https://platform.iflow.cn/docs/limitSpeed】

---

## Germany geo restrictions & GDPR / data residency

### Geo availability
- Service is China-origin. Historically China-only; GitHub issue notes “It’s now support for global users, try https://iflow.cn and register with your mobile number.”【https://github.com/iflow-ai/iflow-cli/issues/49】
- Access to platform.iflow.cn is technically reachable from Germany, but account creation and payment are China-centric.
- No official GDPR compliance statement found. Privacy policy is Chinese law based, operator is Hangzhou StarChain Qianxun Technology Co., Ltd.
- Privacy policy states data processing under Chinese law, storage and transfer provisions refer to Chinese regulators. No EU data residency option.
- Privacy policy link from site footer: https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20240604172547146/20240604172547146.html

### GDPR data residency
- No evidence of EU data residency, EU representative, or GDPR-specific safeguards.
- Data is processed/stored in China per operator. Using the service from Germany would likely constitute international transfer under GDPR without adequate safeguards.

---

## Workaround for Germany use with German mobile only, no payment

**Constraints observed:**
- Free tier provides 100 credits, sufficient for testing but not production.
- Payment requires Alipay; PayPal not supported.
- Registration allows email/phone/WeChat, but SMS verification may be optimized for Chinese numbers.
- No OAuth; API Key must be kept secret.

**Practical workarounds:**
1. **Registration**
   - Try email registration first to avoid SMS. If SMS required, use a virtual Chinese mobile number service that forwards SMS internationally, or use a trusted Chinese contact for one-time verification.
   - Forum confirms global users are accepted now, with mobile number registration.

2. **Geo-blocking / access**
   - Platform is not explicitly geo-blocked, but some assets load faster from China. If access is slow or blocked by ISP, use a VPN exit in Hong Kong or mainland China for API calls and for account management.
   - Do not use VPN to bypass payment restrictions – payment still requires Alipay.

3. **No payment**
   - Rely on the 100 free credits. Credits never expire, but no top-up without Alipay.
   - Reduce cost: use Web Search only (1 credit) vs Image Search (3) / Web Fetch (2). Cache results, batch queries, stay under 1000 RPM.

4. **Security for DSH integration**
   - Store API Key in environment variable `IFLOW_API_KEY`.
   - No token refresh needed; rotate key if leaked via API Key Management page.
   - No scopes → key has full account access. Limit usage to isolated DSH service account.

5. **Compliance note**
   - For production use in Germany/EU, GDPR obligations remain with the data controller. iFlow does not provide EU data residency. If processing personal data, this is not compliant out-of-the-box.

---

## Citations

- Quick Start & API Key management: https://platform.iflow.cn/en/docs
- API Reference base URL & authentication: https://platform.iflow.cn/en/docs/api-reference
- Credits & rate limit: https://platform.iflow.cn/en/docs/credits
- Error codes: https://platform.iflow.cn/docs/error-codes
- Pricing & registration bonus & Alipay comment: https://vibex.iflow.cn/t/topic/5826
- Registration supports email/phone: https://vibex.iflow.cn/t/topic/254
- GitHub issue global users: https://github.com/iflow-ai/iflow-cli/issues/49
- Privacy policy: https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20240604172547146/20240604172547146.html
- Site homepage: https://platform.iflow.cn/

---

**Conclusion:** iFlow Search API is API-Key based, no OAuth. Free tier exists with 100 credits and 1000 RPM. Practical use from Germany is possible with email registration and VPN, but payment is Alipay only, no PayPal, no GDPR data residency. For production DSH integration in Germany, consider GDPR impact and lack of OAuth/scopes.
