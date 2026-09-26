# OpenAI Provider Research for DSH Integration

## Summary
OpenAI provides both API-key based access for programmatic use and OpenID Connect OAuth for ChatGPT sign-in. Germany is a supported country for account creation and API usage. API authentication uses Bearer API keys; OAuth uses auth.openai.com with standard OpenID Connect flows. Free tier usage is limited to $100/month spend cap with rate limits tied to usage tiers. Data residency for EU is available via `eu.api.openai.com` with additional requirements.

## Authentication Methods

### API Key authentication
- **Base URL**: `https://api.openai.com/v1`
- **Auth header**: `Authorization: Bearer $OPENAI_API_KEY`
- Example curl from docs:
  ```bash
  curl "https://api.openai.com/v1/responses" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{...}'
  ```
- SDKs read key from environment variable `OPENAI_API_KEY`.

Source: Developer quickstart shows API key creation and Bearer usage. [https://developers.openai.com/api/docs/quickstart.md](https://developers.openai.com/api/docs/quickstart.md)

### OpenID Connect / OAuth for ChatGPT
Issuer discovery:
```json
{
  "issuer": "https://auth.openai.com",
  "authorization_endpoint": "https://auth.openai.com/api/accounts/authorize",
  "token_endpoint": "https://auth.openai.com/api/accounts/oauth/token",
  "revocation_endpoint": "https://auth.openai.com/api/accounts/oauth/revoke",
  "jwks_uri": "https://auth.openai.com/.well-known/jwks.json",
  "userinfo_endpoint": "https://auth.openai.com/api/accounts/oauth/userinfo",
  "scopes_supported": ["openid","profile","email","offline_access"],
  "grant_types_supported": ["authorization_code","refresh_token"],
  "code_challenge_methods_supported": ["S256"],
  "response_types_supported": ["code"],
  "token_endpoint_auth_methods_supported": ["client_secret_basic","client_secret_post","none"]
}
```
Source: OpenID configuration. [https://auth.openai.com/.well-known/openid-configuration](https://auth.openai.com/.well-known/openid-configuration)

- **Flow**: Authorization Code with PKCE, `code_challenge_methods_supported: S256`
- **Scopes**: `openid`, `profile`, `email`, `offline_access`
- **Refresh**: `refresh_token` grant supported; `offline_access` scope used to obtain refresh token
- **Token refresh**: Token endpoint accepts `grant_type=refresh_token`

## API Base URLs and Data Residency

- Global: `https://api.openai.com/v1`
- US processing/storage: `https://us.api.openai.com/v1`
- EU processing/storage: `https://eu.api.openai.com/v1`

Data residency controls allow per-project region selection. EU region covers Europe EEA + Switzerland.

From Your Data guide:
- Data residency endpoints charged 10% uplift for models released on/after March 5, 2026
- Requires approval for abuse monitoring controls for non-US regions
- Example Python client switching base URL:
  ```python
  client.with_options(base_url="https://eu.api.openai.com/v1")
  ```

Source: Data controls guide. [https://developers.openai.com/api/docs/guides/your-data.md](https://developers.openai.com/api/docs/guides/your-data.md)

Supported endpoints for EU regional processing include `/v1/responses`, `/v1/realtime`, etc. with model lists documented.

## Supported Countries / Geo Restrictions

Germany is listed in Supported countries and territories.

Full list includes:
- Germany
- ... [see full list]

Source: Supported countries page. [https://developers.openai.com/api/docs/supported-countries.md](https://developers.openai.com/api/docs/supported-countries.md)

Accessing services outside listed countries may result in account block/suspension.

No VPN required for Germany. OpenAI blocks regions like China; developers use VPNs to access. Germany is fully supported.

## Registration Requirements

### Account creation
- ChatGPT free account can be created with phone or email.
- Phone-only signups beta rolled out to US, Netherlands, France, Spain, United Kingdom, Poland, etc.
- Germany not explicitly listed in beta rollout snippets; email signup is generally available.

Help Center notes:
- Phone verification is no longer required for new OpenAI account creation or ChatGPT usage.
- Phone verification is now mainly for first API key generation.

Sources:
- Phone-only signups article. [https://help.openai.com/en/articles/10388702-phone-only-signups](https://help.openai.com/en/articles/10388702-phone-only-signups)
- Phone verification article. [https://help.openai.com/en/articles/8983040-what-does-phone-verification-look-like](https://help.openai.com/en/articles/8983040-what-does-phone-verification-look-like)

**API key generation**: Phone verification required for first API key generation. Same phone number can be used for up to three accounts.

Source: How many times can I use same phone number. [https://help.openai.com/en/articles/8983031-how-many-times-can-i-use-the-same-phone-number-to-complete-the-phone-verification-associated-with-an-openai-account-s-first-api-key-generation](https://help.openai.com/en/articles/8983031-how-many-times-can-i-use-the-same-phone-number-to-complete-the-phone-verification-associated-with-an-openai-account-s-first-api-key-generation)

### Payment
- Free tier does not require payment method upfront.
- Upgrading to Plus/Pro/Teams requires payment method.
- PayPal is not listed as a required method; cards supported.

## Free Tier Limits and Pricing

### Usage tiers
From Rate limits guide:

| Tier | Qualification | Usage limits |
|------|---------------|--------------|
| Free | User must be in allowed geography | $100 / month |
| Tier 1 | $5 paid | $100 / month |
| Tier 2 | $50 paid | $500 / month |
| Tier 3 | $100 paid | $1,000 / month |
| Tier 4 | $250 paid | $5,000 / month |
| Tier 5 | $1,000 paid | $200,000 / month |

Source: Rate limits. [https://developers.openai.com/api/docs/guides/rate-limits.md](https://developers.openai.com/api/docs/guides/rate-limits.md)

Rate limits are defined per organization/project, varying by model, e.g., RPM, TPM.

New accounts often receive $5 initial credit for API testing.

Pricing per 1M tokens examples from pricing page:
- gpt-4o-mini input $0.15, output $0.60
- gpt-4o input $2.50, output $10.00

Source: Pricing. [https://developers.openai.com/api/docs/pricing.md](https://developers.openai.com/api/docs/pricing.md)

Regional processing data residency endpoints incur 10% uplift for eligible models.

## GDPR / Data Residency

- OpenAI states data sent to API is not used for training unless opt-in.
- Abuse monitoring logs retained up to 30 days by default.
- Zero Data Retention / Modified Abuse Monitoring available on approval.
- EU data residency available via `eu.api.openai.com`, storage at rest in selected region, inference in region for supported models.
- Additional requirements for non-US regions: approval for abuse monitoring controls and Modified Retention amendment.
- Sub-processors: Cloudflare Regional Services for TLS termination in selected region.

Source: Data controls guide. [https://developers.openai.com/api/docs/guides/your-data.md](https://developers.openai.com/api/docs/guides/your-data.md)

## Scopes and Token Lifecycle

OAuth scopes supported:
- `openid`
- `profile`
- `email`
- `offline_access`

Grant types: `authorization_code`, `refresh_token`

Token endpoint auth methods: `client_secret_basic`, `client_secret_post`, `none`

Refresh token flow requires `offline_access` scope.

Source: OpenID config. [https://auth.openai.com/.well-known/openid-configuration](https://auth.openai.com/.well-known/openid-configuration)

## Workaround for Geo-blocking / Germany Constraints

**Current status**: Germany is supported, no geo-block.

If access issues occur:
1. Verify account region matches supported list.
2. Use EU endpoint `https://eu.api.openai.com/v1` for GDPR compliance.
3. Phone verification for API key: Use German mobile number, SMS/WhatsApp verification supported where available. Limit 3 accounts per number.
4. No payment needed for free tier; can operate with German mobile number only and no payment method.
5. If OpenAI blocks IP range, VPN to US/EU is not required for Germany but can be used for troubleshooting.

No payment method required to create free account and generate API key. Payment method required only for paid plans.

Limitations:
- Phone-only signup beta may not include Germany; email signup is fallback.
- Data residency requires sales approval for non-US regions and MAM/ZDR eligibility.

## References
- Quickstart: https://developers.openai.com/api/docs/quickstart.md
- Supported countries: https://developers.openai.com/api/docs/supported-countries.md
- Pricing: https://developers.openai.com/api/docs/pricing.md
- Rate limits: https://developers.openai.com/api/docs/guides/rate-limits.md
- Your data / Data residency: https://developers.openai.com/api/docs/guides/your-data.md
- OpenID configuration: https://auth.openai.com/.well-known/openid-configuration
- Phone verification: https://help.openai.com/en/articles/8983040-what-does-phone-verification-look-like
- Phone-only signups: https://help.openai.com/en/articles/10388702-phone-only-signups
