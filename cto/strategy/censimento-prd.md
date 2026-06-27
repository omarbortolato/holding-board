# Censimento Onesto — Stato Reale della Piattaforma

**Autore:** CTO · **Data:** 2026-06-27 · **Stato:** 🟢 Fase 0 — base per il meeting Michele/Emiliano
**Metodo:** ispezione diretta codice + docker-compose + verifica endpoint live + git. Non basato sui doc (che in alcuni punti sono stale).

> Obiettivo: distinguere cosa è **davvero in produzione**, cosa è **prototipo/parziale**, cosa è **documentato ma inesistente**, e mappare il **debito tecnico**. Verità prima della strategia.

---

## 1. Inventario sistemi (stato verificato)

| # | Sistema | URL / dove | Stack | Repo | Deploy | Stato reale |
|---|---|---|---|---|---|---|
| 1 | **AI Chatbot Platform** (herbie-server) | chat.herbago.info | Python/FastAPI, Docker | GitLab `herbago-tools/herbie-server` | manuale `git pull` Hetzner | 🟢 PRD |
| 2 | **HerbaMarketer** | dashboard.herbago.info (302 login) | Python + Next.js, Docker | GitHub `omarbortolato/HerbaMarketer` | Coolify | 🟢 PRD |
| 3 | **PIM** | pim.herbago.it (302 login) | **PHP 8.2 / LiteSpeed** | GitLab (accesso da avere) | hosting LiteSpeed | 🟢 PRD — **non integrato** con AI platform |
| 4 | **OMS** | oms.herbago.it (302 login) | **PHP 8.2 / LiteSpeed** | GitLab (accesso da avere) | hosting LiteSpeed | 🟢 PRD — **non integrato** con AI platform |
| 5 | **Siti WordPress/WooCommerce** | 8 domini (herbago.*, herbashop.it, hlifeus, hlifeau) | WordPress/WooCommerce | — | SiteGround/Hostinger | 🟢 PRD |
| 6 | **herbago.info** (home) | herbago.info (200) | da definire | — | — | 🟢 Live — **target console unificata** |
| 7 | **Reverse proxy condiviso** | nginx | nginx, Docker | dentro herbie-server → `/root/platform/nginx/` | Hetzner | 🟢 PRD (cross-progetto) |
| 8 | **platform/ holding** (chatbot/marketing/analytics/security) | — | — | board | — | 🔴 Solo README stub — **estrazione non fatta** |

**Nota deploy:** convivono **due metodi** — manuale `git pull` (herbie-server) e Coolify (HerbaMarketer). Da standardizzare su Coolify (vedi strategia).

---

## 2. AI Chatbot Platform — dettaglio (sistema #1)

**Servizi Docker realmente definiti** (`docker-compose.yml`): `litellm`, `qdrant`, `concierge`, `agent-preferred-customer`, `agent-distributor`, `agent-ecommerce`, `drive-indexer`, `scraper`, `google-workspace`, `postgres`, `analytics`.

| Componente | Stato reale | Note |
|---|---|---|
| litellm (gateway) | 🟢 PRD | opus aggiornato 4-7→4.8 (2026-06-27); embeddings su OpenAI ⚠️ |
| qdrant / postgres | 🟢 PRD | vettori + conversazioni |
| concierge (router) | 🟢 PRD | main/registry/router |
| agent-distributor | 🟢 PRD | 13 lingue, RAG indicizzato |
| agent-ecommerce | 🟢 PRD | live, fine-tuning; WooCommerce solo herbago.it attivo, altri siti env opzionali vuoti |
| agent-preferred-customer | 🟡 PARZIALE | agente esiste, ma per CLAUDE.md: collections Qdrant da popolare, widget non integrato sui 2 siti, URL siti da verificare |
| drive-indexer / scraper / google-workspace | 🟢 PRD | supporto RAG |
| analytics + dashboard | 🟢 PRD | chat.herbago.info/dashboard (200), quality score via Haiku, sentiment, costi |
| test console | 🟢 Live | chat.herbago.info/dashboard/test (200) |
| widget WordPress | 🟡 PARZIALE | plugin pronto; rollout sui siti incompleto (herbago.it da abilitare, distributor da installare) |

**⚠️ Documentazione stale (DEBITO):** `CLAUDE.md` documenta agenti **`products`, `prices`, `health`** che **NON esistono** nel codice (`services/agents/` contiene solo `base, distributor, ecommerce, preferred-customer`). Da pulire.

---

## 3. HerbaMarketer — dettaglio (sistema #2)

Più avanzato di quanto i doc holding lasciassero intendere.

