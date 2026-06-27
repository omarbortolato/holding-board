# Strategia Piattaforma — "Herbago Platform"

**Autore:** CTO (con Opus 4.8)
**Data:** 2026-06-27
**Stato:** 🟡 BOZZA per allineamento — da presentare a Michele (Senior Architect) ed Emiliano settimana W27
**Owner:** CTO · **Stakeholder:** Omar (CEO), Emiliano (socio), Michele (Senior Architect), CMO

> Documento di fondazione. Definisce dove vogliamo arrivare a livello di piattaforma, perché, e come ci arriviamo passo passo. Scritto per essere discusso con un Senior Architect: contiene raccomandazioni esplicite, non solo opzioni.

---

## 1. Visione in una frase

Costruire **una piattaforma AI all-in-one, sovrana, cost-effective ed estendibile** che gestisca marketing, assistenza e operations di qualsiasi business — partendo da Herbalife — e che, dopo il fine-tuning sui nostri progetti, diventi **un prodotto vendibile B2B SaaS**.

Tre obiettivi non negoziabili, in ordine:
1. **Herbalife first** — sistemare marketing + chatbot + monitoring per i nostri siti, ora.
2. **Abilitare la creatività di Omar** — ridurre il time-to-action: da idea a contenuto/campagna/agente in ore, non settimane.
3. **Estraibilità** — ogni mattone è progettato per essere riusato su un nuovo business cambiando configurazione, non codice.

Target di business a cui la piattaforma è asservita: **primo milione di euro**. La tech è l'abilitatore, non il fine.

---

## 2. Dove siamo già (non partiamo da zero)

> Censimento completo verificato in [censimento-prd.md](censimento-prd.md). In sintesi: **non due, ma quattro+ sistemi in PRD** — chatbot platform, HerbaMarketer, **PIM** (`pim.herbago.it`) e **OMS** (`oms.herbago.it`), oltre ai siti WordPress. PIM/OMS sono PHP 8.2 standalone, oggi **non integrati** con la AI platform → vanno esposti via Integrations Hub (no rewrite).

Abbiamo **motori che già funzionano in produzione**. La strategia è unificarli, non reinventarli.

**Motore 1 — Agent Runtime (chatbot):**
- Fleet di microservizi FastAPI: `agent-products`, `agent-prices`, `agent-health`, `agent-distributor` (13 lingue), `agent-preferred-customer` (10 lingue), `agent-ecommerce` (live, fine-tuning)
- `concierge` (routing hub), `drive-indexer` (RAG), `scraper`, `google-workspace`, `analytics`
- `base/common.py` = logica condivisa (session memory, lingua, quick reply)
- Widget WordPress (TS) installato sui siti
- Dashboard monitoraggio live `chat.herbago.info/dashboard` + ambiente test `/dashboard/test`
- Stack: Docker, Qdrant, Postgres, LiteLLM, nginx, deploy Coolify

**Motore 2 — Marketing Engine (HerbaMarketer):**
- LIVE su `dashboard.herbago.info` (Coolify)
- Genera, traduce e pubblica autonomamente email di nurturing + articoli SEO su **7 siti multilingua**
- Approvazione strategica via Telegram (Omar decide topic + review bozze)
- Email ingestor Gmail IMAP, immagini DALL-E, pubblicazione bozze WordPress
- **Già possediamo il "cervello" del marketing** — gli ESP sono solo il layer di invio

**Conclusione architetturale:** non dobbiamo costruire una piattaforma, dobbiamo **fondere due piattaforme esistenti su una spina dorsale comune** ed estrarre i pattern riusabili. Questo abbassa drasticamente il rischio.

---

## 3. Principi architetturali (la dottrina)

Questi principi decidono ogni scelta successiva. Sono il vero contenuto da validare con Michele.

