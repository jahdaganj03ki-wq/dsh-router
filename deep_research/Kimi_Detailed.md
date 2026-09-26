# Kimi / Moonshot AI Provider – DSH Integration Deep Research

**Date:** 2026-09-17
**Provider:** Moonshot AI – Kimi API Open Platform
**Scope:** Authentication, registration, pricing, geo-restrictions, GDPR/data residency, API base URLs, scopes & token refresh, workarounds for Germany with German mobile only / no payment.

---

## 1. Provider Overview

Kimi API is operated by Moonshot AI 月之暗面. The developer platform is the entry point for API keys and billing.

* Mainland China console: https://platform.moonshot.cn/ – RMB billing
* International console: https://platform.moonshot.ai/ – USD billing, international cards
* API Open Platform home: https://platform.kimi.com/ [Kimi API 开放平台](https://platform.kimi.com/)

The API is OpenAI-compatible. The docs state: *“Kimi API 提供了与 Kimi 大模型交互的能力，兼容 OpenAI 与 Anthropic API 格式。只需准备 API Key、选择模型，并配置 `base_url`，即可通过 HTTP API、OpenAI SDK 或 Anthropic SDK 发起调用。”* [https://platform.kimi.com/docs/get-api-key](https://platform.kimi.com/docs/get-api-key)

---

## 2. Authentication / Login Method

### API authentication
* **Method:** API Key in HTTP header, Bearer scheme.
* Documentation example: `Authorization: Bearer $MOONSHOT_API_KEY`
* Exa-indexed overview notes: *All API requests require an API Key in the HTTP header: `Authorization: Bearer $MOONSHOT_API_KEY`* [platform.kimi.ai docs/api/overview]
* SDK usage:
  ```python
  client = OpenAI(
      api_key=os.environ["MOONSHOT_API_KEY"],
      base_url = "https://api.moonshot.cn/v1"
  )
  ```
  Source: platform.kimi.com quickstart excerpts.

### Console login
* Console login is phone-SMS based. Forum reports: *“login is only possible with phone number (wtf?) and SMS code to login is not coming.”* [https://forum.moonshot.ai/t/cant-login-because-sms-code-not-arrive/510](https://forum.moonshot.ai/t/cant-login-because-sms-code-not-arrive/510)
* No OAuth login is documented for the API itself. Authentication is static API key only.

### OAuth / Scopes / Token refresh
* **OAuth endpoints:** None documented for Kimi API. The provider uses API keys, not OAuth2 flows.
* **Scopes:** Not applicable – API key grants full access to the account’s models within rate limits.
* **Token refresh:** API keys are long-lived static secrets. Keys are shown once at creation and can be revoked manually. No refresh token flow.
  *“Copy the API Key immediately and store it securely. Like most API providers, Moonshot only displays the full key once at creation time.”* [https://www.getmodelkey.com/guides/how-to-get-kimi-api-key/](https://www.getmodelkey.com/guides/how-to-get-kimi-api-key/)

---

## 3. API Base URLs

* Mainland: `https://api.moonshot.cn/v1`
* International: `https://api.moonshot.ai/v1`
* Docs examples show:
  * `base_url="https://api.moonshot.cn/v1"` [platform.kimi.com docs]
  * `https://api.moonshot.ai/v1/chat/completions` in OpenRouter examples.

Platform homepage lists models with pricing and links to docs. [https://platform.kimi.com/](https://platform.kimi.com/)

---

## 4. Registration Requirements

### Mainland platform.moonshot.cn
* **Phone verification required.** Guides state:
  *“手机号验证：目前只支持中国大陆手机号（+86），海外号注册会卡住”* [https://ofox.ai/zh/blog/kimi-api-key-moonshot-api-guide-2026/](https://ofox.ai/zh/blog/kimi-api-key-moonshot-api-guide-2026/)
* *“你只需要一个能接收短信的中国大陆手机号。在浏览器中访问 platform.moonshot.cn… 点击上方的 ‘手机快捷登录’ 标签，切换到手机号登录方式。”* [Moonshot API Key 注册教程]
* Real-name authentication: personal ID for individual, business licence for enterprise. Personal auth is sufficient for development.
  *“个人认证填身份证就行，企业认证需要营业执照。个人认证足够日常开发使用”* [https://ofox.ai/zh/blog/kimi-api-key-moonshot-api-guide-2026/](https://ofox.ai/zh/blog/kimi-api-key-moonshot-api-guide-2026/)

### Payment methods – mainland
* Pay-per-token with pre-pay top up.
* Guides report: *“For continued usage, you need to add credits to your account. The platform supports Alipay and WeChat Pay for payments.”* [https://www.getmodelkey.com/guides/how-to-get-kimi-api-key/](https://www.getmodelkey.com/guides/how-to-get-kimi-api-key/)
* No PayPal is mentioned in official docs. Alipay/WeChat Pay are the standard payment rails.
* Minimum top-up: docs note *“在开放平台完成充值（最低充值金额 10 元）后即可解锁调用。”* [platform.kimi.com docs/guide/kimi-k3-quickstart]

### International platform.moonshot.ai
* International console bills in USD and accepts international cards.
* *“Moonshot sells international API access in USD via platform.moonshot.ai, and Kimi K2 routes through OpenRouter. US access paths + compliance, explained.”* [https://china-llm.com/blog/is-kimi-available-in-us](https://china-llm.com/blog/is-kimi-available-in-us)
* The international path removes the RMB / Alipay barrier but the console still uses phone-SMS login in practice.

---

## 5. Free Tier Limits & Pricing

### Free trial
* New users may receive free trial credits. Amount varies by campaign.
* *“New users may receive free trial credits upon registration, which is enough for initial testing.”* [https://www.getmodelkey.com/guides/how-to-get-kimi-api-key/](https://www.getmodelkey.com/guides/how-to-get-kimi-api-key/)
* *“注册完第一件事，去‘账户余额’或‘用量统计’页面看一眼免费额度。月之暗面给新用户的免费额度会随平台活动调整，不是一个固定数字。”* [https://ofox.ai/zh/blog/kimi-api-key-moonshot-api-guide-2026/](https://ofox.ai/zh/blog/kimi-api-key-moonshot-api-guide-2026/)
* The 15 元 new-user coupon explicitly *cannot* be used for Kimi K3. [platform.kimi.com docs/guide/kimi-k3-quickstart]

### Pay-as-you-go pricing – mainland CNY
Platform homepage shows current flagship pricing:
* **Kimi K3**
  * 缓存命中 ¥2.00 / MTok
  * 输入 ¥20.00 / MTok
  * 输出 ¥100.00 / MTok
  [https://platform.kimi.com/](https://platform.kimi.com/)
* **Kimi K2.7 Code**: 缓存命中 ¥1.30 / MTok, 输入 ¥6.50 / MTok, 输出 ¥27.00 / MTok
* **Kimi K2.6**: 缓存命中 ¥1.10 / MTok, 输入 ¥6.50 / MTok, 输出 ¥27.00 / MTok

Docs also list historical models:
* kimi-k2.5: ¥4.00 / M input, ¥20.00 / M output
* moonshot-v1-128k: ¥60.00 / M input, ¥60.00 / M output [https://ofox.ai/zh/blog/kimi-api-key-moonshot-api-guide-2026/](https://ofox.ai/zh/blog/kimi-api-key-moonshot-api-guide-2026/)

### International USD pricing
* China LLM Directory reports verified 2026-06 prices:
  * Kimi K2.6 flagship: $0.95 input / $4.00 output per M tokens, cached input $0.19, 256K context.
  * Legacy K2 0711 direct: ~$0.55 input / $2.20 output per M.
  * OpenRouter alias: ~$0.57 / $2.30 per M. [https://china-llm.com/blog/is-kimi-available-in-us](https://china-llm.com/blog/is-kimi-available-in-us)

Rate limits are tiered by cumulative top-up amount. Higher top-up raises RPM/TPM.

---

## 6. Germany Geo-Restrictions

Official help center:
*“Can Kimi API be called from outside the Chinese mainland? Kimi API is primarily intended for users in the Chinese mainland. Access from overseas regions may be affected by network conditions, and stability cannot be fully guaranteed. If you need to use it overseas, we recommend contacting the sales team to discuss feasible options.”* [https://www.kimi.com/en/help/kimi-api/api-troubleshooting](https://www.kimi.com/en/help/kimi-api/api-troubleshooting)

Practical observations:
* Mainland console platform.moonshot.cn expects +86 phone and Alipay/WeChat Pay. German mobile numbers are not accepted for SMS verification.
* The international console platform.moonshot.ai is intended for non-mainland users and bills in USD. Access from Germany is possible via that console, but the provider remains a China-based company.
* Waitlist / regional throttling for Kimi K3 has been reported. Community guides suggest VPN countries Malaysia, Mexico, Japan to bypass waitlist. [https://theaijournal.co/2026/08/kimi-k3-regional-access-guide-vpn-countries/](https://theaijournal.co/2026/08/kimi-k3-regional-access-guide-vpn-countries/)

---

## 7. GDPR / Data Residency

### Legal entity & location
* Privacy Policy: *“Our services are provided and controlled by MOONSHOT AI PTE. LTD. (‘we’ or ‘Moonshot AI’) in Singapore through web pages.”* [https://platform.kimi.ai/docs/agreement/userprivacy](https://platform.kimi.ai/docs/agreement/userprivacy)
* *“We store the information we collect in secure servers located in Singapore. When cross-border transfers are necessary, we will implement appropriate safeguards...”* [https://platform.kimi.ai/docs/agreement/userprivacy](https://platform.kimi.ai/docs/agreement/userprivacy)

### EU data residency
* InferCheck GDPR profile lists Moonshot AI as **non-compliant** for EU-only residency:
  *“Moonshot AI states its servers are located in Singapore and that personal data may be transferred to and stored on servers outside the user's country of residence. No EU region or EU-only processing option was found.”* [https://infercheck.eu/en/provider/moonshot-ai](https://infercheck.eu/en/provider/moonshot-ai)
* No public DPA / Standard Contractual Clauses were found in primary sources reviewed by InferCheck.
* The privacy policy also states user content *“helps us optimize our models”* and may be used to train underlying technology.

**Implication for Germany / EU:** Data is processed/stored in Singapore. No EU data residency option is offered. GDPR compliance requires a separate legal assessment; the provider is Singapore-based with China ultimate origin.

---

## 8. Workarounds for Geo-Blocking with German Mobile Only & No Payment

### Problem statement
* Mainland platform requires +86 phone SMS and Alipay/WeChat Pay. German mobile + no payment does not meet requirements.
* Direct mainland access is unstable from Germany.

### Viable workarounds

1. **Use the international console platform.moonshot.ai**
   * Bills in USD, accepts international cards. Reduces phone / payment friction vs mainland.
   * Still requires account creation; phone-SMS may still be requested. Some users report success with international numbers via the .ai console.
   * Source: [https://china-llm.com/blog/is-kimi-available-in-us](https://china-llm.com/blog/is-kimi-available-in-us)

2. **API aggregator / router – no direct Moonshot registration needed**
   * OpenRouter routes `moonshotai/kimi-k2`, `kimi-k2.7-code`, etc. with a single OpenRouter API key.
   * *“OpenRouter lets you access Kimi K2.6 through a single API key alongside 300+ other models. No separate Moonshot account”* [aimadetools.com guide]
   * OpenRouter accepts USD credit card payment; PayPal not standard.
   * This bypasses Chinese phone verification and Alipay.

3. **Third-party aggregation platforms**
   * Services like ofox.ai, APIRouter.chat claim to remove Chinese phone barrier.
   * *“Most Chinese AI model providers require a Chinese phone number for registration. APIRouter removes that barrier”* [apirouter.chat blog]
   * Requires payment to the aggregator; free usage unlikely.

4. **VPN for access stability / waitlist bypass**
   * If using the mainland console, community guides recommend VPN exit nodes in Malaysia, Mexico, Japan to improve access and bypass Kimi K3 waitlist throttling.
   * *“The best VPN countries to bypass the Kimi K3 waitlist instantly are Malaysia, Mexico, and Japan”* [https://theaijournal.co/2026/08/kimi-k3-regional-access-guide-vpn-countries/](https://theaijournal.co/2026/08/kimi-k3-regional-access-guide-vpn-countries/)
   * VPN does not solve phone verification or payment constraints.

5. **No-payment / free-only scenario**
   * No sustainable free tier exists. Trial credits are limited and require registration + top-up eventually.
   * With German mobile only and zero payment, the only realistic path is a free trial via an aggregator that offers a free tier, or using a community proxy. Official Moonshot access will require at least one payment method and a verified phone.

### Recommended DSH integration approach for Germany
* Prefer `platform.moonshot.ai` with USD billing if a card is available.
* For strict no-payment testing, use OpenRouter’s free trial credits if offered, pointing to `moonshotai/kimi-k2` models.
* For production, assume Singapore data residency and no GDPR EU-only guarantees. Document data processing risk.

---

## 9. Summary Table

| Item | Detail |
|------|--------|
| Auth method | API Key Bearer token. No OAuth. |
| Base URLs | `https://api.moonshot.cn/v1` mainland; `https://api.moonshot.ai/v1` international |
| Scopes | N/A |
| Token refresh | Static API keys, manual revocation |
| Registration | Mainland: +86 phone SMS + real-name ID; Payment Alipay/WeChat Pay. International: USD card, phone-SMS may still apply |
| Free tier | Trial credits variable; no fixed free plan |
| Pricing example | K3 ¥20 / M input, ¥100 / M output; K2.6 ¥6.5 / M input, ¥27 / M output. International ~$0.95/$4.00 for K2.6 |
| Germany access | Primarily mainland-intended; overseas access may be unstable. Use platform.moonshot.ai or aggregator |
| GDPR residency | Servers in Singapore. No EU-only option documented |
| Workaround | Use platform.moonshot.ai + USD card, or OpenRouter/Aggregator to avoid Chinese phone/Alipay. VPN Malaysia/Mexico/Japan for stability |

---

### Sources

* Platform home & pricing: https://platform.kimi.com/
* Quick start / API key: https://platform.kimi.com/docs/get-api-key
* API overview auth: https://platform.kimi.ai/docs/api/overview
* Privacy policy Singapore storage: https://platform.kimi.ai/docs/agreement/userprivacy
* Help center overseas access: https://www.kimi.com/en/help/kimi-api/api-troubleshooting
* Registration phone +86: https://ofox.ai/zh/blog/kimi-api-key-moonshot-api-guide-2026/
* Free trial & Alipay/WeChat Pay: https://www.getmodelkey.com/guides/how-to-get-kimi-api-key/
* International USD access: https://china-llm.com/blog/is-kimi-available-in-us
* GDPR profile: https://infercheck.eu/en/provider/moonshot-ai
* VPN waitlist guide: https://theaijournal.co/2026/08/kimi-k3-regional-access-guide-vpn-countries/
* OpenRouter moonshotai models: https://openrouter.ai/moonshotai

---
*Report generated by subagent for DSH integration research.*
