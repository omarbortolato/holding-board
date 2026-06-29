# Marketing Manager — Herbalife

**Riporta a:** board/cmo (best practice, budget, priorità trasversali)
**Riporta anche su:** obiettivi specifici del progetto Herbalife
**Status onboarding:** 🟢 COMPLETATO — scope, priorità e KPI definiti con Omar (2026-06-24)

---

## Cosa già sappiamo (da CLAUDE.md / memoria progetto)

**Tre linee di business, priorità diverse:**
| Linea | Priorità | Strategia |
|---|---|---|
| Ecommerce Italia (herbashop.it, herbago.it) | 🔥 ALTA | Campagne già attive e già performanti. Priorità ora: collegare tutti gli account in un'unica dashboard (partire da HerbaMarketer) |
| Recruiting Italia — profilo basso | 🔥 ALTA | Funnel breve su hl-distributor.com/it, redirect a Marco (upline Omar) per supporto offline old-style |
| Recruiting Italia — profilo alto | 🔥 ALTA | Comunicazione "libertà finanziaria", entusiasta, scarcity, target cavalli di razza che sfruttano know-how tech/AI |
| Recruiting estero — Ecommerce Manager (FR, DE, UK, IE) | 🔥 ALTA | Approccio soft, "entrata extra senza fatica", scaling progressivo. Noi gestiamo tech/ads/AI, guadagniamo royalties |
| Ecommerce countries affiliazione (USA, AU) | 🔵 BASSA | SEO programmatica, traffico organico, link a goHerbalife |
| Cliente Privilegiato (IT + intl) | — | Email + WhatsApp (da fare) verso clienti esistenti; landing per prospect organici |
| Downline/Distributori | — | Conversione da ecommerce/cliente privilegiato; eventi IT; recruiting manager estero |

**Asset marketing già attivi:**
- **HerbaMarketer** (`herbalife/herbamarketer/`) — sotto-progetto live su `dashboard.herbago.info` (Coolify). Genera/traduce/pubblica: email nurturing (Mautic/Brevo), articoli SEO (WordPress). Supervisione human-in-the-loop via Telegram + dashboard web. Già fatte connessioni ai vari tool ads/analytics — punto di partenza per dashboard unificata multi-account.
- Email: Brevo (transazionali + automazioni) + Mautic (broadcast/nurturing)
- Sconto primo ordine: `newuser` → 10% herbashop.it/herbago.it, 5% altri siti
- Programma Cliente Privilegiato: sconti 22-38% IT, 35% FR, 42% US/UK (vedi memoria `herbalife_preferred_customer_data`)

**Tono di voce (regola globale ereditata):**
- Creare fiducia, non vendere — chatbot come amico competente, mai venditore aggressivo
- Mai CTA più di una volta per turno

---

## Decisioni di Omar (onboarding 2026-06-24)

### 1. Priorità tra le linee
Ecommerce IT va già bene (campagne attive); priorità immediata = **dashboard unificata** (tutti gli account collegati, partire da HerbaMarketer). In parallelo, **recruiting Italia + estero è altrettanto prioritario**.

**Segmentazione recruiting validata (da raffinare):**

| Segmento | Target | Approccio | Funnel |
|---|---|---|---|
| **a) Italia — profilo basso** | Studentessa, casalinga, mamma, pensionata (perlopiù donne) — entrata extra mensile | Funnel breve, video ufficiali Herbalife | Redirect a Marco (upline Omar) → supporto offline vecchio stile |
| **b) Italia — profilo alto** | Chi vuole libertà finanziaria, cambiare vita | Comunicazione entusiasta, "non è per tutti", scarcity, posizionamento CEO/imprenditore | Funnel lungo, video, onboarding con scarcity. Punta su know-how tech/digitale/AI per costruire organizzazioni |
| **c) Estero — Ecommerce Manager** | FR/DE/UK/IE — chi cerca entrata extra senza competenze specifiche | Soft, sito + infrastruttura forniti da noi, loro gestiscono i clienti, scaling opzionale | Landing: hl-distributor.com/en/become-an-ecommerce-manager/ |

**Sito da migliorare:** hl-distributor.com/it/ — già live ma **senza funnel di followup implementato**.

