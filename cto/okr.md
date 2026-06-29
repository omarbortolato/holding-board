# CTO — OKR

> Aggiornato ogni lunedì.

---

## Settimana 2026-W26 (22–26 Giu)

### Obiettivo: Fine-tuning chatbot in PRD + strategia piattaforma herbago.info

**Contesto:** priorità chiarite con Omar il 26/06 — vedi [log.md](log.md). agent-ecommerce è già live, non più "da chiudere"; il vero tema della settimana è capire se/come ridisegnare herbago.info come piattaforma centrale multi-progetto.

| Key Result | Target | Attuale | Status |
|---|---|---|---|
| agent-ecommerce in PRD, fine-tuning continuo | Stabile | 🟢 Live, fine-tuning in corso | ON TRACK |
| Dashboard monitoraggio chatbot (chat.herbago.info/dashboard) | Online | 🟢 Live | DONE |
| Ambiente di test chatbot (chat.herbago.info/dashboard/test) | Online | 🟢 Live | DONE |
| Bozza architettura piattaforma herbago.info multi-progetto | Bozza pronta | 🟢 FATTO — [strategy/platform-strategy.md](strategy/platform-strategy.md) | DONE |
| Strategia contenuti SEO + email nurturing (HerbaMarketer) | Bozza | 🟡 Coperta nel doc (sez. 5.2/5.3), da dettagliare con CMO | IN PROGRESS |
| Budget infra sotto tetto €100/mese | <€100 | 🔵 Da monitorare | PLANNED |

---

## Settimana 2026-W27 (29 Giu – 03 Lug) — Fase 0: Allineamento

### Obiettivo: portare la strategia piattaforma al meeting Michele & Emiliano

| Key Result | Target | Attuale | Status |
|---|---|---|---|
| Documento strategia finalizzato + condiviso con Omar | Fatto | 🟢 Bozza pronta | DONE |
| Allineamento Omar su decisioni forcanti (email/ESP, monorepo, app Emiliano) | Allineato | 🔵 Da fare | PLANNED |
| Quick win: LiteLLM opus-4-7 → 4.8 | Fatto | 🟢 Editato (deploy manuale Hetzner) | DONE |
| Sovereignty leak: piano per embeddings/immagini OpenAI | Identificato | 🟢 Documentato | DONE |
| Censimento onesto PRD vs prototipo + debito tecnico | Fatto | 🟢 FATTO — [strategy/censimento-prd.md](strategy/censimento-prd.md) | DONE |
| Agenda + materiale meeting Michele/Emiliano | Pronto | 🟢 Doc + pagina Notion pubblicata | DONE |
| Valutazione PIM/OMS dal codice (API esistenti) | Fatto | 🟢 OMS ha REST API, PIM no — vedi censimento §4 | DONE |
| Valutazione canale WhatsApp (OpenWA, richiesta Omar 29/06) | Fatto | 🟢 Scope deciso (esterno, 1:1 assistito, no bulk) — manca numero dedicato + review CISO | IN PROGRESS |

---

## OKR Mensile — Giugno 2026

**O1: Agent-ecommerce Herbalife in produzione**
- KR1: Agente risponde correttamente su tutti i domini herbago.*
- KR2: WooCommerce cross-sell funzionante
- KR3: Email fallback Brevo attivo
- KR4: Drive RAG indicizzato per tutti i domini

**O2: Struttura holding operativa**
- KR1: board/ completo con tutti i AGENT.md ✅
- KR2: platform/ strutturata con README
- KR3: projects/ con card per ogni progetto
- KR4: Dashboard live

**O3: Fondamenta qualità**
- KR1: Almeno 5 test automatizzati su agent-ecommerce — rimandato, non priorità Q3 (decisione Omar 26/06), va preparato programma da discutere con Michele (Senior Architect) ed Emiliano prima di procedere
- KR2: Monitoring uptime base attivo (healthcheck endpoint) — parzialmente coperto da dashboard chat.herbago.info/dashboard

**O4: Strategia piattaforma herbago.info (nuovo, da 26/06)**
- KR1: Sessione di architettura con Opus per definire le fondamenta della piattaforma multi-progetto
- KR2: Coinvolgere Michele (Senior Architect) ed Emiliano per la roadmap test/CI-CD
- KR3: Definire strategia produzione contenuti SEO + email nurturing su HerbaMarketer
