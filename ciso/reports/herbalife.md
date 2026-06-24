# Security Lead — Herbalife

**Riporta a:** board/ciso (policy, standard, checklist)
**Riporta anche su:** postura di sicurezza specifica del progetto Herbalife
**Status onboarding:** 🟢 SCOPE MATURO — `docs/SECURITY.md` completo, domande di audit (2026-06-24) risposte e documentate. Aperti: primo audit pratico/pentest e piano rotazione credenziali.

---

## Cosa già sappiamo (da `herbalife/docs/SECURITY.md`)

Il progetto Herbalife ha già una postura di sicurezza ben documentata:

| Area | Stato |
|---|---|
| Threat model | ✅ Documentato |
| Rate limiting | ✅ Doppio livello — nginx (infrastruttura) + slowapi (applicazione) |
| Autenticazione | ✅ AGENT_SECRET_TOKEN + altri token |
| CORS | ✅ Configurato |
| TLS/SSL | ✅ Attivo |
| Security headers HTTP | ✅ Configurati |
| Isolamento rete Docker | ✅ Implementato |
| Secrets management | ✅ `.env` + `secrets/` gitignored |
| Validazione input | ✅ Documentata |
| Difesa prompt injection | ✅ Documentata (sezione dedicata — raro vederla esplicitata, buon segno) |
| Monitoring e alerting | ✅ Documentato |
| Incident response runbook | ✅ Esiste (flooding API, token compromesso, container compromesso) |

**Questo progetto è probabilmente il più maturo della holding su security** — può diventare il blueprint per `platform/security/`.

---

## Risposte di Omar (2026-06-24)

1. **Ultimo audit reale:** mai fatto un penetration test, nemmeno informale. Nessuna verifica pratica dei controlli oltre alla documentazione.
2. **Rotazione credenziali:** `AGENT_SECRET_TOKEN` e le altre chiavi (Claude API, Brevo, WooCommerce) sono le stesse da sempre, nessuna rotazione periodica.
3. **GDPR sui siti:** tutti i siti usano Iubenda. Piano a pagamento su `herbashop.it` e sui vari `herbago.*`. Piano free su `hl-distributor.com`, `hlifepreferredcustomer.com` e `hlifeclienteprivilegiato.it`.
4. **Email fallback deprecata:** confermato `info@herbago.info` come indirizzo corretto. Verificato che `omarbortolato@gmail.com` non è più presente nel codice — nessuna bonifica residua necessaria.
5. **SSH key Hetzner:** key dedicata (non condivisa con altri progetti), accessibile solo a Omar.
6. **Vulnerabilità note in sospeso:** nessuna nota a oggi.

➡️ Risposte e dettagli riportati in `herbalife/docs/SECURITY.md` (sezioni 3, 8, 13, 14).

---

## Priorità immediata (aggiornata 2026-06-24)

Confermato dalle risposte di Omar che mancano due cose concrete, oltre alla documentazione già solida:

1. **Nessun audit/pentest mai fatto** — i controlli sono documentati ma non verificati attivamente. Priorità: primo audit pratico manuale (rate limiting, auth, CORS).
2. **Credenziali mai ruotate** — `AGENT_SECRET_TOKEN`, Claude API, Brevo, WooCommerce sono le stesse da sempre. Rischio noto da mitigare con un piano di rotazione.
3. **GDPR piano free su 3 siti** (`hl-distributor.com`, `hlifepreferredcustomer.com`, `hlifeclienteprivilegiato.it`) — da valutare se serve upgrade Iubenda in base al traffico/cookie terze parti.

Risolte: bonifica email deprecata (nessun residuo nel codice), SSH key Hetzner (dedicata, accesso solo Omar), nessuna CVE nota in sospeso.

---

## OKR specifici progetto (aggiornati)

- KR1: Pianificare ed eseguire un primo audit pratico (manuale) sui controlli documentati in SECURITY.md
- KR2: ~~Bonifica riferimenti a email deprecata~~ ✅ completato — nessun riferimento residuo
- KR3: ~~Verifica GDPR su tutti i siti attivi~~ ✅ completato — mappatura piani Iubenda fatta, valutare upgrade siti su piano free
- KR4: Definire piano di rotazione credenziali (mai ruotate finora)
