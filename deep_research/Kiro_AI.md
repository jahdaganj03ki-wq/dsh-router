# Kiro AI Provider – DSH Integration Research Report

**Date:** 2026-09-08  
**Subject:** Kiro by AWS – authentication, API access, pricing, geo restrictions, GDPR / data residency and workarounds for Germany

---

## 1. Product Overview

Kiro is an agentic AI coding platform built and operated by AWS. It is offered as IDE, CLI, Web and Crew. Authentication and data handling are AWS-native.

- Official site: https://kiro.dev/
- Pricing: https://kiro.dev/pricing/
- Docs home: https://kiro.dev/docs/

---

## 2. Login / Authentication Methods

### User sign-in
Kiro supports browser-based social / federated sign-in for end users:
- AWS Builder ID
- GitHub
- Google

Enterprise deployments can use:
- AWS IAM Identity Center / SSO with SAML/OIDC IdP integration
- AWS Builder ID with GitHub sign-in enabled

Source: Authentication get-started page mentions social methods such as GitHub, Google and AWS Builder ID are not available in AWS GovCloud regions. [https://kiro.dev/docs/getting-started/authentication/](https://kiro.dev/docs/getting-started/authentication/)

AWS re:Post knowledge centre on IAM Identity Center sign-in:
- Sign-in flow uses `kiro-cli login` / `kiro-cli logout` / `kiro-cli whoami`
- Sessions default to 8 h IAM Identity Center limit, extendable.

[https://repost.aws/knowledge-center/kiro-iam-identity-center-auth](https://repost.aws/knowledge-center/kiro-iam-identity-center-auth)

### API key authentication for headless / CI/CD
Kiro CLI supports non-interactive authentication via a long-lived API key.

- Key format: `ksk_` prefix, e.g. `ksk_...`
- Environment variable: `KIRO_API_KEY`
- Usage: `kiro-cli chat --no-interactive PROMPT` after key is set
- Keys can be created in the Kiro web portal for users whose administrator has enabled user-provided API keys.

Source:
- Headless mode doc: *Headless mode requires an API key set as the KIRO_API_KEY environment variable.* [https://kiro.dev/docs/cli/headless/](https://kiro.dev/docs/cli/headless/)
- AWS re:Post: *Set KIRO_API_KEY to a valid key that starts with ksk_ and isn't revoked. For more information, see API key authentication (CLI).* [https://repost.aws/knowledge-center/kiro-iam-identity-center-auth](https://repost.aws/knowledge-center/kiro-iam-identity-center-auth)

There is no public OAuth 2.0 provider document for third-party apps. Kiro handles browser-based OAuth for its own MCP / remote servers internally and does not expose stable OAuth client credentials for external DSH integration.

---

## 3. API Access Details

### API key
- Long-lived credential, no documented refresh rotation.
- Used for headless CLI only, not a public REST API for model inference.

### Backend endpoints used by Kiro clients
Firewall / proxy documentation lists the domains Kiro requires.

- `runtime.<region>.kiro.dev`
- `management.<region>.kiro.dev`
- `assets.app.kiro.dev`
- Wildcard allowance: `*.kiro.dev` and `*.app.kiro.dev`

Current commonly referenced regions:
- `runtime.us-east-1.kiro.dev`
- `management.us-east-1.kiro.dev`

Source: *Allowlist the URLs and configure proxy settings that Kiro needs to connect to its backend services.* [https://kiro.dev/docs/privacy-and-security/firewalls/](https://kiro.dev/docs/privacy-and-security/firewalls/)
AWS re:Post troubleshooting mentions:
```
curl -v https://runtime.us-east-1.kiro.dev
curl -v https://management.us-east-1.kiro.dev
```
[https://repost.aws/knowledge-center/kiro-iam-identity-center-auth](https://repost.aws/knowledge-center/kiro-iam-identity-center-auth)

Additional community reference noting endpoint change:
`runtime..kiro.dev` for inference and `management..kiro.dev` for control plane. [https://github.com/jwadow/kiro-gateway/issues/146](https://github.com/jwadow/kiro-gateway/issues/146)

### Scopes / Token refresh
No public scopes are documented. For CLI OAuth device flow:
- Device flow is used on remote machines: `kiro-cli login --use-device-flow`
- Device flow does **not** support external IdP login such as Entra ID / Okta.

Token refresh for browser sessions is handled automatically by Kiro / AWS Identity Center. API keys are long-lived and do not refresh.

---

## 4. Free Tier, Pricing and Payment

### Free tier
- **Kiro Free:** $0 / month
- 50 credits per month
- Access to open weight models and Claude Sonnet 4.5
- No credit card required for free tier

Source: Pricing page
*KIRO FREE $0 per month – 50 credits – Access to open weight models* and *and Claude Sonnet 4.5* [https://kiro.dev/pricing/](https://kiro.dev/pricing/)

DEV.to summary:
*The Kiro free tier now has an official model lineup, 50 credits per month, and zero credit card required.* [https://dev.to/aws/pushing-kiros-free-tier-to-its-limits-5e34](https://dev.to/aws/pushing-kiros-free-tier-to-its-limits-5e34)

### Paid plans
- Pro $20 / user / month – 1,000 credits
- Pro+ $40 / user / month – 2,000 credits
- Pro Max $100 / user / month – 5,000 credits
- Power $200 / user / month – 10,000 credits
Add-on credits $0.04 / credit

Source: Pricing page [https://kiro.dev/pricing/](https://kiro.dev/pricing/)

### Payment methods
Kiro billing uses AWS billing:
- All major credit and debit cards
- Billing currency USD
- No PayPal currently offered. Community requests for PayPal, Apple Pay, Google Pay etc. exist.
- *We accept all major credit and debit cards. Your card will be charged in USD currency.* [https://kiro.dev/docs/billing/managing/](https://kiro.dev/docs/billing/managing/)

Registration does **not** require phone number or PayPal. Sign-up is via email / social login or AWS Builder ID.

---

## 5. Registration Requirements

- Email address via social login or AWS Builder ID
- No phone verification required for free tier
- No PayPal account required
- Paid upgrade requires a valid credit card and billing address

Sign-up bonus: $20 credit when first upgrading to paid plan using social login or AWS Builder ID. [https://kiro.dev/pricing/](https://kiro.dev/pricing/)

---

## 6. Geo Restrictions & Germany

### Supported countries for paid plans
Kiro credits are supported in most countries where AWS billing is available.

FAQ wording:
*Kiro credits are supported in most countries or regions globally where AWS billing is available. Excludes individuals li* [https://kiro.dev/faq/](https://kiro.dev/faq/)

GitHub issue tracking:
*Users located in the majority of European Union member states (20 out of 27) are currently unable to Kiro's paid tiers.* [https://github.com/kirodotdev/Kiro/issues/2308](https://github.com/kirodotdev/Kiro/issues/2308)

### Startup promotional programme exclusions
Startup terms explicitly exclude Germany:
*Excludes individuals living in Argentina, Belarus, Brazil, China/GCR, Cuba, France, Germany, Iran, Italy, Mexico, North Korea, Poland, Russia, Spain, Syria, ...* [https://kiro.dev/startups/terms/](https://kiro.dev/startups/terms/)

Implication: Germany is excluded from the Kiro Pro+ startup credits programme and faces limited paid-plan availability. Free tier sign-up with social login is generally possible, paid upgrade may be blocked depending on billing address.

### GDPR / Data Residency
Kiro is built on AWS and inherits AWS data protection controls.

- Data encrypted in transit TLS 1.2+ and at rest with AWS managed key / AWS KMS.
- *Kiro encrypts your data using AWS owned encryption keys from AWS Key Management Service (AWS KMS). You don't have to tak* [https://kiro.dev/docs/privacy-and-security/data-protection/](https://kiro.dev/docs/privacy-and-security/data-protection/)
- *Kiro encrypts all data in transit using TLS 1.2+ and at rest using an AWS managed key — no con* [https://builder.aws.com/content/3AX1Nv7endqQhXZomJ80iwBtJRz/security-considerations-for-ai-coding-assistants-and-how-kiro-addresses-them](https://builder.aws.com/content/3AX1Nv7endqQhXZomJ80iwBtJRz/security-considerations-for-ai-coding-assistants-and-how-kiro-addresses-them)

Data residency is tied to the AWS region of the Kiro subscription. Default runtime is `us-east-1`. Enterprise customers can request customer-managed encryption keys and GovCloud deployments.

No explicit public guarantee of EU-only data residency for standard free/pro plans. GDPR compliance is via AWS Data Processing Addendum; users should review AWS Privacy Notice.

---

## 7. Workaround for Germany with German mobile only and no payment

Goal: use Kiro free tier from Germany without payment.

Observed constraints:
- Free tier requires only social login / AWS Builder ID, no phone, no payment.
- Paid plans and startup programme are restricted / excluded for Germany.
- Registration is tied to account location / billing address, not mobile number.

Practical workaround:
1. Use free tier only. Create account via GitHub or Google with German email. No payment method required.
2. If paid upgrade is required, use a VPN to a supported billing country and a payment method issued in that country. This is against Kiro Terms of Service and AWS billing terms; use at own risk.
3. With German mobile only and no payment, the viable path is free tier with social login, no VPN needed for usage. VPN may be required only if Kiro blocks sign-up based on IP geolocation for certain countries. Community reports suggest free sign-up works from Germany, paid checkout fails.

Community evidence:
- Reddit thread *My Country is not supported?* discusses inability to pay for subscription from certain EU countries. [https://www.reddit.com/r/kiroIDE/comments/1nl0c3m/my_country_is_not_supported/](https://www.reddit.com/r/kiroIDE/comments/1nl0c3m/my_country_is_not_supported/)
- Free tier remains accessible without credit card.

Recommendation for DSH integration:
- Kiro does not expose a public OAuth provider or stable REST API for third-party AI provider integration. DSH integration would be limited to invoking `kiro-cli` with `KIRO_API_KEY` in headless mode, which is intended for automation, not for proxying model inference.
- No official scopes, token refresh endpoint, or API base URL for model calls is published.

---

## 8. Summary Table

| Item | Detail |
|------|--------|
| Login methods | AWS Builder ID, GitHub, Google, IAM Identity Center SSO |
| API key | `ksk_` prefixed, env `KIRO_API_KEY`, long-lived |
| OAuth endpoints | None public for third parties; internal device flow for CLI |
| Free tier | 50 credits/month, no card required |
| Paid plans | Pro $20, Pro+ $40, Pro Max $100, Power $200 per user/mo |
| Payment | Credit/debit cards USD, no PayPal |
| Phone required | No |
| Germany geo | Excluded from startup programme; paid plans limited; free tier generally usable |
| GDPR data residency | AWS-based, encrypted with AWS KMS, default us-east-1, enterprise options for EU |
| API base URLs | `runtime.<region>.kiro.dev`, `management.<region>.kiro.dev`, `assets.app.kiro.dev` |
| Token refresh | Automatic for browser sessions; API keys do not refresh |

---

## 9. Sources

- Pricing: https://kiro.dev/pricing/
- Authentication docs: https://kiro.dev/docs/getting-started/authentication/
- Headless mode: https://kiro.dev/docs/cli/headless/
- Billing managing: https://kiro.dev/docs/billing/managing/
- Startup terms: https://kiro.dev/startups/terms/
- FAQ: https://kiro.dev/faq/
- Data protection: https://kiro.dev/docs/privacy-and-security/data-protection/
- Firewalls: https://kiro.dev/docs/privacy-and-security/firewalls/
- AWS re:Post IAM Identity Center auth: https://repost.aws/knowledge-center/kiro-iam-identity-center-auth
- GitHub issue billing countries: https://github.com/kirodotdev/Kiro/issues/2308
- DEV.to free tier: https://dev.to/aws/pushing-kiros-free-tier-to-its-limits-5e34

---

*Report generated for DSH integration assessment. Information is current as of 2026-09-08 and subject to change by AWS/Kiro.*
