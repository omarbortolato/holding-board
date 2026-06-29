# HOLDING — AI Board

> Documento master dell'intera struttura. Aggiornare ad ogni cambio di stato significativo.
> Dashboard live: https://herbago.info/dashboard

---

## Visione

Costruire un holding AI multi-progetto dove agenti C-level autonomi gestiscono un portfolio di business, condividono piattaforme e best practice, e scalano con un modello a microservizi.

**Principio chiave:** ogni progetto eredita l'infrastruttura comune. La piattaforma stessa — progressivamente ripulita dalla knowledge specifica — diventerà un prodotto vendibile (B2B SaaS).

---

## Struttura organizzativa

```
┌─────────────────────────────────────────────────────────────────┐
│                        AI HOLDING BOARD                         │
│                          (Omar — CEO)                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                   │                     │
   ┌────┴─────┐        ┌────┴─────┐         ┌────┴─────┐
   │ CMO (AI) │        │ CTO (AI) │         │ COO (AI) │
   └────┬─────┘        └────┬─────┘         └────┬─────┘
        │                   │                     │
   ┌────┴─────┐        ┌────┴─────┐         ┌────┴─────┐
   │ CFO (AI) │        │CISO (AI) │         │          │
   └──────────┘        └──────────┘         └──────────┘

              INTEGRATION BUS / DATA FLOW
   ┌───────────────────────────────────────────────┐
   │                                               │
   ▼               ▼                    ▼          ▼
┌──────────┐  ┌──────────┐      ┌──────────┐  ┌──────────┐
│HERBALIFE │  │ AI-TRIAGE│      │  DOCBIT  │  │ OTHER AI │
│          │  │          │      │ (coming) │  │ (future) │
│ Mktg Mgr │  │ Mktg Mgr │      │ Mktg Mgr │  │    ...   │
│ Tech Lead│  │ Tech Lead│      │ Tech Lead│  │          │
│ Ops      │  │ Ops      │      │ Ops      │  │          │
└──────────┘  └──────────┘      └──────────┘  └──────────┘

              PLATFORM CONDIVISA (CTO builds, C-suite governs)
   ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
   │ marketing/│ │ chatbot/  │ │analytics/ │ │ security/ │
   │  (CMO)    │ │  (CTO)    │ │(COO+CFO)  │ │  (CISO)   │
   └───────────┘ └───────────┘ └───────────┘ └───────────┘
```

---

## Board C-Level

| Ruolo | Status | Autonomia | Focus attuale |
|---|---|---|---|
| CMO | 🟢 ACTIVE | 🔴 SUPERVISED | Canale WhatsApp/OpenWA per clienti Cliente Privilegiato (in attesa review CISO) |
| CTO | 🟢 ACTIVE | 🔴 SUPERVISED | Architettura piattaforma herbago.info + valutazione tecnica OpenWA |
| COO | 🟢 ACTIVE | 🔴 SUPERVISED | Onboarding completato 2026-06-29: SLA v1 leggero fissato, scope/roadmap chiariti con Omar |
| CFO | 🟢 ACTIVE | 🟡 DELEGATED (parziale) — onboarding completato 2026-06-27 | Weekly check automatico Herbalife |
| CISO | 🟢 ACTIVE | 🟡 DELEGATED — onboarding completato 2026-06-26 | Security review OpenWA/GDPR per canale WhatsApp |

### Livelli di autonomia
| Livello | Simbolo | Significato |
|---|---|---|
| SUPERVISED | 🔴 | Ogni azione richiede approvazione Omar |
| DELEGATED | 🟡 | Autonomia nei confini definiti, alert per eccezioni |
| AUTONOMOUS | 🟢 | Opera indipendentemente, report dei risultati |

---

## Progetti

| Progetto | Path | Status | Priorità | Board owner |
|---|---|---|---|---|
| Herbalife | `/root/herbalife` | 🟢 ACTIVE | 🔥 HIGH | Tutti |
| ai-triage | `/root/ai-triage` | 🟡 MVP | 🔵 LOW | CTO |
| AI Friday | `/root/ai-friday` | 🟢 ACTIVE | 📅 MEDIUM | CTO |
| Omar Website | `/root/omar-website` | 🟢 ACTIVE | 📅 MEDIUM | CTO |
| Docbit | — | 🔵 PLANNED | — | — |

---

## Piattaforma condivisa

| Servizio | Path | Owner | Status | Progetti |
|---|---|---|---|---|
| marketing-engine | `platform/marketing/` | CMO + CTO | 🔵 PLANNED | herbalife, future |
| chatbot-base | `platform/chatbot/` | CTO | 🟡 PARZIALE | herbalife |
| analytics | `platform/analytics/` | COO + CFO | 🔵 PLANNED | tutti |
| security | `platform/security/` | CISO + CTO | 🔵 PLANNED | tutti |

---

## Settimana corrente

**Settimana:** 2026-W26 (22–26 Giu 2026)

**Priorità holding:** Focus totale su Herbalife — chatbot agents in PRD (fine-tuning continuo), strategia piattaforma herbago.info come hub centrale multi-progetto

**Budget infra:** tetto autonomo €100/mese (Hetzner + Claude API) — superarlo richiede discussione preventiva con Omar (deciso 2026-06-26)

**Obiettivi board:**
- [x] CTO: agent-ecommerce in PRD, fine-tuning continuo (non più "da chiudere")
- [ ] CTO: Bozza architettura piattaforma herbago.info multi-progetto — sessione con Opus
- [ ] CTO: Programma test suite/CI-CD da proporre a Michele (Senior Architect) ed Emiliano — non priorità Q3
- [ ] CMO: Definire marketing calendar Q3 Herbalife
- [ ] COO: Documentare processi operativi esistenti Herbalife
- [ ] CFO: Prima P&L Herbalife AI platform

---

## Regole globali (ereditate da tutti i progetti)

### Comunicazione agenti
- Tono: conversazionale, mai FAQ, mai header, max 3-5 frasi per risposta, max 2 emoji
- Mai insistere su CTA più di una volta per turno
- Rispettare sempre i tempi dell'utente

### Sicurezza
- Credenziali solo in `.env` (mai in codice)
- Secrets solo in cartella `secrets/` (gitignored)
- Review CISO prima di ogni deploy in produzione

### Escalation
- Alert immediato su Slack se KPI critico sotto soglia
- Alert email se risposta non ricevuta entro 24h
- Blocco automatico se azione a rischio alto senza approvazione

### Onboarding nuovo progetto
1. Creare `projects/[nome].md` da `_template.md`
2. Copiare struttura base da progetto esistente
3. Onboarding CMO (ton of voice, obiettivi marketing)
4. Onboarding CTO (stack, integrazioni, porte)
5. Onboarding CISO (surface di rischio)
6. Kick-off COO (processi operativi)
7. Setup CFO (budget, KPI finanziari)

---

## Changelog

| Data | Autore | Modifica |
|---|---|---|
| 2026-06-29 | Omar + Claude | Onboarding COO completato: SLA operativi v1 (leggeri, non vincolanti), scope chiarito (COO presidia processi/SLA/QA/incident, non la piattaforma), roadmap futura per drafting assistito email di supporto (invio sempre umano) |
| 2026-06-26 | Omar + Claude | Priorità Herbalife chiarite: chatbot agents già maturi e live, agent-ecommerce non più "da chiudere"; tetto budget €100/mese; deploy authority su fix minori; test/CI-CD rimandati oltre Q3, da discutere con Michele ed Emiliano; strategia piattaforma herbago.info da definire con Opus |
| 2026-06-06 | Omar + Claude | Setup iniziale struttura holding |
