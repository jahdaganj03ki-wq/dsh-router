# Freebuff / Codebuff OAuth Integration Deep Research

**Date:** 2026-07-14
**Scope:** DSH OAuth integration research for Freebuff provider.

## 1. Provider Identity & Relationship

* Freebuff, Inc. operates Codebuff and Freebuff CLI / Web / Cloud / Chat / Desktop. [https://freebuff.com/privacy-policy](https://freebuff.com/privacy-policy)
* Freebuff is marketed as “the free coding agent” funded by ads. Homepage lists Desktop / CLI / Web / Cloud / Chat. [https://freebuff.com/](https://freebuff.com/)
* Cloud product sign-in uses “Continue with GitHub” / “Continue with Google”. No native username/password form is shown. [https://freebuff.com/login](https://freebuff.com/)
* The actual API backend is codebuff.com. The Freebuff free tier is the free tier of Codebuff.

## 2. Official OAuth / Authentication Endpoints

No public OAuth 2.0 Authorization Server documentation is published.

Reverse-engineered CLI login flow used by community adapters:

* Base API host: `https://www.codebuff.com` with API prefix `/api/v1`
* Device-code-like login:

  * `POST /api/auth/cli/code` with body `{ "fingerprintId": "<uuid>" }` → returns `loginUrl`, `fingerprintHash`, `expiresAt`, `expiresInMs`
  * User opens `loginUrl` in a browser and signs in with GitHub/Google
  * `GET /api/auth/cli/status?fingerprintId=&fingerprintHash=&expiresAt=` polled until response contains `default.authToken`
  * The returned `authToken` is used as Bearer token for `https://www.codebuff.com/api/v1`

Evidence from community adapter:

* `login.py` implements the flow described above and saves `authToken`, `userId`, `email`, `baseUrl`. [https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/login.py](https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/login.py)

Standard OAuth 2.0 endpoints `/authorize`, `/token`, `/device/code`, `/device/token` are not documented. The flow is proprietary to Codebuff CLI.

## 3. Device Code Flow Support

* There is no standards-based OAuth Device Authorization Grant.
* Freebuff/Codebuff uses a proprietary “CLI code” flow that is device-code-like: a fingerprint ID is issued, a login URL is returned for browser completion, and status is polled.
* The community adapter calls it “device-code OAuth”. [https://github.com/0xgetz/freebuff-9router](https://github.com/0xgetz/freebuff-9router)

Token format: opaque `authToken` string. No `refresh_token` is returned in the login script output.

## 4. API Base URLs for Models and Usage

Reverse-engineered from adapter README:

* Session creation: `POST /api/v1/freebuff/session` → returns `instanceId`, ~1 h lifetime
* Agent run start: `POST /api/v1/agent-runs` with `{ "action": "START" }` → returns `runId`
* Chat completions: `POST /api/v1/chat/completions` – requires “CLI envelope” headers/body:
  * `codebuff_metadata.run_id` = runId
  * `codebuff_metadata.client_id` = fresh random 13-char base36 per call
  * `codebuff_metadata.cost_mode` = `"free"`
  * `codebuff_metadata.freebuff_instance_id` = session instanceId
  * first system message = Buffy identity marker
  * `User-Agent: Freebuff-CLI/<version>`
  * `provider: {"data_collection":"deny"}`, `stop: ["cb_easp"]`

Adapter notes the API is not plain OpenAI compatible and requires the session + run dance per request. [https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/README.md](https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/README.md)

Base URL used in token file: `https://www.codebuff.com/api/v1`

## 5. Scopes

No OAuth scopes are published. Access is binary: possession of a valid `authToken` issued after GitHub/Google sign-in grants access to Freebuff free tier resources. Paid Codebuff plans add usage limits but scope model is not documented.

## 6. Token Refresh

* No `refresh_token` is documented.
* The `authToken` obtained via `/api/auth/cli/status` appears to be long-lived for the CLI session. Community adapters do not implement refresh; they re-run `login.py` when 401 is encountered.
* The free session `instanceId` created via `POST /api/v1/freebuff/session` is ~1 hour.

## 7. Free Tier Availability

* Freebuff offers a permanent free tier funded by ads.
* Homepage: “100 Freebucks every day. Spend them on any mix of these models. No subscription required.” Daily Freebucks refill at midnight Pacific and do not carry over. [https://freebuff.com/](https://freebuff.com/)
* Model allowances displayed on homepage:
  * 20 hrs GLM 5.3 Flash
  * 10 hrs DeepSeek V4.1 Flash
  * 10 hrs MiMo 2.5
  * 10 hrs Solar Pro 4
  * 6 hrs Muse Spark 1.2
  * 5 hrs GPT-5.6 Luna
* Community adapter reports: “6 messages/day per model (pool limited, resets on Pacific day). Model is locked per account — free limited tier resolves to mimo/mimo-v2.5 regardless of what you request.” [https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/README.md](https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/README.md)
* Freebuff Cloud is also free forever: “Free forever — Freebuff is supported by text ads.” [https://freebuff.com/cloud](https://freebuff.com/cloud)

## 8. Pricing

Codebuff paid plans:

* $100/mo – 1× usage
* $200/mo – 2.5× usage
* $500/mo – 7× usage
* Pay-as-you-go: 1¢/credit, no subscription required

Source: Codebuff Pricing page. [https://www.codebuff.com/pricing](https://www.codebuff.com/pricing)

Freebuff remains $0/yr.

## 9. Registration Requirements

* Free tier sign-in: “Continue with GitHub” or “Continue with Google”. [https://freebuff.com/login](https://freebuff.com/login)
* No phone number requirement documented for free access.
* Paid Codebuff subscriptions require third-party payment processor. Terms state payments are processed by third-party payment processor. No explicit PayPal mention; card details are handled by processor. [https://freebuff.com/terms-of-service](https://freebuff.com/terms-of-service)
* Privacy Policy collects account and contact information from authentication providers. [https://freebuff.com/privacy-policy](https://freebuff.com/privacy-policy)

## 10. Germany Geo Restrictions

* Homepage explicitly warns: “Access depends on your country and VPN. Session usage limits apply.” [https://freebuff.com/](https://freebuff.com/)
* Terms of Service prohibit hiding/spoofing location: “You may not hide, spoof, or misrepresent your actual country or location, including by using a proxy, VPN, relay, or similar service to make your traffic appear to come from another country, in order to obtain models, features, limits, pricing, or eligibility that are not available in your actual location.” [https://freebuff.com/terms-of-service](https://freebuff.com/terms-of-service)
* No explicit Germany-only block published, but country-based eligibility for free models is enforced.

## 11. GDPR Data Residency

* Company is Freebuff, Inc., based in the United States.
* Privacy Policy: “We are based in the United States, and we and our providers may process information in the United States and other countries. Where required, we use recognized safeguards for international transfers, such as adequacy decisions or contractual protections.” [https://freebuff.com/privacy-policy](https://freebuff.com/privacy-policy)
* No commitment to EU-only data residency or EU data centers is stated.
* European/UK privacy rights are acknowledged: right to access, rectify, erase, restrict, port, object; complaints to local DPA. [https://freebuff.com/privacy-policy](https://freebuff.com/privacy-policy)
* Data may be processed by AI model providers; providers may change over time. [https://freebuff.com/privacy-policy](https://freebuff.com/privacy-policy)

## 12. Limitations for DSH OAuth Integration

* No standard OAuth 2.0 / OpenID Connect discovery document.
* Authentication is tied to Codebuff proprietary CLI flow and requires browser-based GitHub/Google sign-in.
* API is not OpenAI-compatible natively; requires session + agent run dance and specific envelope metadata.
* Free tier limits are strict and model-locked; not suitable for production high-volume use.
* No official scopes, refresh tokens, or token introspection endpoints documented.
* Country-based access restrictions may block Germany users or require VPN compliance checks.

## Sources

* Freebuff homepage [https://freebuff.com/](https://freebuff.com/)
* Freebuff Cloud page [https://freebuff.com/cloud](https://freebuff.com/cloud)
* Freebuff login page [https://freebuff.com/login](https://freebuff.com/login)
* Privacy Policy [https://freebuff.com/privacy-policy](https://freebuff.com/privacy-policy)
* Terms of Service [https://freebuff.com/terms-of-service](https://freebuff.com/terms-of-service)
* Codebuff Pricing [https://www.codebuff.com/pricing](https://www.codebuff.com/pricing)
* Community adapter README [https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/README.md](https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/README.md)
* Community login script [https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/login.py](https://raw.githubusercontent.com/0xgetz/freebuff-9router/main/login.py)
