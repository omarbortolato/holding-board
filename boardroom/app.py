"""
Boardroom — interfaccia di chat con gli agenti C-level dell'holding.

- Chatta con un singolo agente (es. il CMO) 1:1.
- Metti più agenti "al tavolo": rispondono a turno, vedendosi tra loro (roundtable).
- Con più "giri" gli agenti dialogano anche tra di loro reagendo alle risposte altrui.

Backend: FastAPI + Anthropic SDK (streaming SSE). Frontend: static/index.html.
"""
from __future__ import annotations

import json
import os
from pathlib import Path

import anthropic
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles

from agents import build_system, load_agents

HERE = Path(__file__).resolve().parent
MODEL = os.environ.get("BOARDROOM_MODEL", "claude-opus-4-8")
MAX_TOKENS = 1024          # le risposte sono brevi (3-5 frasi)
MAX_ROUNDS = 3             # limite giri di roundtable (contenimento costi)


def _load_api_key() -> str:
    key = os.environ.get("ANTHROPIC_API_KEY")
    if key:
        return key
    # Riusa la chiave già presente nel .env di herbalife (nessun segreto duplicato su disco).
    env = Path("/root/herbalife/.env")
    if env.exists():
        for line in env.read_text().splitlines():
            if line.startswith("ANTHROPIC_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise RuntimeError("ANTHROPIC_API_KEY non trovata")


client = anthropic.Anthropic(api_key=_load_api_key())
app = FastAPI(title="Boardroom")


@app.get("/api/agents")
def api_agents():
    return {"agents": [a.public() for a in load_agents().values()]}


def _to_messages(agent_id: str, transcript: list[dict]) -> list[dict]:
    """Converte il transcript condiviso nei messaggi per un dato agente.

    I turni dell'agente stesso diventano 'assistant'; tutto il resto (utente e
    altri agenti) diventa 'user', con un prefisso [Nome] così l'agente sa chi parla.
    """
    msgs: list[dict] = []
    for t in transcript:
        if t.get("author") == agent_id:
            msgs.append({"role": "assistant", "content": t["content"]})
        else:
            label = t.get("name") or ("Tu" if t.get("author") == "user" else t.get("author"))
            prefix = "" if t.get("author") == "user" else f"[{label}]: "
            msgs.append({"role": "user", "content": f"{prefix}{t['content']}"})
    return msgs


def _sse(obj: dict) -> str:
    return f"data: {json.dumps(obj, ensure_ascii=False)}\n\n"


@app.post("/api/chat")
async def api_chat(request: Request):
    body = await request.json()
    selected = body.get("agents", [])
    transcript = list(body.get("history", []))
    rounds = max(1, min(int(body.get("rounds", 1)), MAX_ROUNDS))

    all_agents = load_agents()
    room = [all_agents[a] for a in selected if a in all_agents]
    if not room:
        return StreamingResponse(
            iter([_sse({"type": "error", "message": "Nessun agente selezionato."})]),
            media_type="text/event-stream",
        )
    if len(room) == 1:
        rounds = 1  # 1:1 non ha senso a più giri

    def generate():
        # transcript locale che cresce man mano (gli agenti si vedono a vicenda)
        convo = list(transcript)
        try:
            for rnd in range(rounds):
                for agent in room:
                    others = [o for o in room if o.id != agent.id]
                    system = build_system(agent, others)
                    messages = _to_messages(agent.id, convo)
                    yield _sse({
                        "type": "agent_start", "agent": agent.id, "name": agent.name,
                        "emoji": agent.emoji, "color": agent.color, "round": rnd + 1,
                    })
                    acc = []
                    with client.messages.stream(
                        model=agent.model or MODEL,
                        max_tokens=MAX_TOKENS,
                        system=system,
                        messages=messages,
                    ) as stream:
                        for text in stream.text_stream:
                            acc.append(text)
                            yield _sse({"type": "delta", "agent": agent.id, "text": text})
                    full = "".join(acc).strip()
                    convo.append({"author": agent.id, "name": agent.name, "content": full})
                    yield _sse({"type": "agent_end", "agent": agent.id, "content": full})
            yield _sse({"type": "done"})
        except Exception as e:  # noqa: BLE001
            yield _sse({"type": "error", "message": str(e)})

    return StreamingResponse(generate(), media_type="text/event-stream")


@app.get("/")
def index():
    return FileResponse(HERE / "static" / "index.html")


app.mount("/static", StaticFiles(directory=HERE / "static"), name="static")
