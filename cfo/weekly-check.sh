#!/bin/bash
# CFO weekly check — Herbalife: stato infra critica + promemoria aggiornamento baseline costi/ricavi.
# Stesso pattern di CMO/CISO: Claude Code headless, identità git/SSH già configurata.
set -euo pipefail

cd /root/board
set -a
source /root/board/.cron-env
export IS_SANDBOX=1
set +a

HERBASHOP_STATUS=$(curl -s -o /dev/null --max-time 15 -w "%{http_code}" https://herbashop.it || echo "000")
HLDISTRIBUTOR_STATUS=$(curl -s -o /dev/null --max-time 15 -w "%{http_code}" https://hl-distributor.com || echo "000")
CLIENTEPRIV_STATUS=$(curl -s -o /dev/null --max-time 15 -w "%{http_code}" https://hlifeclienteprivilegiato.it || echo "000")

PROMPT=$(cat <<EOF
Sei l'agente CFO della holding (Chief Financial Officer), focus su questo controllo: salute finanziaria operativa del progetto Herbalife.

Dati raccolti automaticamente da questo script (non rieseguire i comandi, usa questi valori):
- Status HTTP herbashop.it: $HERBASHOP_STATUS
- Status HTTP hl-distributor.com: $HLDISTRIBUTOR_STATUS
- Status HTTP hlifeclienteprivilegiato.it: $CLIENTEPRIV_STATUS

1. Leggi cfo/AGENT.md, cfo/okr.md, cfo/log.md, cfo/reports/herbalife.md.

2. Valuta i dati raccolti:
   - Se un sito non risponde 200: ALERT "sito non raggiungibile, possibile impatto su ricavi ecommerce".
   - Altrimenti PASS su questo fronte.

3. NON hai accesso al Google Sheet "Guadagni Mese Herbalife" in questo controllo headless (il connettore Drive richiede sessione interattiva, non disponibile da cron). Annota semplicemente come promemoria visibile: "Controllo manuale richiesto: aggiornare baseline costi/ricavi da Google Sheet (link in reports/herbalife.md) — verificare in particolare se Google Ads ha superato la soglia di scostamento 10% rispetto al mese precedente, e se il gap royalties 2026 (Assegni a zero) è stato chiarito con Omar." — non puoi verificarlo tu, lo segnali e basta.

4. Appendi una nuova entry IN CIMA a cfo/log.md (è append-only, non toccare le entry esistenti) con data odierna, tipo CHECK, i dati raccolti, e l'esito PASS/WARNING/ALERT. Se c'è almeno un ALERT, scrivi 'ALERT' molto visibile come primissima riga del file.

5. Aggiorna cfo/okr.md con una nuova sezione settimanale (settimana corrente), senza cancellare la cronologia. Riporta lo stato dei KR attivi per Herbalife se hai info sufficienti, altrimenti lascia "da verificare con Omar".

6. NON modificare codice di produzione, NON eseguire azioni distruttive, NON toccare repo diversi da /root/board.

7. Fai commit e push su questo repo (branch main) con messaggio 'CFO weekly check YYYY-MM-DD'. Le credenziali git sono già configurate (SSH).

8. Concludi con un riepilogo testuale chiaro: PASS/WARNING/ALERT complessivo della settimana.
EOF
)

claude -p "$PROMPT" \
  --permission-mode bypassPermissions \
  --allowedTools "Bash Read Write Edit Glob Grep" \
  --max-budget-usd 2 \
  --no-session-persistence \
  --model sonnet
