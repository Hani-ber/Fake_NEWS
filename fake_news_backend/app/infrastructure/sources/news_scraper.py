from core.dependencies import *
from models.news import NewsArticle
from core.config import config
from api.http_requests_helper import call_rest_api_async_get
class NEWSAPIScraper:
    """Scraper for ANY SOURCE News NY API."""
    async def fetch_articles(self,source,category) -> List[NewsArticle]:
        """Retrieve the latest news from the Dynamic NEWS using NewsAPI."""
        url=config.NEWS_WEBSITE_BASE_URL.format(source=source)+ config.NEWS_WEBSITE_API_KEY
        if category:
            url= config.NEWS_WEBSITE_CATEGORY_BASE_URL.format(category=category)+ config.NEWS_WEBSITE_API_KEY
        response = await call_rest_api_async_get(url, "GET")
        if(response['Status'][0]==200):
            articles = []
            for article in response['Status'][1].get('articles', [])[:4]:
                title = article['title']
                url = article['url']
                content=article['content']
                image_url=article['urlToImage']
                articles.append(NewsArticle(id=url, title=title, url=url,description=content,image_url=image_url, source=source,category=category))
        return articles