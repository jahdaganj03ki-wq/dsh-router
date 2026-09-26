# Codex Provider – 9Router / OmniRoute Integration Research

> Research date: 2026-09-20
> Scope: Provider “Codex” as listed in 9Router / OmniRoute ecosystems, Germany compatibility with German mobile number only and no payment.

## Summary

Public documentation for a standalone “Codex” API provider with phone-based registration is sparse. In the 9Router / OmniRoute context “Codex” refers to **OpenAI Codex Desktop / Codex CLI** integrated as an OAuth subscription provider.

* 9Router lists Codex under **OAuth Providers** and supports it alongside Claude Code, Antigravity, Cursor, etc. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* 9Router / OmniRoute gateways expose an OpenAI-compatible endpoint locally: `http://localhost:20128/v1` with API key from the dashboard. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* Codex OmniRoute integration requires an installed OpenAI Codex Desktop from Microsoft Store and a service URL + access key for the upstream OmniRoute / 9Router endpoint. The launcher injects `model_providers.omniroute.base_url` and `model_providers.omniroute.env_key` for the bridge. [Destruction13/Codex-Omniroute](https://raw.githubusercontent.com/Destruction13/Codex-Omniroute/main/GUIDE.md)

No public, verifiable documentation was found for a Codex provider that:
* offers a free tier with phone-number-only registration,
* accepts German mobile numbers for SMS verification without payment,
* or publishes explicit Germany/EU geo-restrictions / GDPR statements for Codex API access.

Findings below are therefore based on the 9Router / OmniRoute public repos and OpenAI Codex public pages.

---

## Authentication method

### 9Router
* **Gateway base URL:** `http://localhost:20128/v1` for OpenAI-compatible chat completions. Dashboard at `http://localhost:20128`. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* **API key:** Generated in 9Router dashboard, used as `Authorization: Bearer <key>` for `/v1/*` routes. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* **Codex provider type:** Listed under **OAuth Providers** in 9Router. Supported CLI tools include Codex. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)

