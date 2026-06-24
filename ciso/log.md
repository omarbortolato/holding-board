# CISO — Decision & Alert Log

> Append-only. Aggiungere entry in cima.

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
