import axios, { AxiosResponse } from 'axios';
import { NewsArticle } from '../types/NewsArticle';
import { BASE_URL } from '../config/config';


export async function* fetchNewsArticles(
  selectedNav: string,
  signal: AbortSignal
): AsyncGenerator<NewsArticle> {
  try {
    const response = await fetch(`${BASE_URL}${selectedNav.toLowerCase()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal, // Use signal from AbortController
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = new TextDecoder('utf-8').decode(value);
        if (textChunk) {
          try {
            let articles: NewsArticle[] = [];
            const parsedData = JSON.parse(textChunk);
            articles = Array.isArray(parsedData) ? parsedData : [parsedData];

            for (const article of articles) {
              yield article;
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      }
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Error fetching news articles:', error);
      throw error;
    }
  }
}