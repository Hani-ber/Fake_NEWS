from pydantic import BaseModel

class NewsArticle(BaseModel):
    id:str
    title: str
    url: str
    description: str
    image_url:str
    category: str
    source: str

class FakeNewsArticle(NewsArticle):
    fake_title: str
    fake_description: str