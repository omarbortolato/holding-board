# Progetto: AI Friday

**Status:** 🟢 ACTIVE
**Priorità:** 📅 MEDIUM
**Path codice:** `/root/ai-friday`
**Server:** Netlify (hosting + auto-deploy da GitHub)

---

## Scopo

AI Friday è il metodo che porta l'adozione dell'AI in azienda partendo dalle persone, non dalla tecnologia. Si presenta come un format con una rete di Ambassador, un framework agile e una piattaforma proprietaria. Il sito è una landing page statica che presenta il metodo e raccoglie contatti commerciali tramite form.

---

## Architettura

| Elemento | Dettaglio |
|---|---|
| Repo GitHub | [github.com/omarbortolato/aifriday](https://github.com/omarbortolato/aifriday), branch `main` |
| Path locale | `/root/ai-friday` |
| Hosting | Netlify, collegato al repo GitHub — ogni push su `main` triggera auto-deploy del sito live |
| Tipo sito | Landing page statica (no backend, no DB) |
| Form contatti | Netlify Forms — form `contact` in `index.html`, gestito via `data-netlify="true"`. Il submit deve fare una POST AJAX (`fetch`) verso `/` con `Content-Type: application/x-www-form-urlencoded` perché Netlify riceva i dati (un semplice `preventDefault` + messaggio locale NON basta, i dati non arrivano) |

### File principali

| File | Contenuto |
|---|---|
| `index.html` | Markup della landing (hero, metodo, ambassador, framework, risultati, form contatti, footer) |
| `styles.css` | Stili |
| `script.js` | Logica: validazione e invio form, animazioni hero (particelle/orbit), counters, reveal on scroll |
| `image-slot.js` | Gestione slot immagini |
| `foto/`, `screens/`, `uploads/` | Asset statici |

---

## Workflow di lavoro (base operativa)

1. **Modifiche**: editiamo i file direttamente in `/root/ai-friday`
2. **Test in locale**: server statico Python già pronto
   ```bash
   python3 -m http.server 8088 --directory /root/ai-friday
   ```
   poi aprire `http://localhost:8088` — ma **funziona solo se si apre dal browser sulla stessa macchina** (no porte remote: il port-forwarding/tunnel via VSCode o servizi come localtunnel si è rivelato inaffidabile in questo ambiente). In alternativa più comoda: clonare il repo sul proprio PC e aprire `index.html` direttamente, oppure usare i Deploy Preview di Netlify su branch separati da `main`.
3. **Commit & push**: SOLO sulla cartella `/root/ai-friday` (repo dedicato, separato dalla holding)
   - Identità git locale già configurata: `Omar Bortolato <omarbortolato@gmail.com>`
   - Push via HTTPS con Personal Access Token fornito dall'utente al momento (mai salvato su disco — si usa inline in env var e si fa `unset` subito dopo, non deve finire in `.git/config` o `~/.git-credentials`)
4. **Deploy live**: automatico — Netlify rileva il push su `main` e ripubblica il sito
5. **Verifica form**: dopo il deploy, fare una submission di prova sul sito live e controllare che compaia in Netlify → Site → Forms

---

## Board owner

| Ruolo | Responsabilità nel progetto |
|---|---|
| CMO | Posizionamento, tone of voice, contenuti landing |
| CTO | Hosting, evoluzione stack, fix tecnici (es. form Netlify) |
| COO | Definizione del format/framework operativo |
| CFO | Modello di business e P&L |
| CISO | Da valutare (sito statico, basso surface — nessun dato sensibile salvo submission form) |

---

## Stack tecnologico

| Componente | Tecnologia |
|---|---|
| Frontend | HTML/CSS/JS statico (vanilla, no framework) |
| Backend | — (nessuno, sito statico) |
| Form/Lead | Netlify Forms |
| AI | — |
| DB | — |
| Hosting | Netlify (auto-deploy da GitHub `main`) |

---

## Agenti AI (se applicabile)

| Porta | Agente | Stato |
|---|---|---|
| — | — | — |

---

## KPI

| KPI | Target | Attuale |
|---|---|---|
| Submission form contatti | — | Da monitorare ora che il fix è live |

---

## Tone of voice

Da definire con CMO — dal sito emerge un posizionamento "metodo/framework" orientato a portare l'AI in azienda partendo dalle persone, con focus su risultati concreti e network di Ambassador interni.

---

## Onboarding board completato

- [ ] CMO: tone of voice e marketing strategy
- [x] CTO: architettura e stack mappati (sito statico + Netlify + Forms)
- [ ] CISO: security surface analizzata
- [ ] COO: processi operativi mappati
- [ ] CFO: budget e KPI finanziari definiti

---

## Roadmap

| Priority | Task | Status |
|---|---|---|
| 🔥 NOW | Import codice da GitHub | 🟢 DONE |
| 🔥 NOW | Fix invio form contatti (mancava POST a Netlify) | 🟢 DONE |
| 🔥 NOW | Aggiornamento link social footer (LinkedIn, rimozione X) | 🟢 DONE |
| 📅 NEXT | Verificare arrivo submission reali in Netlify Forms | 🔵 PLANNED |
| 📅 NEXT | Kick-off board (scopo, priorità, tone of voice) | 🔵 PLANNED |
