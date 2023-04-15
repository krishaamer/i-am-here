from typing import Union
import json
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root(msg: str = ""):
    return {"Hello": "World" + json.dumps(msg)}