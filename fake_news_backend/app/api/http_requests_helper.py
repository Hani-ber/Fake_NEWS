from core.dependencies import *
import httpx
import openai
from openai import OpenAI
import json
from core.config import config
from core.helpers.logger import logger
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

def status(code_num,code_msg,data=None,add_keys=None):
    status_msg =  {"Status": [code_num,code_msg]}
    if data:
        status_msg.update({"Data": data})
    if add_keys:
        status_msg.update(add_keys)
    return status_msg
 

@retry(
    stop=stop_after_attempt(3), 
    wait=wait_exponential(multiplier=1, min=2, max=8), 
    retry=retry_if_exception_type(httpx.RequestError), 
    reraise=True  
)
async def call_rest_api_async_get(url, method="GET", headers=None, body=None, res_format="json"):
    try:
        logger.info(f"Calling API: {url}")
        async with httpx.AsyncClient(verify=False) as client:
            response = await client.get(url, headers=headers, timeout=10)

            if response.status_code in [200, 202]:
                if res_format == "json":
                    return status(response.status_code, response.json())  
                else:
                    return status(response.status_code, response.text)
            else:
                logger.warning(f"API error {response.status_code} for {url}: {response.text}")
                return status(response.status_code, f"{url}: {response.text}")

    except httpx.RequestError as e:
        logger.error(f"Request error for {url}: {e}")
        raise 

    except Exception as e:
        logger.error(f"Unexpected error accessing {url}: {e}")
        return status(666, f"Unexpected error accessing {url}: {e}")



async def openai_chat(prompt):
    openai.api_key = config.OPENAI_API_KEY
    client_openai= OpenAI()   


    response = client_openai.chat.completions.create(
            model="gpt-4o-2024-08-06",
            messages=[
                {
                "role": "system",
                "content": "Your Role is " +prompt["Role"]+ 
                            "Yor Task is " +prompt["Task"]+ 
                            "Format: " +str(prompt["Format"])+
                            "Restrictions: " +str(prompt["Restrictions"])+
                            "Additional: " +str(prompt["Additional"])
                }
            ],
            temperature=0.9,
            max_tokens=2000,
            response_format= {
            "type": "json_schema",
            "json_schema":prompt["Response_Schema"]}
    )

    fake_data = json.loads(response.choices[0].message.content)
    return fake_data

