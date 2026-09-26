# Test‑Plan für dsh‑oauthproextended

## 1. Ziel
Verifizieren, dass alle Provider‑Module korrekt laden, Auth funktioniert und Free‑Tier‑Limits eingehalten werden.

## 2. Test‑Matrix

| Provider | Auth | Free‑Tier | DE‑Geo | Erwartetes Ergebnis |
|----------|------|-----------|--------|----------------------|
| kiro_ai | API Key | unlimited | offen | 200 OK |
| iflow | API Key | quota | offen | 200 OK |
| trae_cn | API Key | free | blocked | VPN‑Flag aktiv |
| vertex_ai | OAuth Service Account | $300 trial | offen | Billing‑Prompt |
| deepgram | API Key | $200 | offen | EU endpoint genutzt |

## 3. Automatisierte Tests
- `pnpm test:providers` – lädt alle module.json und prüft Pflichtfelder.
- `pnpm test:quota` – simuliert 429/402 und prüft Rotation.

## 4. Manuelle Tests
- Anbieter‑Login ohne Kreditkarte:
  - Kiro AI, OpenCode Free, Deepgram ($200) starten.
- VPN‑Test für Trae CN.
- EU‑Region‑Selektion für Vertex AI (`europe-west3`).

## 5. Erfolgskriterien
- Alle FREE Forever Provider laufen ohne Zahlung.
- 20‑Tage‑Variante funktioniert mit Account‑Pool.
- Kein Zahlungsdaten‑Store.

## 6. Wartung
Test‑Plan bei neuen Providern aktualisieren.
