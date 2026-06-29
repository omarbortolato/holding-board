# CTO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.
> Tipi: DECISION | ALERT | REPORT | REQUEST | NOTE

---

## 2026-06-29 | REPORT | Valutazione tecnica OpenWA + risoluzione parziale ambiguità scope
**Contesto:** in parallelo al meeting CTO↔CMO (entry sotto), Omar ha chiesto direttamente al CTO di "iniziare a inserire OpenWA nello stack" per il canale WhatsApp, descrivendo il caso d'uso come: comunicazione con i clienti, oggi fatta a mano, "alto tasso di risposta e fidelity". **Questo risolve l'ambiguità di scope lasciata aperta nell'entry sotto: l'intento di Omar è uso ESTERNO (clienti), non solo interno.**
**Valutazione tecnica fatta (clonato il repo, letto risk register interno del progetto):**
- OpenWA wrappa librerie non ufficiali (whatsapp-web.js / Baileys), non la Cloud API Meta. Il progetto stesso classifica il ban account al **50% di probabilità** (categoria Operational, non teorica).
- Motore raccomandato se si procede: `whatsapp-web.js` (fingerprint browser reale, ban risk dichiarato più basso) invece di `baileys`, nonostante costo RAM maggiore — qui il rischio pesa più del risparmio.
- Scaffold di deploy pronto in [herbalife/services/whatsapp-gateway/README.md](../../herbalife/services/whatsapp-gateway/README.md) — non attivato, deploy separato come HerbaMarketer, non aggiunto al docker-compose core.
**Riconciliazione con la raccomandazione CTO↔CMO:** confermo la raccomandazione di non usare OpenWA per invii bulk automatici verso clienti — il ban (50%) qui costerebbe il canale a più alto tasso di risposta che abbiamo. Propongo una via di mezzo da validare con Omar: OpenWA in modalità **assistita** (AI prepara il messaggio, invio umano 1:1, basso volume, solo opt-in) per partire subito senza i tempi/costi di onboarding Meta Business API, mantenendo aperta la migrazione a API ufficiale se i volumi crescono.
**Resta bloccante:** review CISO (richiesta aperta) + conferma esplicita di Omar su quale modalità adottare prima di procurare il numero dedicato e fare il pairing.

**Aggiornamento 2026-06-29 (risposta di Omar):** confermato uso esterno (clienti/distributori). Omar si assume in prima persona il rischio di ban (50% indicato, accettato consapevolmente) — traffico basso, niente invii massivi, solo comunicazione 1:1. **Unica condizione posta da Omar: numero dedicato**, non userà più il personale per questo canale (oggi lo fa, va migrato). Procedere con:
1. Procurare numero dedicato (SIM/eSIM separata) — bloccante prima del pairing
2. Motore `whatsapp-web.js` come raccomandato (non baileys)
3. **Review CISO resta necessaria** — non sul "se accettare il rischio di ban" (deciso da Omar), ma su custodia della sessione/credenziali e trattamento dati clienti via canale non ufficiale (GDPR) — vedi richiesta aperta in ciso/log.md, da aggiornare con questo contesto
4. Deploy separato (scaffold già pronto in `herbalife/services/whatsapp-gateway/`), non nel docker-compose core, come HerbaMarketer

