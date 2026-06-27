# CFO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.

---

## 2026-06-27 | CORREZIONE | Gap royalties era un errore di lettura, non un dato mancante
**Cosa è successo:** nella entry precedente di oggi avevo segnalato "Assegni a €0,00 per tutto il 2026" come gap dati. Era un errore: avevo letto solo la tabella "Ordini Diretti" (ecommerce), dove quella riga non si applica. Omar mi ha indicato la sezione corretta del tab "P&L 2026" (righe ~303-308).

**Dato corretto:** Assegni (5% prime linee, fino alla 3ª) e Royalties (2% volume totale organizzazione, da distributori diventati Supervisori) sono entrambi attivi e tracciati per il 2026. YTD (feb-giu) Omar+Emiliano: Assegni €2.503,91 combinato, Royalties €514,68 (solo Omar). Cliente Privilegiato non genera royalties diretti — alimenta il volume in punti che genera l'Assegno al distributore upline.

**Lezione:** il Google Sheet ha più tabelle parallele per linea di business (Ordini Diretti vs Downline) con la stessa etichettatura di colonna — verificare sempre quale tabella si sta leggendo prima di concludere che un dato è a zero/mancante.

**Azioni:** corretti `reports/herbalife.md`, `okr.md`, memoria di sistema. Nessun problema reale da segnalare a Omar su questo fronte — chiusa la KR3 di O1.

---

## 2026-06-27 | NOTE | Onboarding Herbalife completato — passaggio a DELEGATED parziale
**Status:** 🟡 DELEGATED (parziale) — onboarding completato, baseline reale costruita da Google Sheet "Guadagni Mese Herbalife" (accesso lettura verificato via Drive connector).

**Risposte di Omar (sintesi):** Hetzner ~€15/mese, Claude Pro $20/mese (personali, fuori sheet); resto dei costi/ricavi tracciato nello sheet; divisione Omar/Emiliano 50/50 con riconciliazione trimestrale; nessun budget AI fisso (bootstrap, autofinanziamento); soglia alert 10% scostamento mensile; obiettivo P&L = profit su ogni business (Herbalife già profittevole), piattaforma AI secondaria.

**Baseline costruita:**
- Costi 2026 (tab Spese): da ~€1.780/mese (gen) a ~€3.800/mese (mag), driver quasi esclusivo = Google Ads in crescita continua
- Profitto netto combinato Omar+Emiliano 2026: stabilmente positivo, €5.000-7.700/mese (apr-giu)
- **Gap identificato:** riga "Assegni" (royalties Cliente Privilegiato/Distributori) a €0,00 per tutto il 2026 nello sheet, mentre 2024-2025 aveva valori reali (~€700-1.900/mese/owner) — sembra che il logging si sia interrotto, non necessariamente l'incasso. Da verificare con Omar.

**Azioni:** report `reports/herbalife.md` riscritto con baseline completa; `AGENT.md` aggiornato con tabella budget reale e livello autonomia; `okr.md` aggiornato; attivato `weekly-check.sh` su cron (lunedì) per check automatico + promemoria aggiornamento dati (l'accesso al Google Sheet richiede sessione interattiva, non disponibile in headless).

**REQUEST per Omar:** confermare se le royalties Cliente Privilegiato/Distributori 2026 sono ancora incassate e dove tracciarle (riprendere la colonna Assegni esistente o nuova tabella semplificata come proposto).

---

## 2026-06-06 | NOTE | Attivazione ruolo
**Status:** SUPERVISED — prima priorità: costruire fotografia finanziaria baseline.
**REQUEST per Omar:** Condividere accesso a: costi Hetzner, fatture Claude API, piano Brevo attuale, spesa mensile Google Ads Herbalife.
