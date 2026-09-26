# Groq Provider Research for DSH Integration

## Overview
Groq provides LLM inference via custom LPU silicon. API is OpenAI-compatible, authentication is API-key based. No OAuth flow for API access is documented.

## Authentication & Login

**Login method for Console**
- Console registration at console.groq.com supports email/password and social sign-in via Google / GitHub. No credit card required for free tier.
  - Quickstart: "Create an API Key. Please visit here to create an API Key." [https://console.groq.com/docs/quickstart](https://console.groq.com/docs/quickstart)
  - Third-party guides note sign-up via Google, GitHub, or email with no credit card needed. [https://skillmake.ru/en/a/groq-api-bystryy-ii](https://skillmake.ru/en/a/groq-api-bystryy-ii)

**API authentication**
- API key based, Bearer token in `Authorization: Bearer <GROQ_API_KEY>` header.
- OpenAI SDK compatibility: set `base_url="https://api.groq.com/openai/v1"` and `api_key`.
  - "To start using Groq with OpenAI's client libraries, pass your Groq API key to the api_key parameter and change the base_url to https://api.groq.com/openai/v1" [https://console.groq.com/docs/openai](https://console.groq.com/docs/openai)
- API Keys page referenced in docs navigation. Quickstart shows environment variable `GROQ_API_KEY`. [https://console.groq.com/docs/quickstart](https://console.groq.com/docs/quickstart)

**OAuth / scopes / token refresh**
- No public OAuth endpoints for Groq API access are documented. Groq does not expose OAuth2 authorization server for developers. API access is limited to long-lived API keys.
- No scopes model; permissions are organization-level rate limits and model permissions.
- Token refresh not applicable; API keys are static until manually revoked in console.

## API Base URLs

- OpenAI-compatible chat/completions: `https://api.groq.com/openai/v1`
- Direct Groq endpoint: `https://api.groq.com/openai/v1/chat/completions`
- Docs base: `https://console.groq.com/docs/`

Example from docs:
```
client = openai.OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.environ.get("GROQ_API_KEY")
)
```
[https://console.groq.com/docs/openai](https://console.groq.com/docs/openai)

## Free Tier Limits

Official rate limits documentation:
Rate limits measured in RPM, RPD, TPM, TPD, ASH, ASD, ITPM, OTPM. Limits apply at organization level. [https://console.groq.com/docs/rate-limits](https://console.groq.com/docs/rate-limits)

Third-party consolidated limits, 2026:
- 30,000 tokens per minute and 14,400 requests per day on curated models incl. Llama 3.1 8B, Llama 4 Scout, Qwen3 32B, DeepSeek R1 Distill.
- Table: Llama 3.1 8B → 30,000 TPM, 30 RPM, 14,400 RPD. [https://www.getaiperks.com/en/ai/groq-free-tier-2026](https://www.getaiperks.com/en/ai/groq-free-tier-2026)

Rate Limits page shows header example: `x-ratelimit-limit-requests | 14400` [https://console.groq.com/docs/rate-limits](https://console.groq.com/docs/rate-limits)

## Pricing

Pay-as-you-go per million tokens. Example public pricing summaries:
- Llama 3.1 8B Instant ~ $0.05 input / $0.08 output per 1M tokens.
- Llama 3.3 70B Versatile $0.59 input / $0.79 output per 1M tokens.
Sources: CloudZero, AI Pricing Guru summaries. [https://www.cloudzero.com/blog/groq-pricing](https://www.cloudzero.com/blog/groq-pricing)

Paid tier examples from guides:
- Llama 4 Scout $0.50 input / $1.50 output
- Llama 3.1 70B $0.59 / $0.79
[https://www.getaiperks.com/en/ai/groq-free-tier-2026](https://www.getaiperks.com/en/ai/groq-free-tier-2026)

## Registration Requirements

- Email address required. Email verification step after sign-up.
- Free tier: No credit card required, no phone verification reported.
- Paid/Developer plan: requires billing setup. Billing FAQs and Spend Limits docs exist. [https://console.groq.com/docs/billing-faqs](https://console.groq.com/docs/billing-faqs)
- No PayPal requirement documented; payment processed via standard card processor. Privacy policy notes payment information collected by third-party processor. [https://groq.com/privacy-policy](https://groq.com/privacy-policy)

## Geo Restrictions & Germany

- No explicit public country blocklist for Germany found in docs as of 2026-09.
- Services Agreement defines Groq Contracting Party per domicile: Groq UK Limited for EEA/Switzerland customers. [https://console.groq.com/docs/legal/services-agreement](https://console.groq.com/docs/legal/services-agreement)
- Export Control Laws clause referenced in definitions of Services Agreement. [https://console.groq.com/docs/legal/services-agreement](https://console.groq.com/docs/legal/services-agreement)
- Privacy Policy: Groq located in US, maintains processing operations in various global jurisdictions. International transfers rely on contractual protections / Data Privacy Framework. [https://groq.com/privacy-policy](https://groq.com/privacy-policy)
- EU/UK representatives listed:
  - EU: DP-Dock GmbH, Hamburg, Germany
  - UK: DP Data Protection Services UK Ltd., London
  Contact groq@gdpr-rep.com [https://groq.com/privacy-policy](https://groq.com/privacy-policy)

No official statement of Germany-specific geo-blocking identified.

## GDPR Data Residency

- Groq acts as data controller for account data; as data processor for Customer Data under Cloud Services.
- Processing of Customer Data governed by Groq Services Agreement and Data Processing Addendum. [https://groq.com/privacy-policy](https://groq.com/privacy-policy)
- DPA available at https://console.groq.com/docs/legal/customer-data-processing-addendum
- Privacy Policy states: "Groq is located in the United States, and maintains processing operations in various global jurisdictions." International transfers with safeguards. [https://groq.com/privacy-policy](https://groq.com/privacy-policy)
- Data Processing Addendum and Your Data docs cover retention and rights. [https://console.groq.com/docs/your-data](https://console.groq.com/docs/your-data)
- No dedicated EU-only data residency option is publicly documented; inference is served from Groq’s global LPU fleet.

## Service Tiers

- `on_demand` default
- `flex` higher throughput best-effort
- `performance` enterprise low latency
- `auto` leverage best available tier
[https://console.groq.com/docs/service-tiers](https://console.groq.com/docs/service-tiers)

## Workaround for Geo-blocking with German mobile only, no payment

Current evidence:
- No documented Germany block. Sign-up accepts German email/mobile.
- If access is blocked by IP-based restrictions or payment verification, practical workarounds:

1. Use a VPN egress in an allowed region e.g., US/EU for console login and API calls. API key validation is not geo-restricted per docs; rate limits apply per organization.
2. Sign up with German email address; no phone verification required for free tier. Console login via Google/GitHub avoids phone.
3. Keep usage within free tier limits: 30k TPM / 14,400 RPD, no payment method needed.
4. If billing is required to raise limits, a payment method is mandatory. With no payment allowed, stay on free tier or use proxy organization outside restricted IP range.

Limitations:
- Services Agreement prohibits violating Export Control Laws. Using VPN to circumvent legal restrictions is not permitted.
- No evidence of Germany block; if block appears, it may be temporary Cloudflare challenge. Retry with residential IP or clear cookies.

## DSH Integration Notes

- Use OAuth provider type "API Key". Store GROQ_API_KEY as secret.
- Base URL: https://api.groq.com/openai/v1
- Auth header: Authorization: Bearer {API_KEY}
- No refresh token flow.
- Scopes: N/A
- Rate limit handling: respect 429 responses, `retry-after` header, `x-ratelimit-limit-requests` = 14400.

## Sources

- Quickstart: https://console.groq.com/docs/quickstart
- OpenAI Compatibility: https://console.groq.com/docs/openai
- Rate Limits: https://console.groq.com/docs/rate-limits
- Service Tiers: https://console.groq.com/docs/service-tiers
- Privacy Policy: https://groq.com/privacy-policy
- Services Agreement: https://console.groq.com/docs/legal/services-agreement
- Free tier summary: https://www.getaiperks.com/en/ai/groq-free-tier-2026
- Pricing overview: https://www.cloudzero.com/blog/groq-pricing
