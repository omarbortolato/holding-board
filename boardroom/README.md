# 🏛️ Boardroom

Interfaccia web per chattare con gli agenti C-level dell'holding (CMO, CTO, CFO, COO, CISO, CEO).

- **Chat 1:1** con un singolo agente (es. il CMO).
- **Roundtable**: più agenti al tavolo, rispondono a turno vedendosi a vicenda.
- **Dibattito**: con più "giri" gli agenti dialogano anche tra di loro reagendo alle risposte altrui.

## Accesso dal web

Pubblicato su **https://herbago.info/board/** (protetto da Basic Auth).
La UI è dietro il reverse proxy condiviso `platform/nginx`:

- il servizio gira come unit systemd `boardroom.service`, in ascolto su
  `172.17.0.1:8060` (gateway docker0 → raggiungibile solo dal container nginx,
  **non** esposto sull'interfaccia pubblica);
- nginx fa da proxy su `location /board/` con `auth_basic` (file
  `platform/nginx/board.htpasswd`, gitignored) e `proxy_buffering off` per lo
  streaming SSE.

Gestione servizio:
```bash
systemctl status boardroom      # stato
systemctl restart boardroom     # riavvio (dopo modifiche al codice)
journalctl -u boardroom -f      # log
```

Cambiare/aggiungere credenziali Basic Auth:
```bash
cd /root/board/platform/nginx
htpasswd_hash=$(openssl passwd -apr1 'NUOVA_PASSWORD')
printf 'utente:%s\n' "$htpasswd_hash" >> board.htpasswd   # o sovrascrivi
chmod 644 board.htpasswd
docker exec nginx-nginx-1 nginx -s reload
```

## Avvio manuale (dev)

```bash
cd /root/board/boardroom
./run.sh                 # porta 8060 su 0.0.0.0  ->  http://<host>:8060
PORT=8070 ./run.sh       # porta custom
```

La chiave `ANTHROPIC_API_KEY` viene letta da `/root/herbalife/.env` (o dall'ambiente).
Modello di default: `claude-opus-4-8` (override con `BOARDROOM_MODEL`).

## Struttura: un agente per cartella

Ogni C-level è **self-contained nella sua cartella** `board/<ruolo>/`:

```
board/
├── cmo/
│   ├── AGENT.md     ← corpo del ruolo (missione, responsabilità, scope) = base del system prompt
│   └── agent.py     ← IDENTITÀ: ID, NAME, ROLE, EMOJI, COLOR, ORDER, MODEL, PERSONA
├── cto/  (stessa struttura)
├── cfo/  ...
└── boardroom/       ← UI condivisa (app.py + static/index.html) + registro (agents.py)
```

La UI (`boardroom/`) non contiene la definizione degli agenti: li **scopre e importa**
da `board/*/agent.py`. `agents.py` è solo il registro/orchestratore.

### Aggiungere un nuovo agente

1. Crea `board/<nuovo-ruolo>/AGENT.md` — il corpo del ruolo (H1 e `## Missione`
   alimentano anche la UI).
2. Crea `board/<nuovo-ruolo>/agent.py` copiando quello di un altro C-level e
   cambiando i valori:
   ```python
   ID = "cro"; NAME = "CRO"; ROLE = "Chief Revenue Officer"
   EMOJI = "📈"; COLOR = "#66cc88"; ORDER = 6
   MODEL = None            # o es. "claude-sonnet-5"
   PERSONA = "..."         # tono/skill specifiche, oltre ad AGENT.md
   ```
3. `systemctl restart boardroom` e ricarica la pagina. Nessuna modifica al codice
   della UI.

> `PERSONA` è il posto dove dai carattere e skill al singolo agente: viene aggiunta
> al system prompt sotto la sezione `## Persona`, dopo AGENT.md e prima delle regole
> globali del board.

## Architettura

- `agents.py` — registro: scopre e importa gli agenti da `board/*/agent.py`,
  legge `AGENT.md` come corpo del prompt, costruisce il system prompt
  (AGENT.md + PERSONA dell'agente + regole globali di tono + istruzioni roundtable).
- `app.py` — FastAPI. `GET /api/agents` (elenco), `POST /api/chat` (streaming SSE
  con orchestrazione roundtable), serve la UI.
- `static/index.html` — single-page app (vanilla JS): roster con selezione agenti,
  scelta dei giri, chat con bolle colorate per agente.

L'orchestrazione mantiene un transcript condiviso: a ogni turno l'agente riceve i
messaggi propri come `assistant` e quelli di utente/altri agenti come `user`
(prefissati col nome), così ognuno "vede" e può rivolgersi agli altri.
