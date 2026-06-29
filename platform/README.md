# Platform — Servizi condivisi

> La piattaforma è il cuore del modello holding.
> Ogni servizio qui è riusabile da qualsiasi progetto — e domani vendibile come prodotto.

---

## Principio

**CTO costruisce. CMO governa il contenuto. CISO approva. COO monitora.**

La piattaforma non ha logica di business specifica. Il business specifico sta nei progetti.
Onboarding di un nuovo progetto = configurare la piattaforma con i dati del nuovo cliente.

---

## Servizi

| Servizio | Path | Owner C-level | Status | Usa |
|---|---|---|---|---|
| Marketing engine | `marketing/` | CMO + CTO | 🔵 PLANNED | herbalife, future |
| Chatbot base | `chatbot/` | CTO | 🟡 PARZIALE* | herbalife |
| Analytics | `analytics/` | COO + CFO | 🔵 PLANNED | tutti |
| Security | `security/` | CISO + CTO | 🔵 PLANNED | tutti |

*Il framework chatbot esiste in `/root/herbalife/services/agents/` ma non è ancora estratto come componente generico.

---

## Come aggiungere un nuovo servizio

1. Creare cartella `platform/[nome]/`
2. Scrivere `README.md` con: scopo, API, configurazione, onboarding
3. Nessuna business logic specifica — solo logica generica parametrizzabile
4. Review CTO (architettura) + CISO (security) prima del primo uso

---

## Roadmap piattaforma

| Priority | Servizio | Milestone |
|---|---|---|
| 🔥 NOW | chatbot/ | Estrarre pattern da herbalife (dopo agent-ecommerce completo) |
| 📅 NEXT | marketing/ | Dopo baseline marketing Herbalife documentata |
| 📅 NEXT | analytics/ | Dopo P&L baseline CFO |
| 📅 NEXT | security/ | Dopo security audit CISO Herbalife |
| 🔮 FUTURE | Onboarding UI | Form web per configurare nuovo progetto sulla piattaforma |
