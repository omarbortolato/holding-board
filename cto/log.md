# CTO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.
> Tipi: DECISION | ALERT | REPORT | REQUEST | NOTE

---

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
