# Cohere Provider Research for 9Router/OmniRoute – Germany Compatibility

## Summary
Cohere provides API access via API key authentication. A free Trial Key is available with 1,000 calls/month and no credit-card requirement. Registration is email-based; phone/SMS verification is not documented for trial accounts. The service is globally accessible, with GDPR-oriented privacy commitments for EEA/UK/Switzerland residents. For a German mobile-only, no-payment scenario, a free trial can be created with an email address; sustained 20-day long sessions are not viable under free tier limits.

---

## Authentication method

- **Authentication:** API key. The Cohere Python SDK v2 client is initialized with `api_key="YOUR_API_KEY"`.
  - `api_key` *str/callable* – API key for authenticating requests to the Cohere V2 API. [https://r.jina.ai/http://docs.cohere.com/docs/create-client](https://r.jina.ai/http://docs.cohere.com/docs/create-client)
- **Base URL:** Configurable via client parameter `base_url`. Default: `os.getenv("CO_API_URL")`. Environment `ClientEnvironment.PRODUCTION` is default.
  - Parameter table shows `base_url` *str* default `os.getenv("CO_API_URL")` [https://r.jina.ai/http://docs.cohere.com/docs/create-client](https://r.jina.ai/http://docs.cohere.com/docs/create-client)
- **Usage pattern observed in community guides:**
  - `base_url="https://cohere.com/v1"`
  - Header `Authorization: Bearer 你的API_KEY`
  - Example curl:
    ```
    curl https://cohere.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer 你的API_KEY" \
      -d '{"model": "command-r+", "messages": [{"role": "user", "content": "Hello"}]}'
    ```
    [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- OAuth is not offered for standard API access; authentication is API-key based.

## Free tier: details, limits, requires payment?

- Free Trial Key: **1,000 calls/month**, covers full model range, no credit card required.
  - “Cohere 是一款category.api、对话工具，专注于企业级 NLP，提供 Command R+（对话/RAG）、Rerank（重排序）、Embed（嵌入）三大核心能力。 免费 Trial Key 每月 1000 次调用，覆盖全系列，无需信用卡。” [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- “免费额度: 1000 calls/month” [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- “免费 Trial Key，每月 1000 次，覆盖全系列模型，无需信用卡，每月重置” [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- Trial limits / rate limits apply: “Trial 限速” for Command R+, Rerank, Embed. [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- Production use is prohibited on Trial Key:
  - “Cohere 免费 Key 能用于生产吗？ 不能。Trial Key 仅限评估和开发，不允许用于生产或商业用途。生产环境需要升级到 Production Key（按量付费）。” [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- Registration tutorial:
  - Step 1 访问 dashboard.cohere.com，点击 Sign Up
  - Step 2 邮箱注册，无需信用卡
  - Step 3 在 API Keys 页面获取 Trial Key [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- No payment method is required to obtain a Trial Key. Payment is only asked when moving from Trial User to Enterprise User:
  - Privacy Policy: “To move from a Trial User to an Enterprise User, you will be asked to provide payment information so that we can process payments and manage billing to your company.” [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)

## Registration: email/phone requirements, German mobile acceptance, SMS verification

- **Account type for free usage:** Trial User.
  - Privacy Policy defines: “Trial Users: Individuals who create or access a free trial account to test out our Platform under our standard Terms of Use with no payment method on file.” [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
- **Collected data for account administration:**
  - “We collect and use business contact information (name, business email address) and a password you select to create and administer your account” [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
- **Registration flow documented by third-party guide:**
  - “邮箱注册，无需信用卡” [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- No documentation found requiring phone number or SMS verification for Trial account creation. The privacy policy lists collected categories for account administration as name, business email, password – no phone/SMS mentioned.
- **German mobile acceptance:** Not required. Since phone number is not a required registration field for Trial Users, German mobile number is not needed for sign-up. No SMS verification step is described.

## Germany/EU geo restrictions, GDPR compliance

- **General availability:** Cohere platform is marketed internationally; no explicit Germany block found in public documentation.
- **Privacy Policy jurisdiction addenda:**
  - “If you are located in the EEA/UK or Switzerland, see the Additional Information for European Residents” [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
  - Controller for EEA/UK/Switzerland residents: Cohere Inc.
  - Legal bases for processing under GDPR/UK GDPR are listed per purpose, including Consent and Legitimate Interests. [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
- **International transfers:**
  - “Cohere may transfer, store, and/or receive certain personal information outside of your jurisdiction of residence … Examples of countries we transfer personal information to include, but are not limited to, Canada, the United States, and the United Kingdom.” [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
  - Transfers rely on adequacy decisions / Standard Contractual Clauses / Data Privacy Framework. [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
- **Enterprise Data Commitments** referenced for data handling: “Enterprise customers should consult our Enterprise Data Commitments for information about data handling associated with the Cohere’s enterprise products and SaaS platform.” [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
- **Trial/Research data usage:**
  - For Trial Users and Researchers: “we collect content you submit to the Cohere Products, and outputs generated by the Cohere Products. We may use this input and output data to conduct research and development.” [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
  - “These trial and research environments are not intended for the processing of personal information.” [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
- No geo-block for Germany is documented; GDPR commitments are present via privacy addendum.

## Workarounds for Germany with German mobile only no payment

- **Feasible path:**
  1. Create a Cohere Dashboard account using a business/personal email address. Email registration is sufficient; no phone/SMS verification required.
  2. Generate a Trial Key from API Keys page. No credit card required.
  3. Use API key with `Authorization: Bearer <key>` against Cohere endpoints.
- **Constraints:**
  - Trial Key is limited to 1,000 calls/month and Trial rate limits.
  - Trial Key is not permitted for production/commercial use.
  - Inputs/outputs in Trial environment may be used for research/model improvement and are not intended for personal data processing.
- **German mobile only:** Not a blocker, as phone number is not requested. If a user only has a German mobile and no email, registration cannot be completed under current flow, which requires email.
- **No payment:** Achievable for trial evaluation. Sustained usage requires upgrading to paid Production Key, which requires payment information.

## 20-day free long sessions viability

- **Limits:**
  - 1,000 calls/month cap.
  - Trial rate limits apply.
  - No guarantee of long-running session persistence beyond API call limits.
- **Assessment:** Not viable for continuous 20-day free long sessions via free tier alone. The call quota would be exhausted quickly with sustained interaction, and the Trial Key is restricted to evaluation/development, not production long-running sessions.
- **Alternative:** Requires paid tier with billing details and potentially enterprise agreement for long sessions, data residency, and SLAs.

---

## Citations

- Free tier 1,000 calls/month, no credit card: [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- Code example base_url and Authorization Bearer: [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- Registration email, no credit card: [https://yangmao.ai/zh/providers/cohere/](https://yangmao.ai/zh/providers/cohere/)
- SDK client api_key and base_url parameters: [https://r.jina.ai/http://docs.cohere.com/docs/create-client](https://r.jina.ai/http://docs.cohere.com/docs/create-client)
- Privacy Policy Trial User definition and payment requirement on upgrade: [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)
- Privacy Policy GDPR addendum and international transfers: [https://r.jina.ai/http://cohere.com/privacy](https://r.jina.ai/http://cohere.com/privacy)

*Report generated for dsh-oauthproextended deep research.*
