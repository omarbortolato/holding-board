# Video Agent — Remotion

Motore video condiviso della holding basato su [Remotion](https://www.remotion.dev/). Genera video via codice, non è un editor NLE.

Uso: vedi la skill Claude Code `video-agent` (`/root/.claude/skills/video-agent/SKILL.md`) per i comandi.

## Composizioni

- `DataDrivenPromo` — promo verticale parametrica (branding + testo dinamico), per ads/landing page. Nessun girato reale richiesto.
- `FootageSequence` — monta in sequenza clip/foto esistenti in `assets/footage/`, con caption opzionale. Editing semplice (tagli, carrellate), non color grading/transizioni avanzate.

## Stato infrastruttura — 2026-07-01

Installato in locale su questo server Hetzner (lo stesso che ospita gli agenti di produzione Herbalife). Setup: Node 18 + npm, ffmpeg, librerie Chromium headless (via apt), Remotion 4.0.484, Chrome Headless Shell scaricato da Remotion stesso.

**Rischio noto:** il server ha pochissima RAM libera (durante i test, swap quasi saturo). Il rendering Remotion (Chromium + ffmpeg) può competere con i container di produzione. Mitigazioni attuali: concorrenza render limitata a 1 (`remotion.config.ts`), nessun servizio always-on (si esegue solo su richiesta via CLI).

Se l'uso cresce (video più lunghi/frequenti, editing di footage pesante), valutare un server Hetzner dedicato separato dalla produzione — vedi conversazione con Omar del 2026-07-01 per stima costi.
