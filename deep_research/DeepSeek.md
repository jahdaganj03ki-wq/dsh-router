# DeepSeek Provider Research for DSH Integration

## Overview
DeepSeek provides two distinct surfaces: a free consumer chat/web app and a pay-as-you-go developer API. Authentication models are different per surface. The API is OpenAI-compatible and uses Bearer API keys. The consumer chat uses email/phone sign-up with verification codes.

## Authentication & API Access

### API Authentication
- **Method:** HTTP Bearer token. API key format `sk-...` issued from the developer platform.
- **Auth header:** `Authorization: Bearer ${DEEPSEEK_API_KEY}`

> Authentication scheme type: http, HTTP Authorization Scheme: bearer. [https://api-docs.deepseek.com/api/deepseek-api/](https://api-docs.deepseek.com/api/deepseek-api/)

- **Create key:** https://platform.deepseek.com/api_keys

### Base URLs
- OpenAI format: `https://api.deepseek.com`
- Anthropic format: `https://api.deepseek.com/anthropic`
- Chat completions endpoint: `POST https://api.deepseek.com/chat/completions`

> | base_url (OpenAI) | `https://api.deepseek.com` |
> | base_url (Anthropic) | `https://api.deepseek.com/anthropic` | [https://api-docs.deepseek.com/](https://api-docs.deepseek.com/)

### OAuth / Scopes / Token Refresh
- No OAuth 2.0 authorization code flow is exposed for API access. The official docs document only Bearer API key authentication.
- No scopes model is documented; access is controlled by the key and account balance.
- API keys are static Bearer tokens. Rotation is manual via platform.deepseek.com. No automatic token refresh flow is provided.
- Chat/web sign-in supports email, phone SMS verification, Google Sign-In, and Apple Sign-In on mobile.

### Consumer Chat Login
- Registration at `chat.deepseek.com` or mobile app.
- Sign-up accepts email or phone number with 10-minute verification code. Password min 8 chars. Google Sign-In available on web.
- Account separate from developer platform, though credentials can be shared.

> For the chatbot, register at chat.deepseek.com or inside the official mobile app; for API access, register separately at platform.deepseek.com. [https://deepseekai.guide/guides/deepseek-sign-up/](https://deepseekai.guide/guides/deepseek-sign-up/)

## Pricing, Free Tier & Registration Requirements

### Free tier
- Web chat and mobile apps are free to use. Default model is DeepSeek V4 with soft rate limits during peak hours. No publicly documented hard daily message cap as of 2026.
- API: pay-as-you-go, no subscription. Balance is prepaid. Some new accounts receive a small promotional “granted balance” that may expire; not guaranteed.

> The web chat is free to use and defaults to V4. [https://deepseekai.guide/guides/deepseek-sign-up/](https://deepseekai.guide/guides/deepseek-sign-up/)

### Pricing 2026
Models & Pricing page lists per 1M tokens, USD.

Current models:
- `deepseek-flash` → DeepSeek-V4.1-Flash, 1M context, max output 384K
- `deepseek-v4-pro` → DeepSeek-V4-Pro-0813

Pricing snapshot:
- `deepseek-flash` input cache hit off-peak $0.003, peak $0.006; cache miss off-peak $0.15, peak $0.3; output off-peak $0.6, peak $1.2
- `deepseek-v4-pro` input cache hit off-peak $0.022, peak $0.044; cache miss off-peak $0.66, peak $1.32; output off-peak $1.98, peak $3.96

Peak hours: 01:00-04:00 and 06:00-10:00 UTC Mon-Fri excluding Chinese public holidays.

> Models & Pricing [https://api-docs.deepseek.com/quick_start/pricing/](https://api-docs.deepseek.com/quick_start/pricing/)

### Registration requirements
- Chat: email or phone, verification code. Google/Apple sign-in optional.
- API platform: email or phone registration, verification code, then billing top-up required before API key returns responses.
- Phone-based accounts may be required for billing depending on region/card issuer.
- Payment methods accepted at platform.deepseek.com: bank card, PayPal, Alipay, WeChat Pay, availability depends on account region.

> Top-ups at platform.deepseek.com run through bank card, PayPal, Alipay, or WeChat Pay depending on your account region [https://www.solcard.cc/blog/pay-deepseek-with-crypto](https://www.solcard.cc/blog/pay-deepseek-with-crypto)
> DeepSeek does not accept cryptocurrency. Its top-up channels at platform.deepseek.com are bank card, PayPal, Alipay, and WeChat Pay [https://www.solcard.cc/blog/pay-deepseek-with-crypto](https://www.solcard.cc/blog/pay-deepseek-with-crypto)

No minimum top-up is documented officially; examples use $5.

### Phone / PayPal constraints
- Virtual numbers such as Google Voice are blocked for verification.
- Some regions require a mainland China mobile number during periods of malicious attack mitigation historically in Jan 2025.
- German mobile number works for chat sign-up via SMS/email verification. API billing requires a payment method that clears international USD charges from a Chinese-domiciled merchant.

## Germany Geo Restrictions & GDPR

### App store restrictions
- June 2025: Berlin data protection commissioner Meike Kamp asked Apple and Google to block the DeepSeek app from German app stores, citing unlawful transfer of German user data to China under GDPR.
- Reuters: “Germany says DeepSeek illegally transfers user data to China”.
- Similar action previously taken in Italy Jan 2025.

> Germany tells Apple, Google to block DeepSeek AI app [https://www.cnbc.com/2025/06/27/germany-tells-apple-google-to-block-deepseek-ai-app.html](https://www.cnbc.com/2025/06/27/germany-tells-apple-google-to-block-deepseek-ai-app.html)
> DeepSeek faces ban from Apple, Google app stores in Germany [https://www.reuters.com/sustainability/boards-policy-regulation/deepseek-faces-expulsion-app-stores-germany-2025-06-27/](https://www.reuters.com/sustainability/boards-policy-regulation/deepseek-faces-expulsion-app-stores-germany-2025-06-27/)

The request targets app distribution, not the web API. Web access to chat.deepseek.com and api.deepseek.com is not formally geo-blocked as of the sources reviewed, though users report access issues.

### Data residency
- Data Controller: Hangzhou DeepSeek Artificial Intelligence Co., Ltd., China.
- Privacy Policy states: “To provide you with our services, we directly collect, process and store your Personal Data in People's Republic of China.”
- For EEA/UK users, DeepSeek appoints Prighter Group as Article 27 representative.

> Data Controller: The Services are provided and controlled by Hangzhou DeepSeek Artificial Intelligence Co., Ltd. [https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
> To provide you with our services, we directly collect, process and store your Personal Data in People's Republic of China. [https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)

GDPR compliance concerns stem from lack of adequacy decision for China and transfers of chat content for model training.

### DSH integration implications
- No OAuth endpoints for API; DSH must use API key Bearer auth.
- No EU data residency option. Using DeepSeek API from Germany processes personal data in China, which violates GDPR for many use cases.
- Consumer chat is available via web; mobile app may be unavailable in German app stores.

## Workaround for Germany with German mobile number only, no payment

### Objective constraints
- German mobile number only, no payment method.
- Wants to work in Germany.

### Feasible options
1. **Free consumer chat via web**
   - Access chat.deepseek.com via browser. Register with German mobile number + SMS code or email. No payment required.
   - VPN not required for web access, but can be used to avoid app-store geo blocks or network-level filtering by ISP.
   - Limitation: No API access, only interactive chat.

2. **API access without payment**
   - Official API requires prepaid balance. No guaranteed free tier.
   - Workarounds reported by community:
     * Use aggregator proxies like OpenRouter that host DeepSeek models and accept crypto or free trial credits. This keeps you off the official billing system but adds third-party data handling.
     * Use a crypto-funded virtual card to top up platform.deepseek.com without a traditional bank card. This requires payment, contrary to “no payment” constraint.
   - With zero payment, API usage is not possible long-term. Occasional granted balance may appear, but not reliable.

3. **Geo-blocking circumvention**
   - App store block: download APK/IPA from official site or use web version. VPN to a non-German IP can help reach platform.deepseek.com if ISP blocks are in place.
   - API endpoints are not known to be IP-blocked for Germany; requests to api.deepseek.com succeed from EU IPs in tests.
   - Using VPN does not change data residency; data still processed in China.

### Recommended minimal-cost setup
- For DSH integration testing without payment: use the free web chat for manual validation only.
- For production API use in Germany: not GDPR-compliant without explicit user consent and data transfer impact assessment. Consider self-hosted open weights or EU-resident provider.

## Key Endpoints Summary
- Platform: https://platform.deepseek.com
- API Docs: https://api-docs.deepseek.com
- API Base: https://api.deepseek.com
- Chat: https://chat.deepseek.com
- Privacy Policy: https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html

## Sources
- DeepSeek API Authentication [https://api-docs.deepseek.com/api/deepseek-api/](https://api-docs.deepseek.com/api/deepseek-api/)
- Your First API Call [https://api-docs.deepseek.com/](https://api-docs.deepseek.com/)
- Models & Pricing [https://api-docs.deepseek.com/quick_start/pricing/](https://api-docs.deepseek.com/quick_start/pricing/)
- Privacy Policy [https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- Sign-up Guide [https://deepseekai.guide/guides/deepseek-sign-up/](https://deepseekai.guide/guides/deepseek-sign-up/)
- Payment methods [https://www.solcard.cc/blog/pay-deepseek-with-crypto](https://www.solcard.cc/blog/pay-deepseek-with-crypto)
- Germany app ban CNBC [https://www.cnbc.com/2025/06/27/germany-tells-apple-google-to-block-deepseek-ai-app.html](https://www.cnbc.com/2025/06/27/germany-tells-apple-google-to-block-deepseek-ai-app.html)
- Germany app ban Reuters [https://www.reuters.com/sustainability/boards-policy-regulation/deepseek-faces-expulsion-app-stores-germany-2025-06-27/](https://www.reuters.com/sustainability/boards-policy-regulation/deepseek-faces-expulsion-app-stores-germany-2025-06-27/)

*Report generated 2025-09-14. Information changes frequently; verify against official docs before production use.*
