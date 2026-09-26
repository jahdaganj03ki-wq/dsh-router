# MonkeyCode Provider Deep Research Report for DSH OAuth Integration

**Date:** 2026-09-19
**Target:** MonkeyCode – chaitin/MonkeyCode open-source AI development platform

## Executive Summary

MonkeyCode is an open-source, enterprise-grade AI development platform developed by Chaitin Tech / Baizhi Cloud. It is **not** a public OAuth identity provider for third-party apps. Authentication is handled internally via password / Baizhi Cloud account login and quick registration. No public OAuth 2.0 authorization server, device code flow, or third-party OAuth endpoints are documented.

Self-hosting is the only way to achieve data residency / GDPR-aligned control. Hosted usage runs on `monkeycode-ai.net` / `monkeycode-ai.com` operated by Baizhi Cloud.

## Official Identity / OAuth Findings

### OAuth endpoints
- **No public OAuth provider endpoints published.** Official docs and repository describe internal login flows only:
  - `百智云登录 - 推荐`, `账号密码登录`, `快速注册` → backend `/api/v1/users/login?redirect=&inviter_id=...`
  - Login page: `/login`
  - Team admin login: `/manager`
- Frontend doc states: “普通用户：进入个人控制台...同一区域还提供 **百智云账号登录**、**注册**（跳转 OAuth 流程）入口。” The “OAuth 流程” refers to Baizhi Cloud account SSO inside MonkeyCode, not an external provider surface.
- No OpenID Connect discovery document, `/oauth/authorize`, `/oauth/token`, `/device/code` endpoints found in public repository or documentation.

