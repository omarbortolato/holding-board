# Tech Lead — Herbalife

**Riporta a:** board/cto (architettura, standard, platform)
**Riporta anche su:** obiettivi tecnici specifici del progetto Herbalife
**Status onboarding:** 🟢 SCOPE CHIARO — il progetto più documentato della holding

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

**Regole architetturali consolidate (sezione 6 CLAUDE.md):**
- "Se è iterabile → Docker service" (pattern per ogni nuovo agente)
- Test end-to-end obbligatorio prima di dichiarare "fatto"
- Procedura standard per aggiungere un nuovo agente già documentata

**Security posture:** `docs/SECURITY.md` già completo — threat model, rate limiting doppio livello (nginx + slowapi), auth token, CORS, TLS, security headers, isolamento rete Docker, secrets management, validazione input, difese prompt injection, monitoring, incident response runbook. Vedi `board/ciso/reports/herbalife.md`.

---

## Cosa manca — domande per Omar

1. **Priorità reale questa settimana:** chiudere agent-ecommerce, o spostare focus su ottimizzazione HerbaMarketer (visto che è "in fase di ottimizzazione")? Non possono essere entrambi #1.
2. **Budget infrastruttura:** c'è un tetto di spesa mensile Hetzner/Claude API che non deve essere superato? (serve anche al CFO)
3. **Deploy authority:** in questa fase chi approva un deploy in produzione — solo Omar, o posso procedere autonomamente su fix minori?
4. **Test suite e CI/CD:** confermi che non esistono ancora? È una priorità a breve o si può rimandare oltre Q3?
5. **Estrazione platform/chatbot/:** confermi che va fatta SOLO dopo che agent-ecommerce è stabile in produzione (come deciso nel log CTO)?

---

## OKR specifici progetto (proposta — da confermare)

- KR1: agent-ecommerce deploy produzione su tutti i domini herbago.*
- KR2: Test e2e su agent-ecommerce prima del deploy (regola d'oro)
- KR3: Nessuna regressione sugli agenti già in PRD durante lo sviluppo
