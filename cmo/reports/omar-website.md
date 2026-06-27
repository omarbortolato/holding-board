# Marketing Manager — Personal Brand (Omar Bortolato)

**Riporta a:** board/cmo (best practice, budget, priorità trasversali)
**Riporta anche su:** obiettivi specifici personal brand + lead generation per AI Friday/Docbit
**Status onboarding:** 🟢 COMPLETATO — strategia letta da `omar-website/CLAUDE.md` + Notion, confermata con Omar (2026-06-27)

---

## Scopo

Costruire la visibilità personale di Omar come esperto AI pratico, in due chiavi che si rinforzano a vicenda:
1. **Ruolo professionale (CAIO)** — autorevolezza su AI applicata in azienda
2. **Passione/pratica personale** — progetti reali, esperimenti, learning condivisi senza filtro corporate

**Perché lo facciamo (in ordine di importanza per Omar):**
1. 🔥 **Generare contatti per portare AI Friday nelle aziende** — l'obiettivo commerciale primario
2. 🔥 Proporre **Docbit** o altre soluzioni a chi si fa avanti
3. 🔥 **Consulenze personalizzate a pagamento**
4. 🔥 **Speaking a eventi**
5. Costruire audience (newsletter, novità, guide, pensieri personali)
6. Entrata accessoria da **guide a pagamento** + **affiliazioni Amazon** sui libri

I primi 4 punti sono **lead generation B2B/personale**, non vanity metric — è il criterio con cui valutare ogni contenuto.

---

## Asset già esistenti (NON ripartire da zero)

**Sito:** omarbortolato.it (Next.js + Vercel), blog con CMS Notion, 10 articoli già pubblicati (temi: AI Friday, AI Week Milano, abbonamento AI per dipendenti, coach AI per abitudini, onboarding con AI...)

**Pipeline contenuti (già LIVE, vedi `omar-website/CLAUDE.md` per dettaglio tecnico):**
```
Telegram (voce/testo) → n8n → Content Inbox Notion (IDEA)
  → Omar aggiunge Raw Notes → Ready to Generate
  → n8n genera post LinkedIn + meta + tags
  → Omar pubblica su LinkedIn → LinkedIn Published
  → n8n notifica WRITE_ARTICLE su Telegram
  → Omar scrive "WRITE_ARTICLE: {page_id}" su Claude.ai
  → Claude scrive l'articolo nel body Notion + Blog URL
  → Omar porta a Blog Published → sito aggiornato in 5 min
```
Esiste anche un **flusso "Only Blog"** per quando il post LinkedIn è già pronto e serve solo l'articolo.

**Notion — struttura esistente (AI Teamspace Home, workspace "quantum-wealth"):**
| Pagina/DB | Contenuto |
|---|---|
| Content Inbox | Pipeline articoli (stati IDEA → Ready to Generate → LinkedIn Published → Blog Published) |
| Signals Inbox (Gmail) | Segnali/spunti raccolti da email |
| Weekly Editorial Planner | Ogni lunedì 7:00, 3 proposte di contenuto via Telegram |
| 📚 Guide & Prodotti Digitali | 4 guide già pianificate, 2 gratuite (lead magnet) + 2 a pagamento (€47, €27) — **questa è già la roadmap "guide + entrata"** che Omar ha chiesto, non va duplicata |
| Subscribers | Newsletter |
| 🆕 **Opportunità & Lead — Personal Brand** | Creato in questa sessione (2026-06-27) — pipeline lead AI Friday B2B / Docbit / Consulenza / Speaking / Affiliazione, con Status e Prossima azione. URL: https://app.notion.com/p/27cc02fcbb6c460cad64ddf4614e202e |

**Guide già pianificate (da `📚 Guide & Prodotti Digitali`):**
1. 🟢 Gratuita, priorità alta — "Come ho costruito questo sito con Claude Code in 2 settimane" (lead magnet)
2. 🟡 €47, priorità media — "Il mio sistema di content AI automatico" (workflow n8n + prompt + template Notion)
3. 🔵 Gratuita/freemium, bassa — "Da audio WhatsApp a riassunto in 5 minuti" (NotebookLM)
4. 🔵 €27, bassa — "Google Ads automation: il mio stack per 6 paesi"

