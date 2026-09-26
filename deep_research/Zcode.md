# Zcode Provider Deep Research for DSH OAuth Integration

**Research date:** 2026-09-09
**Scope:** ZCode / Z.ai / Zhipu BigModel provider information relevant to DSH OAuth integration

## Summary

ZCode is Zhipu's Agentic Development Environment (ADE) built around GLM-5.3. Public documentation describes account-based binding to Z.ai / BigModel Coding Plans and API-key based access via OpenAI-compatible endpoints. No public OAuth 2.0 authorization server documentation, device-code flow specification, or OAuth scopes are published for third-party DSH integration. Authentication is presented as account login / binding inside ZCode and API-key usage for programmatic access.

## Official OAuth endpoints

- **Status:** Not publicly documented.
- Evidence: ZCode docs describe connecting models via “Continue with Z.ai” / “Continue with BigModel” authorization flows inside the desktop app, with automatic account binding after provider authentication succeeds. The docs do not publish authorization endpoint URLs, token endpoint URLs, client registration process, or OAuth 2.0 discovery metadata.
- Source: Connect Models & Plans – Method 1 First-Launch Welcome Screen: “After you choose Continue with Z.ai or Continue with BigModel, ZCode opens the authorization flow and waits for the provider to finish authentication. Once authentication succeeds, the account is bound automatically.” [https://zcode.z.ai/en/docs/configuration](https://zcode.z.ai/en/docs/configuration)

## Device code flow support

- **Status:** No evidence of public device-code flow support for ZCode provider.
- The documentation references browser-based authorization flows initiated from ZCode desktop, with no mention of OAuth Device Authorization Grant, `device_authorization_endpoint`, `device_code` / `user_code` parameters, or polling intervals.
- No device code flow parameters appear in Z.ai developer docs reviewed.

## Free tier availability

- **ZCode trial via BigModel / Z.ai account binding**
  - New users automatically receive a trial plan after connecting a BigModel account: no payment required, **8 million tokens per day for the first 5 days** for GLM model trials.
  - Daily trial quota split:
    - GLM-5.3: 3 million tokens / day
    - GLM-5.3-Flash: 5 million tokens / day
  - Quota refreshes daily during trial period; expires after 5 days, not an ongoing allowance.
  - Source: Connect Models & Plans – Free Trial Quota [https://zcode.z.ai/en/docs/configuration](https://zcode.z.ai/en/docs/configuration)

- **ZCode welcome benefits**
  - First-time users get 5-day free benefits with GLM-5.3 3M tokens/day, GLM-5-turbo 2M tokens/day, daily total 5M tokens for 5 days only.
  - Source: Welcome to ZCode for GLM-5.3 [https://zcode.z.ai/en/docs/welcome](https://zcode.z.ai/en/docs/welcome)

## Pricing

### GLM Coding Plan – Z.ai / BigModel
- New credits-based plans are now available; previous plans no longer sold to new users. Existing active subscriptions are not affected.
- Old Legacy Plan V2 limits referenced in notices:
  - Lite: ~80 prompts / 5-hour, ~400 / week
  - Pro: ~400 prompts / 5-hour, ~2,000 / week
  - Max: ~1,600 prompts / 5-hour, ~8,000 / week
- Source: Plan Update Announcement [https://docs.z.ai/devpack/notice/usage-revision](https://docs.z.ai/devpack/notice/usage-revision)

### ZCode in-app pricing screenshots referenced in docs
- BigModel provider page shows Start Plan at 3M tokens per day, For Individuals from CN¥118, For Teams from CN¥598.
- Upgrade dialog shows individual plans Lite CN¥118, Pro CN¥538, Max CN¥1,078; team plans CN¥598 and CN¥1,198.
- Source: Connect Models & Plans – Subscribe to a Coding Plan Inside ZCode [https://zcode.z.ai/en/docs/configuration](https://zcode.z.ai/en/docs/configuration)

### Z.ai Open Platform model pricing
- Per 1M tokens USD:
  - GLM-5.3-Flash $0.15 input / $0.50 output
  - GLM-5.3 $1.4 input / $4.4 output
  - GLM-5.2 $1.4 input / $4.4 output
- Source: Pricing – Latest Models [https://docs.z.ai/guides/overview/pricing](https://docs.z.ai/guides/overview/pricing)

## Registration requirements

- Account creation on Z.ai Open Platform or BigModel open platform is required to obtain API keys and subscribe to Coding Plans.
- Registration fields documented in privacy policy: account information includes date of birth where applicable, username where applicable, email address, password.
- Payment method required for paid plans: “To purchase services, you must provide complete and accurate billing information (“Payment Method”). You authorize us to charge your Payment Method for the applicable fees and any taxes.” No explicit phone requirement documented in reviewed pages.
- Source: Privacy Policy – What Personal Data We Collect [https://docs.z.ai/legal-agreement/privacy-policy](https://docs.z.ai/legal-agreement/privacy-policy)
- Source: Subscriptions, Fees, and Payment – Fees and Billing [https://docs.z.ai/legal-agreement/subscription-terms](https://docs.z.ai/legal-agreement/subscription-terms)

PayPal specifically not mentioned in reviewed documentation. Payment method page exists: https://z.ai/manage-apikey/billing

## Germany geo restrictions

- No explicit Germany-specific geo restriction documented in the reviewed ZCode / Z.ai public docs.
- The ZCode docs differentiate “Recommended for global users” Z.ai Coding Plan vs “China” BigModel option.
- No statement of availability or blocking for Germany found.

## GDPR data residency

- Data controller: JINGSHENG HENGXING TECHNOLOGY PTE.LTD, Singapore.
- Storage location: “We generally provide the Services from Singapore, and our group companies and their designated service providers are typically located in Singapore. As a result, your personal data is generally processed in Singapore.”
- International data transfer safeguards referenced but no EU-specific data residency commitments found in reviewed pages.
- Source: Privacy Policy – Where We Store Your Personal Data [https://docs.z.ai/legal-agreement/privacy-policy](https://docs.z.ai/legal-agreement/privacy-policy)

GDPR-specific data residency guarantees are not explicitly stated in the reviewed documentation.

## API base URLs for models and usage

### Coding Plan endpoints
- BigModel Coding-only OpenAI Base URL: `https://open.bigmodel.cn/api/coding/paas/v4`
- BigModel Coding-only Anthropic Base URL: `https://open.bigmodel.cn/api/anthropic`
- Z.ai Coding-only OpenAI Base URL: `https://api.z.ai/api/coding/paas/v4`
- Z.ai Coding-only Anthropic Base URL: `https://api.z.ai/api/anthropic`

### Resource package / prepaid balance endpoints
- BigModel OpenAI Base URL: `https://open.bigmodel.cn/api/paas/v4`
- Z.ai OpenAI Base URL: `https://api.z.ai/api/paas/v4`
- Anthropic Base URL does not apply to resource packages / prepaid balance.
- Source: Connect Models & Plans – BigModel / Z.ai API Endpoints [https://zcode.z.ai/en/docs/configuration](https://zcode.z.ai/en/docs/configuration)

## Scopes

- No OAuth scopes documented. API access is via API Key. Coding Plan authorization is account binding, not scope-based OAuth.

## Token refresh

- API Key authentication is static bearer key; no refresh token flow documented.
- Coding Plan binding uses account session; no token refresh parameters published.
- For API Key mode, no token refresh is required – key is long-lived until rotated by user.

## Authentication methods confirmed

- Account binding: Continue with Z.ai / Continue with BigModel inside ZCode welcome screen or Model Settings.
- API Key: OpenAI-compatible and Anthropic-compatible endpoints with API Key header.
- Source: Connect Models & Plans – Setup Entry Points, Connect BigModel, Connect Z.ai [https://zcode.z.ai/en/docs/configuration](https://zcode.z.ai/en/docs/configuration)

## Limitations / Gaps

- No public OAuth 2.0 discovery document, authorization/token endpoints, device code flow, or OAuth scopes found.
- No explicit phone/PayPal registration requirement stated.
- No Germany geo restriction or GDPR data residency commitment found in public docs.
- Registration and payment details may be region-specific and change over time.

## Citations

- ZCode Docs – Connect Models & Plans: https://zcode.z.ai/en/docs/configuration
- ZCode Docs – Welcome: https://zcode.z.ai/en/docs/welcome
- Z.AI Developer Docs – Plan Update Announcement: https://docs.z.ai/devpack/notice/usage-revision
- Z.AI Developer Docs – Pricing: https://docs.z.ai/guides/overview/pricing
- Z.AI Developer Docs – Privacy Policy: https://docs.z.ai/legal-agreement/privacy-policy
- Z.AI Developer Docs – Subscriptions, Fees, and Payment: https://docs.z.ai/legal-agreement/subscription-terms
