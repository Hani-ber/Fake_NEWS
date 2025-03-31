import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.dependencies import *

import logging

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def uvicorn_run(app, host="127.0.0.1", port=8000):
    uvicorn.run(app, host=host, port=port)

logging.basicConfig(
    level=logging.INFO,  
    format="%(asctime)s - %(levelname)s - %(message)s", 
    stream=sys.stdout 
)
logger = logging.getLogger(__name__)


app = FastAPI(
    title="Fake News API",
    description="An API that fetches real news and generates fake news using OpenAI",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news_router, prefix="/news", tags=["News"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Fake News API"}

if __name__ == "__main__":
    uvicorn_run(app)
