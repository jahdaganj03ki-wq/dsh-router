# Qwen Provider for DSH Integration – Research Report

## 1. Authentication Methods

### 1.1 Alibaba Cloud Model Studio – API Key

- Authentication is via a pay-as-you-go API key created in Model Studio console.
- Creation requires an Alibaba Cloud account or RAM user with `administrator` or `API-Key` page permissions.
- Key format after upgrade starts with `sk-ws`, displayed only once on creation. Pre-upgrade keys start with `sk-`.
- Keys are per workspace and cannot be used across regions. Each region has its own endpoint, API key and model list.
- API key can be scoped: All or Custom with IP whitelist up to 20 entries and model access scope up to 30 models.
- Usage: `Authorization: Bearer <API_KEY>` together with a region-specific Base URL.
- API keys do not expire until manually deleted. Temporary API keys valid up to 1800s can be generated.

Sources:
- How to obtain an API key – Alibaba Cloud Model Studio [https://www.alibabacloud.com/help/en/model-studio/get-api-key](https://www.alibabacloud.com/help/en/model-studio/get-api-key)
- Make your first API call to Qwen [https://www.alibabacloud.com/help/en/model-studio/first-api-call-to-qwen](https://www.alibabacloud.com/help/en/model-studio/first-api-call-to-qwen)

### 1.2 Qwen Chat OAuth – Device Code Flow

Used by Qwen Code / Qwen OAuth provider integration.

- Base URL: `https://chat.qwen.ai`
- Device code endpoint: `https://chat.qwen.ai/api/v1/oauth2/device/code`
- Token endpoint: `https://chat.qwen.ai/api/v1/oauth2/token`
- Client ID: `f0304373b74a44d2b584a3fb70ca9e56`
- Scope: `openid profile email model.completion`
- Grant type: `urn:ietf:params:oauth:grant-type:device_code`
- PKCE S256 is used for device authorization.
- Token refresh: POST to token endpoint with `grant_type=refresh_token` and `refresh_token`. Refresh timeout 30s. On 400/401 refresh failure credentials are cleared and re-auth required.

Sources:
- qwenOAuth2.ts raw [https://raw.githubusercontent.com/QwenLM/qwen-code/5581424b/packages/core/src/qwen/qwenOAuth2.ts](https://raw.githubusercontent.com/QwenLM/qwen-code/5581424b/packages/core/src/qwen/qwenOAuth2.ts)

## 2. API Base URLs and Scopes

### 2.1 Model Studio Regional Endpoints

Workspace-dedicated domain format: `{WorkspaceId}.{region}.maas.aliyuncs.com`

Regions:

- China Beijing: `cn-beijing` → `{WorkspaceId}.cn-beijing.maas.aliyuncs.com`
- Singapore: `ap-southeast-1` → `{WorkspaceId}.ap-southeast-1.maas.aliyuncs.com`
- Germany Frankfurt: `eu-central-1` → `{WorkspaceId}.eu-central-1.maas.aliyuncs.com`
- Japan Tokyo: `ap-northeast-1`
- US Virginia: `us-east-1` → `{WorkspaceId}.us-east-1.maas.aliyuncs.com`

OpenAI-compatible Base URL example:
- Singapore: `https://{WorkspaceId}.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1`
- US Virginia: `https://{WorkspaceId}.us-east-1.maas.aliyuncs.com/compatible-mode/v1`
- Frankfurt: `https://{WorkspaceId}.eu-central-1.maas.aliyuncs.com/compatible-mode/v1`

DashScope API v1:
- `https://{WorkspaceId}.{region}.maas.aliyuncs.com/api/v1`

Service deployment scope selection is required for Frankfurt, Tokyo, Hong Kong, US:
- Germany Frankfurt supports Global and EU scopes.

Sources:
- Regions and endpoints [https://www.alibabacloud.com/help/en/model-studio/regions](https://www.alibabacloud.com/help/en/model-studio/regions)
- Base URL overview [https://docs.modelstudio.console.alibabacloud.com/en/model-studio/base-url](https://docs.modelstudio.console.alibabacloud.com/en/model-studio/base-url)
- Frankfurt region now available [https://www.alibabacloud.com/en/notice/model_studio_frankfurt_region_now_available_700?_p_lc=1](https://www.alibabacloud.com/en/notice/model_studio_frankfurt_region_now_available_700?_p_lc=1)

### 2.2 API Key Scopes / Permissions

Permissions are workspace-bound. All API keys in same workspace share identical permissions.
Options on creation:
- All: call any model/application in workspace
- Custom: IP whitelist + model access scope selection up to 30 models

Sources:
- How to obtain an API key – Alibaba Cloud Model Studio [https://www.alibabacloud.com/help/en/model-studio/get-api-key](https://www.alibabacloud.com/help/en/model-studio/get-api-key)

## 3. Free Tier Limits & Pricing

### 3.1 Free Quota for New Users

- Activated automatically on first activation of Model Studio Singapore region.
- Eligible models: Singapore region with International service deployment scope only.
- Default quota: typically 1,000,000 tokens per model.
- Validity: 90 days from activation / model release / approval, whichever is later. Changed policy from 03:00 UTC 8 Sep 2025 onward.
- Free quota covers real-time inference only. Excludes batch, fine-tuning, deployment, custom models, PAI-DSW, OSS.
- Same Alibaba Cloud account + RAM users share one free quota.
- Free Quota Only / worry-free mode can be enabled to stop at quota exhaustion with error `AllocationQuota.FreeTierOnly`.
- New users cannot continue after quota exhaustion until account information is completed and pay-as-you-go is enabled.

Sources:
- Free quota for new users [https://www.alibabacloud.com/help/en/model-studio/new-free-quota](https://www.alibabacloud.com/help/en/model-studio/new-free-quota)
- Model inference pricing [https://www.alibabacloud.com/help/en/model-studio/model-pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing)

### 3.2 Pricing Examples

Pay-as-you-go by input/output tokens per 1M.

Singapore examples:
- qwen3.8-max: Input $2 / 1M, Output $6 / 1M, free quota 1M tokens
- qwen3.7-max: Input $2.5 / 1M, Output $7.5 / 1M
- qwen-max: Input $1.6 / 1M, Output $6.4 / 1M

Germany Frankfurt examples:
- qwen3.7-plus: Input $0.276 / 1M ≤256K, Output $1.101 / 1M, night 60% off daytime 20% off limited time
- qwen-plus EU scope: 0-256K Input $0.4 / 1M, Output $1.2 / 1M non-thinking, $4 / 1M thinking; 256K-1M Input $1.2 / 1M, Output $3.6 / 1M

Tiered pricing applies based on input tokens per request.

Sources:
- Model inference pricing [https://www.alibabacloud.com/help/en/model-studio/model-pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing)

## 4. Registration Requirements

### 4.1 Alibaba Cloud Account

Stages:
1. Create account: Email address, mobile number optional.
2. Complete sign-up: Mobile number, payment method, billing address, tax information optional.
3. Identity verification: Passport/driver's license for individual; company certificate for enterprise.

Mobile number must belong to the selected Country/Region. Cannot be changed after registration; wrong region requires account closure and re-registration.

Payment methods depend on contracting entity:
- Bank card: Visa, Mastercard, Amex, UnionPay, JCB, Discover, Diners Club
- Digital wallet: Alipay CN, PayPal, Apple Pay, Google Pay, iDEAL etc.
- Bank transfer for credit-control enterprise customers.

Contracting entity mapping:
- EEA → Alibaba (Netherlands) B.V.
- UK/Switzerland/other Europe outside EEA → Alibaba Cloud (Europe) Limited
- Singapore etc → Alibaba Cloud (Singapore) Private Limited

PayPal availability by entity: Supported for Singapore, United States, United Kingdom. Not listed for Netherlands/EEA. PayPal accounts registered in Chinese mainland not supported.

Pre-authorization of USD 1.00 required to link card/PayPal.

Sources:
- Step 1: Register an Alibaba Cloud account [https://www.alibabacloud.com/help/en/account/step-1-register-an-alibaba-cloud-account](https://www.alibabacloud.com/help/en/account/step-1-register-an-alibaba-cloud-account)
- Payment methods [https://www.alibabacloud.com/help/en/user-center/instruction-of-payment-management/](https://www.alibabacloud.com/help/en/user-center/instruction-of-payment-management/)

### 4.2 Qwen Chat Login

Qwen Studio / chat.qwen.ai supports sign-in via email, Google, GitHub. Free to use. No phone/PayPal required for chat UI.

Sources:
- Qwen Studio sign in [https://chat.qwen.ai/auth?action=signin](https://chat.qwen.ai/auth?action=signin)

## 5. Germany Geo Restrictions & GDPR Data Residency

### 5.1 Geo Restrictions

- `qianwen.aliyun.com` is geo-restricted in many countries outside China.
- `chat.qwen.ai` is generally accessible globally but users report captcha/defense loops and occasional blocks.
- Model Studio API is global; regional endpoints allow EU data residency.

Workarounds mentioned:
- Use OpenRouter, Hugging Face Spaces, or Ollama locally for geo-restricted users.
- For API access, use Alibaba Cloud international site alibabacloud.com, not aliyun.com.

Sources:
- Qwen Chat Not Working guide [https://prismix.dev/guides/qwen-chat-not-working](https://prismix.dev/guides/qwen-chat-not-working)

### 5.2 GDPR / Data Residency

- Alibaba Cloud Model Studio Frankfurt region `eu-central-1` launched March 2025.
- Service deployment scope EU keeps inference execution within EU.
- Data transmitted during application building and model training encrypted AES-256. Alibaba Cloud states it will never use user data for model training.
- SOC 2 compliance achieved.
- Privacy notice references GDPR compliance and data processing addendum.

Sources:
- Regions and endpoints [https://www.alibabacloud.com/help/en/model-studio/regions](https://www.alibabacloud.com/help/en/model-studio/regions)
- Security certifications and privacy [https://www.alibabacloud.com/help/en/model-studio/privacy-notice](https://www.alibabacloud.com/help/en/model-studio/privacy-notice)
- Frankfurt region notice [https://www.alibabacloud.com/en/notice/model_studio_frankfurt_region_now_available_700?_p_lc=1](https://www.alibabacloud.com/en/notice/model_studio_frankfurt_region_now_available_700?_p_lc=1)

## 6. Token Refresh & Scopes Summary

- OAuth device flow issues short-lived access token with refresh token.
- Refresh endpoint same as token endpoint with `grant_type=refresh_token`.
- Refresh timeout 30s.
- On refresh failure 400/401, credentials cleared, re-auth required.
- API key has no refresh; long-lived until deleted.

## 7. Workaround for Germany with German mobile number only, no payment

Goal: Use Qwen in Germany without payment method.

Options:

1. Qwen Chat OAuth:
   - Sign in to chat.qwen.ai via email/Google/GitHub, no payment required.
   - OAuth device flow works headless via client ID above.
   - If geo-blocked/captcha loops occur, use a VPN to Singapore/US to reach chat.qwen.ai.

2. Alibaba Cloud Model Studio API with free quota:
   - Register Alibaba Cloud international account with Country/Region = Germany/EEA, German mobile number.
   - Complete sign-up requires payment method entry. To avoid charges:
     * Enable Free Quota Only mode for all models.
     * Use Singapore region free quota 1M tokens per model for 90 days.
     * No API calls after quota exhaustion will be blocked and not charged.
   - To avoid payment requirement for actual charges, keep usage within free quota and do not complete pay-as-you-go activation until needed.
   - For GDPR compliance, create workspace in Frankfurt `eu-central-1` with EU service deployment scope. Note free quota is Singapore-only, so EU inference will be pay-as-you-go. Workaround: develop/test with Singapore free quota, production with Frankfurt and enable Free Quota Only to prevent accidental charges.

3. VPN considerations:
   - VPN to Singapore or US improves access to chat.qwen.ai and reduces latency to Singapore API endpoint.
   - For EU data residency, use Frankfurt endpoint without VPN; data stays in EU.

Constraints:
- PayPal not supported for EEA contracting entity per payment matrix; bank card with 3DS required if payment needed.
- Mobile verification must match selected country. German mobile works for Germany/EEA registration.
- Re-registering a new account does not grant a new free quota.

## 8. Citations Summary

All URLs above provide source material for authentication, pricing, registration, regions, GDPR, OAuth endpoints.

---

Report generated for DSH integration. Last updated 2026-09-12.
