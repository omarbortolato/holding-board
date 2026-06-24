# SECURITY.md — Herbalife AI Platform

> Questo documento descrive il modello di sicurezza della piattaforma e le regole operative da seguire per ogni nuovo sviluppo.
> **Leggere prima di aggiungere endpoint, integrare servizi esterni, o modificare la configurazione di rete.**

---

## 1. Threat model

La piattaforma espone un'API pubblica (chat widget) consumata da browser di utenti anonimi su siti WordPress. I rischi principali sono:

| Rischio | Impatto | Mitigazione attiva |
|---|---|---|
| Spam / flooding API | Costi LLM elevati, DoS | Rate limiting Nginx + slowapi |
| Abuso token | Accesso non autorizzato | Bearer token su tutti gli endpoint |
| Scraping conversazioni | Privacy utenti | Auth su analytics, sessioni in memoria |
| Iniezione nel prompt | Risposta fuori controllo | System prompt agenti, no tool pericolosi |
| Accesso a servizi interni | Data breach | Docker network isolation, nessuna porta esposta |
| CORS abuse | Richieste da siti malevoli | Whitelist domini nel concierge |
| Payload XSS | Widget compromesso | Input validato da Pydantic, no HTML in output |

---

## 2. Rate limiting (doppio livello)

### 2.1 Nginx — primo livello (infrastruttura)

File: `/root/platform/nginx/nginx.conf` (reverse proxy condiviso a tutti i progetti)

```nginx
limit_req_zone $binary_remote_addr zone=chat:10m rate=20r/m;
limit_req zone=chat burst=5 nodelay;
limit_req_status 429;
```

- **20 req/min per IP** con burst di 5 messaggi rapidi
- Adeguato a una chat normale (1 msg ogni 3s sostenuto)
- Ritorna HTTP 429 senza raggiungere il concierge
- Usa IP reale via `CF-Connecting-IP` (Cloudflare) o `X-Real-IP`

### 2.2 slowapi — secondo livello (applicazione)

File: `services/concierge/src/main.py`

```python
limiter = Limiter(key_func=_get_real_ip)

@limiter.limit("20/minute")   # /webhook, /api/webhook, /chat
@limiter.limit("30/minute")   # /webhook/session/* (meno critico)
```

- Difesa in profondità: blocca eventuali bypass del layer Nginx
- Usa `X-Real-IP` impostato da Nginx per ottenere l'IP reale
- Risponde con `{"response": "..."}` nel formato atteso dal plugin WordPress
- Loga ogni violazione con IP e path (visibile in `docker logs concierge`)

### 2.3 Quando modificare i limiti

| Scenario | Azione |
|---|---|
| Falsi positivi su utenti legittimi | Alzare `burst` in Nginx (non il rate) |
| Attacco in corso | Abbassare `rate` in Nginx a `5r/m`, reload nginx |
| Nuovo agente con uso intensivo (es. batch) | Chiamare direttamente l'agente via rete interna, non via webhook |

---

## 3. Autenticazione

### 3.1 AGENT_SECRET_TOKEN

Tutti gli endpoint del concierge e degli agenti richiedono questo token:

```
Authorization: Bearer <AGENT_SECRET_TOKEN>
```

oppure come query param (retrocompatibilità plugin WordPress):

```
POST /api/webhook?token=<AGENT_SECRET_TOKEN>
```

**Regole:**
- Il token deve essere una stringa random di almeno 32 caratteri
- Non committare mai il valore reale in git (solo in `.env`)
- Ruotare il token se compromesso: aggiornare `.env`, rebuild containers
- I container interni (agenti → concierge) usano lo stesso token via variabile d'ambiente

**⚠️ Stato attuale (audit 2026-06-24):** `AGENT_SECRET_TOKEN` e gli altri token/chiavi (Claude API, Brevo, WooCommerce) **non sono mai stati ruotati** da quando sono stati creati. Nessuna rotazione periodica pianificata. Rischio noto, da mitigare con un piano di rotazione (vedi roadmap CISO).

### 3.2 Altri token

