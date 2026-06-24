# CTO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.
> Tipi: DECISION | ALERT | REPORT | REQUEST | NOTE

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
