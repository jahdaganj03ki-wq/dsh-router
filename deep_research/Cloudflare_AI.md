# Cloudflare AI Provider – DSH Integration Research

## Summary
Cloudflare AI is accessed via Workers AI REST API or AI Gateway. Authentication is API-token based for service calls; Cloudflare dashboard OAuth is available for account linking. Free tier provides 10,000 Neurons/day at no charge. Registration requires only email + password; phone/PayPal are not mandatory for free use. Germany is supported; no country block for account creation. GDPR compliance is provided via DPA and Data Localization Suite / Regional Services.

## Authentication & Login Method

### Workers AI REST API
- Authentication: Bearer API Token.
- Prerequisites: Cloudflare account, Account ID, API Token with `Workers AI - Read` and `Workers AI - Edit` permissions.
- Steps documented in *Get API token and Account ID*:
  1. Dashboard → Workers AI → Use REST API
  2. Create Workers AI API Token
  3. Copy Account ID
- Example request:
  ```bash
  curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct \
    -H 'Authorization: Bearer {API_TOKEN}' \
    -d '{ "prompt": "Where did the phrase Hello World come from" }'
  ```
- Endpoint reference: `POST /accounts/{account_id}/ai/run/{model_name}`

Sources:
- [REST API guide](https://developers.cloudflare.com/workers-ai/get-started/rest-api/)
- [Execute AI model API reference](https://developers.cloudflare.com/api/resources/ai/methods/run/)

### AI Gateway
- API token with `AI Gateway - Read`, `AI Gateway - Edit`, and `Workers AI - Read` permissions.
- First request creates default gateway automatically.
- Request example:
  ```bash
  curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
    --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    --header "cf-aig-gateway-id: default" \
    --header "Content-Type: application/json" \
    --data '{ "model": "@cf/moonshotai/kimi-k2.6", "messages": [...] }'
  ```
- Provider-specific endpoints: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}`

Source: [AI Gateway Getting started](https://developers.cloudflare.com/ai-gateway/get-started/index.md)

### Cloudflare Dashboard OAuth
For OAuth client integration with Cloudflare identity:
- Jwks: `https://dash.cloudflare.com/.well-known/jwks.json`
- OpenID config: `https://dash.cloudflare.com/.well-known/openid-configuration`
- Authorization: `https://dash.cloudflare.com/oauth2/auth`
- Token: `https://dash.cloudflare.com/oauth2/token`
- Revoke: `https://dash.cloudflare.com/oauth2/revoke`
- Session logout: `https://dash.cloudflare.com/oauth2/logout`
- User info: `https://dash.cloudflare.com/oauth2/userinfo`

Source: [Integrate your OAuth client with Cloudflare](https://developers.cloudflare.com/fundamentals/oauth/integrate-with-cloudflare/)

### Scopes / Permissions
API token permissions relevant to AI:
- `Workers AI - Read` – Grants read access to Workers AI.
- `Workers AI - Edit` – Grants write access to Workers AI.
- `AI Gateway - Read` / `AI Gateway - Edit`

OAuth scope for account creation via API: `user-details.read` for user-owned tokens; `User Details Read` permission for API tokens.

Sources:
- [API token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)
- [Create account](https://developers.cloudflare.com/fundamentals/account/create-account/)

### Token refresh
- API tokens are long-lived. Rotation is done via *Roll Token*; no automatic refresh.
- OAuth access tokens follow standard OAuth2: token endpoint returns access + refresh token; refresh via `https://dash.cloudflare.com/oauth2/token`.

## API Base URLs
- Workers AI REST: `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model_name}`
- AI Gateway OpenAI-compatible: `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions`
- AI Gateway responses: `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/responses`
- AI Gateway provider proxy: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}`

## Free Tier Limits & Pricing

### Workers AI pricing
- Included in Free and Paid Workers plans.
- Free allocation: **10,000 Neurons per day at no charge**.
- Paid usage: **$0.011 per 1,000 Neurons** above free allocation on Workers Paid plan.
- Daily limits reset at 00:00 UTC.
- Some frontier models require a paid billing method: `@cf/moonshotai/kimi-k2.6`, `@cf/moonshotai/kimi-k2.7-code`, `@cf/zai-org/glm-5.2`, `@cf/zai-org/glm-5.3`, `@cf/zai-org/glm-5.3-flash`, `@cf/deepseek-ai/deepseek-v4-flash-0731`, `@cf/deepseek-ai/deepseek-v4-pro-0813`.

Source: [Pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/)

### Rate limits
- Text Generation default: 300 requests/minute.
- Paid models:
  - Standard Workers AI billing: 20 requests/minute per account per model
  - Prepaid AI Gateway credits: 50 requests/minute per account per model
- Other task types:
  - Automatic Speech Recognition: 720 rpm
  - Image Classification / Object Detection: 3000 rpm
  - Image-to-Text: 720 rpm
  - Text Embeddings: 3000 rpm
  - Text-to-Image: 720 rpm

Source: [Limits](https://developers.cloudflare.com/workers-ai/platform/limits/)

### Pay with AI Gateway credits
Prepaid AI Gateway credits can pay for Workers AI inference when gateway Workers AI billing is set to **Unified billing**. Higher rate limits apply.

## Registration Requirements

### Account creation
- Create first account: Email + Password → Email verification.
- No phone number required for free account creation.
- Additional Free accounts: user must be active ≥7 days, Super Administrator role, max 5 additional accounts.

Source: [Create account](https://developers.cloudflare.com/fundamentals/account/create-account/)

### Billing / Payment
Primary payment method required only to purchase Cloudflare products/services. Free Workers AI usage does not require payment method.
Supported methods: Card Visa/Mastercard/Amex/Discover/UnionPay, PayPal, Apple Pay, Google Pay, Link, Instant Bank Payments via Link.
Phone number is optional in billing profile: `telephone: optional string Contact phone number`.

Sources:
- [Create billing profile](https://developers.cloudflare.com/billing/get-started/create-billing-profile/)
- Billing profile API field `telephone` optional

Registration with German mobile number only, no payment:
- Possible. Email verification suffices for free tier.
- No PayPal required unless upgrading to paid plan or using models requiring paid billing method.

## Germany Geo Restrictions

- Cloudflare does not block Germany for account creation or Workers AI usage. Germany is a supported region.
- Cloudflare complies with US/EU sanctions. Restrictions apply only to sanctioned jurisdictions, not Germany.
- Community reports of `403 unsupported_country_region_territory` are typically from upstream providers e.g., OpenAI via AI Gateway, not Cloudflare itself. Errors arise when a Worker runs in a region forbidden by the third-party LLM provider.

Relevant community discussion:
- [AI Gateway routes to restricted regions, causing API blocks](https://community.cloudflare.com/t/ai-gateway-routes-to-restricted-regions-causing-api-blocks/808571)

## GDPR Data Residency

- Cloudflare publishes a Data Processing Addendum and Standard Contractual Clauses.
- Data Localization Suite provides Regional Services to ensure TLS termination and processing occurs within designated regions, e.g., European Union.
- Regional Services allows regionalizing hostnames, Spectrum applications, or BYOIP prefixes to EU.
- For EU customers, Cloudflare offers EU data processing and storage options via Enterprise add-on.

Sources:
- [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/)
- Cloudflare DPA.

## Workarounds for Geo-blocking / VPN with German mobile, no payment

### When to use VPN
- Account creation is not geo-blocked in Germany. Use VPN only if:
  - IP reputation triggers Cloudflare Account Abuse Protection / Turnstile challenges.
  - Accessing Cloudflare dashboard from an IP flagged as abusive.
- Recommended: Use a reputable EU VPN endpoint e.g., Netherlands, France, or US. Keep email consistent; do not create multiple accounts from same IP rapidly.

### Avoiding upstream LLM 403 errors
- If using AI Gateway with third-party providers like OpenAI, Anthropic, the request originates from the Worker location.
- Workaround:
  1. Pin Worker to allowed region via `wrangler.toml` placement or use Regional Hostnames to force EU/US processing.
  2. For OpenAI/Anthropic restrictions, deploy Worker in US region or use `cf-aig-gateway-id` with gateway configured in allowed region.
  3. Documented guidance: *Do not put Workers in LLM-forbidden locations*.

### No payment constraints
- Stay within free allocation 10k Neurons/day.
- Choose models not requiring paid billing method.
- Use `Workers Paid plan` free allocation only; avoid prepaid credits.
- API token creation is free; no phone verification needed.

## DSH Integration Notes
- Use API token authentication, not OAuth, for service-to-service calls.
- Store Account ID and API Token securely.
- Base URL for Workers AI: `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}`
- Headers: `Authorization: Bearer {API_TOKEN}`, `Content-Type: application/json`
- Scopes needed: `Workers AI - Read`, `Workers AI - Edit`
- Token refresh not required; rotate token periodically.
- For Germany deployment, ensure data residency requirements met via Regional Services if Enterprise.

## Citations
- Workers AI REST API guide: https://developers.cloudflare.com/workers-ai/get-started/rest-api/
- Execute AI model API: https://developers.cloudflare.com/api/resources/ai/methods/run/
- AI Gateway getting started: https://developers.cloudflare.com/ai-gateway/get-started/index.md
- Pricing: https://developers.cloudflare.com/workers-ai/platform/pricing/
- Limits: https://developers.cloudflare.com/workers-ai/platform/limits/
- Create account: https://developers.cloudflare.com/fundamentals/account/create-account/
- Create billing profile: https://developers.cloudflare.com/billing/get-started/create-billing-profile/
- OAuth integrate: https://developers.cloudflare.com/fundamentals/oauth/integrate-with-cloudflare/
- API token permissions: https://developers.cloudflare.com/fundamentals/api/reference/permissions/
- Regional Services: https://developers.cloudflare.com/data-localization/regional-services/