| Servizio | Variabile | Dove usato |
|---|---|---|
| Analytics API | `ANALYTICS_AUTH_TOKEN` | Dashboard, logging conversazioni |
| Qdrant | `QDRANT_API_KEY` | Tutti gli agenti (vector search) |
| LiteLLM | `LITELLM_MASTER_KEY` | Gateway LLM |
| WooCommerce | `WC_*_KEY` / `WC_*_SECRET` | Solo agente ecommerce, read-only |

---

## 4. CORS

File: `services/concierge/src/main.py` → `_ALLOWED_ORIGINS`

Solo i domini elencati possono fare richieste cross-origin al concierge via browser:

```python
_ALLOWED_ORIGINS = [
    "https://herbago.it", "https://www.herbago.it",
    "https://herbashop.it", ...
]
```

**Regola:** ogni volta che si aggiunge un nuovo sito WordPress, aggiungere il dominio (con e senza `www`) a `_ALLOWED_ORIGINS` e fare rebuild del concierge.

Gli agenti interni non hanno restrizioni CORS perché comunicano solo via Docker network, non via browser.

---

## 5. TLS / SSL

- Certificati: Let's Encrypt (o self-signed in test) in `/etc/nginx/ssl/`
- Protocolli: TLSv1.2 + TLSv1.3 (TLS 1.0 e 1.1 disabilitati)
- Cipher: `HIGH:!aNULL:!MD5`
- HTTP → HTTPS redirect automatico per tutti i virtual host
- Rinnovo certificati: cron automatico (`certbot renew`) — verificare in `docs/infrastructure/hetzner.md`

---

## 6. Security headers HTTP

Configurati in Nginx su tutti i server HTTPS:

| Header | Valore | Scopo |
|---|---|---|
| `X-Frame-Options` | `SAMEORIGIN` | Blocca clickjacking |
| `X-Content-Type-Options` | `nosniff` | Blocca MIME sniffing |
| `X-XSS-Protection` | `1; mode=block` | Filtro XSS browser legacy |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limita leaking URL |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Nega API browser non necessarie |
| `server_tokens off` | — | Nasconde versione Nginx |

**Non implementato (futuro):** Content-Security-Policy — richiede analisi degli script inline del widget e del portal React.

---

## 7. Isolamento rete Docker

Tutti i servizi interni comunicano via Docker network interna (`docker-compose.yml`).

| Esposto all'esterno | Porta | Note |
|---|---|---|
| Nginx | 80, 443 | Unico punto d'ingresso |
| — | — | Tutto il resto è interno |

I servizi interni (qdrant, litellm, postgres, agenti) **non hanno porte mappate sull'host**. Non sono raggiungibili dall'esterno.

**Regola:** mai aggiungere `ports:` a un servizio interno nel `docker-compose.yml` senza discussione esplicita. Usare `expose:` se un altro container deve raggiungerlo.

---

## 8. Secrets management

| Categoria | Come gestirlo |
|---|---|
| API keys, token, password | Solo in `.env` (mai in git) |
| Google Service Account JSON | Docker secret (`/run/secrets/google_sa`) |
| `.env` in produzione | Solo su server Hetzner, accesso SSH limitato |
| Backup secrets | Conservati su Google Drive criptato o password manager |
| SSH key Hetzner | Key **dedicata** al server Hetzner (non condivisa con altri progetti/scopi), accesso riservato esclusivamente a Omar |

**Regola:** prima di ogni commit, verificare che `git diff` non contenga chiavi, token, o password. Se succede accidentalmente: ruotare immediatamente il secret, non solo eliminarlo dal commit.

**Email di supporto:** `info@herbago.info` è l'indirizzo corrente per il fallback email (Brevo, agenti). L'indirizzo deprecato `omarbortolato@gmail.com` non risulta più presente nel codice (verificato 2026-06-24, nessun riferimento residuo nel repo).

---

## 9. Validazione input

Tutti gli endpoint usano **Pydantic** per la validazione automatica del payload. Non fidarsi di nessun campo proveniente dal widget:

- `chatInput`: stringa, max controllato da `client_max_body_size 64k` in Nginx
- `type`: validato contro `TYPE_TO_AGENT` (whitelist esplicita)
- `language`: normalizzato da `_normalize_lang()` con fallback
- `website_url`: usato solo per estrarre hostname via `urlparse`

**Regola per i nuovi agenti:** non eseguire mai comandi di sistema, query SQL, o chiamate HTTP basate direttamente su input utente non sanificato.

