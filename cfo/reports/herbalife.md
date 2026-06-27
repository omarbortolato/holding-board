# Finance Lead — Herbalife

**Riporta a:** board/cfo (budget framework, metodo P&L)
**Riporta anche su:** salute finanziaria specifica del progetto Herbalife
**Status onboarding:** 🟢 COMPLETATO — risposte di Omar ricevute ed elaborate (2026-06-27)

---

## Fonte dati primaria

📊 [Google Sheet "Guadagni Mese Herbalife"](https://docs.google.com/spreadsheets/d/1EOR4_yYIe7f1AODF-Spv-3Z2f1BHhBSW4JcsyRmMT_A) — accesso in lettura verificato. Tab/sezioni utili:
- **Ordini** — storico ordini ecommerce dal 2017 (granulare, riga per riga)
- **Spese** — spese per categoria/country/owner dal 2024, mese per mese
- **Tabella Owner × Mese "Ordini Diretti"** — Incasso Netto, Costo, Spese, Net Profit per Omar ed Emiliano sulla linea ecommerce diretta, mese per mese
- **Tab "P&L 2026"** (sezione Assegni/Royalties, righe ~303-308) — traccia i due flussi di reddito passivo della linea **Downline/Distributori**: vedi sotto

**Meccanica Assegni vs Royalties (spiegata da Omar 2026-06-27):**
- **Assegni** = percentuale (5% nel piano di Omar) sul volume delle prime linee di distributori, fino alla 3ª linea
- **Royalties** = percentuale (2%) sul volume totale dell'intera organizzazione, pagata quando i distributori in downline diventano Supervisori
- I **Clienti Privilegiati non generano royalties direttamente** — il loro acquisto contribuisce al volume in punti che genera l'Assegno al distributore upline (Omar/Emiliano)
- Quindi Assegni e Royalties sono entrambi attribuibili alla linea **Downline/Distributori**, con Cliente Privilegiato come alimentatore di volume

**Dati reali 2026 (dalla sezione Assegni/Royalties del tab P&L 2026):**

| | feb | mar | apr | mag | giu | YTD |
|---|---|---|---|---|---|---|
| Assegni Omar | €441,55 | €328,10 | €543,56 | €359,03 | €414,20 | **€2.086,44** |
| Assegni Emiliano | €20,55 | €0,00 | €97,77 | €127,53 | €171,62 | **€417,47** |
| Royalties Omar | — | — | €211,43 | €143,62 | €159,63 | **€514,68** |
| Royalties Emiliano | — | — | — | — | — | **€0,00** |

Royalties e Assegni **sono attivi e tracciati per il 2026** — non c'è nessun gap di dati (correzione rispetto alla prima lettura di questo report: avevo inizialmente guardato solo la tabella "Ordini Diretti", dove questi valori sono effettivamente a zero perché quella tabella copre solo l'ecommerce diretto, non la downline).

---

## Risposte di Omar (2026-06-27)

**1. Costi mensili attuali**
- Hetzner: max €15/mese (non tracciato nello sheet)
- Claude API: abbonamento Pro personale $20/mese (non tracciato nello sheet, condiviso su più progetti non solo Herbalife)
- Tutto il resto (Brevo, Mautic, hosting siti, Google Ads, domini, eventi) → tracciato nel tab **Spese** dello sheet, vedi baseline sotto

**2. Ricavi attuali**
- Ecommerce diretto: tracciato per owner (Omar/Emiliano) nella tabella "Ordini Diretti"
- Assegni (5% prime linee) + Royalties (2% volume organizzazione): tracciati nella sezione dedicata del tab "P&L 2026" — combinato Omar+Emiliano YTD 2026 ≈ €3.018 (vedi baseline sotto)

**3. Divisione Omar/Emiliano**
50/50 completo su costi e ricavi, riconciliazione precisa ogni trimestre.

**4. Budget investimenti AI**
Nessun budget fisso definito. Approccio bootstrap: costi bassi e incrementali, la piattaforma deve generare valore/revenue da subito per autofinanziarsi, in vista di un'eventuale estrazione del prodotto core.

**5. Soglia di allerta spesa**
**10% di scostamento mensile** su categorie senza costi extra pianificati → alert immediato a Omar.

