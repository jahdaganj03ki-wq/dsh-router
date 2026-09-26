# Provider-Additions-Plan für dsh-router

## Ausgangslage
DeepResearch für 40+ Provider abgeschlossen. Reports liegen in `deep_research/*.md`. Provider-Gruppierung definiert in `provider_groups.md`.

Ziel: Provider-Module nach DSH-Plugin Architektur `modules/provider-*` mit `module.json`, `src/index.mjs`, `src/driver.mjs` ergänzen, gruppieren, Auth-Methoden, Free-Tier und DE-Workarounds berücksichtigen.

## 1. Priorisierung nach Nutzungswert Deutschland, keine Zahlung, deutsche Handynummer

### Gruppe A - FREE Forever, sofort modularisierbar
- Kiro AI, iFlow, Qwen, OpenCode Free, OpenRouter, NVIDIA NIM, Gemini, Cloudflare AI
  Auth: API Key / OAuth Device Code
  Free: dauerhaft, keine Kreditkarte
  DE: unproblematisch, EU Daten
  Aktion: Module generieren, Account-Pool + Quota-Tracking aktivieren

### Gruppe B - OAuth Subscription, mit Fallback
- Claude Code, Codex, GitHub Copilot, Cursor IDE, Kilo Code, Cline
  Auth: OAuth Authorization Code / Device Code
  Free: begrenzt oder Free Trial
  DE: meist EU verfügbar, teilweise SMS nötig
  Aktion: Module mit Device-Code-Flow, Token-Refresh, Rotation

### Gruppe C - API Key Cheap, pay-as-you-go
- GLM Coding, Kimi, MiniMax, OpenAI, Anthropic, DeepSeek, Groq, xAI Grok, Mistral, Azure OpenAI
  Auth: API Key Bearer
  Free: $5-$25 Startguthaben, Free Trials, keine dauerhafte Free
  DE: meist global, GDPR dokumentiert
  Aktion: Module mit API-Key Manager, Credit-Watcher, Auto-Rotation bei 429/402

### Gruppe D - Forschungs-Reports vorhanden, noch nicht gruppiert
- Trae, Trae CN, Freebuff, Devin IDE, MonkeyCode, Zcode, Verdent, Replicate, Fireworks AI, Together AI, Deepgram, Perplexity AI, Cohere, Vertex AI, HuggingFace
  Aktion: Klassifizieren in A-C, Auth-Methode ableiten, Workaround DE dokumentieren

## 2. Auth-Methoden Matrix

| Gruppe | Auth | Token Refresh | Beispiel |
|--------|------|---------------|----------|
| Free Forever | API Key / OAuth Device Code | ja/nein | OpenRouter Bearer |
| OAuth Subscription | OAuth Authorization Code + PKCE | ja | Claude Code |
| API Key Cheap | API Key Bearer | nein | OpenAI |

Für Device-Code-Flow: `modules/provider-*/src/driver.mjs` implementiert `startDeviceCode()`, `pollToken()`, `refreshToken()`.

## 3. Modul-Struktur pro Provider

```
implementation/modules/provider-<slug>/
  module.json
  src/
    index.mjs
    driver.mjs
  config/
    providers.yaml snippet
```

module.json Pflichtfelder:
- name, slug, group, authMethod, freeTier, requiresPayment, geoBlockedDE, workaroundDE, baseUrl, modelDiscovery, quotaTracking

## 4. 20-Tage komplett kostenlose Variante

Kombination:
Primär Pool: Kiro AI + OpenCode Free + Qwen + iFlow + Gemini Free + Deepgram $200 Credit
Sekundär: OpenRouter Free Models, Replicate $5 Credit, Cohere Trial 1000 Calls
Rotation: Account-Pool 5-8 Accounts/ Provider, automatische 429-Rotation, Quota-Tracking pro Account
VPN nur für China-only Dienste: Trae CN, Kimi Trial

## 5. Implementierungs-Schritte

1. Provider-Inventory aus `deep_research` + `provider_groups.md` konsolidieren → `implementation/providers_inventory.csv`
2. Für jeden Provider `module.json` aus Report generieren: Auth, Free Tier, DE Workaround
3. Driver-Gerüste erstellen: API Key → OpenAI-kompatibel, OAuth Device Code → PKCE Flow
4. Auto-Model-Discovery implementieren: `/v1/models` abrufen, in `providers.yaml` schreiben
5. Quota-Tracking: pro Account Tokens/min, Calls/Tag, Credit-Balance
6. Geo-Compliance: DE-Workaround Flags, VPN-Proxy Option in Driver
7. QA: Test-Plan `qa/test_plan.md` erweitern, DE-Mobile-Testmatrix
8. Docs: README_DE.md aktualisieren, Setup Schritt-für-Schritt

## 6. Nächste konkrete Deliverables

- `implementation/providers_inventory.csv` mit allen 40+ Providers, Spalten: slug, group, auth, freeTier, paymentRequired, geoBlockedDE, workaround, baseUrl, reportPath
- Provider-Module für Gruppe A komplett erstellen
- `providers.yaml` mit gefilterten Provider-Gruppen
- `workarounds/de_free_long_sessions_v2.md` aktualisiert mit neuen Erkenntnissen

## 7. Risiken

- Azure OpenAI, Vertex AI, Together AI erfordern Billing → für komplett kostenlose Variante ausschließen
- Perplexity API hat keine Free Tier → Web UI Fallback
- Trae CN geblockt → VPN Pflicht
- Rate-Limits bei Free Tiers → Rotation nötig

Ende Plan.
