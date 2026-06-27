# CFO — OKR

> Aggiornato ogni lunedì.

---

## Settimana 2026-W26 (22–28 Giu)

### Obiettivo: Onboarding Herbalife completato, baseline reale costruita

| Key Result | Target | Attuale | Status |
|---|---|---|---|
| Risposte onboarding ricevute da Omar | 6/6 domande | 6/6 ✅ | DONE |
| Accesso Google Sheet "Guadagni Mese Herbalife" verificato | Lettura | ✅ Verificato via Drive connector | DONE |
| Baseline costi 2026 (gen-giu) documentata | Report | ✅ in `reports/herbalife.md` | DONE |
| Baseline profitto Omar/Emiliano 2026 documentata | Report | ✅ in `reports/herbalife.md` | DONE |
| Gap royalties 2026 (Assegni a €0) segnalato a Omar | Flag | ✅ segnalato, risposta pending | IN PROGRESS |
| Weekly check automatico attivato (cron lunedì) | Script attivo | ✅ `weekly-check.sh` | DONE |

---

## Settimana 2026-W23 (02–06 Giu)

### Obiettivo: Prima fotografia finanziaria della holding

| Key Result | Target | Attuale | Status |
|---|---|---|---|
| Inventario costi infrastruttura mensili | Report | ✅ Fatto (vedi W26) | DONE |
| Struttura budget holding definita | Documento | ✅ Fatto per Herbalife, holding-wide ancora da fare | PARTIAL |

---

## OKR Mensile — Giugno 2026

**O1: Prima P&L Herbalife AI Platform**
- KR1: ✅ Costi infrastruttura/marketing documentati (Google Ads, hosting, Brevo, Iubenda — da Sheet reale, non stimati)
- KR2: ✅ Ricavi/profitto netto Omar+Emiliano documentati mese per mese (gen-giu 2026)
- KR3: 🔵 ROI per agente AI — non ancora calcolabile, manca attribuzione costo/valore per singolo agente (da coordinare con CTO su costi LLM per agente)

**O2: Framework budget holding**
- KR1: 🟡 Budget Herbalife: filosofia bootstrap confermata da Omar (nessun tetto fisso, autofinanziamento via revenue incrementale) — non un "budget per categoria" classico
- KR2: ✅ Budget alert configurato: soglia 10% scostamento mensile (confermata da Omar), check automatico settimanale via cron

---

## OKR specifici Herbalife (da `reports/herbalife.md`)

**O1 — Baseline finanziaria consolidata**: costi/ricavi 2026 documentati ✅, gap royalties da chiudere 🔵
**O2 — Controllo spesa Google Ads** (driver di costo principale, in crescita continua €800→€3.700/mese): alert 10% da automatizzare oltre il livello report
**O3 — P&L mensile ricorrente senza intervento di Omar**: oggi richiede sessione interattiva per leggere il Google Sheet (headless non ha accesso Drive)
