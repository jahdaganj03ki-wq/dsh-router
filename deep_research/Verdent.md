# Verdent Provider Research for DSH OAuth Integration

**Date:** 2026-09-19  
**Subject:** Verdent AI / verdent.ai

## Executive Summary

Verdent.ai is an AI coding assistant / agentic coding suite with Parallel Agents, Plan Mode, BYOK and Eco Mode. Public documentation does not describe Verdent as an OAuth **provider for model/API access** used by DSH OAuth integration. Verdent is a consumer of third-party OAuth for its own integrations and uses API keys / BYOK for model access. No public OAuth discovery metadata, device-code flow documentation, scopes, token refresh endpoints, or model/usage API base URLs for external OAuth clients were found.

## Official OAuth Endpoints

* No public OAuth authorization / token endpoint documentation for Verdent as a provider was found.
* Verdent’s own user authentication uses `login.verdent.ai` for user authentication and account registration. Domains listed in security policy:
  * `api.verdent.ai` – most API requests from official website
  * `agent.verdent.ai` – most API requests from Verdent VS Code extension
  * `llm-proxy.verdent.ai` – most requests from Verdent Desktop
  * `log.verdent.ai` – event logging
  * `login.verdent.ai` – user authentication and account registration

Source: [Verdent Security Policy](https://www.verdent.ai/security)

Verdent documentation describes OAuth as being used **by** plugins, not offered by Verdent:
> Different plugins use different secure authentication methods: OAuth — Plugins such as GitHub, Notion, and Linear support seamless OAuth flows. Verdent handles client credentials automatically

Source: [Integration | Verdent Docs](https://www.verdent.ai/docs/verdent-manager/core-features/integration)

## Device Code Flow Support

No evidence of device code / device authorization grant support for a Verdent OAuth provider. Verdent’s own authentication is email / Google / GitHub sign-up.

## Free Tier Availability

* Free mode: No subscription required
* Free mode supported models included in all plans
* Trial: New users get 100 free credits for 7 days

Pricing page:
> Free modeNo subscription required
> Basic models for light workIncluded in all plansNever uses creditsResets each period

Source: [Verdent AI Pricing](https://www.verdent.ai/pricing)

FAQ:
> Do I get a free trial when signing up?
> Absolutely! New users get 100 free credits for 7 days — all free.

Source: [Verdent AI Pricing](https://www.verdent.ai/pricing)

## Pricing

* Lite: $5 / month
* Starter: $19 / month +160 credits / mo
* Pro: $59 / month +500 credits / mo
* Max: $179 / month +1500 credits / mo
* Teams: $20 / user / month
* Top-ups: 1 credit ≈ $0.059, no markup on model costs

Source: [Verdent AI Pricing](https://www.verdent.ai/pricing)

## Registration Requirements

Privacy Policy states account information collected:
* When you sign up through Google: Google user ID, full name, email
* When you sign up through GitHub: GitHub user ID, username, email
* When you sign up through Email: email address and password

No phone number or PayPal requirement documented for sign-up.

Source: [Verdent Privacy Policy](https://www.verdent.ai/privacy)

## Germany Geo Restrictions

No explicit Germany geo-restriction found in public docs.

Security Policy states:
> All of our infrastructure and your data are located exclusively within the United States

Source: [Verdent Security Policy](https://www.verdent.ai/security)

Privacy Policy:
> We store your personal data on servers located within the United States.

Source: [Verdent Privacy Policy](https://www.verdent.ai/privacy)

## GDPR Data Residency

* Data residency: US only. Infrastructure fully hosted on AWS, with all servers deployed in the U.S.
* Sub-processors: AWS, Azure AI Foundry, Google Cloud Vertex API, AWS Bedrock, Parallel.ai, Jina, Stripe
* International transfers: transfers to US, safeguards via adequacy decisions or standard contractual clauses

From Security Policy:
> All of our infrastructure and your data are located exclusively within the United States

Source: [Verdent Security Policy](https://www.verdent.ai/security)

From Privacy Policy:
> We store your personal data on servers located within the United States.
> ...When we transfer your personal data outside of the EEA, the UK, or Switzerland, we ensure it benefits from an adequate level of data protection by relying on adequacy decisions or standard contractual clauses.

Source: [Verdent Privacy Policy](https://www.verdent.ai/privacy)

No EU data residency option documented.

## API Base URLs for Models and Usage

Verdent does not publish a public model API for external OAuth clients. Model access is via BYOK.

BYOK supported providers:
* Anthropic
* OpenAI
* OpenRouter

BYOK configuration path: Settings → Models → Configure Models

Source: [Bring Your Own Key BYOK | Verdent Docs](https://www.verdent.ai/docs/verdent-manager/configuration/byok)

Internal Verdent domains:
* `api.verdent.ai`
* `agent.verdent.ai`
* `llm-proxy.verdent.ai`
* `log.verdent.ai`
* `login.verdent.ai`

Source: [Verdent Security Policy](https://www.verdent.ai/security)

## Scopes

No public OAuth scopes documented for a Verdent provider.

## Token Refresh

No public OAuth token refresh endpoint documented. Verdent’s own integrations use OAuth handled internally for plugins.

Authentication note from docs:
> OAuth — Plugins such as GitHub, Notion, and Linear support seamless OAuth flows. Verdent handles client credentials automatically—you just log in and authorize in your browser, no copy-pasting required.
> Any API keys or access tokens you provide are stored locally on your machine. Verdent never uploads your credentials to our servers.

Source: [Integration | Verdent Docs](https://www.verdent.ai/docs/verdent-manager/core-features/integration)

## Limitations / Gaps for DSH OAuth Integration

* No official OAuth discovery / authorization server metadata found.
* No device code flow documentation.
* No scopes, token refresh, or client registration flow published.
* Verdent appears to be a consumer of OAuth, not a provider offering OAuth for model access.
* Model access is API-key based via BYOK, not OAuth.

Recommendation: Verify with Verdent support at hi@verdent.ai if a public OAuth provider is planned or if integration is intended via API keys / BYOK only.

## Sources

* [Verdent Security Policy](https://www.verdent.ai/security)
* [Verdent Privacy Policy](https://www.verdent.ai/privacy)
* [Verdent AI Pricing](https://www.verdent.ai/pricing)
* [Bring Your Own Key BYOK | Verdent Docs](https://www.verdent.ai/docs/verdent-manager/configuration/byok)
* [Integration | Verdent Docs](https://www.verdent.ai/docs/verdent-manager/core-features/integration)
* [Overview | Verdent Docs](https://www.verdent.ai/docs/verdent-manager/getting-started/overview)