**Fonte di verità strategia recruiting (deciso 2026-06-24: Notion, non più Google Docs):**
- 🔗 [Strategia Recruiting Herbalife (validata 2026-06-24)](https://app.notion.com/p/389ef582d25981d2a72ee9d4ed84b393) — pagina Notion sotto "Herbalife Home". Consolida i 2 Google Doc storici con la segmentazione a/b/c validata da Omar (modello economico Country Manager, canali di sourcing, compliance, test Francia in corso)
- I 2 Google Doc originali ([Strategia downline global](https://docs.google.com/document/d/1jiOIcCYuolJ_9VoWmEbo4yvi8lpoMYEnuFYJgAGlVFk), [Ricerca E-Commerce Manager](https://docs.google.com/document/d/1S9Ed0N6_r1okbkiAKYTf1-KXmTiwl3nxK0ggToLuV3Y)) restano come **archivio storico**, non più aggiornati
- Google Drive folder Herbalife Downline — solo consultazione, possibili doc obsoleti

### 2. Budget marketing
Collegare i vari tool tramite le connessioni già fatte su HerbaMarketer (Google Ads, GA4, GSC già integrati nel codice — vedi `core/google_ads_client.py`, `core/ga4_client.py`, `core/gsc_client.py`). Da lì estrarre lo stato attuale di spesa/budget come base.

### 3. HerbaMarketer — direzione
Da rivedere con il **CTO** (appuntamento da fissare) per:
- Decidere come integrarlo nella piattaforma in modo coerente a livello tech (oggi: Coolify + n8n + Mautic + Brevo)
- **Unificare i canali di comunicazione** (oggi Telegram per HerbaMarketer vs altri canali altrove — serve un canale unico)
- **Visione strategica**: HerbaMarketer nasce come piattaforma marketing per Herbalife, ma va pensata come **piattaforma multi-progetto** (selezione progetto → scope/connessioni/tone of voice dedicati). Per ora focus resta solo su Herbalife, ma le decisioni tecniche vanno prese con questa estensibilità in mente.

### 4. Cadenza content
1 contenuto (articolo SEO o email) ogni **2 settimane** per sito.

### 5. Approvazione contenuti
Omar **ed** Emiliano devono approvare prima della pubblicazione. **Implementato in Notion**: database "HL Content Calendar" con flag `Approvato Omar` + `Approvato Emiliano` — quando entrambi sono true, status → trigger pubblicazione automatica (da collegare a HerbaMarketer/n8n).

### 6. KPI baseline
Disponibili da **Brevo** (export/API). **Mautic** non ha baseline strutturate — da estrarre via API o richiedere a Omar caso per caso.

### 7. Brand voice per country
Tono unico globale, **modulato per segmento non per country**:
- Recruiting profilo alto/business → più motivante, professionale
- Recruiting profilo basso/entrata extra → soft
- Clienti (ecommerce, cliente privilegiato) → sempre amichevole, supportivo, mai da venditore

### 8. Eventi IT (recruiting distributori)
Da costruire: **pagina/portale di supporto distributori** che aggrega tutti gli eventi (online + offline, fonte ufficiale Herbalife) in formato facilmente consultabile via web — accessibile anche ai distributori. Visione finale: **chatbot dedicato ai distributori** per procedure, interviste, assistenza, piano marketing.

---

## Azioni completate in questa sessione

- ✅ Creato database Notion **"HL Content Calendar"** sotto la pagina "Herbalife Home" — gestisce tipo contenuto, linea di business, country/lingua, status, doppio flag approvazione (Omar + Emiliano), data pubblicazione, link bozza. URL: https://app.notion.com/p/61b484f30a9a4671905908be1c30139e
- ✅ Letti e mappati i due Google Doc di strategia esistenti (downline global + e-commerce manager) — contengono già playbook dettagliati (ICP, copy multilingua, job board, sequenze outreach) riusabili per i segmenti a/b/c
- ✅ **Decisione presa con Omar (2026-06-24): Notion come unica fonte di verità** per la documentazione di progetto (Google Drive resta per i file grezzi/asset che Omar carica)
- ✅ Creata pagina Notion **"Strategia Recruiting Herbalife (validata 2026-06-24)"** — consolida i 2 Google Doc storici con la segmentazione a/b/c, modello economico Country Manager, canali di sourcing, compliance, stato test Francia. URL: https://app.notion.com/p/389ef582d25981d2a72ee9d4ed84b393

## Prossime azioni operative (non ancora fatte)

1. ✅ **Meeting CTO↔CMO tenuto (2026-06-29)** — onboarding CTO chiuso il 26/06, meeting svolto. Esito: workflow Notion confermato compatibile con la strategia piattaforma, nessuna modifica richiesta al CMO. Verbale completo in [board/cto/log.md](/root/board/cto/log.md) e [board/cmo/log.md](/root/board/cmo/log.md).
2. Costruire funnel di followup su hl-distributor.com/it (oggi assente)
3. Collegare il trigger Notion → pubblicazione (n8n/HerbaMarketer) per il flag doppia approvazione — **lavoro CTO**, in roadmap Fase 1-2 (W28-W34), nessuna azione CMO richiesta
4. Disegnare struttura pagina/portale eventi distributori
5. 🆕 **WhatsApp/OpenWA come canale Herbalife (richiesta Omar 2026-06-29)** — in attesa di review CISO (richiesta aperta in ciso/log.md) e di chiarimento con Omar: è solo per notifiche team interne (CTO raccomanda di limitarsi a questo, sostituendo/affiancando il bot Telegram di HerbaMarketer) o anche per comunicare con i clienti del programma Cliente Privilegiato (in quel caso serve WhatsApp Business API ufficiale, non OpenWA)?

---

## OKR specifici progetto

**O1 — Dashboard marketing unificata**
- KR1: Tutti gli account ads/analytics (Google Ads, GA4, GSC) collegati su HerbaMarketer
- KR2: Vista unica multi-sito per Omar/Emiliano

**O2 — Funnel di recruiting attivi sui 3 segmenti (a/b/c)**
- KR1: Funnel breve IT profilo basso live con redirect a Marco
- KR2: Funnel IT profilo alto (scarcity, onboarding) live
- KR3: Funnel followup su hl-distributor.com/it implementato (oggi assente)
- KR4: Landing recruiting estero Ecommerce Manager performante (FR/DE/UK/IE)

**O3 — Content engine governato**
- KR1: 1 contenuto/2 settimane per sito pubblicato via workflow Notion (doppia approvazione)
- KR2: KPI baseline Brevo/Mautic estratti e tracciati

**O4 — Coerenza tecnologica HerbaMarketer**
- KR1: Meeting con CTO fissato e tenuto
- KR2: Canale di comunicazione unico definito (Telegram vs Slack vs altro)
- KR3: Architettura multi-progetto scoped (anche se attiva solo su Herbalife)
