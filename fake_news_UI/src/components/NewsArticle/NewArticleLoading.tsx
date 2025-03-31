import React from 'react';
import { Skeleton, Card, CardContent } from '@mui/material';

interface NewsArticleLoadingProps {
    loading: boolean;
  
}

const NewsArticleLoading: React.FC<NewsArticleLoadingProps> = ({ loading }) => {
    if (loading) {
        return (
            <Card>
                <CardContent>
                    <Skeleton variant="rectangular" style={{ marginBottom: '10px' }} />
                    <Skeleton variant="text" width="80%" height={40} style={{ marginBottom: '10px' }} />
                    <Skeleton variant="text" width="60%" height={30} style={{ marginBottom: '10px' }} />
                    <Skeleton variant="text" width="100%" height={60} style={{ marginBottom: '10px' }} />
                </CardContent>
            </Card>
        );
    }

    return null;
};

export default NewsArticleLoading;