**6. Obiettivo P&L**
Profit su ogni business (Herbalife già profittevole oggi). La piattaforma AI non ha obiettivo di margine separato nel breve — è abilitante per il business sottostante. Visione a lungo termine: estrarre i tool che funzionano (gestione clienti, content marketing automation, ecc.) e valutare un marketplace/prodotto B2B — ma è un obiettivo secondario rispetto a scalare Herbalife in modo esponenziale riducendo l'intervento operativo di Omar.

---

## Baseline costi 2026 (da tab Spese, esclusi Hetzner/Claude Pro personali)

| Mese | Totale spese tracciate | Driver principale |
|---|---|---|
| 01/2026 | ~€1.780 | Google Ads (~€1.608) |
| 02/2026 | ~€2.955 | Google Ads (~€2.337) + Italian Summit (eventi) |
| 03/2026 | ~€2.732 | Google Ads (~€2.523) |
| 04/2026 | ~€3.461 | Google Ads (~€3.297) |
| 05/2026 | ~€3.807 | Google Ads (~€3.745) |
| 06/2026 (parziale) | ~€2.764 | Google Ads (~€2.702) |

**Driver dominante: Google Ads, in crescita costante (€800/mese → €3.700/mese) — coerente con la fase di scaling delle campagne segnalata dal CMO.** Tutti gli altri costi ricorrenti (hosting, Brevo, Iubenda, domini) sono stabili e marginali: ~€60-80/mese in totale.

**Costi extra non nello sheet, da aggiungere alla baseline:** Hetzner €15/mese + Claude Pro ~€18-19/mese ≈ **+€33/mese**.

## Baseline ricavi/profitto 2026 (da tabella Owner × Mese)

| Mese | Net Profit Omar | Net Profit Emiliano | Combinato |
|---|---|---|---|
| 04/2026 | €17.869,61 | -€10.174,75 | €7.694,86 |
| 05/2026 | -€921,75 | €7.700,75 | €6.779,00 |
| 06/2026 (parziale) | -€380,76 | €5.541,27 | €5.160,51 |

Le forti oscillazioni tra Omar ed Emiliano singolarmente sono dovute a timing di registrazione costi/ricavi per owner — coerente con la riconciliazione 50/50 trimestrale già in atto. **Il combinato mensile è sano e stabilmente positivo (€5.000-7.700/mese)**, a conferma che il business Herbalife è già profittevole come segnalato da Omar. Questi numeri sono solo la linea **ecommerce diretto**; Assegni e Royalties (downline, vedi sopra) sono un flusso aggiuntivo (~€500-700/mese combinato negli ultimi mesi tracciati).

---

## Priorità immediata

1. **Eventuale dettaglio maggiore su Assegni/Royalties** — Omar ha offerto di costruire più granularità (es. separare per linea, per country) se utile per monitorare meglio; da valutare insieme quando serve, non bloccante ora
2. **Monitorare Google Ads come unico vero rischio di scostamento spesa** — è la sola voce in crescita rapida e variabile, tutto il resto (incluse Assegni/Royalties downline) è stabile
3. **Costruire alert automatico al 10%** sul totale spese mensili tracciate (vedi `cfo/AGENT.md` → Alert triggers)

---

## OKR specifici progetto

**O1 — Baseline finanziaria Herbalife consolidata**
- KR1: ✅ Costi infrastruttura/marketing 2026 documentati mese per mese (tab Spese)
- KR2: ✅ Profitto netto ecommerce diretto Omar/Emiliano 2026 documentato mese per mese (tabella Ordini Diretti)
- KR3: ✅ Assegni (5% prime linee) + Royalties (2% volume organizzazione) 2026 documentati (tab P&L 2026, sezione dedicata) — YTD combinato ≈ €3.018

**O2 — Controllo spesa Google Ads (driver principale di costo)**
- KR1: Alert automatico configurato su scostamento >10% mese su mese
- KR2: ROAS calcolato per country (richiede dato revenue attribuibile, coordinarsi con CMO)

**O3 — P&L mensile ricorrente senza intervento di Omar**
- KR1: Lettura automatica mensile del Google Sheet (oggi fatta on-demand via Drive connector)
- KR2: Storico 3 mesi di baseline senza correzioni materiali (criterio per passare a DELEGATED)
