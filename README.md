 # Board — C-Level AI Agents

> Questo è il livello di governance dell'intera holding.
> Ogni agente C-level ha scope trasversale su tutti i progetti.

---

## Come funziona il board

### Ritual settimanale
1. **Lunedì mattina** — Omar definisce le priorità della settimana in `HOLDING.md`
2. **Lunedì** — Ogni agente C-level legge le priorità e aggiorna il proprio `okr.md`
3. **Durante la settimana** — Gli agenti lavorano in autonomia, si coordinano tra loro
4. **Quando bloccati** — Alert su Slack/email con richiesta specifica (info, accesso, approvazione)
5. **Venerdì** — Report settimanale da ogni agente su `log.md`

### Modello di comunicazione inter-agente
Gli agenti comunicano tramite:
- File condivisi in `board/[agente]/log.md` (asincrono)
- Slack (alert urgenti)
- Email (report periodici)

### Gerarchia decisionale
```
Omar (owner)
    └── CEO (strategia, approvazioni finali)
        ├── CMO (marketing, contenuti, brand)
        ├── CTO (tech, piattaforma, infrastruttura)
        ├── COO (operations, qualità, processi)
        ├── CFO (budget, P&L, ROI)
        └── CISO (security, compliance, privacy)
```

### Regole di escalation
- **Ogni agente può**: leggere file, analizzare dati, produrre report, draft contenuti
- **Richiede approvazione 🔴**: deploy, spese, comunicazioni esterne, modifiche architetturali
- **Blocca sempre**: azioni irreversibili senza conferma esplicita di Omar

---

## Struttura file per ogni agente

```
board/[ruolo]/
├── AGENT.md          — definizione ruolo, responsabilità, tools (livello holding)
├── okr.md            — obiettivi e key results holding (aggiornato settimanalmente)
├── log.md            — decision log, alert inviati, report (append-only)
└── reports/
    ├── herbalife.md  — diretto riporto specifico di progetto
    ├── ai-triage.md  — (da creare quando ai-triage torna prioritario)
    └── [progetto].md — uno per ogni progetto attivo
```

### Il livello "diretto riporto"

Ogni C-level ha un **diretto riporto per progetto** (es. CMO → Marketing Manager Herbalife).
Questo agente:
- Eredita best practice, tono e regole globali dal C-level holding
- Ha scope, obiettivi e vincoli **specifici del progetto**
- Viene onboardato con un documento `reports/[progetto].md` che contiene: cosa è già noto, cosa manca, domande aperte per Omar, OKR di progetto
- Una volta onboardato, lavora sugli obiettivi di quel progetto riportando comunque al C-level per allineamento strategico

---

## Agenti

| Cartella | Ruolo | Status |
|---|---|---|
| `ceo/` | Chief Executive Officer | 🔵 PLANNED |
| `cmo/` | Chief Marketing Officer | 🔵 PLANNED |
| `cto/` | Chief Technology Officer | 🟡 IN PROGRESS |
| `coo/` | Chief Operating Officer | 🔵 PLANNED |
| `cfo/` | Chief Financial Officer | 🔵 PLANNED |
| `ciso/` | Chief Information Security Officer | 🔵 PLANNED |
