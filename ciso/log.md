# CISO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.

---

## 2026-06-29 | REQUEST | Review sicurezza OpenWA prima dell'adozione (canale WhatsApp Herbalife)

**Richiedente:** CTO, dopo meeting con CMO (verbale completo in cto/log.md e cmo/log.md, stessa data).

**Contesto:** Omar ha chiesto di adottare **OpenWA** (https://github.com/rmyndharis/OpenWA — wrapper non ufficiale su WhatsApp Web) come canale di comunicazione per Herbalife, in sostituzione/affiancamento al bot Telegram di HerbaMarketer usato oggi per le notifiche di approvazione contenuti.

**Raccomandazione CTO già data:** procedere solo per uso **interno** (notifiche team), mai per comunicazione con clienti/distributori esterni (per quello serve WhatsApp Business API ufficiale Meta/Twilio/360dialog). Numero dedicato, non un account critico.

**Cosa serve da te prima del via libera:**
1. Valutare il rischio di tenere una sessione WhatsApp autenticata (token/cookie persistenti) su un'infrastruttura che ha già un alert aperto su rotazione credenziali e secrets esposti su GitLab (vedi la tua entry precedente) — è prudente farlo in parallelo o va prima chiuso quel debito?
2. Definire dove e come va custodita la sessione OpenWA (equivalente a una credenziale, va trattata come tale: non in chiaro, non nel repo)
3. Confermare se serve un audit prima del go-live anche per questo nuovo componente

**Ambiguità ancora aperta con Omar (non bloccante per la tua review, ma da tenere a mente):** se in futuro Omar vuole estendere WhatsApp ai clienti (es. programma Cliente Privilegiato, oggi "Email + WhatsApp da fare" nel dossier CMO), la superficie di rischio e gli obblighi GDPR cambiano completamente — quella circostanza richiederà una review separata.

**Aggiornamento 2026-06-29 — ambiguità risolta, scope ora è ESTERNO:** Omar ha confermato di voler usare OpenWA per comunicare anche con clienti/distributori, non solo internamente. Si assume personalmente il rischio operativo di ban account (basso traffico, no invii massivi). **Quello che NON ha coperto e che resta sul tuo tavolo:**
1. Trattamento dati clienti via un canale non ufficiale — implicazioni GDPR (base giuridica, informativa, eventuale registro trattamenti) dato che oggi i clienti su WhatsApp saranno gestiti tramite un numero/sessione gestita da terze parti tecniche non contrattualizzate (a differenza di Brevo/Mautic)
2. Custodia della sessione/credenziali OpenWA (token equivalente a una password, non va in chiaro né nel repo)
3. Conferma se serve audit pre-go-live
**Unica condizione posta da Omar:** numero dedicato (non più il suo personale) — da procurare prima del pairing, bloccante insieme alla tua review.

---

## 2026-06-29 | CHECK | Controllo settimanale — WARNING (header sicurezza incompleti su 9/10 siti)

**Status:** check settimanale eseguito da locale (sessione interattiva). Nessun ALERT. Risultato complessivo: **WARNING** (stesso pattern della settimana scorsa).

**1. Scadenza certificati SSL** — tutti PASS, nessuno sotto i 30 giorni. Nota: `herbago.it` e `hl-distributor.com` sono a 32 giorni — entro soglia ma in avvicinamento al WARNING di 30 giorni. Certbot dovrebbe rinnovarli automaticamente nei prossimi giorni.

| Dominio | Scadenza | Giorni rimanenti | Stato |
|---|---|---|---|
| herbago.info | 2026-09-21 | 84 | ✅ PASS |
| herbago.it | 2026-07-31 | 32 | ✅ PASS (vicino soglia!) |
| herbago.fr | 2026-08-18 | 50 | ✅ PASS |
| herbago.de | 2026-09-12 | 75 | ✅ PASS |
| herbago.co.uk | 2026-09-12 | 75 | ✅ PASS |
| herbago.net | 2026-09-01 | 64 | ✅ PASS |
| herbashop.it | 2026-08-15 | 47 | ✅ PASS |
| hlifeclienteprivilegiato.it | 2026-09-05 | 68 | ✅ PASS |
| hl-distributor.com | 2026-07-31 | 32 | ✅ PASS (vicino soglia!) |
| hlifepreferredcustomer.com | 2026-08-16 | 48 | ✅ PASS |

**2. Security header HTTP** (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) — `curl -sIL` su ogni dominio (seguendo redirect):

| Dominio | X-Frame-Options | X-Content-Type-Options | Referrer-Policy | Stato |
|---|---|---|---|---|
| herbago.info | ✅ SAMEORIGIN | ✅ nosniff | ✅ strict-origin-when-cross-origin | ✅ PASS |
| herbago.it | ❌ assente | ❌ assente | ❌ assente | ⚠️ WARNING |
| herbago.fr | ❌ assente | ❌ assente | ❌ assente | ⚠️ WARNING |
| herbago.de | ❌ assente | ❌ assente | ⚠️ no-referrer-when-downgrade | ⚠️ WARNING |
| herbago.co.uk | ❌ assente | ❌ assente | ⚠️ no-referrer-when-downgrade | ⚠️ WARNING |
| herbago.net | ❌ assente | ❌ assente | ⚠️ no-referrer-when-downgrade | ⚠️ WARNING |
| herbashop.it | ❌ assente | ❌ assente | ❌ assente | ⚠️ WARNING |
| hlifeclienteprivilegiato.it | ❌ assente | ❌ assente | ⚠️ no-referrer-when-downgrade | ⚠️ WARNING |
| hl-distributor.com | ❌ assente | ❌ assente | ⚠️ no-referrer-when-downgrade | ⚠️ WARNING |
| hlifepreferredcustomer.com | ❌ assente | ❌ assente | ❌ assente | ⚠️ WARNING |

Pattern identico alla settimana scorsa (2026-06-26): solo `herbago.info` espone correttamente tutti e 3 gli header. Gli altri 9 siti li mancano o li espongono in forma debole — coerente con l'ipotesi che la config Nginx sia applicata solo al virtual host `herbago.info` e non agli altri. **Non è un ALERT** (istruzione esplicita — possibile CDN/proxy intermedio), ma la discrepanza persiste da 2 settimane consecutive: suggerito controllo manuale sul server Hetzner della config Nginx per gli altri virtual host.

**3. Controlli a livello di codice** (rate limiting, CORS, `.env` tracked): non eseguiti — repo GitLab privato non disponibile. Ultimo audit pratico manuale (`AUDIT`): 2026-06-24, **5 giorni fa** → entro soglia 30 giorni.

**4. ALERT aperto (da 2026-06-27):** segreti committati in GitLab PIM/OMS — in attesa di conferma Omar per rotazione credenziali. Nessuna azione autonoma intrapresa (rischio elevato, regola DELEGATED).

**Azioni suggerite per Omar:**
- Verificare su Hetzner config Nginx per virtual host `herbago.it`, `herbago.fr`, ecc. — perché i security header non risultano nelle risposte HTTP da qui ma sono documentati in SECURITY.md §6.
- Controllare che certbot abbia rinnovato (o stia per rinnovare) `herbago.it` e `hl-distributor.com` — entrambi a 32 giorni, soglia WARNING a 30 giorni.
- Confermare rotazione credenziali PIM/OMS (ALERT 2026-06-27 ancora aperto).

---

## 2026-06-27 | ALERT | Segreti committati nei repo GitLab PIM/OMS (da CTO)
**Contesto:** durante il censimento piattaforma, il CTO ha clonato `gitlab.com/herbago/oms-herbago` e `gitlab.com/herbago/pim-herbago` per valutare le API e ha rilevato credenziali in chiaro versionate.
**Finding:**
- **OMS** — `sync_config.jsonc` git-tracked contiene credenziali FTP in chiaro: produzione (host `86.107.36.160`, user `ftpuser@oms.herbago.it`) e staging Hostinger (`46.202.158.161`).
- **PIM** — `.env` git-tracked (nonostante `.gitignore`) contiene credenziali DB (`DB_HOST/DB_NAME/DB_USER/DB_PASS`).
**Rischio:** chiunque abbia accesso (anche storico) ai repo ha accesso FTP produzione + DB. Esposizione attiva.
**Azione raccomandata (RISCHIOSA → conferma Omar al ritual):**
1. Rotazione immediata credenziali FTP (prod+staging) e password DB PIM
2. `git rm --cached` dei file + aggiunta a `.gitignore` + purge dalla history (git filter-repo/BFG)
3. Spostare config in secrets non versionati (pattern `.env` + secrets/ già usato in herbie-server)
4. Audit accessi repo GitLab (chi ha avuto accesso)
**Stato:** segnalato a Omar 2026-06-27, in attesa di conferma per la rotazione.

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
