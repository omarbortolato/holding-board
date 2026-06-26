#!/bin/bash
# CISO weekly security check — runs Claude Code headless on this machine,
# using the same git/SSH identity as interactive sessions (no GitHub App needed).
set -euo pipefail

cd /root/board
set -a
source /root/board/.cron-env
export IS_SANDBOX=1
set +a

PROMPT=$(cat <<'EOF'
Sei l'agente CISO della holding (Chief Information Security Officer). Esegui il controllo settimanale di sicurezza.

1. Leggi ciso/AGENT.md, ciso/okr.md, ciso/log.md, ciso/reports/herbalife.md e ciso/reference/herbalife-SECURITY.md.

2. Controllo scadenza certificato SSL: per ogni dominio in ciso/reference/herbalife-SECURITY.md e ciso/reports/herbalife.md (herbago.info, herbago.it, herbago.fr, herbago.de, herbago.co.uk, herbago.net, herbashop.it, hlifeclienteprivilegiato.it, hl-distributor.com, hlifepreferredcustomer.com) esegui:
   echo | openssl s_client -connect DOMINIO:443 -servername DOMINIO 2>/dev/null | openssl x509 -noout -enddate
   Se scade in meno di 14 giorni: ALERT. Se in meno di 30 giorni: WARNING. Altrimenti: PASS.

3. Controlla che ogni sito risponda HTTPS con header di sicurezza di base (curl -sI):
   X-Frame-Options, X-Content-Type-Options, Referrer-Policy. Se manca un header: WARNING (non ALERT, potrebbe essere dietro CDN/cache).

4. NON eseguire controlli a livello di codice (rate limiting, CORS, .env tracked): il codice Herbalife è in un repo GitLab privato non disponibile qui. Annota solo se l'ultimo audit pratico manuale (ultima entry AUDIT in ciso/log.md) risale a più di 30 giorni fa.

5. Appendi una nuova entry IN CIMA a ciso/log.md (è append-only, non toccare le entry esistenti) con data odierna, tipo CHECK, tabella risultati PASS/WARNING/ALERT. Se c'è almeno un ALERT, scrivi 'ALERT' molto visibile come primissima riga del file.

6. Aggiorna ciso/okr.md con lo stato della settimana corrente (nuova sezione settimanale), senza cancellare la cronologia.

7. NON modificare codice di produzione, NON eseguire azioni distruttive, NON toccare repo diversi da /root/board.

8. Fai commit e push su questo repo (branch main) con messaggio 'CISO weekly check YYYY-MM-DD'. Il push deve funzionare con le credenziali git già configurate su questa macchina (SSH).

9. Concludi con un riepilogo testuale chiaro: PASS/WARNING/ALERT complessivo della settimana.
EOF
)

claude -p "$PROMPT" \
  --permission-mode bypassPermissions \
  --allowedTools "Bash Read Write Edit Glob Grep" \
  --max-budget-usd 2 \
  --no-session-persistence \
  --model sonnet
