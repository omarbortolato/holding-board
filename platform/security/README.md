# Platform — Security

**Owner:** CISO + CTO
**Status:** 🔵 PLANNED

---

## Scopo

Strumenti, policy e checklist di sicurezza condivisi tra tutti i progetti.
Ogni nuovo progetto eredita queste policy automaticamente.

---

## Componenti pianificati

| Componente | Status | Note |
|---|---|---|
| Security policy holding | 🔵 PLANNED | Regole base per tutti i progetti |
| Checklist pre-deploy | 🔵 PLANNED | Da `board/ciso/AGENT.md` → automatizzare |
| Credential scanner | 🔵 PLANNED | Scansione automatica per credenziali esposte |
| SSL monitor | 🔵 PLANNED | Alert scadenza certificati |
| Dependency audit | 🔵 PLANNED | CVE scan automatico |
| GDPR compliance kit | 🔵 PLANNED | Template privacy policy, cookie consent |

---

## Policy in vigore (da board/ciso/AGENT.md)

- Credenziali SOLO in `.env` (mai in codice)
- Secrets SOLO in `secrets/` (gitignored)
- HTTPS obbligatorio su tutti gli endpoint pubblici
- Rate limiting obbligatorio su API esposte
- PII non loggati in chiaro
- Review CISO prima di ogni deploy in produzione

---

## Prerequisiti

- [ ] Security audit Herbalife completato (CISO)
- [ ] Inventario credenziali compilato
- [ ] Checklist pre-deploy testata su almeno 1 deploy