Source: README [raw.githubusercontent.com/chaitin/MonkeyCode/main/README.md](https://raw.githubusercontent.com/chaitin/MonkeyCode/main/README.md)
Source: Frontend doc [raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md](https://raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md)

### Device Code Flow support
- **Not supported.** No official device_code / authorization_code grant documented. The platform uses session-based web login and API keys for programmatic access.
- MonkeyCode Answers explicitly notes: “Do not assume an API from marketing. Check the current repository and official documentation for any documented API or integration surface.”

Source: MonkeyCode Answers – Does MonkeyCode provide an API? [monkeycode.cc/answers/](https://monkeycode.cc/answers/)

### Scopes, Token Refresh
- No OAuth scopes. Programmatic access described in community guides uses API tokens created via CLI:
  `monkeycode token create --name "my-app-integration" --scope "complete,explain,fix" --expires "90d"`
- Token format shown as `mc_sk_live_...`. Refresh mechanism not documented; no refresh endpoint published.

Source: Community API guide [www.cnblogs.com/nkds/p/20639131](https://www.cnblogs.com/nkds/p/20639131)

## Free Tier & Pricing

### Hosted free tier
- **基础版 / Basic**: Free
  - 1 concurrent task
  - Cloud dev environment 1C / 4GB
  - Registration bonus 5,000 points
- Registration bonus and invite rewards documented:
  - New user registration login = 5,000 points
  - Invite new user = +5,000 points per person, unlimited
  - Daily check-in = +100 points/day

Source: Frontend doc – 套餐与积分入口 [raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md](https://raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md)
Source: Registration guide [www.w3cschool.cn/monkeycodedocs/monkeycode-individual-user-registration.html](https://www.w3cschool.cn/monkeycodedocs/monkeycode-individual-user-registration.html)

### Paid tiers
- **专业版 / Professional**: 10,000 points / month
  - 3 concurrent tasks
  - Cloud dev env 2C / 8GB
  - Daily grant 2,000 points, expires daily
- **旗舰版 / Flagship**: 100,000 points / month
  - 3 concurrent tasks
  - Cloud dev env 2C / 8GB
  - Daily grant 30,000 points, expires daily

Recharge points:
- ¥50 / 10,000 points
- ¥200 / 50,000 points [8折]
- ¥1,000 / 300,000 points [6.7折]

Source: Frontend doc – 我的套餐 [raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md](https://raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md)

### Free to operate?
Source code is AGPL-3.0; self-hosting has no license fee. Operating costs are infrastructure + model usage.
> “The MonkeyCode source code is open source under AGPL-3.0, so self-hosting the software has no license fee. Your real cost is infrastructure, model usage, and operations.”

Source: MonkeyCode Answers – How much does MonkeyCode cost? [monkeycode.cc/answers/](https://monkeycode.cc/answers/)

## Registration Requirements

- **Personal user registration:** Email-based. No phone number or PayPal required in public docs.
- Invite code optional, passed via `?ic=` URL param. Inviter ID persisted in localStorage.
- Enterprise users: contact form at Baizhi Cloud for invitation code.

No documentation of phone verification or PayPal payment gateway for registration. Payments for points recharge are handled via Baizhi Cloud payment pages opened from frontend; payment method not specified publicly.

Source: Registration guide [www.w3cschool.cn/monkeycodedocs/monkeycode-individual-user-registration.html](https://www.w3cschool.cn/monkeycodedocs/monkeycode-individual-user-registration.html)
Source: Frontend doc – 个人用户注册 [raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md](https://raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md)

## Geo Restrictions & Germany

No official geo-blocking documentation found. Hosted service domains:
- `https://monkeycode-ai.net/`
- `https://monkeycode-ai.com/`
- Docs: `https://monkeycode.docs.baizhi.cloud/`

Platform is operated by Chinese company Chaitin / Baizhi Cloud. Access from Germany is not explicitly restricted in public materials, but data processing for hosted accounts is under Chinese operator jurisdiction. No public statement on Germany-specific restrictions.

## GDPR / Data Residency

- **Hosted**: Data residency not specified. Platform sends code/prompts to model providers depending on route.
  > “It depends on the model route you configure. Self-hosting the platform does not automatically prevent code or prompts from reaching an external model provider.”

- **Self-hosted**: Supports private/offline deployment. Data can remain in your infrastructure.
  > “MonkeyCode documents private and offline deployment, so the platform can run inside a controlled or air-gapped network.”

GDPR compliance statement from Answers:
> “No software is GDPR-compliant by itself — compliance is a property of your deployment and processes. Self-hosting MonkeyCode keeps the platform and code on infrastructure you control, which supports data-residency and data-minimization arguments, but obligations remain yours.”

Source: MonkeyCode Answers – Is MonkeyCode GDPR compliant? [monkeycode.cc/answers/](https://monkeycode.cc/answers/)
Source: MonkeyCode Answers – Is MonkeyCode suitable for regulated industries? [monkeycode.cc/answers/](https://monkeycode.cc/answers/)

## API Base URLs & Model Usage

No official public model API is published for third-party consumption. Community documentation describes internal API for self-hosted deployments:

Base URL example:
`https://monkeycode.internal:8080`

Endpoints cited in community guide:
- `POST /api/v1/complete` – code completion
- `POST /api/v1/explain`
- `POST /api/v1/fix`
- `POST /api/v1/refactor`
- `POST /api/v1/chat`
- `GET /api/v1/health`
- `GET /api/v1/metrics`

Authentication: Bearer Token `Authorization: Bearer mc_sk_live_...`

Usage tracking:
- `frontend` polls `/api/v1/users/free-model-pool/usage` every 30s for shared free model pool.
- Model pricing displayed from `frontend/src/utils/common.tsx` modelPricingList.

Source: Community API guide [www.cnblogs.com/nkds/p/20639131](https://www.cnblogs.com/nkds/p/20639131)
Source: Frontend doc – 免费模型用量提示 [raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md](https://raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md)

## Scopes & Token Lifecycle

No OAuth scopes. API token scopes are application-level e.g. `complete,explain,fix`. No documented refresh endpoint; tokens appear long-lived with manual expiration.

## Limitations for DSH OAuth Integration

- MonkeyCode cannot be used as an OAuth identity provider for DSH.
- No standardized OAuth2/OIDC endpoints, authorization code, PKCE, or device code flow.
- Integration would require:
  1. Self-hosting MonkeyCode and extending authentication, **or**
  2. Using Baizhi Cloud account login if MonkeyCode exposes it, which is undocumented for third parties.

Recommendation: Treat MonkeyCode as a self-hostable AI development platform, not an OAuth provider. Use API key / internal token model for service-to-service integration only if self-hosted.

## Sources

- GitHub README: https://raw.githubusercontent.com/chaitin/MonkeyCode/main/README.md
- Frontend documentation: https://raw.githubusercontent.com/chaitin/MonkeyCode/main/frontend/doc.md
- MonkeyCode Answers hub: https://monkeycode.cc/answers/
- Personal user registration guide: https://www.w3cschool.cn/monkeycodedocs/monkeycode-individual-user-registration.html
- Community API guide: https://www.cnblogs.com/nkds/p/20639131
