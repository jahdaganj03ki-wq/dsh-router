# Devin IDE Provider – Deep Research for DSH OAuth Integration

**Provider:** Cognition Labs Devin AI  
**Last reviewed:** 2026-09-20  
**Sources:** Official Devin Docs, Devin pricing, DPA, Trust Center

## 1. Provider overview

Devin is the AI software engineer from Cognition Labs. API access is provided via a REST API with a principal + token model. No standard OAuth2 user authorization server is exposed for general consumers.

- API Overview: https://docs.devin.ai/api-reference/overview
- Authentication model: https://docs.devin.ai/api-reference/authentication.md

## 2. Official OAuth / authentication endpoints

Devin does **not** publish a public OAuth2 authorization server for end-user login with device code flow.

### API authentication model

Principal + token:

| Principal | Token | Description |
|---|---|---|
| Service User (non-human) | Service User API Key `cog_` | Automation / CI/CD |
| User (human) | Personal Access Token `cog_` | Human programmatic access |

All credentials start with `cog_` and are used as:

```
Authorization: Bearer cog_your_token_here
```

Base API host: `https://api.devin.ai`

Example:

```bash
curl -X GET "https://api.devin.ai/v3/organizations/$DEVIN_ORG_ID/sessions" \
  -H "Authorization: Bearer cog_your_token_here"
```

Source: Authentication docs https://docs.devin.ai/api-reference/authentication.md

### Service User API Keys

Provisioned in Settings > Devin API > Service users (org) or Enterprise settings > Devin API > Service users (enterprise).

Scopes:

* Organization service user → `/v3/organizations/*`
* Enterprise service user → `/v3/enterprise/*` + `/v3/organizations/*`

Key properties:
* Prefix `cog_`, shown once at creation
* RBAC controlled
* Can impersonate via `create_as_user_id` with `ImpersonateOrgSessions` permission

Source: https://docs.devin.ai/api-reference/authentication.md

### Personal Access Tokens

PATs authenticate as the human user who created them.

* Managed at Settings > Devin API > PATs tab
* Not scoped to org; each request names org in URL
* Enterprise policy can be Disabled / Approval required / Self serve; max lifetime 365 days
* Auto-revoked on membership loss
* No refresh token; static long-lived secret rotated manually

Source: https://docs.devin.ai/api-reference/personal-access-tokens.md

### Legacy keys

Deprecated `apk_` / `apk_user_` keys for v1/v2 APIs. Deprecated for v3.

Source: https://docs.devin.ai/api-reference/authentication.md

### Partner / Outposts authorization code flow

The only documented OAuth-style flow is for Devin Outposts partner integrations. It is an OAuth-light authorization-code exchange with PKCE, **not** a device code flow.

Endpoints:
* Connect page: `https://app.devin.ai/outposts/connect?callback_url=...&code_challenge=...`
* Token exchange: `POST https://api.devin.ai/outposts/connection-token` with `grant_type=authorization_code`, `code`, `code_verifier`

The flow returns a service user `access_token` of type `bearer` with `api_base_url: https://api.devin.ai`. Codes are single-use, 10 min TTL, callback URL allowlisted.

Source: https://docs.devin.ai/cloud/outposts/partners.md

**Device Code Flow support:** No public device code flow for users or DSH OAuth integration. Partner flow uses authorization code + PKCE.

## 3. API base URLs

* API v3: `https://api.devin.ai/v3`
* API v1 / v2 legacy: `https://api.devin.ai/v1`, `https://api.devin.ai/v2`
* OpenAPI specs: `https://docs.devin.ai/v3-openapi.yaml`
* Web app: `https://app.devin.ai`
* Docs: `https://docs.devin.ai`

Source: API Overview https://docs.devin.ai/api-reference/overview

## 4. Scopes / permissions

Permissions are RBAC roles, not OAuth scopes.

* Service user scopes are Organization vs Enterprise as above.
* PAT permissions equal the human user's permissions in each organization.
* Enterprise PAT policy controls creation, approval, expiration.

