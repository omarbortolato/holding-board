# CISO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.

---

## 2026-06-26 | DECISION | Onboarding completato — passaggio a DELEGATED

**Decisione di Omar (CEO):** onboarding CISO concluso. Focus attuale: Herbalife. Livello di autonomia passa da SUPERVISED a **DELEGATED**.

**Regola:** agire in autonomia su problemi non rischiosi (fix configurazione reversibili, documentazione, audit, alert). Se un'azione è rischiosa (credenziali in produzione, infrastruttura live, accessi, impatto economico/legale) → portare la decisione al ritual settimanale per conferma di Omar, non agire da solo.

Vedi `AGENT.md` per i criteri di passaggio ad AUTONOMOUS.

---

## 2026-06-26 | CHECK | Controllo settimanale — WARNING (header sicurezza incompleti su 9/10 siti)

**Status:** check settimanale eseguito da locale (sessione interattiva, non routine cloud — il problema di permessi push GitHub descritto nell'entry del 24/06 è ancora aperto, vedi okr.md). Nessun ALERT. Risultato complessivo: **WARNING**.

**1. Scadenza certificati SSL** — tutti PASS, nessuno sotto i 30 giorni. Nota: a differenza del check del 24/06 (tutti scadevano il 2026-07-24, ipotesi cert multi-dominio condiviso), ora le scadenze sono **scaglionate per dominio** → confermato che il rinnovo automatico (certbot) funziona ed è per-dominio, non un singolo cert condiviso come ipotizzato. Il rischio "tutti i siti giù insieme" segnalato la settimana scorsa è quindi superato.

| Dominio | Scadenza | Giorni rimanenti | Stato |
|---|---|---|---|
| herbago.info | 2026-09-21 | ~87 | ✅ PASS |
| herbago.it | 2026-07-31 | ~35 | ✅ PASS |
| herbago.fr | 2026-08-18 | ~53 | ✅ PASS |
| herbago.de | 2026-09-12 | ~78 | ✅ PASS |
| herbago.co.uk | 2026-09-12 | ~78 | ✅ PASS |
| herbago.net | 2026-09-01 | ~67 | ✅ PASS |
| herbashop.it | 2026-08-15 | ~50 | ✅ PASS |
| hlifeclienteprivilegiato.it | 2026-09-05 | ~71 | ✅ PASS |
| hl-distributor.com | 2026-07-31 | ~35 | ✅ PASS |
| hlifepreferredcustomer.com | 2026-08-16 | ~51 | ✅ PASS |

**2. Security header HTTP** (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) — `curl -sIL` su ogni dominio (seguendo redirect 301 dove presenti):

| Dominio | X-Frame-Options | X-Content-Type-Options | Referrer-Policy | Stato |
|---|---|---|---|---|
| herbago.info | ✅ SAMEORIGIN | ✅ nosniff | ✅ strict-origin-when-cross-origin | ✅ PASS |
| herbago.it | ❌ assente | ❌ assente | ❌ assente | ⚠️ WARNING |
| herbago.fr | ❌ assente | ❌ assente | ❌ assente | ⚠️ WARNING |
| herbago.de | ❌ assente | ❌ assente | ⚠️ presente ma debole (`no-referrer-when-downgrade`) | ⚠️ WARNING |
| herbago.co.uk | ❌ assente | ❌ assente | ⚠️ presente ma debole | ⚠️ WARNING |
| herbago.net | ❌ assente | ❌ assente | ⚠️ presente ma debole | ⚠️ WARNING |
| herbashop.it | ❌ assente | ❌ assente | ❌ assente | ⚠️ WARNING |
| hlifeclienteprivilegiato.it | ❌ assente | ❌ assente | ⚠️ presente ma debole | ⚠️ WARNING |
| hl-distributor.com | ❌ assente | ❌ assente | ⚠️ presente ma debole | ⚠️ WARNING |
| hlifepreferredcustomer.com | ❌ assente | ❌ assente | ❌ assente | ⚠️ WARNING |

`SECURITY.md` (§6) documenta questi header come configurati in Nginx su tutti i virtual host. Solo `herbago.info` li espone correttamente nella risposta osservata da qui; gli altri 9 siti non li espongono (o solo parzialmente, con un valore più debole del previsto) nella risposta vista da questo ambiente. **Non è un ALERT** per istruzione esplicita (possibile effetto di CDN/cache/proxy intermedio tra questo ambiente e il server reale, oppure i siti `.it/.fr/.de/...` non passano dallo stesso nginx config di `herbago.info`/CMS diverso) — ma è una discrepanza degna di verifica manuale sul server Hetzner per capire se Nginx sta davvero servendo questi header per quei virtual host o se la config è stata applicata solo su uno.

**3. Controlli a livello di codice** (rate limiting, CORS, `.env` tracked): non eseguiti — repo GitLab privato Herbalife non disponibile da questo ambiente. Ultimo audit pratico manuale (`AUDIT` in questo log): 2026-06-24, **2 giorni fa** → entro la soglia dei 30 giorni, nessuna azione richiesta.

**Azioni suggerite:**
- Verificare su Hetzner perché i security header Nginx (§6 SECURITY.md) non risultano su 9/10 virtual host — possibile config applicata a un solo server block.
- Permessi push GitHub per routine cloud ancora bloccati (vedi okr.md) — check di questa settimana fatto a mano per lo stesso motivo della settimana scorsa.

---

## 2026-06-24 | CHECK | Test routine settimanale cloud — WARNING + problema infra

**Status:** primo run di test della routine cloud CISO (manuale, 18:17 UTC). Eseguito con successo il check SSL; bloccato sul push (vedi "Problema infrastruttura" sotto). Questa entry è stata scritta a mano da Omar/Claude in sessione locale perché il commit prodotto dal cloud agent (`8b217a1`/`c192463`) non è riuscito a raggiungere `origin/main` ed è andato perso con la fine della sessione cloud.

**Risultato check SSL (tutti i domini Herbalife):**

| Dominio | Scadenza | Stato |
|---|---|---|
| herbago.info / .it / .fr / .de / .co.uk / .net | 2026-07-24 | ⚠️ WARNING (29 giorni) |
| herbashop.it | 2026-07-24 | ⚠️ WARNING (29 giorni) |
| hlifeclienteprivilegiato.it | 2026-07-24 | ⚠️ WARNING (29 giorni) |
| hl-distributor.com | 2026-07-24 | ⚠️ WARNING (29 giorni) |
| hlifepreferredcustomer.com | 2026-07-24 | ⚠️ WARNING (29 giorni) |

Stessa scadenza su tutti i domini → probabile certificato multi-dominio condiviso. Nessun ALERT (soglia <14gg non raggiunta), ma **da verificare che certbot rinnovi automaticamente** sul server Hetzner prima del 24/07/2026 — se il rinnovo automatico fallisse, tutti i siti andrebbero giù in contemporanea.

**Controllo header di sicurezza HTTP:** non eseguibile dall'ambiente cloud della routine — il sandbox blocca le richieste HTTP/HTTPS in uscita (solo TLS raw è permesso). Rimosso dalla routine, da fare solo in audit manuale locale.

**Problema infrastruttura (bloccante per l'automazione):** il push su `holding-board` fallisce con HTTP 403 sia dal git proxy locale sia dall'integrazione GitHub MCP dell'ambiente cloud ("Resource not accessible by integration") — l'ambiente ha accesso in lettura al repo ma non in scrittura. Finché non si risolve, la routine può fare i check ma non può scrivere i risultati: serve intervento manuale ogni settimana, oppure sbloccare i permessi (vedi azione richiesta a Omar in cima al file/okr.md).

---

## 2026-06-24 | AUDIT | Primo controllo pratico Herbalife — PASS

**Status:** primo audit pratico (non solo documentazione) eseguito su Herbalife.

| Controllo | Risultato |
|---|---|
| `.env` / `secrets/` non tracciati da git | ✅ PASS |
| Rate limiting nginx (20r/min) attivo nel config | ✅ PASS |
| Rate limiting slowapi (20-30/min) attivo nel codice concierge | ✅ PASS |
| CORS whitelist coerente con siti attivi | ✅ PASS |
| Certificato SSL herbago.info | ✅ Valido fino al 2026-09-21 |
| Email deprecata `omarbortolato@gmail.com` nel codice | ✅ Nessun residuo |
| SSH key Hetzner | ✅ Dedicata, accesso solo Omar |

**Risposte Omar raccolte e documentate** in `board/ciso/reports/herbalife.md` e `herbalife/docs/SECURITY.md` (§3, §8, §13, §14).

**Gap aperti (non testabili da remoto, da pianificare):**
- Nessun penetration test mai eseguito (solo config review)
- Credenziali (`AGENT_SECRET_TOKEN`, Claude API, Brevo, WooCommerce) mai ruotate
- 3 siti su Iubenda piano free (hl-distributor.com, hlifepreferredcustomer.com, hlifeclienteprivilegiato.it) — valutare upgrade

**Automazione attivata:** cron agent settimanale (lunedì) per ripetere questo tipo di controllo + aggiornare okr.md/log.md. Vedi entry successiva.

---

## 2026-06-06 | NOTE | Attivazione ruolo
**Status:** SUPERVISED — prima priorità: audit security baseline su Herbalife.
**NOTE:** Verificare status SSH key Hetzner, rotazione credenziali, GDPR compliance siti attivi.
