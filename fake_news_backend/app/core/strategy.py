from .dependencies import *
from models.news import FakeNewsArticle 
import  models.fake_news_prompts  as fake_news_prompts
from api.http_requests_helper import openai_chat
class FakeNewsStrategy(ABC):
    ""    
    @abstractmethod
    def generate_fake_news(self, article):
        pass

class OpenAIFakeNewsStrategy(FakeNewsStrategy):
   
    async def generate_fake_news(self, article) -> FakeNewsArticle:
        
        prompt=fake_news_prompts.prompts()["edit_news_to_fake"]
        prompt["Additional"] =prompt["Additional"].format(real_title =article.title, real_description=article.description)
        response =await openai_chat(prompt)

        # Return a FakeNewsArticle 
        return FakeNewsArticle(
            id=article.id,
            title=article.title,
            description=article.description,
            fake_title=response["fake_title"].strip(),
            category = response["category"].strip(),
            source=article.source,
            fake_description=response["fake_description"].strip(),
            url=article.url,
            image_url=article.image_url

        )
    
    