1. **Config-driven multi-tenancy.** Un nuovo business = un file di configurazione + una knowledge base, non un fork di codice. `tenant` = business (Herbalife, futuri). `project` = linea di business/sito. Da subito i confini sono puliti, anche se oggi il tenant è uno solo.
2. **API-first.** Ogni capacità è un servizio con un'API. I frontend (console, widget) e le app esterne (l'app clienti di Emiliano) sono *client*, mai eccezioni speciali.
3. **Sovrani per default.** Dati e logica self-hosted su Hetzner. I SaaS sono ammessi solo come *utility commodity intercambiabili* (es. invio email), mai come deposito della nostra intelligenza o dei nostri dati clienti.
4. **Buy/borrow per le commodity, build per il differenziante.** Non ricostruiamo deliverability email, kanban UI, o dashboard di metriche infra. Costruiamo l'intelligenza degli agenti e l'orchestrazione: lì sta il valore vendibile.
5. **Cost-aware by design.** Model tiering (Opus per strategia/qualità, Sonnet per volume, Haiku per classificazione), caching, self-hosting. Tetto autonomo €100/mese con alert automatici.
6. **Extraction-ready.** Separazione netta tra `platform-core` (riusabile) e `tenant-knowledge` (Herbalife). L'estrazione del prodotto deve essere un refactor, non un rewrite.
7. **Human-in-the-loop graduato.** Gli agenti propongono, gli umani approvano dove conta (comunicazioni esterne, spese). Si passa da SUPERVISED → DELEGATED → AUTONOMOUS per ambito, man mano che cresce la fiducia.

---

## 4. Architettura a livelli (target)

```
┌──────────────────────────────────────────────────────────────────────┐
│  EXPERIENCE LAYER                                                       │
│  Console unificata herbago.info (Next.js)                              │
│  ├─ Marketing Cockpit  ├─ Monitoring Cockpit  ├─ Kanban/Work          │
│  └─ Chatbot Admin+Test └─ Config/Tenant                                │
│  + Widget WordPress (chat)   + App Clienti (Emiliano) come client API │
└───────────────────────────────┬──────────────────────────────────────┘
                                │  API Gateway (auth Workspace SSO/OAuth)
┌───────────────────────────────┴──────────────────────────────────────┐
│  SERVICE LAYER (domain services, FastAPI)                              │
│  ├─ Chatbot Service (agenti generalizzati)                            │
│  ├─ Marketing Engine (ex-HerbaMarketer: content, email, SEO)          │
│  ├─ Identity/Customer Service (profili clienti, condiviso con app)    │
│  ├─ Notification Service (in-app, email, WhatsApp)                    │
│  └─ Integrations Hub (GA4, Google Ads, GSC, WordPress, ESP, Notion,   │
│      PIM oms.herbago.it, OMS pim.herbago.it)                           │
└───────────────────────────────┬──────────────────────────────────────┘
┌───────────────────────────────┴──────────────────────────────────────┐
│  AI / AGENT RUNTIME (il differenziante, estraibile)                    │
│  LiteLLM gateway → Claude (Opus 4.8 / Sonnet 4.6 / Haiku 4.5)         │
│  Framework agenti: tools · RAG · memory · guardrail · tone enforcement │
│  Multi-tenant: ogni agente legato a tenant-config + knowledge base    │
└───────────────────────────────┬──────────────────────────────────────┘
┌───────────────────────────────┴──────────────────────────────────────┐
│  DATA LAYER (sovrano, self-hosted)                                     │
│  PostgreSQL (primario, multi-tenant) · Qdrant (vettori/RAG)           │
│  Redis (cache/coda) · Object storage S3-compatibile (asset)          │
└───────────────────────────────┬──────────────────────────────────────┘
┌───────────────────────────────┴──────────────────────────────────────┐
│  INFRA / DEPLOY (sovrano)                                              │
│  Hetzner + Coolify (PaaS self-hosted) · Docker · deploy git-based     │
│  Osservabilità: Grafana + Prometheus + Loki                          │
└──────────────────────────────────────────────────────────────────────┘

Trasversali: Sicurezza/GDPR (CISO) · Cost governance · Work-of-record (Notion)
```