### Codex OmniRoute bridge
* Manual install requires copying `omniroute-provider.example.json` to `omniroute-provider.json` and setting `base_url` and `api_key` for the OmniRoute endpoint. [Destruction13/Codex-Omniroute](https://raw.githubusercontent.com/Destruction13/Codex-Omniroute/main/GUIDE.md)
* Launcher runtime overrides include:
  ```
  model_providers.omniroute.base_url="http://127.0.0.1:<bridge-port>/v1"
  model_providers.omniroute.env_key="OMNIROUTE_API_KEY"
  model_providers.omniroute.requires_openai_auth=true
  ```
  [Destruction13/Codex-Omniroute](https://raw.githubusercontent.com/Destruction13/Codex-Omniroute/main/GUIDE.md)

### OpenAI Codex Desktop
* OpenAI positions Codex as an AI coding partner. Installation instructions reference Microsoft Store distribution. [openai.com/codex](https://openai.com/codex/)
* No public API key documentation for direct Codex API access; usage is via the desktop app / OpenAI account.

**Conclusion:** In 9Router/OmniRoute context Codex is accessed via OAuth subscription + local OpenAI-compatible gateway. No standalone API key / base URL is published by OpenAI for Codex.

---

## Free tier

### 9Router
* 9Router software is free and open source. Dashboard “costs” are display-only estimates. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* Codex is a **subscription provider**, not a free provider. 9Router README lists Codex under OAuth Providers, not under Free Providers. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)

### Free providers in 9Router
Current free options highlighted by 9Router:
* Kiro AI ~50 credits/month free
* OpenCode Free – no auth
* Vertex AI $300 credits for new GCP accounts [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)

**Codex free tier:** No free tier documented for Codex provider. OpenAI Codex requires an active OpenAI account / ChatGPT Plus/Pro subscription. Payment required for sustained use.

---

## Registration requirements

### 9Router / OmniRoute
* 9Router itself requires no registration for local use. Providers are added via OAuth or API key entry in dashboard. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* Codex OmniRoute setup requires official OpenAI Codex Desktop installed from Microsoft Store and signed in with an OpenAI account. [Destruction13/Codex-Omniroute](https://raw.githubusercontent.com/Destruction13/Codex-Omniroute/main/README.md)

### OpenAI account
* OpenAI public pages do not publish a phone-number-mandatory sign-up flow for Codex. Account creation is email-based.
* No verifiable source found confirming German mobile number acceptance/requirement or SMS verification specifically for Codex Desktop.
* OpenAI Platform documentation is behind login; no public citation available for phone verification policy.

**Gap:** No public source confirms SMS verification requirement, German mobile acceptance, or phone-only registration for Codex provider.

---

## Germany / EU geo restrictions & GDPR

* 9Router is local-first: “Local-first with AES-256-GCM encrypted keys”. Data stays on the user machine. No geo-restriction documented. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* OmniRoute README notes 43-language support including Deutsch. No explicit Germany block listed. [diegosouzapw/OmniRoute](https://raw.githubusercontent.com/diegosouzapw/OmniRoute)
* OpenAI Codex public pages do not publish geo-restriction details for the desktop app. OpenAI services are generally available in Germany with standard OpenAI Terms.

**GDPR compliance:** 9Router/OmniRoute self-hosted gateways keep keys locally and can be operated without data leaving EU. No GDPR statement is published specifically for Codex provider in the 9Router repos.

---

## Workarounds for Germany with German mobile only, no payment

Given no free Codex tier and no public phone-only registration path:

* **Avoid Codex provider** and use 9Router/OmniRoute free providers that require no payment:
  * Kiro AI – OAuth via AWS Builder ID / Google / GitHub; ~50 credits/month free. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
  * OpenCode Free – no auth required. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
  * Vertex AI – $300 free credits for new GCP accounts, use Vertex AI Studio endpoint. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* **Codex OmniRoute bridge** lets you route reasoning through your own OmniRoute service while keeping Codex auth/history local. Requires an upstream OmniRoute service URL + access key; does not eliminate need for OpenAI account for Codex Desktop. [Destruction13/Codex-Omniroute](https://raw.githubusercontent.com/Destruction13/Codex-Omniroute/main/GUIDE.md)
* For German mobile-only users: OpenAI account creation does not publicly require mobile SMS verification; email verification is standard. No evidence of German mobile block.

No reliable workaround was found to obtain Codex API access with German mobile number only and zero payment, because Codex is a subscription product.

---

## 20-day free long sessions viability

* Codex is a subscription provider. 9Router tracks quota per provider; Codex quota is tied to OpenAI subscription limits. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* Free providers in 9Router have monthly credit caps and rate limits, not 20-day unlimited sessions. Kiro is ~50 credits/month; OpenCode Free model list fluctuates. [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* OmniRoute free-tier budget aggregates ~1.51B documented free tokens/month across providers, but none are tied to Codex. [diegosouzapw/OmniRoute](https://raw.githubusercontent.com/diegosouzapw/OmniRoute)

**Viability:** 20-day free long sessions using Codex provider are not viable without a paid OpenAI subscription. Using 9Router/OmniRoute free providers with token compression RTK can stretch free quotas, but sessions remain capped by provider free tiers.

---

## Citations

* 9Router README – Quick Start base URL and API key usage: [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* 9Router README – Supported Providers, OAuth list includes Codex: [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* 9Router README – Free Providers: Kiro, OpenCode Free, Vertex AI: [decolua/9router](https://raw.githubusercontent.com/decolua/9router/master/README.md)
* Codex OmniRoute GUIDE.md – manual install base_url / api_key setup: [Destruction13/Codex-Omniroute](https://raw.githubusercontent.com/Destruction13/Codex-Omniroute/main/GUIDE.md)
* Codex OmniRoute GUIDE.md – runtime overrides for omniroute provider: [Destruction13/Codex-Omniroute](https://raw.githubusercontent.com/Destruction13/Codex-Omniroute/main/GUIDE.md)
* OpenAI Codex product page: [openai.com/codex](https://openai.com/codex/)
* OmniRoute README – free-tier budget and local-first: [diegosouzapw/OmniRoute](https://raw.githubusercontent.com/diegosouzapw/OmniRoute)

---

## Limitations & next steps

* No public documentation found for a Codex provider that accepts German mobile SMS verification without payment.
* OpenAI account/phone verification policies for Codex Desktop are not publicly documented beyond the product page.
* If you have access to internal 9Router/OmniRoute provider config files, check `open-sse/config/providers.ts` for Codex entry details.

Report generated 2026-09-20.
