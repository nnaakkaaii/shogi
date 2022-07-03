from fastapi import FastAPI
from pydantic import BaseModel

from apps.src.handler import handler

class CSAMoves(BaseModel):
    moves: list[str] = []


app = FastAPI()


@app.post("/move")
async def move(payload: CSAMoves):
    return handler(payload.moves)
