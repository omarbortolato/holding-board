# Progetto: Herbalife AI Platform

**Status:** 🟢 ACTIVE
**Priorità:** 🔥 HIGH — focus principale Q2-Q3 2026
**Path codice:** `/root/herbalife`
**Server:** Hetzner (`/opt/platform/`)
**Repo:** GitLab — `gitlab.com/herbago-tools/herbie-server` (deploy: `git pull origin main` manuale su Hetzner, nessun ambiente di staging)

---

## Scopo

Piattaforma AI che gestisce in autonomia le tre linee di business Herbalife di Omar ed Emiliano:
- **Ecommerce** — vendita online prodotti (herbago.*, herbashop.it, hlifeus.com, hlifeau.com)
- **Cliente Privilegiato** — programma fedeltà con sconti (hlifeclienteprivilegiato.it + hlifepreferredcustomer.com)
- **Downline/Distributori** — supporto rete distributori (hl-distributor.com)

---

## Board owner — diretti riporti specifici di progetto

| Ruolo | Responsabilità nel progetto | Diretto riporto |
|---|---|---|
| CMO | Strategia marketing, content, email, ads | [Marketing Manager Herbalife](/root/board/cmo/reports/herbalife.md) |
| CTO | Architettura agenti, infrastruttura, deploy | [Tech Lead Herbalife](/root/board/cto/reports/herbalife.md) |
| COO | Customer care, processi operativi | [Ops Lead Herbalife](/root/board/coo/reports/herbalife.md) |
| CFO | P&L siti, ROI agenti AI, budget ads | [Finance Lead Herbalife](/root/board/cfo/reports/herbalife.md) |
| CISO | GDPR siti, security agenti, credenziali | [Security Lead Herbalife](/root/board/ciso/reports/herbalife.md) |

---

## Stack tecnologico

| Componente | Tecnologia |
|---|---|
| Agenti AI | Python + FastAPI + Claude API (via LiteLLM) |
| Vector DB | Qdrant |
| CMS siti | WordPress + WooCommerce |
| Email | Brevo (transazionali) + Mautic (nurturing) |
| Hosting siti | SiteGround / Hostinger |
| Infrastruttura AI | Hetzner (Docker) |
| Drive | Google Drive (knowledge base) |

---

## Agenti in produzione

| Porta | Agente | Stato | Lingue |
|---|---|---|---|
| 8013 | agent-distributor | 🟢 PRD | 13 lingue |
| 8014 | agent-preferred-customer | 🟢 PRD | 10 lingue |
| 8015 | agent-ecommerce | 🟡 IN DEV | multilingua multi-dominio |
| 8030 | drive-indexer | 🟢 PRD | — |

**Prossima porta:** 8016

---

## KPI (da definire con CFO + CMO)

| KPI | Target | Attuale |
|---|---|---|
| Conversioni chatbot ecommerce | Da definire | — |
| Ticket customer care automatizzati | >80% | — |
| Traffico organico mensile | Da definire | — |
| P&L mensile piattaforma | Positivo | — |

---

## Google Drive folder IDs

| Cartella | ID |
|---|---|
| Root Herbalife | `1NnfIaRqe6hWzJdicVYNs0Q-vqbE0hHWJ` |
| Distributor Italia | `1sKYh9G_TBk0zc-CH6YPiqqXBZztrj8G3` |
| Distributor Global | `1JD3aB3SfMlLVfiIELXGa6O0hp80mvZZK` |
| Preferred Customer | `1Jo7XzY7NfutyiSWIWZb8FlHCktocJZgs` |

---

## Contatti

- Omar: owner tecnico + business
- Emiliano: co-owner business
- Michele: Senior Architect — da coinvolgere su strategia test suite/CI-CD e architettura piattaforma (deciso 2026-06-26)
- Email supporto: info@herbago.info
- Sponsor code distributore: 25Y0334307 / Cognome: PAS

---

## Sotto-progetti

| Sotto-progetto | Path | Repo | Stato |
|---|---|---|---|
| HerbaMarketer | `/root/herbalife/herbamarketer/` | `github.com/omarbortolato/HerbaMarketer` | 🟢 PRD su Coolify (dashboard.herbago.info) — marketing automation (email nurturing + articoli SEO), in fase di ottimizzazione |
| WhatsApp Gateway (OpenWA) | `/root/herbalife/services/whatsapp-gateway/` (scaffold) | `github.com/rmyndharis/OpenWA` (upstream, non vendorizzato) | 🟡 SCOPE CONFERMATO (Omar 2026-06-29: uso esterno clienti/distributori, rischio ban accettato in prima persona, basso traffico no bulk) — bloccante: numero dedicato da procurare + review CISO su custodia credenziali/GDPR |

> Repo e deploy separati da `herbie-server`, mantenuto come sotto-cartella solo per centralizzare lo sviluppo in VS Code (`.gitignore` in herbalife).

## Roadmap

| Priority | Task | Status |
|---|---|---|
| 🔥 NOW | agent-ecommerce in PRD, fine-tuning continuo con l'uso | 🟢 LIVE — non più "da chiudere" (chiarito CTO 2026-06-26) |
| 🔥 NOW | Dashboard monitoraggio chatbot (chat.herbago.info/dashboard) | 🟢 LIVE |
| 🔥 NOW | Ambiente di test chatbot (chat.herbago.info/dashboard/test) | 🟢 LIVE |
| 🔥 NOW | HerbaMarketer — ottimizzazione marketing automation | 🟡 IN PROGRESS |
| 🔥 NOW | Dashboard marketing unificata (tutti account ads/analytics su HerbaMarketer) | 🟡 IN PROGRESS — onboarding CMO 2026-06-24 |
| 🔥 NOW | Funnel recruiting Italia (profilo basso + profilo alto) e funnel followup su hl-distributor.com/it | 🟡 IN PROGRESS — onboarding CMO 2026-06-24 |
| 🔥 NOW | Funnel recruiting estero Ecommerce Manager (FR/DE/UK/IE) | 🟡 IN PROGRESS — onboarding CMO 2026-06-24 |
| 🔥 NOW | Workflow content approval (Omar + Emiliano) — Notion "HL Content Calendar" creato, manca trigger pubblicazione | 🟡 IN PROGRESS |
| 📅 NEXT | Canale WhatsApp clienti (OpenWA) — scope confermato da Omar, manca numero dedicato + review CISO | 🟡 IN PROGRESS — confermato 2026-06-29, bloccante su numero + sign-off CISO |
| 📅 NEXT | Strategia architettura piattaforma herbago.info multi-progetto — sessione con Opus per fondamenta | 🔵 PLANNED — deciso CTO 2026-06-26 |
| 📅 NEXT | Strategia contenuti SEO + email nurturing (HerbaMarketer) | 🔵 PLANNED |
| 📅 NEXT | Portale/pagina eventi distributori (poi chatbot dedicato distributori) | 🔵 PLANNED |
| 📅 NEXT | Programma test suite + CI/CD pipeline — non priorità Q3, da discutere con Michele (Senior Architect) ed Emiliano | 🔵 PLANNED |
| 🔮 FUTURE | PIM autonomo | 🔵 PLANNED |
| 🔮 FUTURE | OMS AI | 🔵 PLANNED |
| 🔮 FUTURE | HerbaMarketer come piattaforma marketing multi-progetto (non solo Herbalife) | 🔵 PLANNED |
