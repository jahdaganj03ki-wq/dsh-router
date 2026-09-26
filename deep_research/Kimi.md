# Kimi / Moonshot AI – DSH OAuth Integration Deep Research

## Overview

Moonshot AI operates the Kimi Open Platform (Kimi API) and Kimi Code services. The public API is API-Key based and OpenAI-compatible; OAuth 2.0 device code flow is exposed for Kimi Code CLI authentication, not for the generic chat/completion API.

## API Base URLs and Protocol Compatibility

Service address:
```
https://api.moonshot.ai
```
Base URLs per protocol:

| Compatible API | base_url | Endpoint |
|---|---|---|
| OpenAI Chat Completions | `https://api.moonshot.ai/v1` | `/chat/completions` |
| OpenAI Responses | `https://api.moonshot.ai/v1` | `/responses` |
| Anthropic Messages | `https://api.moonshot.ai/anthropic` | `/messages` |

Source: API Overview page lists service address and protocol compatibility. [https://platform.kimi.ai/docs/api/overview](https://platform.kimi.ai/docs/api/overview)

Additional provider documentation notes the classic endpoint `https://api.moonshot.cn/v1` for OpenAI-compatible access. [https://china-llm.com/provider/moonshot](https://china-llm.com/provider/moonshot)

## Authentication

### API Key authentication

All API requests require an API Key in the HTTP header:

```
Authorization: Bearer $MOONSHOT_API_KEY
```

The platform docs state: “All API requests require an API Key in the HTTP header: Authorization: Bearer $MOONSHOT_API_KEY”. Source search result for API Overview.

List Models example confirms header usage:
```
curl https://api.moonshot.ai/v1/models \
  -H "Authorization: Bearer $MOONSHOT_API_KEY"
```
Source: List Models documentation.

### OAuth / Device Code flow – Kimi Code

OAuth is used for Kimi Code CLI, not for the standard chat API.

From `kimi-cli/src/kimi_cli/auth/oauth.py`:

```
KIMI_CODE_CLIENT_ID = "17e5f671-d194-4dfb-9706-5516cb48c098"
DEFAULT_OAUTH_HOST = "https://auth.kimi.com"
```

Device authorization:
```
POST {OAUTH_HOST}/api/oauth/device_authorization
data: client_id=KIMI_CODE_CLIENT_ID
```

Token polling / refresh:
```
POST {OAUTH_HOST}/api/oauth/token
```
Parameters for device code grant:
```
client_id
device_code
grant_type=urn:ietf:params:oauth:grant-type:device_code
```
Parameters for refresh token grant:
```
client_id
grant_type=refresh_token
refresh_token
```

Headers include `X-Msh-Platform`, `X-Msh-Version`, `X-Msh-Device-Name`, `X-Msh-Device-Model`, `X-Msh-Os-Version`, `X-Msh-Device-Id`.

Token response fields: `access_token`, `refresh_token`, `expires_in`, `scope`, `token_type`, `expires_at` computed client-side.

Source: raw OAuth implementation. [https://raw.githubusercontent.com/MoonshotAI/kimi-cli/bfd9d273/src/kimi_cli/auth/oauth.py](https://raw.githubusercontent.com/MoonshotAI/kimi-cli/bfd9d273/src/kimi_cli/auth/oauth.py)

Device code flow support: Confirmed via RFC 8628 device code implementation in the CLI. No public documentation for a general OAuth authorization server for the API Key platform; OAuth is scoped to Kimi Code.

Scopes: Not publicly documented in API docs. Token response includes a `scope` string; no scope selection is exposed to users in the CLI flow.

Token refresh: Refresh token grant to `/api/oauth/token` with `grant_type=refresh_token`. Refresh interval logic in client: refresh threshold = max(300s, expires_in * 0.5). Retry on 429/5xx.

## Free tier availability and pricing

### Free trial credit

Kimi API provides newly registered users with free trial credit.

Voucher grant rules:
- Eligible users: New users who register with a mainland China mobile number.
- Voucher amount: RMB 15 voucher granted upon registration.
- Validity period: 3 months from issuance.

Voucher is applied automatically to API usage, deducted before top-up balance.

Source: Free Trial Benefits. [https://www.kimi.com/en/help/kimi-api/api-free-trial](https://www.kimi.com/en/help/kimi-api/api-free-trial)

After voucher exhaustion, API calls are charged against top-up balance; zero balance returns 403.

### Pricing – pay-as-you-go

Model inference pricing explanation: token billing for input/output, cache write tiers 5min/1h for K3 series.

Example public pricing snapshots:
- Kimi K3: $3.00 / 1M input tokens, $15.00 / 1M output tokens, cached input $0.30 / 1M.
Source: BenchLM API pricing. [https://benchlm.ai/moonshot/api-pricing](https://benchlm.ai/moonshot/api-pricing)

Additional sources confirm:
- Kimi K3 costs $3 per million input tokens and $15 output on the official API. [https://www.mercatus-ai.com/blog/kimi-k3-api-pricing](https://www.mercatus-ai.com/blog/kimi-k3-api-pricing)
- Token billing per 1M tokens for input and output. [https://www.kimi.ai/resources/kimi-k3-pricing](https://www.kimi.ai/resources/kimi-k3-pricing)

Prices exclude applicable taxes; tax calculated at checkout based on jurisdiction.

## Registration requirements

- Platform registration options: WeChat or email per provider directory. Official help notes mainland China mobile number for free trial voucher.
Source: Free Trial Benefits. [https://www.kimi.com/en/help/kimi-api/api-free-trial](https://www.kimi.com/en/help/kimi-api/api-free-trial)

- Walkthrough guidance: Sign up with WeChat OR email. Email works internationally. Some flows ask for passport scan. [https://china-llm.com/provider/moonshot](https://china-llm.com/provider/moonshot)

- Phone requirement: Free trial voucher requires mainland China mobile number. No explicit global phone mandate documented for API key creation, but verification may require phone/WeChat.

PayPal: No evidence of PayPal support. Provider directory notes:
- Payments only via alipay, wechat — may block non-China billing.
Source: [https://china-llm.com/provider/moonshot](https://china-llm.com/provider/moonshot)

Additional note: Domestic Alipay preferred. International credit cards inconsistent. Wise → Alipay top-up is reliable path for overseas users.

## Germany geo restrictions

No explicit Germany block found in public Terms of Service. Terms state user should not be subject to trade restrictions, sanctions, or other legal/regulatory restrictions imposed by any country.

Provider directories note:
- No overseas node recorded — mainland China access only; GFW affects foreign users.
- No overseas endpoint recorded for Moonshot AI.

Source: [https://china-llm.com/provider/moonshot](https://china-llm.com/provider/moonshot)

FAZ article notes expansion discussion in Germany, suggesting access is possible but commercial context may differ.

## GDPR data residency

Legal entity: Services are provided and controlled by MOONSHOT AI PTE. LTD. in Singapore.

Privacy Policy states:
“Our services are provided and controlled by MOONSHOT AI PTE. LTD. (“we”or”Moonshot AI”) in Singapore through web pages.”
Source: Kimi OpenPlatform Privacy Policy. [https://platform.kimi.ai/docs/agreement/userprivacy](https://platform.kimi.ai/docs/agreement/userprivacy)

Data storage:
“We store the information we collect in secure servers located in Singapore. When cross-border transfers are necessary, we will implement appropriate safeguards…”
Source: same privacy policy.

InferCheck provider profile:
- Moonshot AI states its servers are located in Singapore and that personal data may be transferred to and stored on servers outside the user's country of residence. No EU region or EU-only processing option was found.
- Regions: SG.
- No EU-only data residency; non-compliant for EU-only residency requirement.
Source: [https://infercheck.eu/en/provider/moonshot-ai](https://infercheck.eu/en/provider/moonshot-ai)

Additional analysis:
“Your Kimi K3 data is stored on servers in Singapore, not the EU or US.”
Source: [https://theaijournal.co/2026/08/kimi-k3-data-privacy-enterprise-code-safety/](https://theaijournal.co/2026/08/kimi-k3-data-privacy-enterprise-code-safety/)

GDPR compliance notes:
- No public DPA, SCC statement, or sub-processor list found in reviewed primary sources per InferCheck.
- Customer content may be used to improve models; opt-out availability unclear.

## API usage endpoints

### Models and usage

- List models: `GET https://api.moonshot.ai/v1/models`
- Check balance: `GET https://api.moonshot.ai/v1/balance`
- Estimate tokens: `POST https://api.moonshot.ai/v1/estimate`
- Chat completions: `POST https://api.moonshot.ai/v1/chat/completions`
- Responses: `POST https://api.moonshot.ai/v1/responses`
- Messages: `POST https://api.moonshot.ai/anthropic/messages`

Source: API Overview navigation.

## Scopes and token refresh summary

- API Key flow: No OAuth scopes; static Bearer token.
- Kimi Code OAuth flow:
  - Authorization server: `https://auth.kimi.com`
  - Device authorization endpoint: `/api/oauth/device_authorization`
  - Token endpoint: `/api/oauth/token`
  - Grant types: `urn:ietf:params:oauth:grant-type:device_code`, `refresh_token`
  - Client ID: `17e5f671-d194-4dfb-9706-5516cb48c098`
  - Token lifetime: `expires_in` seconds, client refreshes at 50% lifetime or 5 min minimum.
  - Scopes: Returned in token response; not configurable via public docs.

## Limitations for DSH OAuth integration

- The public Kimi API does not expose a standard OAuth 2.0 authorization server for API key management; authentication is API-Key only.
- Device code OAuth exists only for Kimi Code CLI; not documented for third-party integration and is tied to specific client ID and `auth.kimi.com`.
- Free trial requires mainland China mobile number; overseas users face payment friction (Alipay/WeChat only).
- Data residency in Singapore; no EU-only option, raising GDPR transfer concerns for German users.
- No evidence of PayPal support; registration may require phone/WeChat.

## Citations

- API Overview, base URLs and authentication: https://platform.kimi.ai/docs/api/overview
- Kimi OpenPlatform Privacy Policy, Singapore control: https://platform.kimi.ai/docs/agreement/userprivacy
- Free Trial Benefits, mainland China mobile requirement: https://www.kimi.com/en/help/kimi-api/api-free-trial
- Provider directory, payments Alipay/WeChat, no overseas node: https://china-llm.com/provider/moonshot
- InferCheck GDPR profile, Singapore servers, no EU residency: https://infercheck.eu/en/provider/moonshot-ai
- Kimi Code OAuth implementation, host, client ID, endpoints: https://raw.githubusercontent.com/MoonshotAI/kimi-cli/bfd9d273/src/kimi_cli/auth/oauth.py
- Pricing snapshot Kimi K3 $3/$15: https://benchlm.ai/moonshot/api-pricing
- Data privacy Singapore storage: https://theaijournal.co/2026/08/kimi-k3-data-privacy-enterprise-code-safety/