## 2026-06-29 | REPORT | Meeting CTO↔CMO — scope/KPI/stack confermati, WhatsApp/OpenWA da chiarire con Omar
**Contesto:** primo meeting CTO-CMO richiesto da Omar dopo chiusura onboarding CTO, per allineare la strategia piattaforma (platform-strategy.md) con le esigenze marketing (dossier CMO Herbalife + Personal Brand).
**Confermato lato CTO (nessuna azione richiesta al CMO):**
- Pipeline content gen (5.2) compatibile al 100% col workflow Notion "HL Content Calendar" esistente — gate doppio flag Omar+Emiliano resta l'human-in-the-loop su cui si costruisce anche il Marketing Manager autonomo (5.5)
- Email: confermato un Mautic unico (deciso 27/06) — nessuna azione CMO, lavoro infra Fase 1
- Kanban: confermato Notion-as-SoR, agent task-runner in Fase 3 (W35-38), non prima
- KPI marketing: GSC/Ads/Brevo trackabili subito; GA4 centralizzato, open/click Mautic aggregato, funnel conversione chatbot→lead e lead gen recruiting richiedono lavoro — consolidare Mautic prima di costruire il cruscotto email
**Nuovo tema — WhatsApp via OpenWA (richiesta Omar 2026-06-29):**
- Raccomandazione CTO: OpenWA accettabile **solo** come canale interno (notifiche team, es. sostituire/affiancare il bot Telegram di HerbaMarketer), su numero dedicato non critico. **Mai** per comunicazione con clienti/distributori esterni — per quell'uso serve WhatsApp Business API ufficiale (Meta/Twilio/360dialog), unica conforme ai ToS e a compliance GDPR.
- **CISO da coinvolgere prima di adottare OpenWA** — vedi richiesta aperta in ciso/log.md. Motivo: Herbalife ha già un alert di sicurezza apert​o (rotazione credenziali, secrets GitLab) e un wrapper non ufficiale con sessione WhatsApp persistente aggiunge superficie di rischio su un'infrastruttura già con debito aperto.
- **Ambiguità da chiarire con Omar:** il dossier CMO Herbalife cita "Email + WhatsApp (da fare)" verso clienti del programma Cliente Privilegiato — uso esterno. Se questo è l'intento reale, OpenWA non è lo strumento giusto: va usata WhatsApp Business API ufficiale. Need: Omar chiarisce se WhatsApp/OpenWA è solo per comunicazione interna team→team o anche per i clienti.
**Prossimo:** Omar chiarisce lo scope d'uso WhatsApp; CISO valuta OpenWA per l'uso interno nel frattempo.