- **Servizi:** `app`, `worker`, `db` (compose proprio)
- **Agenti:** `content_agent`, `seo_agent`, `translator_agent`, `validator_agent`, `ads_advisor`, `analytics_advisor`
- **Publishers:** `brevo`, `mautic`, `wordpress`, `wp_importer`
- **Integrazioni già fatte:** GSC, Google Ads (trend giornaliero), AI suggestions, **Strategy Dashboard** (`/strategy`), email ingestor Gmail IMAP, immagini DALL-E ⚠️
- **Copertura:** 7 siti — 6 Mautic + 1 Brevo (16+ email testate in PRD, articoli pubblicati come bozze WP)

**Implicazione:** è già il `Marketing Engine` del platform layer. Non riscrivere, generalizzare. La razionalizzazione ESP (6 Mautic → 1, decisa 2026-06-27) parte da qui.

---

## 4. PIM & OMS — dettaglio (sistemi #3 e #4) — NUOVI nel quadro

Sviluppati l'anno scorso, **PHP 8.2 su LiteSpeed**, stack completamente diverso dalla AI platform.

- **PIM** (`pim.herbago.it`): gestisce i prodotti per i siti `herbago.xx` (NON herbashop.it). Da CLAUDE.md: "prende prodotti dal sito ufficiale, crea descrizioni/immagini, alimenta tutti i WooCommerce".
- **OMS** (`oms.herbago.it`): "riceve ordini via webhook, arricchisce con dati Herbalife da email (tracking incluso)".

**Stato integrazione:** 🔴 **non integrati** con la AI platform. CLAUDE.md li elenca già come TODO ("Integrazione PIM in piattaforma", "Integrazione OMS in piattaforma"). Oggi l'agent-ecommerce legge gli ordini da WooCommerce API, non dall'OMS, e il catalogo non arriva dal PIM.

**Raccomandazione (API-first, no rewrite ora):** esporre PIM e OMS via API dentro l'**Integrations Hub** della piattaforma → l'agent-ecommerce attinge catalogo (PIM) e stato ordini/tracking (OMS) da un'unica fonte. Riscrittura nello stack Python solo se/quando giustificata. **Serve accesso GitLab** per valutare le API esistenti.

---

## 5. Debito tecnico (prioritizzato)

| Priorità | Debito | Impatto | Azione |
|---|---|---|---|
| 🔴 Alta | **Zero test automatizzati** in herbie-server | Regressioni a rischio su deploy manuali | Test harness chatbot (golden conv + LLM-judge) — Fase 1 |
| 🔴 Alta | **Frammentazione**: 3 repo (GitLab herbie, GitHub HerbaMarketer, board) + PIM/OMS separati + poliglotta (Python/PHP/Next.js/WP) | Nessuna vista unica, integrazione faticosa | Consolidamento `platform/`+`tenants/` + Integrations Hub |
| 🟠 Media | **Sovereignty leak**: embeddings OpenAI + immagini DALL-E | Dipendenza esterna su dati/asset | Piano migrazione dietro LiteLLM/interfaccia |
| 🟠 Media | **Doc stale**: agenti phantom products/prices/health in CLAUDE.md | Confusione, onboarding errato | Pulizia CLAUDE.md |
| 🟠 Media | **Due metodi di deploy** (manuale vs Coolify) | Incoerenza, errori | Standardizzare su Coolify |
| 🟠 Media | **6 istanze Mautic** | Ops pesante | Consolidare su 1 (deciso) |
| 🟡 Bassa | **No identity/customer service unificato** | Blocca app Emiliano + personalizzazione | Progettare in Fase 4 |
| 🟡 Bassa | **No API gateway / cost-tracker centrale** | No vista costi, no auth unificata | Fase 1 (cost-tracker) / Fase 3 (gateway) |
| 🟡 Bassa | **Widget rollout incompleto** + preferred-customer parziale | Valore non capitalizzato | Completare rollout |

---

## 6. Sintesi per il meeting

- **Buona notizia:** 4 sistemi su 8 sono solidamente in PRD (chatbot, HerbaMarketer, PIM, OMS, siti). Non costruiamo da zero, **integriamo e consolidiamo**.
- **Realtà poliglotta:** Python (AI) + PHP (PIM/OMS) + Next.js (HerbaMarketer) + WordPress (siti). La strategia API-first è ciò che li tiene insieme senza rewrite di massa.
- **Il vero lavoro di Fase 1** non è "scrivere codice nuovo" ma: ridurre frammentazione, esporre PIM/OMS via API, mettere il test harness, standardizzare il deploy.
- **Sblocco necessario:** accesso GitLab a PIM/OMS per valutarne le API.
