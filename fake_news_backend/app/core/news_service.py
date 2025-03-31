from core.dependencies import *
from core.strategy import OpenAIFakeNewsStrategy 
from models.news import FakeNewsArticle 
from core.factory import NewsSourceFactory 
from core.config import config
from core.helpers.logger import logger
class NewsService:

    def __init__(self, strategy=OpenAIFakeNewsStrategy()):
        self.strategy = strategy
    
 
    async def get_fake_news(self,category) -> AsyncGenerator[FakeNewsArticle, None]:
        try:
            if category and category!='' and category not in config.VALID_CATEGORIES:
                raise ValueError(f"Invalid category: {category}")
            for source in NewsSourceFactory._sources: 
                scraper = await NewsSourceFactory.get_scraper(source)
                for article in await scraper.fetch_articles(source,category):
                    try:
                        yield await self.strategy.generate_fake_news(article)
                    except Exception as e:
                        logger.error(f"Error generating fake news for article {article}: {e}")
        except Exception as e:
            logger.error(f"Error processing source {source}: {e}")  
            raise ValueError(f"Error processing source {source}: {e}")

