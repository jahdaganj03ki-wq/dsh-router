# Installation dsh-router

## Voraussetzungen
- Node.js 18+
- DSH Desktop Plugin Manager
- Git

## Installation
```bash
git clone https://github.com/jahdaganj03ki-wq/dsh-router.git
cd dsh-router
pnpm install
cp .env.example .env
# API Keys in .env eintragen
pnpm run setup
```

## Nutzung
Plugin im DSH Plugin Manager laden:
`dsh-plugin.json` wird automatisch erkannt.

Provider aktivieren via `implementation/providers.yaml`.
Quota-Tracking und Account-Pool sind in `implementation/src/` aktiviert.

## Erste Schritte
1. `node implementation/bin/setup.mjs FREE_Forever` → `.env.example` erzeugen
2. Keys eintragen
3. DSH neu starten