---

## 5. Decisioni chiave per ambito (agenda meeting)

Ogni voce: **opzioni → raccomandazione CTO → cosa decidere con il team.**

### 5.1 Stack tecnologico
- **Backend:** Python + FastAPI (già in uso). ✅ **Confermare.**
- **Frontend:** Next.js + React + TypeScript, Tailwind + shadcn/ui (design system moderno, veloce, professionale). Una **console unica** modulare invece di N dashboard scollegate. ✅ **Raccomandato.**
- **DB:** PostgreSQL primario, Qdrant vettori, Redis coda/cache, object storage S3-compatibile (MinIO self-hosted o Hetzner Object Storage). ✅ **Confermare.**
- **AI:** Claude via LiteLLM. **Da correggere subito:** config LiteLLM punta a `opus-4-7` → aggiornare a **Opus 4.8**. **Sovereignty leak da chiudere:** embeddings su `text-embedding-3-small` (OpenAI) e immagini DALL-E (OpenAI) — valutare alternative sovrane/self-hosted o quantomeno isolare la dipendenza.
- **Deploy:** standardizzare su **Coolify** (PaaS sovrano, git-based, già in uso). Path verso k3s/Nomad solo quando la scala lo giustifica — **non ora** (sarebbe over-engineering).
- 🟦 **Decisione team:** confermare stack + monorepo. Oggi il codice è frammentato (repo herbalife, HerbaMarketer separato, board). Raccomando **consolidamento progressivo** in struttura `platform/` + `tenants/` con librerie condivise.

### 5.2 Content generation
- Pipeline: **brief → draft (agente) → review (agente/umano) → approvazione (Notion, doppio flag Omar+Emiliano già esistente) → publish (WordPress API + ESP)**.
- Model tiering: Opus per strategia/long-form di qualità, Sonnet per volume, Haiku per classificazione/tagging.
- SEO-oriented: keyword research + content brief strutturati + ottimizzazione on-page multilingua. Base già presente in HerbaMarketer.
- ✅ **Raccomandato:** evolvere HerbaMarketer in `Marketing Engine` del platform layer, non riscrivere.

### 5.3 Email marketing — **la decisione più importante**
Stato reale: **abbiamo già il cervello** (HerbaMarketer orchestra), gli ESP sono il braccio di invio: **6 istanze Mautic + 1 Brevo** su 7 siti.

- **Opzione A — status quo:** 6 Mautic + Brevo. ❌ Operativamente pesante (6 istanze da mantenere, aggiornare, monitorare deliverability).
- **Opzione B — consolidare su UN Mautic** (segmentato per sito/lingua) self-hosted, dietro HerbaMarketer. ✅ Sovrano, gratuito (licenza), drastica riduzione ops. **Raccomandata.**
- **Opzione C — tutto su Brevo:** meno ops ma costo scala coi contatti, meno sovrano.
- **Opzione D — "costruire il nostro tool collegando account Gmail/Workspace":** ❌ **Sconsigliata per il nurturing di massa.** La deliverability (SPF/DKIM/DMARC, IP warming, reputazione, bounce, unsubscribe GDPR) è un problema risolto e brutale da ricostruire; Gmail ha limiti ~500/giorno e penalizza l'invio massivo. **Però** — il layer che conta (logica, dati, relazione col cliente) lo possediamo già. Per il **cold outreach/recruiting 1:1** Workspace + tool di warmup è legittimo, ma **separato** dal nurturing.

**Raccomandazione CTO:** **non costruire l'invio**, costruire/possedere l'orchestrazione (già fatto). Razionalizzare il braccio: **consolidare su un Mautic unico** + Brevo solo dove vince sul transazionale. L'astrazione ESP in HerbaMarketer rende l'invio una commodity intercambiabile.
> ✅ **DECISO da Omar (2026-06-27): consolidare su un Mautic unico.** L'opzione "tool proprietario su Gmail" è scartata. Brevo resta solo dove vince sul transazionale.

