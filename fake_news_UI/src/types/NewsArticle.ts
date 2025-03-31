export interface NewsArticle {
    id: string;
    title: string;
    fake_title?: string; 
    description: string;
    fake_description?: string;
    url: string;
    image_url?: string;
    source: string;
    category?: string;  
  }