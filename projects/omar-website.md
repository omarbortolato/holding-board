# Progetto: Omar Bortolato — Sito personale

**Status:** 🟢 ACTIVE
**Priorità:** 📅 MEDIUM
**Path codice:** `/root/omar-website`
**Server:** Vercel (auto-deploy da GitHub) — dominio custom omarbortolato.it

---

## Scopo

Sito professionale personale di Omar Bortolato, posizionato come "AI pratica per chi vuole fare, non solo sapere". Mostra progetti AI reali, guide pratiche, e funziona da lead generation per consulenza, speaking e business. Visione long-term: piattaforma business AI-powered con corsi, demo ecommerce, showcase startup.

---

## Architettura

| Elemento | Dettaglio |
|---|---|
| Repo GitHub | [github.com/omarbortolato/omar-website](https://github.com/omarbortolato/omar-website), branch `main` |
| Path locale | `/root/omar-website` |
| Hosting | Vercel, collegato al repo GitHub — ogni push su `main` triggera auto-deploy del sito live |
| Sito live | https://www.omarbortolato.it |
| Vercel project | https://vercel.com/omarbortolatos-projects/omarbortolato-site |
| CMS Blog | Notion (Content Inbox `2cfef582-d259-806b-a7a6-efc8bff25a68`), letto via Notion API |
| Automazione contenuti | n8n self-hosted 2.9.4 — https://wf.n8n.herbago.it |

---

## Stack tecnologico

| Componente | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Icone | Lucide React |
| CMS Blog | Notion API |
| AI | Claude Code + Claude.ai Projects (sviluppo), Claude/OpenAI (pipeline contenuti via n8n) |
| Hosting | Vercel (auto-deploy da `main`) |

---

## Board owner

| Ruolo | Responsabilità nel progetto |
|---|---|
| CMO | Posizionamento personal brand, content pipeline editoriale |
| CTO | Stack Next.js/Vercel, integrazione Notion CMS, pipeline n8n |
| COO | Flusso editoriale (Telegram → Notion → pubblicazione) |
| CFO | Lead generation → P&L consulenza/business |
| CISO | Da valutare (sito pubblico, no dati sensibili utenti) |

---

## Agenti AI (se applicabile)

| Porta | Agente | Stato |
|---|---|---|
| — | — | — |

---

## KPI

| KPI | Target | Attuale |
|---|---|---|
| Lead da pagina Collabora (Cal.com) | — | Da monitorare |
| Pubblicazioni blog/settimana | — | Da monitorare |
| Lead tracciati su Opportunità & Lead (AI Friday/Docbit/consulenza/speaking) | ≥1/settimana (baseline da validare) | Da monitorare — tracker creato 2026-06-27 |
| Guide pubblicate (lead magnet + a pagamento) | 4 pianificate | 0/4 — vedi Notion "Guide & Prodotti Digitali" |

---

## Tone of voice

"AI pratica per chi vuole fare, non solo sapere" — show don't tell (progetti reali documentati), human-centered AI, linguaggio accessibile senza gergo, autentico (condivide anche fallimenti/iterazioni).

---

## Onboarding board completato

- [x] CMO: tone of voice e marketing strategy → [board/cmo/reports/omar-website.md](/root/board/cmo/reports/omar-website.md) (lead gen AI Friday/Docbit/consulenza/speaking come priorità primaria)
- [x] CTO: architettura e stack mappati (Next.js + Vercel + Notion CMS + n8n)
- [ ] CISO: security surface analizzata
- [ ] COO: processi operativi mappati
- [ ] CFO: budget e KPI finanziari definiti

---

## Roadmap

| Priority | Task | Status |
|---|---|---|
| 🔥 NOW | Import codice da GitHub | 🟢 DONE |
| 📅 NEXT | Guida gratuita scaricabile (lead magnet PDF) | 🔵 PLANNED |
| 📅 NEXT | Redesign globale (light/dark mode, amber accents) | 🔵 PLANNED |
| 📅 NEXT | Test Signals Roundup | 🔵 PLANNED |
| 📅 NEXT | Kick-off board (scopo, priorità, tone of voice) | 🟡 PARZIALE — CMO fatto 2026-06-27, CISO/COO/CFO da fare |
