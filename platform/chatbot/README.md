# Platform — Chatbot Base

**Owner:** CTO
**Status:** 🟡 PARZIALE — framework esiste in herbalife, non ancora estratto

---

## Scopo

Framework base per creare chatbot AI in qualsiasi progetto della holding.
Contiene la logica comune: routing, session memory, RAG, LLM gateway, widget embed.
Il contenuto (knowledge base, tone of voice, FAQ) è fornito dal progetto specifico.

---

## Componenti (da estrarre da herbalife)

| Componente | Fonte attuale | Status estrazione |
|---|---|---|
| Session memory | `herbalife/services/agents/base/common.py` | 🔵 Da fare |
| Lingua normalizer | `herbalife/services/agents/base/common.py` | 🔵 Da fare |
| Quick reply helper | `herbalife/services/agents/base/common.py` | 🔵 Da fare |
| Concierge (routing hub) | `herbalife/services/concierge/` | 🔵 Da fare |
| Widget WordPress | `herbalife/widget/` | 🔵 Da fare |
| LiteLLM gateway | `herbalife/services/litellm/` | 🔵 Da fare |
| Drive indexer | `herbalife/services/drive-indexer/` | 🔵 Da fare |

---

## API del framework (target)

```
POST /chat
  payload: { session_id, message, lang, project_config }
  response: { reply, quick_replies, source }

POST /index
  payload: { project_id, drive_folder_id, site_urls }
  response: { status, docs_indexed }

GET /health
  response: { status, uptime, last_index }
```

---

## Onboarding nuovo progetto

1. Aggiungere `project_config` in configurazione (nome, tone, knowledge sources)
2. Fornire `drive_folder_id` per documenti specifici
3. Fornire `site_urls` per scraping knowledge web
4. Configurare porta agente (range 8010–8099)
5. Deploy con docker-compose

---

## Note per CTO

Estrarre questo framework DOPO che agent-ecommerce è in produzione e stabile.
Non anticipare — serve almeno un ciclo completo di sviluppo/debug prima di astrarre.
