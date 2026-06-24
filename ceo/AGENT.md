# CEO — Chief Executive Officer

> In questa fase il ruolo di CEO è ricoperto direttamente da **Omar**.
> Questo file definisce il framework decisionale e i rituali di governance.
> Quando gli agenti C-level raggiungeranno livello DELEGATED, si valuta
> se introdurre un agente CEO autonomo per la coordinazione inter-C-level.

---

## Missione
Definire la strategia della holding, allocare le priorità tra progetti, approvare le decisioni che superano l'authority degli altri C-level, e garantire la coerenza tra visione di lungo periodo e execution quotidiana.

---

## Responsabilità CEO (Omar)

**Strategia**
- Definire priorità settimanali in `HOLDING.md` (sezione "Settimana corrente")
- Decidere quali nuovi progetti entrare nella holding e con quale priorità
- Approvare budget significativi proposti dal CFO
- Decidere il livello di autonomia da concedere ad ogni agente

**Governance**
- Review settimanale dei report di tutti i C-level
- Risoluzione conflitti inter-C-level (es. CMO vs CTO su priorità platform)
- Approvazione di ogni azione a rischio ALTO
- Definizione degli OKR trimestrali

**Comunicazione**
- Ogni lunedì: definisce focus settimana in `HOLDING.md`
- Ogni venerdì: legge i report in `board/[ruolo]/log.md` di tutti i C-level
- In caso di alert: risponde entro 4h su Slack, 24h su email

---

## Framework decisionale

### Matrice authority

| Decisione | CEO | CMO | CTO | COO | CFO | CISO |
|---|---|---|---|---|---|---|
| Strategia holding | ✅ Decide | 💬 Input | 💬 Input | 💬 Input | 💬 Input | 💬 Input |
| Budget >€500 | ✅ Approva | 📋 Propone | 📋 Propone | 📋 Propone | 📋 Propone | 📋 Propone |
| Nuovo progetto holding | ✅ Decide | 💬 Input | 💬 Input | 💬 Input | 💬 Input | 💬 Input |
| Deploy produzione | 💬 Informato | — | ✅ Approva | — | — | ✅ Review |
| Campagna marketing >€200 | 💬 Informato | ✅ Approva | — | — | ✅ Check | — |
| Modifica architettura | ✅ Approva | — | 📋 Propone | — | — | ✅ Review |
| Onboarding nuovo progetto | ✅ Decide | ✅ Esegue | ✅ Esegue | ✅ Coordina | ✅ Budget | ✅ Review |

---

## Ritual settimanale CEO

**Ogni lunedì mattina (~15 min)**
1. Aggiorna sezione "Settimana corrente" in `HOLDING.md`
2. Definisce top-3 priorità per ogni C-level attivo
3. Risponde ad eventuali alert del fine settimana

**Ogni venerdì (~30 min)**
1. Legge `log.md` di ogni C-level
2. Valuta avanzamento OKR
3. Decide eventuali pivot o aggiustamenti

---

## Criteri per aggiungere un agente CEO autonomo

Attivare un agente CEO autonomo ha senso solo quando:
- Almeno 3 C-level sono a livello DELEGATED 🟡
- Il volume di decisioni inter-C-level supera il tempo disponibile di Omar
- Il coordinamento autonomo tra agenti è stato testato e validato

Prima di questo: Omar è il CEO, il framework è questo documento.
