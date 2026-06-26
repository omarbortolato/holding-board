# CISO — OKR

> Aggiornato ogni lunedì.

---

## Settimana 2026-W26 bis (26 Giu, check infra-settimanale)

### Obiettivo: Check settimanale di sicurezza (SSL + header) — eseguito a mano per blocco push cloud

| Key Result | Target | Attuale | Status |
|---|---|---|---|
| Certificati SSL Herbalife (10 domini) | Tutti >30gg | ✅ Tutti PASS, scadenze scaglionate (35–87gg) — confermato rinnovo automatico per-dominio, non cert condiviso come ipotizzato la settimana scorsa | DONE |
| Security header HTTP base (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) | Presenti su tutti i siti | ⚠️ Solo `herbago.info` li espone tutti correttamente; 9/10 siti mancano `X-Frame-Options`/`X-Content-Type-Options` (vedi log.md 2026-06-26) | WARNING — da verificare config Nginx su Hetzner |
| Permessi scrittura GitHub per routine cloud | Concessi | 🔴 Ancora bloccato — check di questa settimana fatto manualmente in locale, stesso problema della W26 | BLOCCATO |
| Audit pratico manuale Herbalife | <30gg dall'ultimo | ✅ Ultimo audit 2026-06-24, entro soglia | DONE |

---

## Settimana 2026-W26 (22–28 Giu)

### Obiettivo: Attivare la routine settimanale automatica

| Key Result | Target | Attuale | Status |
|---|---|---|---|
| Audit pratico Herbalife (manuale) | Completo | ✅ Fatto 2026-06-24 (vedi log.md) | DONE |
| Risposte CISO Herbalife raccolte da Omar | Complete | ✅ Fatto 2026-06-24 | DONE |
| Routine cloud settimanale creata e testata | Funzionante end-to-end | ⚠️ Creata, test fallito sul push (403 GitHub) | BLOCCATO |
| Permessi scrittura GitHub per l'ambiente cloud | Concessi | 🔴 Da fare — **azione richiesta a Omar**: connettere/configurare un'integrazione GitHub con permesso "Contents: write" sul repo `omarbortolato/holding-board` via claude.ai/customize/connectors (o equivalente impostazione ambiente), altrimenti la routine può solo leggere e segnalare, non scrivere log/okr da sola | BLOCCATO |
| Certificati SSL Herbalife | Rinnovo verificato | ⚠️ Scadono tutti il 2026-07-24 (29gg) — verificare rinnovo automatico certbot su Hetzner prima di quella data | DA VERIFICARE |

---

## Settimana 2026-W23 (02–06 Giu)

### Obiettivo: Audit security baseline Herbalife

| Key Result | Target | Attuale | Status |
|---|---|---|---|
| Inventario credenziali e accessi Herbalife | Completo | 🔵 Da fare | PLANNED |
| Verifica .env e secrets gitignored | Verificato | 🔵 Da fare | PLANNED |
| GDPR compliance status Herbalife | Report | 🔵 Da fare | PLANNED |

---

## OKR Mensile — Giugno 2026

**O1: Security audit Herbalife**
- KR1: Checklist security compilata per ogni agente in produzione
- KR2: Credenziali inventariate e classificate per sensitività
- KR3: SSH key Hetzner verificata e documentata

**O2: Policy security holding**
- KR1: Security policy base scritta in `platform/security/`
- KR2: Checklist pre-deploy standardizzata e condivisa con CTO
