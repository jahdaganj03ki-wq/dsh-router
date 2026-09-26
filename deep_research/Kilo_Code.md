# Kilo Code Provider – DSH Integration Research

**Research date:** 2026-09-20  
**Provider:** Kilo Code Inc. – Kilo Code / Kilo AI Gateway  
**Sources:** Kilo official documentation, Privacy Policy, Terms of Service, Enterprise EU pages, GitHub issues.

## 1. Authentication / Login Methods

### User account sign-in
- Kilo Code prompts to sign in or create a free account on first use.
- Sign-in options documented: email address, Google, Apple, GitHub, GitLab, Discord, LinkedIn, Anaconda, or organization single sign-on.
> “You can sign in with your email address, Google, Apple, GitHub, GitLab, Discord, LinkedIn, or Anaconda, or through your organization's single sign-on.” [https://kilo.ai/docs/getting-started/setup-authentication](https://kilo.ai/docs/getting-started/setup-authentication)

### Kilo AI Gateway API key
- For programmatic use outside the extension, e.g. Vercel AI SDK / OpenAI SDK, an API key is required.
- Key retrieval: app.kilo.ai → Your Profile → copy API key at bottom of page.
> “If you're using the Kilo AI Gateway outside of the Kilo Code extension... you'll need an API key” [https://kilo.ai/docs/getting-started/setup-authentication](https://kilo.ai/docs/getting-started/setup-authentication)

### API key authentication format
- Primary method: Bearer token in `Authorization` header.
```
Authorization: Bearer <your_api_key>
```
- API keys are JWT tokens tied to the Kilo account.
> “The primary authentication method is a Bearer token passed in the Authorization header” [https://kilo.ai/docs/gateway/authentication](https://kilo.ai/docs/gateway/authentication)

### Organization tokens
- When acting on behalf of an organization, include `X-KiloCode-OrganizationId: your_org_id`.
- Organization tokens are scoped with a 15-minute expiry and enforce org policies: model allow lists, provider restrictions, per-user spending limits.
> “Organization tokens are scoped with a 15-minute expiry and enforce the organization's policies” [https://kilo.ai/docs/gateway/authentication](https://kilo.ai/docs/gateway/authentication)

### Anonymous access
- Gateway allows unauthenticated access for free models only, identified by IP, rate limited 200 requests/hour/IP.
> “The gateway allows unauthenticated access for free models only.” [https://kilo.ai/docs/gateway/authentication](https://kilo.ai/docs/gateway/authentication)

### Bring Your Own Key (BYOK)
- BYOK lets you use your own provider API keys with Kilo Gateway. Keys are encrypted at rest AES-256.
- Supported BYOK providers include Anthropic, AWS Bedrock, Google AI Studio, OpenAI, MiniMax, Mistral, SpaceXAI, Z.AI, BytePlus Coding Plan, etc.
> “BYOK lets you use your own provider API keys with the Kilo AI Gateway.” [https://kilo.ai/docs/gateway/authentication](https://kilo.ai/docs/gateway/authentication)

### OAuth endpoints / scopes
- Public OAuth endpoints for third-party DSH integration are not published in the docs. Sign-in uses standard social providers via browser flow.
- Request headers supported:
  - `Authorization` – Bearer API key
  - `X-KiloCode-OrganizationId` – org context
  - `X-KiloCode-TaskId` – prompt cache keying
  - `X-KiloCode-Version` – client version
  - `x-kilocode-mode` – mode hint for `kilo-auto` routing
> “The gateway accepts the following headers” [https://kilo.ai/docs/gateway/authentication](https://kilo.ai/docs/gateway/authentication)

### Token refresh
- No explicit refresh token flow documented for user API keys; keys are long-lived JWTs.
- Organization tokens have a stated 15-minute expiry.
> “Organization tokens are scoped with a 15-minute expiry” [https://kilo.ai/docs/gateway/authentication](https://kilo.ai/docs/gateway/authentication)

## 2. API Base URLs

- Kilo AI Gateway base URL:
```
https://api.kilo.ai/api/gateway
```
Used as OpenAI-compatible endpoint for `/chat/completions`, streaming, etc.
> “All gateway API requests use the following base URL: https://api.kilo.ai/api/gateway” [https://kilo.ai/docs/gateway](https://kilo.ai/docs/gateway)

## 3. Free Tier Limits & Pricing

### Free usage
- Kilo Code can be used completely free of charge by configuring models as free.
- Three usage surfaces: Agentic interactions, Autocomplete, Background tasks.
- Auto Free tier: `kilo-auto/free` automatically routes to best available free models, no configuration needed.
> “Kilo Code can be used completely free of charge.” [https://kilo.ai/docs/getting-started/using-kilo-for-free](https://kilo.ai/docs/getting-started/using-kilo-for-free)

- Data handling warning for Auto Free: may route to providers that log prompts/outputs to improve services, e.g., NVIDIA free endpoints. Do not submit personal/confidential data.
> “Auto Free may route your requests to providers that log prompts and outputs” [https://kilo.ai/docs/getting-started/using-kilo-for-free](https://kilo.ai/docs/getting-started/using-kilo-for-free)

- Free autocomplete via BYOK Mistral AI Codestral free tier.
- Free background tasks by setting small model to a free model.

### Paid plans – Kilo Pass
- Monthly subscription converts 1:1 to paid credits, with bonus credits up to 50%.
- Tiers observed:
  - Starter $19/mo → up to $26.60/mo in credits
  - Pro $49/mo → up to $68.60/mo in credits
  - Expert $199/mo → up to $278.60/mo in credits
- Annual plan includes 50% bonus every month.
> “Maximize your AI output per dollar. A monthly AI token subscription with up to 50% bonus credits included.” [https://kilo.ai/pricing/kilo-pass](https://kilo.ai/pricing/kilo-pass)

- Credits expire: Usage fees credits must be used within 1 year of purchase or account deletion, whichever is sooner.
> “All Credits must be used before the sooner of (i) one (1) year of the date of purchase or (ii) the deletion of your Account” [https://kilo.ai/terms](https://kilo.ai/terms)

## 4. Registration Requirements

From Terms of Service:
- Age requirement: at least age of majority or 18, whichever is higher.
- Account registration requires name, email address, or other contact information.
- No phone number requirement is stated.
> “To access most features of the Service, you must register for an account... you may be required to provide us with some information about yourself, such as your name, email address, or other contact information.” [https://kilo.ai/terms](https://kilo.ai/terms)

Payment processing:
- Stripe and Coinbase are listed as payment processors.
- PayPal is not mentioned in Terms or pricing pages.
> “To facilitate payment for Fees... we use Stripe... and Coinbase” [https://kilo.ai/terms](https://kilo.ai/terms)

No payment is required for free tier usage with Auto Free / free models and BYOK.

## 5. Germany Geo-Restrictions

- Terms state service is offered from US headquarters and Kilo makes no representation that Materials are appropriate or available for use outside US.
> “We operate the Service from the United States, and we make no representation that Materials included in the Service are appropriate or available for use in other locations.” [https://kilo.ai/terms](https://kilo.ai/terms)

- No explicit country block for Germany found in public docs.
- Kilo provides EU-first documentation and Enterprise EU data residency options.
> “Kilo - EU-First AI Coding for European Teams” [https://kilo.ai/eu](https://kilo.ai/eu)

- GitHub issue reports API Error 451 Unavailable For Legal Reasons for certain models, e.g., MiMo-V2.5-Pro. 451 is a legal restriction, not a blanket Germany block.
> “API Error: 451 Unavailable For Legal Reasons” [https://github.com/Kilo-Org/kilocode/issues/10872](https://github.com/Kilo-Org/kilocode/issues/10872)

Practical implication: Free account creation and use from Germany is supported via web sign-in. Some models/providers may return 451 depending on provider legal restrictions; a VPN to a permitted region may be required for those specific models.

## 6. GDPR / Data Residency

Privacy Policy, last updated May 29, 2026:
- Kilo Code Inc. is data controller.
- Data stored and processed on servers in the United States.
- Cross-border transfers outside EEA/UK supported by Standard Contractual Clauses.
> “The Services are hosted in the United States and the personal information we collect will be stored and processed on our servers in the United States.” [https://kilo.ai/privacy](https://kilo.ai/privacy)
> “Where your personal information is transferred outside of the EEA... we will take steps to ensure your personal information is adequately protected by safeguards such as Standard Contractual Clauses” [https://kilo.ai/privacy](https://kilo.ai/privacy)

Kilo states it does not host models, does not train on your code or prompts, and does not retain them for its own purposes; inference is routed to chosen providers.
> “Kilo is a coding agent, not a model provider... We don't host models, we don't train on your code or prompts” [https://kilo.ai/eu](https://kilo.ai/eu)

EU Data Residency options – Enterprise only:
- EU-hosted open-weight models available via EU providers such as Inceptron in Kilo Gateway or BYOK.
- EU cloud compute guaranteed for Cloud Agents and compute workloads on Enterprise plan.
- EU data residency scoped across selected compute, inference, and product data paths.
- Provider allowlists, per-sub-org EU policy, BYOK regional endpoints.
> “EU cloud compute Enterprise Guaranteed EU-based infrastructure for Cloud Agents and compute workloads.” [https://kilo.ai/eu](https://kilo.ai/eu)

Free tier does not offer guaranteed EU data residency; data follows provider routing and US-hosted Kilo infrastructure.

## 7. Scopes & Permissions

- No granular OAuth scopes published.
- Access control via:
  - Personal API key
  - Organization ID header + org policies
  - BYOK key scoping per provider
- Enterprise features: SSO, SCIM, RBAC, provider/model allowlists, usage analytics, sub-org policy controls.
> “Control who can access Kilo and apply the right permissions across your organization.” [https://kilo.ai/eu](https://kilo.ai/eu)

## 8. Workaround for Geo-blocking / Germany with German mobile number only and no payment

Current findings:
- Sign-up requires email, not phone number or PayPal. German mobile number alone is sufficient only if used for email verification/SMS; email is primary.
- Free tier works without payment. No credit card required for Auto Free and free models.
- If specific models return 451 Unavailable For Legal Reasons from Germany, options:
  1. Use Auto Free which routes to allowed free models; switch models in picker to models labeled “(free)” with EU availability.
  2. Configure BYOK with a provider that allows access from Germany and use regional endpoint if supported.
  3. Use a VPN to a region where the model/provider is allowed for that request. This is a client-side workaround and may conflict with provider terms.
  4. For Enterprise EU needs, contact sales for EU-hosted providers like Inceptron and EU cloud compute, which are contractually scoped to EU.

Limitations:
- Kilo’s own infrastructure is US-hosted; privacy policy acknowledges cross-border transfers.
- No evidence of blanket Germany IP block for account creation; restriction is model/provider specific.

## 9. DSH Integration Notes

- Use base URL `https://api.kilo.ai/api/gateway` with OpenAI-compatible client.
- Auth header: `Authorization: Bearer <KILO_API_KEY>`.
- Optional header `X-KiloCode-OrganizationId` for org scoped calls.
- Model IDs can be e.g., `anthropic/claude-sonnet-4.5`, `kilo-auto/free`, `minimax/minimax-m2.1:free`.
- Streaming supported via SSE.

Citations summary:
- Authentication docs: https://kilo.ai/docs/getting-started/setup-authentication
- Gateway auth: https://kilo.ai/docs/gateway/authentication
- Gateway overview: https://kilo.ai/docs/gateway
- Free usage: https://kilo.ai/docs/getting-started/using-kilo-for-free
- Pricing: https://kilo.ai/pricing/kilo-pass
- Privacy: https://kilo.ai/privacy
- Terms: https://kilo.ai/terms
- EU page: https://kilo.ai/eu
- GitHub 451 issue: https://github.com/Kilo-Org/kilocode/issues/10872
