from typing import Optional,AsyncGenerator
from fastapi import APIRouter, Depends, HTTPException,Query
from fastapi.responses import StreamingResponse
from core.dependencies import * 
from core.news_service import NewsService
from models.news import FakeNewsArticle  
from fastapi.concurrency import run_in_threadpool
import json
from core.helpers.logger import logger


router = APIRouter()



async def fake_news_generator(category :str,service: NewsService) -> AsyncGenerator[str, None]:
    """
    Generates fake news articles as JSON strings.
    """
    async for article in (service.get_fake_news(category)):
        try:
            yield json.dumps(article.model_dump()) 
        except Exception as e:
            logger.error(f"Error serializing article to JSON: {e}")
            yield f"Error: {e}\n"
    yield ''
    return
@router.get("/getnews/", response_model=FakeNewsArticle)
async def fetch_fake_news(category: Optional[str] = Query(None),service: NewsService = Depends()):
    """
    Fetches real news and generates fake news, streaming it as JSON.
    """
    try:
        return StreamingResponse(
            fake_news_generator(category, service),
            media_type="application/json", 
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")