### 5.4 Kanban + work management (owner agentici e umani)
- ❌ **Non costruire un kanban da zero** ora. **Notion è già system-of-record** (HL Content Calendar, doppio flag approvazione).
- ✅ **Raccomandato:** Notion = registro tasks/contenuti/approvazioni. Costruiamo **l'agent task-runner**: gli agenti *leggono* i task da Notion, li *reclamano*, eseguono, postano risultati e **richiedono feedback umano** (Omar/Emiliano/Michele) quando serve. Owner = agente o umano sullo stesso board.
- La console herbago.info aggrega in sola-lettura (Notion + GA4 + ads + costi) per la **vista executive**, senza duplicare data-entry.
- 🟦 **Decisione team:** Notion-as-SoR + runner (raccomandato) vs tool dedicato (Linear).

### 5.5 Marketing Manager autonomo
Agente di punta sul runtime + work layer. Loop settimanale:
1. Analizza segmenti + performance (open/click/risposta da ESP + GA4)
2. **Propone strategia settimanale a Omar** (via Notion/console) — gate human-in-the-loop
3. Su approvazione: alimenta i siti (nurturing), esegue A/B test
4. Misura → impara → riporta con consigli
- Autonomia iniziale **SUPERVISED** (l'invio è comunicazione esterna → approvazione), evoluzione a DELEGATED.

### 5.6 Test chatbot agents
- Evolvere `chat.herbago.info/dashboard/test` in **test harness** vero: golden conversations, suite di regressione, **eval LLM-as-judge** su tono (regole holding: conversazionale, no FAQ/header, max 3-5 frasi, max 2 emoji) + correttezza, prima del promote in PRD.
- È il "gate di stabilità" che la regola di estrazione `platform/chatbot/` richiede.

### 5.7 Monitoring cockpit
- **Cockpit generico + per-ambito:** consumo/costi Claude (LiteLLM espone usage), costi infra Hetzner, traffico (GA4/GSC), spesa ads (Google Ads), security (CISO), interazioni (dashboard chat esistente).
- ✅ **Raccomandato:** **Grafana + Prometheus + Loki** (sovrano) per infra/costi/traffico; dashboard business (marketing) nella console Next.js; conversazioni nella dashboard chat esistente. Un cost-tracker centrale con **alert a soglia €100/mese**.

### 5.8 App clienti di Emiliano (integrazione)
- L'app (gestione cliente interattiva, notifiche in-app, piano sviluppo, risultati, upsell distributori) deve essere **un client della piattaforma**, non un silo.
- Prerequisiti architetturali che la abilitano: **Identity/Customer Service** condiviso (profili clienti), **Notification Service** (notifiche in-app + push), **API Gateway** con auth.
- 🟦 **Coordinamento necessario con Emiliano:** allineare data model cliente, auth, contratto API **prima** che la sua app si sviluppi troppo in isolamento. Da mettere in agenda meeting.

---

## 6. Multi-tenancy ed estrazione del prodotto

- **Modello tenant:** `tenant` (business) → `project` (linea di business/sito) → config (brand, tono, knowledge sources, canali, porte).
- **DB:** Postgres con `tenant_id` su tabelle condivise (semplice, cost-effective) — schema-per-tenant solo se un cliente enterprise lo esige.
- **Disciplina di estrazione:** tutto ciò che è Herbalife-specifico vive in `tenants/herbalife/`; tutto ciò che è riusabile in `platform/`. Regola pratica: *"se lo riscriverei identico per un altro business, va in platform/"*.
- **Percorso prodotto:** Herbalife (tenant 0, fine-tuning) → 2° business interno come prova di estraibilità → pacchettizzazione SaaS B2B.

---

## 7. Sovranità e costi

- **Sovrani:** dati clienti, knowledge base, logica agenti, orchestrazione marketing, vettori, asset → tutto self-hosted Hetzner.
- **Commodity ammesse (intercambiabili):** invio email (ESP), eventualmente modelli (via LiteLLM si cambia provider senza toccare il codice).
- **Leak da chiudere:** embeddings OpenAI → valutare alternativa; immagini DALL-E → valutare alternativa; entrambi isolati dietro LiteLLM/interfaccia.
- **Guardrail €100/mese:** model tiering + caching + self-hosting tengono lean. ⚠️ **Nota per CFO:** con l'aumento di carico il tetto andrà rivisto consapevolmente; l'architettura è progettata per ritardare quel momento il più possibile.

---

## 8. Rischi e mitigazioni

| Rischio | Mitigazione |
|---|---|
| Over-engineering multi-tenancy prima del tempo | Confini puliti ma implementazione minima: un solo tenant reale ora |
| Frammentazione repo rallenta sviluppo | Consolidamento progressivo in monorepo `platform/` + `tenants/` |
| Deliverability email se si costruisce l'invio | Non costruirlo: ESP come commodity dietro la nostra orchestrazione |
| App Emiliano si sviluppa in silo | Allineare API/data model in meeting W27, prima che diverga |
| Tetto €100/mese saltato silenziosamente | Cost-tracker centrale + alert automatici a soglia |
| Lock-in modelli/provider | LiteLLM come unico gateway, provider intercambiabile |

---

## 9. Roadmap fasata + obiettivi settimanali

**Fase 0 — Allineamento (W27, questa→prossima settimana)** ← *adesso*
- [x] Finalizzare questo documento + agenda meeting Michele/Emiliano
- [x] Quick win a costo zero: aggiornare LiteLLM `opus-4-7 → 4.8`
- [~] **Censimento onesto: cosa è davvero in PRD, cosa è prototipo, debito tecnico** ← *in corso, primo step scelto da Omar*
- [x] Decisione email/ESP confermata: un Mautic unico (2026-06-27)

**Fase 1 — Fondamenta (W28–W30)**
- Consolidamento repo `platform/` + `tenants/herbalife/`; spina dorsale Postgres multi-tenant
- Estrazione `platform/chatbot/` (dopo gate stabilità test harness)
- Cost-tracker + alert €100 + bozza Grafana

**Fase 2 — Marketing unificato (W31–W34)**
- HerbaMarketer → `Marketing Engine`; razionalizzazione ESP (decisione 5.3)
- Marketing Manager autonomo (loop proposta→approvazione→esecuzione)
- Marketing Cockpit nella console (GA4/Ads/GSC)

**Fase 3 — Console + Work layer (W35–W38)**
- Console unica herbago.info (Next.js, design system)
- Agent task-runner su Notion (owner agentici + umani)
- Monitoring Cockpit completo

**Fase 4 — Integrazione app Emiliano + estraibilità (W39+)**
- Identity/Customer Service + Notification Service + API Gateway
- Integrazione app clienti
- Prova di estrazione su 2° tenant

> Le fasi sono indicative: ogni lunedì gli obiettivi settimanali concreti vanno in `board/cto/okr.md`. Si avanza per step approvati, non in big-bang.

---

## 10. Agenda proposta — Meeting Michele & Emiliano (W27)

1. Validazione principi architetturali (sez. 3) — è la dottrina su cui costruiamo
2. Conferma stack + consolidamento monorepo (5.1)
3. **Decisione email/ESP** (5.3) — razionalizzare su un Mautic?
4. Work management: Notion-as-SoR + agent runner (5.4)
5. **Integrazione app Emiliano** (5.8) — data model, auth, contratto API
6. Tetto costi €100 e quando rivederlo (con CFO)
7. Roadmap fasata e priorità di Fase 1
```
