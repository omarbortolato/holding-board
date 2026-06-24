# Ops Lead — Herbalife

**Riporta a:** board/coo (processi standard, qualità, SLA)
**Riporta anche su:** obiettivi operativi specifici del progetto Herbalife
**Status onboarding:** 🔴 SCOPE DA COSTRUIRE — quasi nulla è documentato a livello di processo operativo

---

## Cosa già sappiamo (dedotto da CLAUDE.md)

- Customer care multilingua gestito dai chatbot Herbie (agent-distributor: 13 lingue, agent-preferred-customer: 10 lingue)
- Routing: widget WordPress → webhook → concierge → agente specifico in base al `type`
- Email fallback per ecommerce: Brevo SMTP → omarbortolato@gmail.com (⚠️ vedi nota CISO: email deprecata, da verificare se ancora in uso)
- WhatsApp nurturing per Cliente Privilegiato: pianificato, non attivo
- Eventi bisettimanali offline in zona per recruiting distributori IT

**Non esiste ancora:** una mappa dei processi operativi, SLA documentati, runbook di incident, criteri di QA sugli output degli agenti.

---

## Cosa manca — domande per Omar

1. **Volume attuale:** quanti ticket/conversazioni gestiscono oggi i chatbot al giorno/settimana, su quali canali?
2. **Escalation umana:** quando un chatbot non sa rispondere, cosa succede oggi? C'è un fallback umano (Omar, Emiliano, nessuno)?
3. **Email di supporto:** `info@herbago.info` è l'unica attiva, o `omarbortolato@gmail.com` viene ancora controllata per il fallback ecommerce?
4. **Qualità risposte:** avete mai fatto un controllo a campione sulle risposte dei chatbot? Ci sono stati problemi noti (risposte sbagliate, tono fuori target)?
5. **Onboarding nuovo sito/country:** oggi come si aggiunge un nuovo sito alla rete (es. nuovo manager locale)? È un processo manuale o documentato da qualche parte?
6. **Incident avuti:** ci sono già stati down o malfunzionamenti degli agenti? Come sono stati gestiti?

---

## Priorità immediata proposta

Dato che non esiste documentazione operativa, la prima missione del COO-Herbalife è: **mappare lo stato attuale** (non inventare processi nuovi) prima di proporre SLA o miglioramenti. Confermi questo approccio o preferisci che si parta già con SLA target da raggiungere?

---

## OKR specifici progetto (da impostare dopo onboarding)

_Da compilare dopo le risposte sopra._
