# CFO — OKR

> Aggiornato ogni lunedì.

---

## Settimana 2026-W27 (29 Giu – 5 Lug)

### Obiettivo: Monitoraggio settimanale infrastruttura e baseline Herbalife

| Key Result | Target | Attuale | Status |
|---|---|---|---|
| Check HTTP siti Herbalife (herbashop.it, hl-distributor.com, hlifeclienteprivilegiato.it) | 200 su tutti | herbashop.it 200 ✅ / hl-distributor.com 301 ⚠️ / hlifeclienteprivilegiato.it 301 ⚠️ | ALERT — verifica manuale richiesta |
| Aggiornamento baseline costi/ricavi giugno 2026 completo da Google Sheet | Dati giugno definitivi | da verificare con Omar (no accesso Drive in headless) | DA VERIFICARE |
| Verifica scostamento Google Ads giugno vs maggio (soglia 10%) | <10% o alert emesso | da verificare con Omar — maggio ~€3.745, giugno parziale ~€2.702 (incompleto) | DA VERIFICARE |
| Conferma gap royalties 2026 chiarito con Omar | Risposta Omar | da verificare — correzione fatta in log 2026-06-27, ma richiesta formale pendente | DA VERIFICARE |

**Note W27:** Primo weekly check automatico post-onboarding. Due siti in 301 (ALERT per regola script, probabile redirect intenzionale — da verificare manualmente). Dati economici non aggiornabili in headless: richiedere sessione interattiva con Drive connector per chiudere giugno 2026.

---

## Settimana 2026-W26 (22–28 Giu)

### Obiettivo: Onboarding Herbalife completato, baseline reale costruita

| Key Result | Target | Attuale | Status |
|---|---|---|---|
| Risposte onboarding ricevute da Omar | 6/6 domande | 6/6 ✅ | DONE |
| Accesso Google Sheet "Guadagni Mese Herbalife" verificato | Lettura | ✅ Verificato via Drive connector | DONE |
| Baseline costi 2026 (gen-giu) documentata | Report | ✅ in `reports/herbalife.md` | DONE |
| Baseline profitto Omar/Emiliano 2026 documentata | Report | ✅ in `reports/herbalife.md` | DONE |
| Assegni/Royalties 2026 documentati (downline) | Report | ✅ trovati e documentati — nessun gap, erano in una sezione diversa del tab P&L 2026 | DONE |
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

**O1 — Baseline finanziaria consolidata**: costi/ricavi ecommerce 2026 documentati ✅, Assegni+Royalties downline 2026 documentati ✅ (YTD combinato ≈ €3.018)
**O2 — Controllo spesa Google Ads** (driver di costo principale, in crescita continua €800→€3.700/mese): alert 10% da automatizzare oltre il livello report
**O3 — P&L mensile ricorrente senza intervento di Omar**: oggi richiede sessione interattiva per leggere il Google Sheet (headless non ha accesso Drive)
