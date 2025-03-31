import React, { useState, useEffect, useCallback, memo } from 'react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import NewsListComponent from './components/NewsList/NewsList'; 
import { Container } from '@mui/material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
interface AppProps {}

const App: React.FC<AppProps> = memo(() => {
  const [selectedNav, setSelectedNav] = useState<string>('');
  const handleNavClick = (navItem: string) => {
    setSelectedNav(navItem);
  }; 
    return (
        <div>
          
           <ThemeProvider theme={theme}>
            <NavigationBar onNavClick={handleNavClick}/>
            <Container maxWidth="lg">
               <NewsListComponent   selectedNav={selectedNav.toString()}/>
            </Container>
            </ThemeProvider>
        </div>
    );
});

export default App;