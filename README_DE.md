# dsh‑router – Deutsche Setup‑Anleitung

## 1. Ziel
Kostenloses 20‑Tage‑Coding über 9Router/OmniRoute mit deutschen Handynummern, ohne Zahlungsmittel.

## 2. Voraussetzungen
- Git
- Node.js 18+
- DSH‑Plugin‑Manager
- E‑Mail‑Account (keine Kreditkarte nötig)

## 3. Installation
```bash
git clone <repo>
cd dsh-router
pnpm install
pnpm build
```

## 4. Provider‑Gruppen
- **FREE Forever** – kiro_ai, iflow, qwen, opencode_free, openrouter, nvidia_nim, gemini_free, cloudflare_ai
- **OAuth Subscription** – claude_code, codex, github_copilot, cursor_ide, kilo_code, cline
- **API‑Key Cheap** – glm_coding, kimi, minimax, openai, anthropic, deepseek, groq, xai_grok, mistral, azure_openai
- **Erweiterte Reports** – trae, trae_cn, freebuff, devin_ide, monkeycode, zcode, verdent, replicate, fireworks_ai, together_ai, deepgram, perplexity_ai, cohere, vertex_ai, huggingface

## 5. Einrichtung ohne Zahlung
1. `implementation/providers.yaml` öffnen und gewünschte Gruppe aktivieren.
2. Für FREE Forever Provider API‑Keys über deren Gratis‑Anmeldung erstellen (keine Kreditkarte).
3. Für Trae CN VPN aktivieren (DE‑IP geblockt).
4. Quota‑Tracking aktivieren (siehe `src/quota_tracker.mjs`).

## 6. DE‑Workarounds
- **Trae CN** – VPN‑Flag `vpnRequired: true` im Driver. Nutzung nur mit China‑Exit‑IP.
- **Vertex AI** – EU‑Region `europe-west3` wählen, Billing nötig, daher nur mit $300 Trial nutzen.
- **Deepgram** – EU‑Endpoint `api.eu.deepgram.com` für GDPR‑Compliance.

## 7. 20‑Tage‑Variante
Kombiniere Kiro AI + OpenCode Free + Qwen + iFlow + Deepgram $200 Credit. Rotation bei Erreichen von Limits über Account‑Pool.

## 8. Sicherheit
Keine Zahlungsdaten speichern. API‑Keys in `.env` ablegen, niemals committen.

Weitere Details siehe `qa/test_plan.md`.
