# CISO — OKR

> Aggiornato ogni lunedì.

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
