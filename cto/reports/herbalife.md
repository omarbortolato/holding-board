# Tech Lead — Herbalife

**Riporta a:** board/cto (architettura, standard, platform)
**Riporta anche su:** obiettivi tecnici specifici del progetto Herbalife
**Status onboarding:** 🟢 SCOPE CHIARO — priorità confermate da Omar il 2026-06-26 (vedi [log.md](../log.md))

---

## Cosa già sappiamo (da CLAUDE.md / docs/ esistenti)

**Infrastruttura:** Hetzner 178.105.26.250, Ubuntu 22.04, Docker Compose, working dir `/root/herbalife/`

**Servizi Docker attivi:**
| Porta | Servizio |
|---|---|
| 80/443 | nginx |
| 8000 | concierge (routing hub) |
| 8010 | agent-products |
| 8011 | agent-prices |
| 8012 | agent-health |
| 8013 | agent-distributor |
| 8014 | agent-preferred-customer |
| 8015 | agent-ecommerce (in sviluppo) |
| 8020 | google-workspace |
| 8030 | drive-indexer |
| 8040 | analytics |

**Sotto-progetto separato:** HerbaMarketer (`herbamarketer/`) — repo e deploy proprio (GitHub + Coolify), tenuto in `.gitignore` del repo principale, vive nella cartella solo per comodità dev.

**Dashboard live (chiarito 2026-06-26):**
- `https://chat.herbago.info/dashboard/` — monitoraggio agenti chatbot (conversazioni, sentiment, qualità, cost monitoring, configurazione)
- `https://chat.herbago.info/dashboard/test` — ambiente di test chatbot, validazione prima del push in PRD
- `https://dashboard.herbago.info/` — HerbaMarketer (contenuti multi-sito, articoli, email Mautic/Brevo, GA + Google Ads collegati)
- Visione: `herbago.info` come piattaforma centrale della holding, da valutare per ospitare altri siti/progetti

**Regole architetturali consolidate (sezione 6 CLAUDE.md):**
- "Se è iterabile → Docker service" (pattern per ogni nuovo agente)
- Test end-to-end obbligatorio prima di dichiarare "fatto"
- Procedura standard per aggiungere un nuovo agente già documentata

**Security posture:** `docs/SECURITY.md` già completo — threat model, rate limiting doppio livello (nginx + slowapi), auth token, CORS, TLS, security headers, isolamento rete Docker, secrets management, validazione input, difese prompt injection, monitoring, incident response runbook. Vedi `board/ciso/reports/herbalife.md`.

---

## Risposte di Omar (2026-06-26)

1. **Priorità reale:** non sono in conflitto — gli agenti chatbot (distributor, preferred-customer, ecommerce) sono già il prodotto più evoluto: widget WordPress live, chatbot funzionante, dashboard di monitoraggio in PRD. agent-ecommerce è già funzionante e in fine-tuning continuo (non "da chiudere"). Il vero tema aperto è strategico: valutare se ridisegnare l'architettura di `herbago.info` come piattaforma centrale multi-progetto, e definire come produrre contenuti SEO + email di nurturing (via HerbaMarketer).
2. **Budget infrastruttura:** tetto autonomo €100/mese (Hetzner + Claude API). Per modificarlo serve discussione preventiva con Omar.
3. **Deploy authority:** fix minori → autonomia piena. Re-ingegnerizzazione della piattaforma → richiede strategia condivisa prima di procedere, per step; questa fase di fondamenta va condotta con Opus.
4. **Test suite e CI/CD:** confermato, non esistono ancora. Non priorità immediata, nessuna scadenza Q3. Va preparato un programma da discutere con Michele (Senior Architect, da coinvolgere) ed Emiliano (socio Herbalife).
5. **Estrazione platform/chatbot/:** confermata la regola — solo dopo stabilità in produzione, verificata tramite l'ambiente di test dedicato (`chat.herbago.info/dashboard/test`), non tramite una "chiusura" formale del progetto.

Decisioni registrate in dettaglio in [board/cto/log.md](../log.md).

---

## OKR specifici progetto (aggiornato 2026-06-26)

- KR1: agent-ecommerce stabile in PRD su tutti i domini herbago.*, fine-tuning continuo ✅ in corso
- KR2: Test e2e su agent-ecommerce prima del deploy (regola d'oro) — confermata, eseguita via ambiente di test `chat.herbago.info/dashboard/test`
- KR3: Nessuna regressione sugli agenti già in PRD durante lo sviluppo
- KR4 (nuovo): Bozza strategia architettura piattaforma `herbago.info` multi-progetto (sessione con Opus)
- KR5 (nuovo): Programma test suite/CI-CD da proporre a Michele ed Emiliano (non bloccante, oltre Q3)
