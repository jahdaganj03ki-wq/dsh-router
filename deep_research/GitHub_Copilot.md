# GitHub Copilot Provider Research for DSH Integration

## Overview
GitHub Copilot is a commercial mass-market product with ECCN 5D992.c, exportable to most destinations with no license required. It is integrated with GitHub authentication and managed via GitHub REST API.

## Authentication / Login Method

### GitHub OAuth App flow
- Authorization endpoint: `https://github.com/login/oauth/authorize`
- Token endpoint: `https://github.com/login/oauth/access_token`
- The VS Code Copilot extension uses minimum scopes `user:email` for authentication.
  - `// Minimum set of scopes needed for Copilot to work export const GITHUB_SCOPE_USER_EMAIL = ['user:email'];` [github.com/microsoft/vscode](https://github.com/microsoft/vscode/blob/main/extensions/copilot/src/platform/authentication/common/authentication.ts)

### GitHub App / REST API authentication
- REST API base URL: `https://api.github.com`
- Copilot REST endpoints live under `https://api.github.com/copilot`
  - *REST API endpoints for Copilot* [docs.github.com](https://docs.github.com/en/rest/copilot)
- Most Copilot endpoints require headers:
  - `Authorization: Bearer <token>`
  - `Accept: application/vnd.github+json`
  - `X-GitHub-Api-Version` [docs.github.com](https://docs.github.com/en/rest/copilot/copilot-content-exclusion-management)

Authentication to the REST API is documented under:
- *Authenticating to the REST API* [docs.github.com](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api)

### Token lifetimes and refresh
- User access tokens created by a GitHub App expire after 8 hours by default and must be regenerated using a refresh token.
  - *Generating a user access token for a GitHub App* [docs.github.com](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
  - *Token expiration and revocation* [docs.github.com](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation)
- Refresh flow:
  - *Refreshing user access tokens* [docs.github.com](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens)
- OAuth apps can be configured for regular token rotation.
  - *Authorizing OAuth apps* [docs.github.com](https://docs.github.com/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)

### Scopes
- OAuth app scopes for Copilot:
  - `user:email` is the minimum set required by the official extension.
  - General OAuth app scopes include `user`, `user:email`, `user:follow`. [docs.github.com](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps)
- Fine-grained PAT permissions and GitHub App permissions are documented in the authentication guide.

## API Base URLs

- REST API: `https://api.github.com`
- Copilot REST namespace: `https://api.github.com/copilot/*`
- OAuth authorize: `https://github.com/login/oauth/authorize`
- OAuth token: `https://github.com/login/oauth/access_token`
- Docs: `https://docs.github.com/en/rest/copilot` [docs.github.com](https://docs.github.com/en/rest/copilot)

## Plans, Pricing and Free Tier Limits

### Plans
- Copilot Free
  - Free. 2,000 completions per month.
  - Access to Haiku 4.5, GPT-5 mini, and more; includes Copilot CLI.
  - *What's included: - 2,000 completions per month* [github.com](https://github.com/features/copilot/plans)
  - *Plans for GitHub Copilot* [docs.github.com](https://docs.github.com/en/copilot/get-started/plans)
- Copilot Pro: $10 USD per calendar month
- Copilot Pro+: $39 USD per calendar month
- Copilot Max etc.
  - *Copilot Pro remains $10/month, Pro+ remains $39/month* [github.blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing)
  - *Copilot Pro: $10 USD per calendar month. Copilot Pro+: $39 USD per* [docs.github.com](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-licenses)

### Free tier specifics
- Copilot Free starts with limited access to a selection of Copilot features.
  - *Plans for GitHub Copilot* [docs.github.com](https://docs.github.com/en/copilot/get-started/plans)
- No credit card required for Free tier.
  - *No credit card required. Verified students have access to the GitHub Copilot Student plan.* [github.com](https://github.com/features/copilot/plans?ref_plan=cfi&ref_product=copilot&ref_style=text&ref_type=purchase)

### Billing
- Paying for Copilot licenses uses the payment method set up for your GitHub account.
  - *Paying for Copilot licenses You pay for additional licenses using the payment method set up for your GitHub account.* [docs.github.com](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-licenses)
- Terms allow charging on-file credit card, PayPal account.
  - *Authorization By agreeing to these Terms, you are giving us permission to charge your on-file credit card, PayPal acc* [docs.github.com](https://docs.github.com/site-policy/github-terms/github-terms-of-service)

## Registration Requirements

- GitHub account creation requires email; phone number is not mandatory for signup. Phone is used only for optional 2FA configuration.
  - *Creating an account on GitHub* [docs.github.com](https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github)
  - 2FA configuration asks for mobile phone number.
    - *Configuring two-factor authentication* [docs.github.com](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication)
- Paid plans require a payment method on file, typically credit card. PayPal is accepted per Terms of Service.
- No payment method is required for Copilot Free.

## Geo Restrictions

### Export controls
GitHub Copilot may not be sold, exported, or re-exported to embargoed destinations or countries listed in Country Group E:1 in Supplement No. 1 to part 740 of the EAR without authorization. Current list includes:
- Cuba, Iran, North Korea, Russia, Belarus, and Crimea/Sevastopol and separatist areas of Donetsk and Luhansk.
- *GitHub Copilot may not be sold, exported, or re-exported to any embargoed destination or a country listed in Country Group E:1* [docs.github.com](https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls)

Germany is not embargoed. Copilot is generally available in Germany.

### Service availability
- GitHub cloud services are generally available to developers located in Cuba and Iran under specific licenses.
  - *GitHub cloud services, both free and paid, are also generally available to developers located in Cuba.* [docs.github.com](https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls)
- Availability may be determined by IP address and payment history. Travel in restricted regions may temporarily impact account status.
  - *Will traveling in these regions be impacted?* [docs.github.com](https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls)

## GDPR / Data Residency

- GitHub Enterprise Cloud with data residency supports keeping inference processing and associated data in US and EU regions.
  - *GitHub Copilot now supports data residency for US and EU regions* [github.blog](https://github.blog/changelog/2026-04-13-copilot-data-residency-in-us-eu-and-fedramp-compliance-now-available/)
- Enterprise policy can ensure inference stays in the chosen residency region.
  - *If your enterprise uses GitHub Enterprise Cloud with data residency, you can enable a policy to ensure that all inferenc* [docs.github.com](https://docs.github.com/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency)
- Data Processing Agreement and GDPR obligations are covered in GitHub's Data Protection Agreement.

## Workaround for Geo-blocking / No Payment / German Mobile Only

- Germany is a permitted jurisdiction; no geo-block exists for GitHub Copilot in Germany.
- Free tier can be used without payment method and without phone verification.
  - Sign up with a German email address; phone number is optional.
  - No PayPal/credit card required for Copilot Free.
- If access is ever blocked due to IP mis-detection:
  - The official guidance is to appeal via Support with verification information.
    - *How is GitHub ensuring that folks not living in and/or having professional links to the sanctioned countries...* [docs.github.com](https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls)
  - Using a VPN to a permitted region is a common user workaround reported in community discussions, e.g.:
    - *Copilot not available in my region* [github.com](https://github.com/orgs/community/discussions/51951)
    - Trade controls are enforced via IP and payment history; VPN can change IP perception.
  - For DSH integration, use GitHub OAuth with `user:email` scope, store refresh token if using GitHub App user access tokens, and respect the 8-hour expiry.
  - No payment is required to test with Copilot Free; limit is 2,000 completions/month.

## Key URLs

- Plans & pricing: https://github.com/features/copilot/plans
- Copilot docs: https://docs.github.com/en/copilot
- REST API Copilot: https://docs.github.com/en/rest/copilot
- Trade controls: https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls
- Data residency: https://docs.github.com/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency

---

*Report compiled from public GitHub documentation and community sources. Information subject to change. Verify current pricing and limits in the official pricing page before integration.*