## 2026-06-27 | REPORT | Documento Notion per meeting Michele/Emiliano + pulizia doc stale
**Output:** [Strategia Piattaforma Herbago — CTO (2026-06-27)](https://app.notion.com/p/38cef582d2598188b405f42bc7ab96d4) — sotto "Herbalife Home", sintesi condivisibile di strategia + censimento + alert sicurezza, con agenda meeting.
**Pulizia autonoma (azione minore, non rischiosa):** rimossi ovunque i riferimenti agli agenti phantom `agent-products/prices/health` (8010-8012, mai esistiti nel codice) da CLAUDE.md, board/cto/AGENT.md, board/cto/reports/herbalife.md, projects/herbalife.md, strategy/platform-strategy.md. Committato anche il quick win LiteLLM opus-4-7→4.8 (editato in sessione precedente, non ancora commitato).
**Non eseguito (rischioso, in attesa di Omar):** rotazione credenziali FTP/DB esposte su GitLab — vedi alert CISO.

## 2026-06-27 | REPORT | Censimento onesto PRD (Fase 0)
**Contesto:** primo step scelto da Omar. Audit verificato su codice + endpoint live + git, non sui doc.
**Findings:**
- 4+ sistemi in PRD: chatbot platform (GitLab), HerbaMarketer (GitHub/Coolify), **PIM** e **OMS** (PHP 8.2/LiteSpeed, `pim.herbago.it`/`oms.herbago.it`, segnalati da Omar) + siti WordPress.
- PIM/OMS **non integrati** con la AI platform → da esporre via API (Integrations Hub), no rewrite. Serve accesso GitLab.
- HerbaMarketer più avanzato del previsto: già ads_advisor, analytics_advisor, GSC, Strategy Dashboard.
- Agenti reali: solo base/distributor/ecommerce/preferred-customer. **products/prices/health documentati in CLAUDE.md ma inesistenti** (doc stale).
- Debito chiave: zero test, frammentazione 3 repo + poliglotta (Python/PHP/Next.js/WP), sovereignty leak OpenAI (embeddings+DALL-E), due metodi di deploy, 6 Mautic.
**Output:** [strategy/censimento-prd.md](strategy/censimento-prd.md).

## 2026-06-27 | DECISION | Kickoff strategia piattaforma "Herbago Platform" (Opus)
**Contesto:** Omar dà mandato strategico al CTO: progettare una piattaforma AI all-in-one, sovrana, cost-effective ed estendibile a qualsiasi business, partendo da Herbalife (marketing + chatbot + monitoring) come tenant 0 e con la prospettiva di estrarre un prodotto B2B SaaS. Il CMO attende riunione con il CTO per fissare stack, content gen, email marketing, kanban/work, marketing manager autonomo, test chatbot, monitoring cockpit. Emiliano sta sviluppando un'app clienti da integrare nello stack.
**Decisione/Output:**
- Prodotto documento di fondazione: [strategy/platform-strategy.md](strategy/platform-strategy.md) — architettura a livelli, principi (config-driven multi-tenancy, API-first, sovrano, buy-vs-build, cost-aware, extraction-ready), decisioni per ambito con raccomandazioni, roadmap fasata, agenda meeting.
- Insight chiave: NON partiamo da zero. Due motori già in PRD — agent runtime (chatbot fleet) e marketing engine (HerbaMarketer, 7 siti). La strategia è fonderli su spina dorsale comune ed estrarre i pattern, non riscrivere.
- Da presentare a **Michele** (Senior Architect) ed **Emiliano** settimana W27.
- Quick win identificati: LiteLLM punta a opus-4-7 → aggiornare a 4.8; chiudere sovereignty leak embeddings/immagini su OpenAI.
- Raccomandazione email: non costruire l'invio (deliverability), razionalizzare 6 Mautic + Brevo → un Mautic unico dietro l'orchestrazione HerbaMarketer.
**Prossimo:** allineamento con Omar sulle decisioni forcanti (email/ESP, monorepo, integrazione app Emiliano), poi Fase 1.

## 2026-06-26 | DECISION | Priorità reale chiarita con Omar
**Contesto:** Risposta di Omar alle domande del Tech Lead Herbalife su priorità ecommerce vs HerbaMarketer.
**Decisione:**
- Gli agenti chatbot (distributor, preferred-customer, ecommerce) sono il prodotto più maturo: widget WordPress live, chatbot funzionante sui domini herbago.*, dashboard di monitoraggio già in PRD su `https://chat.herbago.info/dashboard/` (conversazioni, sentiment, qualità, cost monitoring, configurazione) e ambiente di test dedicato su `https://chat.herbago.info/dashboard/test`
- agent-ecommerce è già funzionante in produzione: non è più "da chiudere", prosegue fine-tuning incrementale con l'uso
- `herbago.info` diventa piattaforma centrale della holding; `dashboard.herbago.info` ospita HerbaMarketer (prima app standalone: contenuti multi-sito, articoli, email Mautic/Brevo, GA + Google Ads collegati)
- Prossimo step: valutare se ridisegnare l'architettura per ospitare altri siti/progetti su `herbago.info`, e definire la strategia di produzione contenuti SEO + email di nurturing

## 2026-06-26 | DECISION | Budget infrastruttura
**Decisione:** tetto di spesa autonoma €100/mese (Hetzner + Claude API). Per superarlo serve discussione preventiva con Omar sul motivo. Comunicato anche a CFO.

## 2026-06-26 | DECISION | Deploy authority
**Decisione:** fix minori → piena autonomia per Tech Lead/CTO. Re-ingegnerizzazione della piattaforma → richiede strategia condivisa definita PRIMA di procedere, per step. La fase di definizione strategica (fondamenta del progetto) va condotta con il modello Opus, non Sonnet.

## 2026-06-26 | DECISION | Test suite / CI-CD rimandati
**Decisione:** non sono priorità immediata, nessuna scadenza Q3. Va comunque preparato un programma/proposta, da discutere con **Michele** (Senior Architect, da coinvolgere) ed **Emiliano** (socio Herbalife e altri progetti AI) prima di procedere.

## 2026-06-26 | NOTE | Estrazione platform/chatbot/ — regola confermata
**Chiarimento:** esiste già un ambiente di test separato (`chat.herbago.info/dashboard/test`) per validare i chatbot prima del push in produzione. La regola "estrarre solo dopo che agent-ecommerce è stabile" resta confermata in `platform/chatbot/README.md` — la stabilità si verifica via questo ambiente di test, non tramite una "chiusura" formale del progetto (agent-ecommerce è già live e in fine-tuning continuo).

---

## 2026-06-06 | DECISION | Architettura struttura holding
**Contesto:** Setup iniziale struttura holding multi-progetto.
**Decisione:**
- `board/` per agenti C-level (governance, non codice)
- `platform/` per servizi condivisi riusabili
- `projects/` per card di progetto (documentazione, non codice — codice resta in `/root/herbalife`, `/root/ai-triage`)
- `dashboard/` per HTML live
- Pattern agenti Herbalife esistente diventa blueprint per `platform/chatbot/`
- Prossima porta disponibile: 8016
