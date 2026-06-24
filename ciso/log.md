# CISO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.

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
