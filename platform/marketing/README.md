# Platform — Marketing Engine

**Owner:** CMO + CTO
**Status:** 🔵 PLANNED

---

## Scopo

Piattaforma marketing condivisa tra tutti i progetti della holding.
Ogni progetto la usa con la propria configurazione (brand, tone, target, canali).
La piattaforma stessa è il prodotto vendibile B2B del futuro.

---

## Componenti pianificati

| Componente | Owner | Status | Nota |
|---|---|---|---|
| SEO agent | CMO | 🔵 PLANNED | Ricerca keyword, ottimizzazione on-page |
| Content writer | CMO | 🔵 PLANNED | Blog, landing page, product descriptions |
| Email manager | CMO | 🔵 PLANNED | Brevo + Mautic, automation, newsletter |
| Social media | CMO | 🔵 PLANNED | Scheduling, caption generation |
| Ads optimizer | CMO + CFO | 🔵 PLANNED | Google Ads, budget optimization |
| Scraper notizie | CTO | 🔵 PLANNED | Feed RSS, competitor monitoring |
| Analytics reporter | COO + CFO | 🔵 PLANNED | Report periodici marketing KPI |

---

## Struttura cartelle (target)

```
platform/marketing/
├── brand/          — brand guidelines per ogni progetto
├── email/          — template email standard
├── seo/            — keyword strategy, content brief template
├── calendar/       — content calendar template
├── agents/         — codice agenti marketing
└── config/         — configurazione per progetto
    ├── herbalife.yaml
    ├── ai-triage.yaml
    └── _template.yaml
```

---

## Onboarding nuovo progetto (target)

1. Compilare `config/[progetto].yaml` (brand, tone, target audience, canali attivi)
2. Caricare brand guidelines in `brand/[progetto]/`
3. CMO review e approvazione
4. Agenti configurati automaticamente per il nuovo progetto

---

## Prerequisiti per iniziare sviluppo

- [ ] Baseline KPI marketing Herbalife documentata (COO)
- [ ] Budget marketing allocato (CFO)
- [ ] Tone of voice Herbalife approvato (CMO + Omar)
- [ ] Account Google Ads accessibile (CTO)
