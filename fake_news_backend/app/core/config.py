
from .dependencies import *
import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    
    ENV: str = os.getenv("ENV")  
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    REDIS_URL: str = os.getenv("REDIS_URL")
    ALLOWED_SOURCES: list[str] = os.getenv("ALLOWED_SOURCES").split(",")
    VALID_CATEGORIES= os.getenv("VALID_CATEGORIES").split(",")
    NEWS_WEBSITE_API_KEY=os.getenv("NEWS_WEBSITE_API_KEY")
    NEWS_WEBSITE_BASE_URL= os.getenv("NEWS_WEBSITE_BASE_URL")
    NEWS_WEBSITE_CATEGORY_BASE_URL= os.getenv("NEWS_WEBSITE_CATEGORY_BASE_URL")

config = Config()