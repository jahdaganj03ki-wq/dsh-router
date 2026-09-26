# Deutschland-freie Workarounds & Langzeit-Coding Variante

## Prinzip
Alle Provider ohne Bezahlung, nur deutsche Handynummer, rein Free-Tier.

## Provider-spezifische Lösungen

### Trae CN
**Problem:** trae.cn Domain geo-blocked in DE, benötigt VPN.
**Workaround:** 
- VPN mit Exit in Hongkong/Singapur für Registration/Login.
- Danach kann Cloud-IDE-JWT auch über VPN genutzt werden.
- Alternative: Trae International trae.ai nutzen, kein VPN nötig, Deutschland unterstützt.

### Kimi / Moonshot
**Problem:** Free Trial erfordert mainland China Mobile, Bezahlung Alipay/WeChat.
**Workaround:**
- Nutze API-Key Variante ohne Trial, Kimi Code CLI Device Code Flow ist öffentlich.
- VPN zu Singapore für Registrierung, Nutzung der offenen API mit Free Tier 15 RMB Gutschrift via Geschenkcode aus Community.

### DeepSeek Chat API
**Problem:** Keine OAuth, API-Key Bezahlung.
**Workaround:**
- Web Chat Free Tier nutzen, kein Payment nötig.
- Für API: nutze 9Router/OmniRoute Free Tier Routing zu DeepSeek Modellen.

### Zcode / Z.ai
**Problem:** 5-Tage Trial, danach Bezahlung.
**Workaround:**
- Nutze ZCode Free Trial alle 20 Tage mit neuem Account via GitHub OAuth.
- Rotation über mehrere GitHub Accounts, nur Email nötig.

### Freebuff
**Problem:** Geo-abhängig, US Cloud.
**Workaround:**
- VPN zu US für Registration.
- 100 Freebucks/Tag reicht für kurze Sessions, für 20 Tage: Account Rotation alle 7 Tage.

### Verdent
**Problem:** Kein OAuth Provider, BYOK.
**Workaround:**
- Nutze Verdent Free Mode + 100 Credits Trial, danach auf Free Mode ohne Bezahlung.
- Modelzugriff über eigene Free Keys aus anderen Providern.

### MonkeyCode
**Problem:** China Hosting, kein GDPR.
**Workaround:**
- Selbst-Hosting Version nutzen, komplett lokal, keine Registrierung nötig.
- Free Tier 5.000 Punkte reichen für ~2-3 Tage Coding.

### Devin IDE
**Problem:** Keine OAuth, API Key.
**Workaround:**
- Nutze Free Tier $0 über app.devin.ai, keine Zahlungsmittel nötig.
- OAuth-light via Partner Outposts für lokale Nutzung.

### Cline
**Problem:** Kein Device Code Flow.
**Workaround:**
- Autorization Code via WorkOS, nutze Browser-Login mit deutscher Handynummer nicht nötig.
- Free Modelle nutzen.

### Qoder / Qoder IDE
**Problem:** Unklar.
**Workaround:**
- Nutze Community Relay mit VPN.

## Komplett kostenlose Langzeit-Variante 20 Tage/Monat

Kombination:
- Primär: 9Router Free Tier Pooler: Kiro + OpenCode Free + Qwen + iFlow = ~1.6B Tokens/Monat
- Sekundär: Trae International Free Tier + Gemini API Free Tier
- Tertiär: DeepSeek Web Chat als Fallback

Rotation Strategie:
- Account Pool mit 5-8 kostenlosen Accounts pro Provider
- Automatische 429-Rotation und Token-Refresh
- Quota-Tracking pro Account
- VPN nur für China-only Services, Exit DE für EU Services

Damit sind 20 Tage Coding ohne Bezahlung realistisch.

## Implementierung
- `implementation/free_long_sessions.yaml` mit Provider-Rotation
- `modules/provider-...` erweiterte Driver mit VPN-Proxy-Unterstützung
- `geo/de_compliance.md` Workarounds dokumentiert
