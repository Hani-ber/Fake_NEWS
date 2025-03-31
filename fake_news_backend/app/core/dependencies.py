import os
import uvicorn
from dotenv import load_dotenv
from abc import ABC, abstractmethod
import requests
from pydantic import BaseModel
from typing import AsyncGenerator,List
import openai
from bs4 import BeautifulSoup
from fastapi import APIRouter, Depends, HTTPException, FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import re
from api.routes.news import router as news_router
from core.helpers.logger import logger

from core.strategy import OpenAIFakeNewsStrategy,FakeNewsStrategy
from core.config import config
from models.news import NewsArticle  ,FakeNewsArticle
from core.news_service import NewsService
from infrastructure.sources.news_scraper import NEWSAPIScraper
from core.factory import NewsSourceFactory
from core.config import config

from models.news import NewsArticle
from api.http_requests_helper import call_rest_api_async_get
from infrastructure.sources.news_scraper import NEWSAPIScraper
import models.fake_news_prompts  as fake_news_prompts
from api.http_requests_helper import openai_chat