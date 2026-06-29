# Ops Lead — Herbalife

**Riporta a:** board/coo (processi standard, qualità, SLA)
**Riporta anche su:** obiettivi operativi specifici del progetto Herbalife
**Status onboarding:** 🟡 BASELINE COSTRUITA (2026-06-29) — domande operative risposte, SLA v1 leggero fissato in [board/coo/AGENT.md](/root/board/coo/AGENT.md), follow-up aperti sotto

---

## Cosa già sappiamo (dedotto da CLAUDE.md)

- Customer care multilingua gestito dai chatbot Herbie (agent-distributor: 13 lingue, agent-preferred-customer: 10 lingue)
- Routing: widget WordPress → webhook → concierge → agente specifico in base al `type`
- Email fallback per ecommerce: Brevo SMTP → omarbortolato@gmail.com (⚠️ vedi nota CISO: email deprecata, da verificare se ancora in uso)
- WhatsApp nurturing per Cliente Privilegiato: pianificato, non attivo
- Eventi bisettimanali offline in zona per recruiting distributori IT

**Non esiste ancora:** una mappa dei processi operativi, SLA documentati, runbook di incident, criteri di QA sugli output degli agenti.

---

## Risposte di Omar (2026-06-29)

1. **Volume attuale:** bassissimo, manca ancora un vero sistema di ticketing. Sui chatbot è stato istruito un fallback: email o WhatsApp in caso di risposta non conosciuta. Dashboard dati: https://chat.herbago.info/dashboard/
2. **Escalation umana:** confermato fallback umano richiesto — email oppure link WhatsApp (a seconda del sito) per inoltrare la conversazione a un umano. Contatti per sito nella tabella "Contatti del sito" della dashboard.
3. **Email di supporto:** `info@herbago.info` è l'unica attiva e usata (così la riceviamo tutti); l'importante è differenziare da quale sito arriva. `omarbortolato@gmail.com` confermato deprecato.
4. **Qualità risposte:** controllo a campione fatto periodicamente. Creata sezione "Qualità & Sentiment" nella dashboard per dare feedback all'agente che assegna uno score a ogni risposta. **Segnalazione apertura (2026-06-29):** nel test (https://chat.herbago.info/dashboard/test) l'agente ecommerce risponde "vai sul sito ad acquistare" invece di dare direttamente il link prodotto — sospetto comportamento solo in modalità test, da verificare in produzione.
5. **Onboarding nuovo sito/country:** aggiunto in piattaforma un tab "Configurazione" per inserire un nuovo sito; il deploy resta però manuale (fatto a mano dal team). Onboarding nuovo distributore/ecommerce manager non automatizzato — non prioritario ora per downline minima, da ripensare quando crescerà.
6. **Incident avuti:** nessun down degli agenti finora (early stage).

---

## Priorità immediata — risolta (2026-06-29)

Confermato l'approccio "mappa prima, SLA dopo". Omar ha lasciato al COO la scelta di uno SLA iniziale sostenibile (non vincolante): vedi tabella "SLA operativi v1" in [board/coo/AGENT.md](/root/board/coo/AGENT.md).

## Scope del COO su Herbalife — chiarito con Omar

Il COO non gestisce la piattaforma né scrive le risposte dei chatbot (quello resta CTO+CMO). Il COO presidia il livello operativo sopra gli agenti: SLA, qualità, incident, e soprattutto il punto dove la conversazione passa da agente a umano (escalation email/WhatsApp). Interagisce principalmente con: CTO (SLA tecnici/infrastruttura), CMO (customer journey/tone), CFO (costo per operazione), CISO (dati personali nelle escalation).

## Roadmap di crescita del COO (orizzonte 2026 H2)

1. **Ora:** triage escalation umana formalizzato, QA loop settimanale sulla dashboard Qualità & Sentiment, SLA leggeri come baseline misurabile.
2. **Prossimo:** runbook scritto per onboarding nuovo sito (oggi solo manuale), incident post-mortem template.
3. **Quando il volume crescerà:** drafting assistito delle email di supporto per i casi su cui l'agente non è sicuro — bozza preparata dal COO, invio sempre umano (Omar/Emiliano). Richiede ticketing minimo, accesso autorizzato a info@herbago.info, via libera CISO sui dati personali.
4. **A regime:** lo stesso playbook operativo (SLA, QA, incident, onboarding) replicato su ogni nuovo progetto della holding, rendendo il COO il garante trasversale dei processi — coerente con la visione di piattaforma condivisa della holding.

---

## Follow-up apertI (dopo risposte 2026-06-29)

- [ ] Verificare in produzione (non solo in test) che l'agente ecommerce dia il link diretto al prodotto e non rimandi genericamente al sito
- [ ] Documentare processo di deploy manuale nuovo sito (oggi solo a mano, nessun runbook)
- [ ] Pianificare onboarding automatizzato distributore/ecommerce manager quando la downline crescerà (non ora)
- [ ] Definire SLA target sul fallback umano (tempo di risposta email/WhatsApp dopo escalation)

---

## OKR specifici progetto (da impostare dopo onboarding)

_Da compilare dopo le risposte sopra._
