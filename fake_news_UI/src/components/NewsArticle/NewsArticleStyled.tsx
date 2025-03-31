import { styled, keyframes } from '@mui/material/styles';
import { Box,Card, CardContent, Typography,Container } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    border: '1px solid #ccc',
    marginBottom: theme.spacing(2),
    boxShadow: 'none',
    borderRadius: 0,
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
}));

export const FakeTitleTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "'Times New Roman', serif",
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
}));

export const SourceTypography = styled(Typography)(({ theme }) => ({
    color: '#666',
    fontSize: '0.9rem',
}));
export const ArticleBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  padding: '8px',
  borderBottom: '1px solid #eee',
  cursor: 'pointer',
}));

export const ArticleTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textDecoration: 'underline',

}));

export const ArticleDescription = styled('p')(({ theme }) => ({
  margin: 0,
}));


export const DateTypography = styled(Typography)(({ theme }) => ({
    color: '#888',
    fontSize: '0.8rem',
}));

export const CategoryTypography = styled(Typography)(({ theme }) => ({
    color: '#0070bb', 
    fontSize: '0.8rem',
}));



const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const AnimatedTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  fontWeight: 'bold',
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: 'transparent',
  },
  '&:hover:after': {
    content: 'attr(data-title)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: `${slideIn} 0.5s forwards`,
    color: theme.palette.text.primary,
  },
}));

export const AnimatedDescription = styled(Typography)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    color: 'transparent',
  },
  '&:hover:after': {
    content: 'attr(data-description)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: `${slideIn} 0.5s forwards`,
    color: theme.palette.text.secondary,
    paddingTop: theme.spacing(1),
  },
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '200px', 
  overflow: 'hidden',
  marginBottom: theme.spacing(1),
}));

export const ArticleImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}));

export const NewsContainerStyled = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  overflowX: 'auto',
});

export const NewsColumnStyled = styled('div')({
  flex: '0 0 auto', 
  width: '30%', 
});

export const NewsColumnCenterStyled = styled('div')({
  flex: '0 0 auto', 
  width: '40%', 
});