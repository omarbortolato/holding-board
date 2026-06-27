#!/bin/bash
# CMO weekly check — visibilità personal brand (omarbortolato.it) + reminder lead/opportunità.
# Stesso pattern del CISO: Claude Code headless, identità git/SSH già configurata.
set -euo pipefail

cd /root/board
set -a
source /root/board/.cron-env
export IS_SANDBOX=1
set +a

STATE_FILE="/root/board/cmo/.blog-post-count"
PREV_COUNT=0
[ -f "$STATE_FILE" ] && PREV_COUNT=$(cat "$STATE_FILE")

CURRENT_COUNT=$(curl -s --max-time 15 https://www.omarbortolato.it/blog | grep -oE '/blog/[a-z0-9-]+' | sort -u | wc -l || echo 0)
NEW_POSTS=$((CURRENT_COUNT - PREV_COUNT))
echo "$CURRENT_COUNT" > "$STATE_FILE"

SITE_STATUS=$(curl -s -o /dev/null --max-time 15 -w "%{http_code}" https://www.omarbortolato.it || echo "000")
AIFRIDAY_STATUS=$(curl -s -o /dev/null --max-time 15 -w "%{http_code}" https://aifriday.netlify.app || echo "000")

PROMPT=$(cat <<EOF
Sei l'agente CMO della holding (Chief Marketing Officer), focus su questo controllo: Personal Brand di Omar (omarbortolato.it + lead gen AI Friday/Docbit/consulenza/speaking).

Dati raccolti automaticamente da questo script (non rieseguire i comandi, usa questi valori):
- Articoli blog rilevati ora: $CURRENT_COUNT (settimana precedente: $PREV_COUNT, delta: $NEW_POSTS)
- Status HTTP omarbortolato.it: $SITE_STATUS
- Status HTTP aifriday.netlify.app: $AIFRIDAY_STATUS

1. Leggi cmo/AGENT.md, cmo/okr.md, cmo/log.md, cmo/reports/omar-website.md, cmo/reports/herbalife.md.

2. Valuta i dati raccolti:
   - Se delta articoli blog = 0 da più di 3 settimane consecutive (controlla le ultime entry CHECK in cmo/log.md per capire da quanto è fermo): ALERT "nessun nuovo contenuto pubblicato".
   - Se Status HTTP di un sito non è 200: ALERT "sito non raggiungibile".
   - Altrimenti PASS.

3. NON hai accesso a Notion in questo controllo headless (nessun token configurato). Annota semplicemente come promemoria visibile: "Controllo manuale richiesto: Content Inbox (idee bloccate?) e tracker Opportunità & Lead (https://app.notion.com/p/27cc02fcbb6c460cad64ddf4614e202e) aggiornato questa settimana?" — non puoi verificarlo tu, lo segnali e basta.

4. Appendi una nuova entry IN CIMA a cmo/log.md (è append-only, non toccare le entry esistenti) con data odierna, tipo CHECK, i dati raccolti, e l'esito PASS/WARNING/ALERT. Se c'è almeno un ALERT, scrivi 'ALERT' molto visibile come primissima riga del file.

5. Aggiorna cmo/okr.md con una nuova sezione settimanale (settimana corrente), senza cancellare la cronologia. Riporta lo stato dei KR attivi per Herbalife e Personal Brand se hai info sufficienti, altrimenti lascia "da verificare con Omar".

6. NON modificare codice di produzione, NON eseguire azioni distruttive, NON toccare repo diversi da /root/board.

7. Fai commit e push su questo repo (branch main) con messaggio 'CMO weekly check YYYY-MM-DD'. Le credenziali git sono già configurate (SSH).

8. Concludi con un riepilogo testuale chiaro: PASS/WARNING/ALERT complessivo della settimana, sia per Herbalife che per Personal Brand.
EOF
)

claude -p "$PROMPT" \
  --permission-mode bypassPermissions \
  --allowedTools "Bash Read Write Edit Glob Grep" \
  --max-budget-usd 2 \
  --no-session-persistence \
  --model sonnet
