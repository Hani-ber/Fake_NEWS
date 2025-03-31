import React, { memo } from 'react';
import { Typography, Tooltip, Box } from '@mui/material';
import { StyledCard, StyledCardContent, ImageContainer, ArticleImage, AnimatedDescription, AnimatedTitle, SourceTypography } from './NewsArticleStyled';
import { NewsArticle as NewsArticleType } from '../../types/NewsArticle';

interface NewsArticleProps {
    article: NewsArticleType;
}

const NewsArticle: React.FC<NewsArticleProps> = memo(({ article }) => {

    const openArticleInNewTab = () => {
        window.open(article.url, '_blank');
    };


    return (
        <StyledCard>
            <StyledCardContent>
                {article.image_url && (
                    <ImageContainer>
                        <ArticleImage src={article.image_url} alt={article.title} />
                    </ImageContainer>
                )}


                <AnimatedTitle
                        variant="h5"
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
                    <SourceTypography variant="subtitle1" color="text.secondary" sx={{ cursor: 'pointer' }}>
                        Source: {article.source}
                    </SourceTypography>
                </Tooltip>
                <SourceTypography variant="subtitle1" color="text.secondary" sx={{ cursor: 'pointer' }}>
                        Catelogry: {article.category}
                    </SourceTypography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                </Box>
            </StyledCardContent>
        </StyledCard>
    );
});

export default NewsArticle;