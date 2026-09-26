# Trae CN Provider – Deep Research for DSH OAuth Integration

**Report date:** 2026-07-29  
**Scope:** Official OAuth endpoints, device code flow, free tier/pricing, registration requirements, geo restrictions, GDPR/data residency, API base URLs, scopes, token refresh.

---

## 1. Product overview

Trae, 全称 *The Real AI Engineer*，是由字节跳动及其旗下 SPRING PTE 于2025年3月推出的一款使用 AI 技术的 IDE，基于 Code OSS 即 VS Code 的开源版本开发。

- 原作者: 字节跳动
- 首次发布: 2025年1月19日
- 官网: [www.trae.ai](https://www.trae.ai)；中国大陆官网: [www.trae.cn](https://www.trae.cn)
- 引擎: Electron

来源: [Trae - 维基百科](https://zh.wikipedia.org/wiki/Trae)

---

## 2. Official OAuth / authentication findings

### Current public documentation status
As of 2026-07-29 no official public OAuth 2.0 developer documentation for Trae CN is published by ByteDance/Trae. The product uses account-based login for the IDE and web services; reverse-engineered community projects describe authentication via Trae’s internal Cloud-IDE-JWT / storage tokens.

Community relay Trae2api-cn documents the authentication mechanisms it observes:

> “认证方式
> | 方式 | 说明 |
> |---|---|
> | `auto` | 自动解密本地 Trae CN / SOLO CN 的 `storage.json` |
> | `env` | 从 `.env` 读取 TRAE_TOKEN / TRAE_REFRESH_TOKEN / TRAE_USER_ID |
> | `manual` | 网页抓包得到的 Cloud-IDE-JWT |
> | `cli` | 本地 Trae CLI 子进程，不需要 JWT |
> | `web-login` | 浏览器授权登录，打开 `http://服务器:8000/web/login` 后在页面完成授权”

来源: [Trae2api-cn README](https://raw.githubusercontent.com/autumnsentiment/Trae2api-cn/main/README.md)

Web-login flow notes from the same project:

> “Trae 授权页强制要求授权回调地址为 `http://127.0.0.1:<端口>/authorize`，且浏览器网页出于安全沙箱无法监听本机 TCP 端口，因此必须由本机运行一个轻量监听器来接收回调并转发给服务器。”

来源: [Trae2api-cn README](https://raw.githubusercontent.com/autumnsentiment/Trae2api-cn/main/README.md)

**Implication for DSH OAuth integration:**
- No public `authorization_endpoint`, `token_endpoint`, `device_authorization_endpoint` published by Trae.
- Device Code Flow support: No evidence of official RFC 8628 Device Authorization Grant. The community implementation uses a local helper to capture a browser callback to `http://127.0.0.1:<port>/authorize`, which is not a standard OAuth device code flow.
- Scopes: No official scope list published. Relay projects treat authentication as opaque JWT / refresh token.

**Recommendation:** Treat Trae CN as a closed account system. DSH integration would require either:
1. Using the community relay’s web-login helper as a bridge, or
2. Waiting for official OAuth provider documentation from ByteDance.

### Token refresh
Community documentation indicates automatic refresh of Cloud-IDE-JWT:

- Configuration variable `TRAE_REFRESH_TOKEN` is documented.
- Relay performs “自动刷新 Cloud-IDE-JWT 令牌”.

来源: [Trae2api-cn README](https://raw.githubusercontent.com/autumnsentiment/Trae2api-cn/main/README.md)

No official refresh token endpoint documented.

---

## 3. API base URLs – community observed

Trae2api-cn documents default upstream hosts reverse-engineered from Trae CN traffic:

- `TRAE_RAW_BASE_URL` default: `https://trae-api-cn.mchost.guru`
  - Used for Trae raw v2 `llm_raw_chat` 网关；账号站 `api.trae.com.cn` 不提供此模型端点
- `TRAE_WEB_BASE_URL` default: `https://trae-api-cn.mchost.guru/api/remote/v1`
  - remote 上游端点；`remote` 模式按 9router 的 `chat_sessions` + `events` 协议转发
- `TRAE_USAGE_API_HOST` default: `https://api5-normal.mchost.guru`
  - TraeWork 商业用量查询主机，不与 entitlement API 混用

来源: [Trae2api-cn README](https://raw.githubusercontent.com/autumnsentiment/Trae2api-cn/main/README.md)

OpenAI-compatible relay endpoints exposed by the project:
- `GET /v1/models`
- `POST /v1/chat/completions`
- `POST /v1/responses`
- `POST /v1/chat`
- `POST /v1`

来源: [Trae2api-cn README](https://raw.githubusercontent.com/autumnsentiment/Trae2api-cn/main/README.md)

**Note:** These URLs are observed via community reverse engineering, not officially published. Use at your own risk; they may change without notice.

---

## 4. Free tier availability & pricing

Trae products are credit-based.

Official documentation:
- “TRAE Pricing 积分是 TRAE 统一的用量单位，你的对话与任务都会按实际用量消耗积分。”

来源: 定价 | TRAE - The Real AI Engineer [https://www.trae.cn/pricing](https://www.trae.cn/pricing)

Plans documentation lists:
- TRAE offers five plans: Free, Lite, Pro, Pro+, and Ultra.

来源: Plans & billing - Documentation - TRAE [https://docs.trae.ai/ide/new-plans-and-billing](https://docs.trae.ai/ide/new-plans-and-billing)

International pricing page indicates a free tier exists.

来源: Pricing | TRAE - Collaborate with Intelligence [https://www.trae.ai/pricing](https://www.trae.ai/pricing)

Third-party summaries:
- Free tier described as 5,000 autocompletions/month in some 2026 summaries.

来源: Trae Pricing 2026 | Plans, Cost & Free Tier | Stackpick

**China version specifics:** 国内版 pricing page is credit-based; exact free credit allowance not publicly enumerated in machine-readable form as of this date. Registration is required for usage.

---

## 5. Registration requirements – phone / PayPal

No official public API registration documentation found.

Observations:
- Trae CN web login requires browser-based authentication to Trae’s web services.
- Community relay web-login flow requires local port 127.0.0.1 authorization callback, implying standard account login via Trae web UI, not API key registration.
- No public evidence of mandatory PayPal for free tier. Paid plans likely require payment method; specific accepted methods not published in accessible docs.

Phone verification: Chinese domestic services often require mobile phone verification. No explicit confirmation found in public docs for Trae CN account creation; registration UI is behind the web app.

---

## 6. Germany geo restrictions

Supported countries documentation:

Supported countries and regions page lists EU countries including Germany for the international trae.ai service.

Excerpt from search results:
- EU | Non-EU
- Austria, Belgium, Bulgaria, Czech Republic, Germany, Denmark, Estonia, Spain, Finland…

来源: Supported countries and regions - Documentation [https://docs.trae.ai/ide/supported-countries-and-regions](https://docs.trae.ai/ide/supported-countries-and-regions)

FAQs note subscriptions are region-limited, but Germany is explicitly listed as supported in the EU table for trae.ai.

**Important distinction Trae CN vs Trae International:**
- **trae.ai / international** – accessible in Germany per docs.
- **trae.cn / China domestic** – user reports from Germany require VPN to open trae.cn, create account, login and use services. The trae.cn domain and underlying `trae-api-cn.mchost.guru` hosts appear geo-restricted to mainland China and are not reachable without VPN from Germany/EU. This matches community experience and ByteDance’s typical China-only services.

No geo-block for Germany reported for trae.ai; **geo-block for trae.cn confirmed by user reports requiring VPN**.

---

## 7. GDPR data residency

No official GDPR data residency commitment found for Trae CN.

Public commentary highlights data handling concerns:
- “All AI completions route through ByteDance's cloud servers — code leaves your machine - ByteDance is subject to Chines…”

来源: How to Secure Your Trae AI App | Guide

- Community reports: “Just a quick reminder that Trae is based in China, part of ByteDance and are currently misusing your data : r/Trae_ai”

来源: Reddit discussion

- Telemetry controversy: “近日，字节跳动旗下 技术实测显示，Trae IDE在7分钟内发起近500次网络请求，上传数据量达26MB。”

来源: 字节跳动Trae IDE陷数据隐私争议

**Conclusion:** No evidence of EU data residency or GDPR-compliant hosting guarantees published by Trae for the CN provider. Data is processed via ByteDance infrastructure; users in Germany/EU should assume data may be processed in China and be subject to Chinese jurisdiction.

---

## 8. Scopes & permissions

No official OAuth scopes published.

Community relay operates with opaque tokens:
- Cloud-IDE-JWT carries implicit permissions for model access, remote sessions, usage queries.
- No documented scope negotiation.

---

## 9. Summary of gaps for DSH OAuth integration

| Item | Status |
|---|---|
| Official OAuth authorization endpoint | Not published |
| Official token endpoint | Not published |
| Device Code Flow support | No official evidence; community uses browser callback |
| Client registration | Not public |
| Free tier | Exists, credit-based |
| Pricing | Credit-based; plans Free/Lite/Pro/Pro+/Ultra |
| Phone/PayPal registration requirement | Unclear; web login required; phone likely for CN accounts |
| Germany geo restriction | Supported |
| GDPR data residency | No commitment; data processed via ByteDance/China |
| Model API base URL | Community observed: https://trae-api-cn.mchost.guru |
| Usage API base URL | Community observed: https://api5-normal.mchost.guru |
| Token refresh | Community observed refresh token; no official spec |
| Scopes | Not published |

---

## 10. Citations

- Trae Wikipedia: https://zh.wikipedia.org/wiki/Trae
- Trae2api-cn README: https://raw.githubusercontent.com/autumnsentiment/Trae2api-cn/main/README.md
- Trae supported countries: https://docs.trae.ai/ide/supported-countries-and-regions
- Trae plans & billing: https://docs.trae.ai/ide/new-plans-and-billing
- Trae pricing international: https://www.trae.ai/pricing
- Trae pricing CN: https://www.trae.cn/pricing
- Data handling commentary: https://vibeappscanner.com/how-to-secure-trae-app

---

**Prepared for:** DSH OAuth integration research  
**Next steps:** Request official OAuth documentation from ByteDance/Trae security team; if unavailable, consider Trae CN as unsupported for standard OAuth integration and rely on community relay with acceptance of reverse-engineered endpoints.
