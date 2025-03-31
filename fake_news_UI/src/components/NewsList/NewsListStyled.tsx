import { styled, keyframes } from '@mui/material/styles';
import { Box, Card, CardContent, Typography, Container, LinearProgress } from '@mui/material';

export const StyledContainer = styled(Container)({
  marginTop: '20px'
});

export const StyledBox = styled(Box)({
  width: '100%',
  marginBottom: '20px'
});

export const StyledLinearProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 5,
  backgroundColor: '#ccc', 
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(to right, #ccc, #333)`,
  },
});