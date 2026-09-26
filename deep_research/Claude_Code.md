# Claude Code / Anthropic API Provider Research for DSH Integration

**Date:** 2026-01-05
**Scope:** Authentication, OAuth/API key, pricing, registration, Germany geo, GDPR, base URLs, scopes, token refresh, VPN workarounds.

## 1. Authentication methods

### Claude API authentication
The Claude API supports three ways to authenticate requests:

| Method | Credential | Best for |
| --- | --- | --- |
| API key | Static `sk-ant-api...` secret sent as bearer token in `Authorization` header | Local development, prototyping, scripts, servers |
| Workload Identity Federation | Short-lived bearer token exchanged from IdP identity token | Production workloads on cloud platforms, CI/CD, Kubernetes |
| App Attest | Short-lived access token issued to genuine iOS/macOS app | iOS/macOS apps calling API directly |

Source: [Authentication - Claude Platform Docs](https://platform.claude.com/docs/en/manage-claude/authentication)

API keys live in Claude Console Settings → API keys. Key types:
- Personal key – acts as you, stops working if you lose access
- Service account key – represents a service account
- Workspace key – legacy, belongs to workspace

Create key at https://platform.claude.com/settings/keys. Use as `Authorization: Bearer <key>` or legacy `x-api-key`. Export as `ANTHROPIC_API_KEY`.

Source: [Get your Claude API key](https://platform.claude.com/docs/en/get-api-key)

### Claude Code authentication
Claude Code supports multiple authentication methods depending on setup:
- Individual users can authenticate with a Claude.ai account via browser OAuth flow. On first launch `claude` opens a browser window for sign-in.
- Organizations can use SSO / managed settings.
- API key environment variables are prioritized to avoid unexpected API usage.

Source: [Authentication - Claude Code Docs](https://code.claude.com/docs/en/authentication)

CLI reference: `claude auth login` to link to Anthropic account. Use `--email` to pre-fill, `--sso` to force SSO.

Source: [CLI authentication options](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/authentication)

### Workload Identity Federation OAuth
Token exchange:
`POST https://api.anthropic.com/v1/oauth/token`

Request body uses RFC 7523 `jwt-bearer` grant:
- `grant_type = urn:ietf:params:oauth:grant-type:jwt-bearer`
- `assertion` = OIDC JWT from IdP
- `federation_rule_id` = `fdrl_...`
- `organization_id` = UUID
- `service_account_id` = `svac_...`
- `workspace_id` = optional `wrkspc_...` or `default`

Response is standard OAuth2:
- `access_token` – `sk-ant-oat01-...`, use as `Authorization: Bearer`
- `token_type` = `Bearer`
- `expires_in` – seconds until expiry
- `scope` – OAuth scope granted by matched rule

Source: [WIF reference](https://platform.claude.com/docs/en/manage-claude/wif-reference)

Environment variables for SDK auto-exchange:
`ANTHROPIC_FEDERATION_RULE_ID`, `ANTHROPIC_ORGANIZATION_ID`, `ANTHROPIC_SERVICE_ACCOUNT_ID`, `ANTHROPIC_IDENTITY_TOKEN` or `ANTHROPIC_IDENTITY_TOKEN_FILE`, optional `ANTHROPIC_WORKSPACE_ID`.

SDK credential precedence: constructor > `ANTHROPIC_API_KEY` > `ANTHROPIC_PROFILE` > federation env vars > active profile.

Token refresh is handled by SDK cache with proactive refresh. Access tokens are short-lived; SDK mints new ones automatically before expiry.

## 2. API base URLs and scopes

- Claude API base: `https://api.anthropic.com`
- Messages endpoint example: `POST /v1/messages`
- Headers required: `Authorization: Bearer <key>`, `anthropic-version: 2023-06-01`, `content-type: application/json`

Source: [API overview - Claude Platform Docs](https://platform.claude.com/docs/en/api/overview)

Scopes are determined per federation rule. The `scope` field is returned in token exchange response. No public static scope list for API keys; API key access is limited by user/service account roles and workspace permissions.

Admin API uses `x-api-key` with keys starting `sk-ant-admin...`.

## 3. Pricing, free tier, limits

Model pricing is pay-as-you-go, USD per million tokens.

Example current pricing:
- Claude Sonnet 5: $2 / MTok input, $10 / MTok output
- Claude Haiku 4.5: $1 / MTok input, $5 / MTok output
- Claude Opus 5: $5 / MTok input, $25 / MTok output

Prices are standard, introductory pricing for Sonnet 5 extended through 2026.

Source: [Pricing](https://platform.claude.com/docs/en/about-claude/pricing)

Cloud platform pricing via AWS Marketplace / Azure Marketplace uses Claude Consumption Units: 100 CCU = $1 USD.

Inference geo `us` adds 1.1x pricing multiplier.

No free tier for Claude API usage. API access requires a payment method and prepaid credit balance.

Rate limits depend on usage tier and are measured in requests per minute, requests per day, and tokens per minute. Limits are managed via Claude Console and Service Tiers.

Source: [Rate limits - Claude Platform Docs](https://platform.claude.com/docs/en/api/rate-limits)

Claude.ai consumer product has Free/Pro/Max plans, but API is separate paid product.

## 4. Registration requirements

Account creation:
- Sign in to platform.claude.com and create account.
- Phone number verification is requested on first account creation: enter phone number from a supported location to receive verification code.

Source: [Verify your phone number | Claude Help Center](https://support.claude.com/en/articles/8287232-verify-your-phone-number)

Supported countries for commercial API access includes Germany.

Source: [Supported countries and regions](https://www.anthropic.com/supported-countries)

Payment:
- API billing is prepaid credit balance funded by card.
- Accepted cards: Visa, Mastercard, American Express, most major debit cards via Stripe.
- PayPal is not listed as a direct payment method for API credits; card is required.
- 3D Secure / PSD2 SCA can cause declines for European cards.

Source: [How do I pay for my Claude API usage?](https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage)

GitHub issues report Stripe declines for European cards with SetupIntent 0 EUR.

Source: [BUG Cannot purchase API credits](https://github.com/anthropics/claude-code/issues/45361)

No phone number requirement bypass; verification is mandatory for Claude.ai accounts. API key creation requires an organization account with payment method on file.

## 5. Germany geo restrictions

Commercial API access and Claude.ai are both offered in Germany.

Supported countries list explicitly includes Germany for both API and Claude.ai.

Source: [Supported countries and regions](https://www.anthropic.com/supported-countries)

No country-level geo block for Germany. Access is allowed.

Potential practical barriers:
- Payment method must be accepted by Stripe; German bank cards often require 3DS2.
- Phone verification must be from supported location; German mobile numbers are supported.

If payment fails, no API credits can be purchased, effectively blocking usage.

## 6. GDPR data residency

Anthropic offers geographic controls:
- `inference_geo` parameter controls where model inference runs per request: `"global"` default or `"us"` for US-only infra.
- Workspace geo controls where data is stored at rest and where endpoint processing occurs, configured in Claude Console.

Source: [Data residency](https://platform.claude.com/docs/en/manage-claude/data-residency)

EU data residency for inference is not offered by first-party API as of 2026. All Claude inference runs on US infrastructure; `inference_geo: "us"` pins to US. Third-party platforms like AWS Bedrock and Google Cloud offer regional endpoints with data routing.

Source: [Claude EU Data Residency](https://sonomos.ai/blog/claude-eu-data-residency-2026/)

GDPR compliance:
- Anthropic signs Data Processing Addendum with Standard Contractual Clauses incorporated into Commercial Terms.
- API inputs are excluded from model training by default for paid API users.
- Data Processing Agreement is available and auto-incorporated.

Source: [How do I view and sign your Data Processing Addendum](https://support.claude.com/en/articles/7996862-how-do-i-view-and-sign-your-data-processing-addendum-dpa)

Trust Center provides security and compliance documentation.

## 7. Workarounds for geo-blocking with German mobile number only, no payment

Current constraints:
- Germany is supported; no VPN needed for geo access.
- API usage requires payment method and prepaid credits. No free API tier.
- Claude Code individual use requires Claude.ai Pro/Max subscription which requires payment card.

Possible workarounds with limitations:

1. Use Claude.ai free tier via web/CLI for limited chat. No API key, no programmatic access.
2. Use third-party cloud providers: Amazon Bedrock or Google Vertex AI offer Claude models with their own billing. May accept different payment methods and offer regional endpoints. Requires account on AWS/GCP.
3. Workload Identity Federation requires no static API key but still requires an organization with billing enabled.
4. VPN does not bypass payment requirement. Using a VPN to appear in another supported country does not enable API usage without payment method.
5. No official OAuth program for third-party tools; Anthropic OAuth flow is locked to Claude Code and Claude.ai.

Source: [Anthropic OAuth FAQ](https://docs.moltis.org/anthropic-oauth.html)

For developers needing DSH integration without payment, the only viable path is using a Claude.ai subscription via OAuth bridge that reuses `~/.claude/.credentials.json`. This still requires a paid Claude Pro/Max subscription.

Project dsh-anthropic-oauth demonstrates bridging Claude Code OAuth into DeepSeek Harness.

Source: [dsh-anthropic-oauth](https://github.com/TrueNix/dsh-anthropic-oauth)

## 8. Summary for DSH integration

- Authentication to Anthropic API: API key bearer or WIF short-lived tokens via `POST /v1/oauth/token`.
- Base URL: `https://api.anthropic.com/v1`
- No free API tier; payment card required.
- Germany is supported, phone verification required, no geo block.
- GDPR: DPA with SCCs available, no EU inference residency for first-party API.
- Token refresh handled by SDK; `expires_in` provided.
- VPN not needed for Germany; payment is the blocker.

## Citations

- Authentication: https://platform.claude.com/docs/en/manage-claude/authentication
- Get API key: https://platform.claude.com/docs/en/get-api-key
- Pricing: https://platform.claude.com/docs/en/about-claude/pricing
- Supported countries: https://www.anthropic.com/supported-countries
- Data residency: https://platform.claude.com/docs/en/manage-claude/data-residency
- WIF reference: https://platform.claude.com/docs/en/manage-claude/wif-reference
- Claude Code authentication: https://code.claude.com/docs/en/authentication
- Phone verification: https://support.claude.com/en/articles/8287232-verify-your-phone-number
- Payment: https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage
- API overview: https://platform.claude.com/docs/en/api/overview
