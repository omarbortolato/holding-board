"""
Registro degli agenti del Boardroom.

Non contiene la definizione degli agenti: li SCOPRE e li IMPORTA da
board/<ruolo>/agent.py. Ogni C-level è quindi self-contained nella sua cartella
(identità in agent.py, corpo del ruolo in AGENT.md). Per aggiungere un agente
basta creare board/<nuovo>/agent.py (+ AGENT.md) — nessuna modifica qui.
"""
from __future__ import annotations

import importlib.util
import re
from dataclasses import dataclass
from pathlib import Path

BOARD_DIR = Path(__file__).resolve().parent.parent  # /root/board

# Cartelle dentro board/ che NON sono agenti.
SKIP = {"boardroom", "dashboard", "platform", "projects", ".git"}
FALLBACK = {"emoji": "🤖", "color": "#8a94a6", "order": 99}


@dataclass
class Agent:
    id: str
    name: str          # es. "CMO"
    role: str          # es. "Chief Marketing Officer"
    emoji: str
    color: str
    order: int
    mission: str       # breve descrizione (per la UI)
    system: str        # contenuto integrale AGENT.md
    persona: str       # istruzioni specifiche dell'agente (da agent.py)
    model: str | None = None

    def public(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            "emoji": self.emoji,
            "color": self.color,
            "mission": self.mission,
        }


def _import_module(path: Path):
    """Importa board/<ruolo>/agent.py come modulo isolato."""
    spec = importlib.util.spec_from_file_location(f"agent_{path.parent.name}", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)  # type: ignore[union-attr]
    return mod


def _parse_agent_md(text: str) -> tuple[str, str, str]:
    """Ritorna (name, role, mission) dal contenuto di AGENT.md (fallback)."""
    name, role, mission = "", "", ""
    m = re.search(r"^#\s+(.+)$", text, re.MULTILINE)
    if m:
        parts = re.split(r"\s*[—–-]\s*", m.group(1).strip(), maxsplit=1)
        name = parts[0].strip()
        role = parts[1].strip() if len(parts) > 1 else name
    mm = re.search(r"##\s*Missione\s*\n+(.+?)(?:\n\n|\n#)", text, re.DOTALL | re.IGNORECASE)
    if mm:
        mission = " ".join(mm.group(1).split()).strip()
    return name, role, mission


def load_agents() -> dict[str, Agent]:
    agents: dict[str, Agent] = {}
    for d in sorted(BOARD_DIR.iterdir()):
        if not d.is_dir() or d.name in SKIP:
            continue
        py = d / "agent.py"
        md = d / "AGENT.md"
        if not py.exists() and not md.exists():
            continue

        text = md.read_text(encoding="utf-8") if md.exists() else ""
        p_name, p_role, mission = _parse_agent_md(text)

        mod = _import_module(py) if py.exists() else None
        g = (lambda k, default=None: getattr(mod, k, default)) if mod else (lambda k, default=None: default)

        agents[d.name] = Agent(
            id=g("ID") or d.name,
            name=g("NAME") or p_name or d.name.upper(),
            role=g("ROLE") or p_role or d.name.upper(),
            emoji=g("EMOJI") or FALLBACK["emoji"],
            color=g("COLOR") or FALLBACK["color"],
            order=g("ORDER") if g("ORDER") is not None else FALLBACK["order"],
            mission=mission,
            system=text,
            persona=(g("PERSONA") or "").strip(),
            model=g("MODEL"),
        )
    return dict(sorted(agents.items(), key=lambda kv: kv[1].order))


# Regole globali di comunicazione ereditate da tutti gli agenti (da HOLDING.md).
GLOBAL_RULES = (
    "Regole di comunicazione (valgono sempre): tono conversazionale, mai in stile FAQ, "
    "mai header o titoli, massimo 3-5 frasi per risposta, massimo 2 emoji. "
    "Rispondi sempre in italiano, in prima persona, dal punto di vista del tuo ruolo. "
    "Non anteporre il tuo nome alla risposta: l'interfaccia lo mostra già."
)


def build_system(agent: Agent, others: list[Agent]) -> str:
    parts = [agent.system.strip()]
    if agent.persona:
        parts += ["", "## Persona", agent.persona]
    parts += ["", "---", "", GLOBAL_RULES]
    if others:
        roster = ", ".join(f"{o.name} ({o.role})" for o in others)
        parts += [
            "",
            f"Sei in una riunione di board (roundtable). Attorno al tavolo ci sono: {roster}. "
            f"Parla solo per il tuo ruolo di {agent.role}: non rispondere al posto degli altri. "
            "Puoi rivolgerti direttamente a un collega per nome quando sei d'accordo, in disaccordo "
            "o vuoi passargli la palla. Se non hai nulla di rilevante da aggiungere dal tuo punto di "
            "vista, dillo in una frase.",
        ]
    return "\n".join(parts)
