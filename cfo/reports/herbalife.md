# Finance Lead — Herbalife

**Riporta a:** board/cfo (budget framework, metodo P&L)
**Riporta anche su:** salute finanziaria specifica del progetto Herbalife
**Status onboarding:** 🟢 COMPLETATO — risposte di Omar ricevute ed elaborate (2026-06-27)

---

## Fonte dati primaria

📊 [Google Sheet "Guadagni Mese Herbalife"](https://docs.google.com/spreadsheets/d/1EOR4_yYIe7f1AODF-Spv-3Z2f1BHhBSW4JcsyRmMT_A) — accesso in lettura verificato. Tre tab utili:
- **Ordini** — storico ordini ecommerce dal 2017 (granulare, riga per riga)
- **Spese** — spese per categoria/country/owner dal 2024, mese per mese
- **Tabella Owner × Mese** (dentro lo stesso file, vicino al tab P&L) — Incasso Netto, Costo, Assegni, Royalties, Spese, Resi, Net Profit per Omar ed Emiliano, mese per mese
- **Tab "P&L 2026"** — quello che Omar definisce "poco strutturato e più grafico": in realtà sembra tracciare rate/credit da pagare, non il P&L vero e proprio. **Non è la fonte delle royalties.**

**Nota importante:** non serve un nuovo sheet per ora — la tabella Owner × Mese è già strutturata e sufficiente per costruire la baseline. Il problema reale è che **la riga "Assegni" (royalties Cliente Privilegiato + Distributori) è a €0,00 per tutti i mesi 2026**, mentre nel 2024-2025 aveva valori reali (~€700-1.900/mese). Sembra che l'inserimento manuale di questo dato si sia interrotto a fine 2025 — da verificare con Omar se le royalties sono ancora incassate ma non più loggate, o se il programma è cambiato.

---

## Risposte di Omar (2026-06-27)

**1. Costi mensili attuali**
- Hetzner: max €15/mese (non tracciato nello sheet)
- Claude API: abbonamento Pro personale $20/mese (non tracciato nello sheet, condiviso su più progetti non solo Herbalife)
- Tutto il resto (Brevo, Mautic, hosting siti, Google Ads, domini, eventi) → tracciato nel tab **Spese** dello sheet, vedi baseline sotto

**2. Ricavi attuali**
- Ecommerce: tracciato per owner (Omar/Emiliano) nel tab Owner × Mese
- Royalties Cliente Privilegiato/Distributori: tracciate storicamente (tab "Assegni"), ma **non aggiornate per il 2026** — gap da chiudere con Omar

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

Le forti oscillazioni tra Omar ed Emiliano singolarmente sono dovute a timing di registrazione costi/ricavi per owner — coerente con la riconciliazione 50/50 trimestrale già in atto. **Il combinato mensile è sano e stabilmente positivo (€5.000-7.700/mese)**, a conferma che il business Herbalife è già profittevole come segnalato da Omar.

---

## Priorità immediata

1. **Chiudere il gap royalties 2026** — verificare con Omar se le Assegni Cliente Privilegiato/Distributori sono ancora incassate e dove tracciarle (resume nello sheet esistente o nuova tabella semplificata, come proposto da Omar)
2. **Monitorare Google Ads come unico vero rischio di scostamento spesa** — è la sola voce in crescita rapida e variabile, tutto il resto è stabile
3. **Costruire alert automatico al 10%** sul totale spese mensili tracciate (vedi `cfo/AGENT.md` → Alert triggers)

---

## OKR specifici progetto

**O1 — Baseline finanziaria Herbalife consolidata**
- KR1: ✅ Costi infrastruttura/marketing 2026 documentati mese per mese (Spese tab)
- KR2: ✅ Profitto netto Omar/Emiliano 2026 documentato mese per mese (Owner × Mese)
- KR3: 🔵 Gap royalties 2026 chiuso con Omar (dato mancante o da ri-loggare)

**O2 — Controllo spesa Google Ads (driver principale di costo)**
- KR1: Alert automatico configurato su scostamento >10% mese su mese
- KR2: ROAS calcolato per country (richiede dato revenue attribuibile, coordinarsi con CMO)

**O3 — P&L mensile ricorrente senza intervento di Omar**
- KR1: Lettura automatica mensile del Google Sheet (oggi fatta on-demand via Drive connector)
- KR2: Storico 3 mesi di baseline senza correzioni materiali (criterio per passare a DELEGATED)
