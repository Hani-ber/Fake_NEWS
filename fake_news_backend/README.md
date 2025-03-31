📰 Fake News App

A web application that fetches real news, generates fake headlines using OpenAI, categorizes articles, and supports multiple sources (API-based & HTML scraping). It provides streaming responses for real-time updates.

🚀 Features

Fetch News: Get articles from an API or scrape HTML pages.

Fake News Generation: Uses OpenAI to generate fake but relevant headlines.

Categorization: Automatically assigns categories using AI.

Streaming Response: Delivers data in real-time for each new Genreated Article

REST API: Supports fetching news with or without a category filters from website

📦 Installation

1️⃣ Clone the Repository

git clone (https://github.com/Hani-ber/Fake_NEWS/edit/master)
cd fake-news

2️⃣ Create & Activate a Virtual Environment

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

3️⃣ Install Dependencies

pip install -r requirements.txt

4️⃣ Set Up Environment Variables

Create a .env file and add:

ENV=production
OPENAI_API_KEY=
ALLOWED_SOURCES=bbc,cnn,espn
VALID_CATEGORIES=general,business,health,science,sports,technology
NEWS_WEBSITE_API_KEY=554f9ee835004668b925e7ac8add014f
NEWS_WEBSITE_BASE_URL=https://newsapi.org/v2/top-headlines?sources={source}&apiKey=
NEWS_WEBSITE_CATEGORY_BASE_URL=https://newsapi.org/v2/top-headlines?category={category}&apiKey=

🛠 Usage

Run the Backend

uvicorn app.main:app --reload

OR

python app/main.py

🔗 API Endpoints

Fetch News (Supports Categories & Scraper)

GET /getnews news from configured sources.

Optional Query Parameter:

category: Filter news by category.

Example Request:

GET /getnews?category=sports

Example Response JSON:

{
   id:
    title: 
    url: 
    description: 
    image_url:
    category: 
    source: 
    fake_title: 
    fake_description: 
}

📌 Project Structure

fake-news-app/
│── app/
│   ├── api/
│   │   ├── routes/
│   │   ├── news.py  # API implementation
│   ├── core/
│   │   ├── helpers/logger.py  # Logging
│   │   ├── config.py  # Configuration
│   │   ├── news_service.py  # News handling logic
│   ├── infrastructure/
│   │   ├── sources/news_scraper.py  # HTML page scraper
│   ├── models/
│   │   ├── fake_news_prompts.py  # AI-generated fake news
│   ├── main.py  # App entry point
│── tests/
│── .env  # Environment variables
│── README.md  # Documentation
│── requirements.txt  # Dependencies

📄 Future Improvements

Since it work with scraper factory you can deploy new scraper which will get data by HTML parser from websites


