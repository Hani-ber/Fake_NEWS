import React from 'react';
import { Container, Grid } from '@mui/material';
import NewsArticleComponent from './NewsArticle';
import { NewsArticle as NewsArticle} from '../../types/NewsArticle';
import NewsArticleList from './NewsArticleList';
import { NewsContainerStyled, NewsColumnCenterStyled,NewsColumnStyled } from '../NewsArticle/NewsArticleStyled';

function restructureArticles(articles: NewsArticle[]) {
    if (!articles || articles.length === 0) {
      return { left: [], middle: null, right: [] };
    }
  
    const shuffledArticles = [...articles].sort(() => Math.random() - 0.5);
    const left: NewsArticle[] = [];
    let middle: NewsArticle | null = null;
    const right: NewsArticle[] = [];
  
    if (shuffledArticles.length > 0) {
      middle = shuffledArticles[0]; 
    }
  
    if (shuffledArticles.length > 1) {
      left.push(shuffledArticles[1]);
    }
  
    if (shuffledArticles.length > 2) {
      left.push(shuffledArticles[2]); 
    }
    if (shuffledArticles.length > 3) {
      right.push(...shuffledArticles.slice(3)); 
  }
  return { left, middle, right };

}

interface NewsContainerProps {
  articles: NewsArticle[];
}

const NewsContainer: React.FC<NewsContainerProps> = ({ articles }) => {
  const { left, middle, right } = restructureArticles(articles);

  return (
    <Container>
       <NewsContainerStyled>
        <NewsColumnStyled>
          {left.map((article, index) => (
            <NewsArticleComponent key={index} article={article} /> 
          ))}
        </NewsColumnStyled>
        <NewsColumnCenterStyled>
          {middle && <NewsArticleComponent article={middle} />}
        </NewsColumnCenterStyled>
        <NewsColumnStyled>
          {right.map((article, index) => (
            <NewsArticleList key={index} article={article} />
          ))}
        </NewsColumnStyled>
      </NewsContainerStyled>
    </Container>
  );
};

export default NewsContainer;