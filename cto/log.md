# CTO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.
> Tipi: DECISION | ALERT | REPORT | REQUEST | NOTE

---

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
