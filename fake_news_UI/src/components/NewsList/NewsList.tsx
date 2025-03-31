import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import NewsContainer from '../NewsArticle/NewsContainer';
import { fetchNewsArticles } from '../../services/newsApi';
import { NewsArticle } from '../../types/NewsArticle';
import { StyledContainer, StyledBox, StyledLinearProgress } from './NewsListStyled';

const TOTAL_ARTICLES = 10;
interface NewsListProps {
    selectedNav: string;
}
const NewsList: React.FC<NewsListProps>  = ({selectedNav}) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = async (
        selectedNav: string,
        setArticles: React.Dispatch<React.SetStateAction<NewsArticle[]>>,
        setProgress: React.Dispatch<React.SetStateAction<number>>,
        setError: React.Dispatch<React.SetStateAction<string>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        controller: AbortController
      ) => {
        try {
          setArticles([]);
          setProgress(0);
          setError('');
          setLoading(true);
      
          const articleGenerator = fetchNewsArticles(selectedNav, controller.signal);
          let count = 0;
      
          for await (const newArticle of articleGenerator) {
            count++;
            setArticles((prevArticles) => [...prevArticles, newArticle]);
            setProgress((count / TOTAL_ARTICLES) * 100);
            if (count >= TOTAL_ARTICLES) break;
          }
        } catch (e) {
          if (e.name === 'AbortError') {
            console.log('Fetch aborted');
            setArticles([]);
            setProgress(0);
            setError('');
            setLoading(true);
          } else {
            console.error('Error fetching articles:', e);
            setError('Error fetching articles');
            setArticles([]);
          }
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
        const controller = new AbortController(); 
        fetchArticles(selectedNav, setArticles, setProgress, setError, setLoading, controller);
    
        return () => {
          controller.abort(); 
        };
      }, [selectedNav]);
    
    return (
        
        <StyledContainer maxWidth="lg">
            {loading && (
                <StyledBox >
                    <StyledLinearProgress
                        variant="determinate"
                        value={progress}
                    />
                </StyledBox>
            )}
            {error && <div>{'Something went wrong :('}</div>}
            <NewsContainer articles={articles} />
        </StyledContainer>
    );
};

export default React.memo(NewsList);
