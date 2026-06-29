# CMO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.
> Tipi: DECISION | ALERT | REPORT | REQUEST | NOTE

---

## 2026-06-29 | DECISION | Omar confirma WhatsApp/OpenWA per clienti Cliente Privilegiato (scope esterno)
**Contesto:** segue il meeting CMO↔CTO sotto. Omar ha confermato direttamente al CTO che vuole usare OpenWA anche per comunicare con clienti/distributori (oggi gestito a mano via WhatsApp personale, "alto tasso di risposta e fidelity"), non solo per notifiche interne. Si assume personalmente il rischio operativo di ban account (basso traffico, no invii massivi). Unica condizione posta: numero dedicato, non più il suo personale.
**Impatto per il CMO:** chiude (in attesa di sblocco tecnico) la voce "Email + WhatsApp (da fare)" del programma Cliente Privilegiato in herbalife.md — quando CISO darà il via libera e il numero sarà pronto, va pianificato con il CTO il flusso contenuti/messaggi 1:1.
**Bloccante prima del go-live:** numero dedicato + review CISO su custodia credenziali/GDPR (richiesta aggiornata in ciso/log.md, vedi anche cto/log.md per la valutazione tecnica completa).

## 2026-06-29 | REPORT | Meeting CMO↔CTO — stack/scope/KPI confermati, WhatsApp/OpenWA in attesa CISO+Omar
**Contesto:** primo meeting con il CTO dopo chiusura del suo onboarding, su richiesta di Omar. Verbale completo: [board/cto/log.md](../cto/log.md) (stessa entry).
**Esito per il CMO:** nessuna modifica necessaria al workflow Notion già impostato (HL Content Calendar, doppio flag approvazione) — il CTO ci costruisce sopra il trigger automatico e il Marketing Manager autonomo. Email→un Mautic unico confermato. KPI subito disponibili: GSC, Ads, Brevo; da costruire: GA4 centralizzato, open/click Mautic aggregato, funnel chatbot→lead.
**Nuovo tema aperto da Omar — WhatsApp/OpenWA per Herbalife:** il CTO raccomanda uso solo interno (notifiche team, non clienti) e chiede review CISO prima di adottarlo (vedi richiesta in ciso/log.md). Resta ambiguo se Omar intende WhatsApp anche per i clienti del programma Cliente Privilegiato (oggi "Email + WhatsApp da fare" nel dossier herbalife.md) — se sì, serve WhatsApp Business API ufficiale, non OpenWA. **Da chiarire con Omar.**

## 2026-06-29 | CHECK | Weekly check Personal Brand

**Dati raccolti (script automatico):**
| Metrica | Valore | Delta |
|---|---|---|
| Articoli blog (omarbortolato.it) | 13 | +13 vs settimana prec. (prima baseline) |
| Status HTTP omarbortolato.it | 200 | — |
| Status HTTP aifriday.netlify.app | 200 | — |

**Esito:** ✅ PASS

- Nessun ALERT: tutti i siti raggiungibili, contenuto presente (13 articoli baseline rilevata per la prima volta).
- Delta +13: la settimana precedente il contatore era a 0 (primo run del cron), quindi non indica stallo ma stabilisce la baseline reale.

**Promemoria manuale (Notion — non verificabile headless):**
> Controllo manuale richiesto: Content Inbox (idee bloccate?) e tracker Opportunità & Lead (https://app.notion.com/p/27cc02fcbb6c460cad64ddf4614e202e) aggiornato questa settimana?

---

## 2026-06-06 | NOTE | Attivazione ruolo
**Contesto:** Ruolo CMO definito nell'ambito setup struttura holding.
**Status:** SUPERVISED — in attesa di definire obiettivi specifici con Omar.
**Prossimi passi:** Lunedì 09 Giu — primo ritual settimanale, review KPI marketing Herbalife.