Source: https://docs.devin.ai/api-reference/authentication.md, https://docs.devin.ai/api-reference/personal-access-tokens.md

## 5. Token refresh

No OAuth refresh tokens. API keys are static secrets.

* Service User API Key: created once, shown once, rotate/revoke manually.
* Personal Access Token: rotate via "rotate secret" operation; no automatic refresh.
* Compromise handling: revoke immediately.

Source: https://docs.devin.ai/api-reference/authentication.md

## 6. Free tier availability & pricing

Self-serve plans sign up at app.devin.ai.

| Plan | Price | Members |
|---|---|---|
| Free | $0 | 1 |
| Pro | $20/month | 1 |
| Max | $200/month | 1 |
| Teams | $80/month minimum + $40/mo per full dev seat | Up to 200 |
| Enterprise | Custom | - |

Free plan includes light quota, limited model availability, unlimited inline edits.

Source: Pricing page https://devin.ai/pricing
Source: Self-serve docs https://docs.devin.ai/admin/billing/self-serve.md

On-demand credits roll over month-to-month.

## 7. Registration requirements

Sign up via https://app.devin.ai/signup

Public docs do not list mandatory phone verification or PayPal requirement for account creation. Paid plans require payment method; card details captured by checkout. Free tier requires email account creation only.

No explicit phone verification documented in public API/auth docs.

## 8. Germany geo restrictions

No published geo-block for Germany. Devin website and app are accessible. No country-specific restriction found in docs.

## 9. GDPR / data residency

* SOC 2 Type II certified since Sep 2024, ISO 27001:2022 referenced.
* Trust Center: https://trust.cognition.ai
* Enterprise security: https://docs.devin.ai/enterprise/security-access/security/enterprise-security.md

Data processing:
* Web app: Cognition processes data actively provided by user.
* Enterprise dedicated deployments: all customer data stored within customer's tenant.
* By default models are not trained on customer data/code.

DPA: https://devin.ai/windsurf/dpa/

Key DPA points:
* EU/UK Privacy Laws defined as GDPR etc.
* International transfers via Standard Contractual Clauses EU Commission 2021.
* Subprocessors listed: Microsoft Azure, AWS, Google Cloud, Auth0, Sentry, Datadog, Zendesk, Pylon, Decagon, Agumbe India, plus model providers OpenAI, Anthropic, Google/Vertex, AWS/Bedrock, Databricks, xAI, Snowflake.
* Subprocessors locations primarily United States, with India support.

Enterprise Cloud model: Devin's brain and Devbox run in Cognition's multi-tenant cloud. No explicit EU data residency guarantee for standard cloud; dedicated/assured deployments allow customer-managed keys and tenant isolation.

Source: DPA https://devin.ai/windsurf/dpa/
Source: Enterprise security https://docs.devin.ai/enterprise/security-access/security/enterprise-security.md

## 10. Summary for DSH OAuth integration

* No standard OAuth2 endpoints for user login / device code flow.
* Integration must use Service User API Key or Personal Access Token with Bearer header.
* Base URL: `https://api.devin.ai`
* No token refresh mechanism; keys are long-lived and manually rotated.
* Free tier exists, paid plans from $20/mo.
* No documented phone/PayPal requirement for free sign-up.
* No Germany geo block found.
* GDPR covered via DPA and SCCs; standard cloud data resides in US AWS/Azure/GCP; EU data residency only via dedicated deployment.

## Citations

* API Overview https://docs.devin.ai/api-reference/overview
* Authentication https://docs.devin.ai/api-reference/authentication.md
* Personal Access Tokens https://docs.devin.ai/api-reference/personal-access-tokens.md
* Outposts partner integration https://docs.devin.ai/cloud/outposts/partners.md
* Pricing https://devin.ai/pricing
* Self-serve plans https://docs.devin.ai/admin/billing/self-serve.md
* Enterprise security https://docs.devin.ai/enterprise/security-access/security/enterprise-security.md
* Data Processing Addendum https://devin.ai/windsurf/dpa/