**Monetizzazione accessoria:** link affiliazione Amazon sui libri citati/recensiti (`/libri/[slug]` con Giscus commenti pianificato) — bassa priorità, non distrarre dal lead gen B2B.

---

## Tone of voice

"AI pratica per chi vuole fare, non solo sapere" — show don't tell, human-centered AI, linguaggio accessibile, autentico (anche fallimenti). Differenza rispetto a Herbalife: qui il "prodotto" è Omar stesso, il tono può essere più personale e diretto, meno filtrato.

**Modulazione per audience:**
- Contenuti CAIO/B2B (per lead AI Friday/Docbit/consulenza) → autorevole, concreto, orientato a risultati aziendali
- Contenuti pratica personale/passione → più informale, narrativo, "show don't tell"

---

## Progetti collegati (stesso scope CMO, priorità diversa)

| Progetto | Priorità | Ruolo nella strategia personal brand |
|---|---|---|
| **AI Friday** | 🔥 ALTA (obiettivo commerciale primario di questo scope) | Il contenuto/personal brand deve portare traffico qualificato alla landing aifriday — vedi [projects/ai-friday.md](/root/projects/ai-friday.md) |
| **AI KmZero** | 🔵 BASSA | Solo `index.html`, nessun project file ancora. Menzionato come iniziativa correlata, non nello scope attivo finché Omar non lo prioritizza |

---

## OKR specifici progetto

**O1 — Audience building**
- KR1: Mantenere la cadenza pipeline Content Inbox (almeno 1 ciclo IDEA→Blog Published a settimana)
- KR2: Guida 1 (lead magnet gratuita) pubblicata

**O2 — Lead generation B2B (KPI primario)**
- KR1: Tracker "Opportunità & Lead" aggiornato ogni settimana da Omar
- KR2: Almeno 1 nuovo lead AI Friday/Docbit/consulenza/speaking tracciato a settimana (target da validare con Omar dopo le prime settimane di baseline)
- KR3: CMO segnala settimanalmente se il tracker non viene aggiornato (vedi ritual sotto)

**O3 — Monetizzazione accessoria**
- KR1: Guida 2 (€47) confezionata e in vendita
- KR2: Primi link affiliazione Amazon attivi sui contenuti libri

---

## Ritual settimanale (nuovo — automatizzato)

Aggiunto un controllo automatico settimanale (lunedì 6:20, dopo il check CISO) via `board/cmo/weekly-check.sh`, eseguito headless e schedulato in crontab. Verifica:
- Conteggio articoli pubblicati sul blog (rispetto alla settimana precedente) → ALERT se nessun nuovo contenuto da >21 giorni
- Reachability sito omarbortolato.it e aifriday.netlify.app
- Promemoria esplicito: controllare manualmente Content Inbox (nuove idee bloccate) e tracker Opportunità & Lead

**Limite noto:** il check headless non ha accesso diretto a Notion (serve un token API che oggi non è configurato in `board/.cron-env`). Se vuoi automatizzare anche la lettura diretta di Notion nel controllo settimanale, serve: 1) un Notion internal integration token con accesso a Content Inbox + Opportunità & Lead, 2) aggiungerlo come `NOTION_API_KEY` in `/root/board/.cron-env`. Finché non c'è, il controllo via Notion resta manuale (io lo posso fare su richiesta, in sessione interattiva, dove ho accesso pieno).

---

## Domande aperte per Omar

1. Target numerico realistico per "lead/settimana" — meglio fissarlo dopo 2-3 settimane di baseline reale?
2. Vuoi che il check settimanale automatico interroghi anche LinkedIn (non possibile via API pubblica senza token aziendale) o resta solo blog+reachability+promemoria?
3. Priorità relativa tra le 4 guide pianificate — confermi l'ordine attuale (1 gratuita prima, poi €47)?
