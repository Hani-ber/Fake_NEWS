from .dependencies import *
from  infrastructure.sources.news_scraper import NEWSAPIScraper
class NewsSourceFactory:

    _sources = {
        "bbc-news": NEWSAPIScraper,
        "cnn": NEWSAPIScraper,
        "breitbart-news":NEWSAPIScraper
    }
 
    @staticmethod
    async def get_scraper(source: str):
        scraper_class = NewsSourceFactory._sources.get(source.lower())
        if not scraper_class:
            raise ValueError(f"Unsupported news source: {source}")
        return scraper_class()