---

## 10. Iniezione prompt

Gli agenti usano un system prompt fisso + contesto RAG + messaggio utente. Per ridurre il rischio di prompt injection:

- Il system prompt è hardcoded nell'agente, non modificabile via API
- Il messaggio utente è trasmesso come contenuto del turno `user`, non come istruzione di sistema
- I tool degli agenti sono a sola lettura (RAG, WooCommerce read-only, email outbound solo verso indirizzi predefiniti)
- Non esporre mai tool che modifichino dati (scrittura DB, cancellazione ordini, ecc.)

---

## 11. Monitoring e alerting

Strumenti attuali:
- **Nginx error log**: `/var/log/nginx/error.log` — errori 4xx/5xx
- **Docker logs**: `docker logs concierge --tail 100` — rate limit violations, routing errors
- **Analytics dashboard**: `chat.herbago.info/dashboard/` — KPI conversazioni, quality score

**Da implementare (priorità media):**
- Alert email/Slack se tasso di errori 5xx supera soglia
- Alert se costi LLM (token) superano budget giornaliero
- Monitoraggio uptime (UptimeRobot o simile) su `/health`

---

## 12. Checklist sicurezza per ogni nuovo sviluppo

Prima di dichiarare una feature completata:

- [ ] Nessun secret hardcoded nel codice
- [ ] Nuovo endpoint protetto da `_verify_token()` o `@limiter.limit()`
- [ ] Input validato da Pydantic (non fidarsi di nessun campo)
- [ ] Se nuovo sito WordPress: dominio aggiunto a `_ALLOWED_ORIGINS`
- [ ] Se nuovo servizio Docker: nessuna porta esposta all'esterno (`expose:` non `ports:`)
- [ ] Se nuovo tool negli agenti: read-only o con destinazione predefinita
- [ ] Test end-to-end superato (vedi CLAUDE.md §6)
- [ ] Questo documento aggiornato se cambia il modello di sicurezza

> **Ultimo audit pratico:** nessuno (vedi §13). Ultimo aggiornamento risposte CISO: 2026-06-24.

---

## 13. Audit e penetration test

**Stato (audit CISO 2026-06-24):** non è mai stato eseguito un penetration test, nemmeno informale, sulla piattaforma. I controlli descritti in questo documento sono stati verificati a livello di configurazione/documentazione ma non testati attivamente con tecniche offensive.

Non sono note al momento CVE o vulnerabilità identificate e non ancora risolte.

**Da fare (priorità):** pianificare un primo audit pratico (anche solo manuale, su rate limiting/auth/CORS) prima di un eventuale pentest formale.

---

## 14. GDPR — Cookie consent e privacy policy

Tutti i siti usano **Iubenda**, ma con piani diversi:

| Sito | Piano Iubenda |
|---|---|
| `herbashop.it` | A pagamento |
| `herbago.it` / `.fr` / `.de` / `.co.uk` / `.net` | A pagamento |
| `hl-distributor.com` | Free |
| `hlifepreferredcustomer.com` | Free |
| `hlifeclienteprivilegiato.it` | Free |

**Nota:** il piano free di Iubenda offre cookie policy/privacy policy di base ma non il consent management completo (banner avanzato, blocco script pre-consenso) disponibile nel piano a pagamento. Da valutare se i siti su piano free necessitano dell'upgrade in base al traffico e ai cookie di terze parti effettivamente in uso.

---

## 15. Incident response (guida rapida)

### API sotto attacco (flooding)

```bash
# Abbassa il rate limit a 5 req/min
# Modifica /root/platform/nginx/nginx.conf: rate=5r/m burst=2
cd /root/platform/nginx && docker compose exec nginx nginx -s reload

# Verifica IP attaccanti
cd /root/platform/nginx && docker compose exec nginx tail -f /var/log/nginx/error.log | grep "limiting"
```

### Token compromesso

```bash
# 1. Genera nuovo token
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# 2. Aggiorna .env su server
# 3. Rebuild tutti i servizi che usano il token
docker compose up -d --build concierge agent-distributor agent-preferred-customer agent-ecommerce
```

### Container compromesso

```bash
# Isola il container dalla rete
docker network disconnect herbalife_default <container_name>

# Analizza logs
docker logs <container_name> --since 1h
```
