import React from 'react';
import { Typography, Tooltip, Box } from '@mui/material';
import { SourceTypography, ArticleBox,ArticleTitle,ArticleDescription,AnimatedTitle,AnimatedDescription} from './NewsArticleStyled'; 

interface NewsArticleListProps {
  article: any; 
}

const NewsArticleList: React.FC<NewsArticleListProps> = ({ article }) => {
  const openArticleInNewTab = () => {
    window.open(article.url, '_blank');
  };

  return (
    <ArticleBox onClick={openArticleInNewTab}>
                    <AnimatedTitle
                        variant="h6"
                        data-title={article.title}
                        onClick={openArticleInNewTab}
                    >
                        {article.fake_title}
                    </AnimatedTitle>

                    <AnimatedDescription
                        variant="body1"
                        color="text.secondary"
                        data-description={article.description}
                        onClick={openArticleInNewTab}
                        style={{ marginTop: '10px' }}
                    >
                        {article.fake_description}
                    </AnimatedDescription>
      <Tooltip title={article.url}>
        <SourceTypography variant="subtitle2">
          Source: {article.source}
        </SourceTypography>
      </Tooltip>
      <SourceTypography variant="subtitle2">
          Category: {article.category}
        </SourceTypography>
    </ArticleBox>
  );
};

export default NewsArticleList;