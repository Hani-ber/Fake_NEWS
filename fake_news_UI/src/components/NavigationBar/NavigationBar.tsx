import React, { memo } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#FFF',
    boxShadow: 'none',
    paddingLeft: '16px',
    paddingRight: '16px',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'auto !important',
    paddingTop: theme.spacing(3), // Increased top padding (space before header)
    paddingBottom: theme.spacing(1),
}));

const LogoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
}));

const LetterBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#000',
    color: '#FFF',
    fontFamily: "'Reith Sans', sans-serif",
    fontWeight: 700,
    fontSize: '1.3rem',
    minWidth: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(0.5),
    letterSpacing: '-0.02em',
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: '#000',
    textTransform: 'none',
    fontWeight: 400,
    fontSize: '0.875rem',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
}));

const NavBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    backgroundColor: '#ccc',
}));

interface NavigationBarProps {
    onNavClick: (navItem: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = memo(({onNavClick}) => {
    const headerText = "FAKE NEWS";

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <LogoBox>
                    {headerText.split("").map((letter, index) => (
                        <LetterBox key={index}>
                            {letter}
                        </LetterBox>
                    ))}
                </LogoBox>
                <NavBox>
                    {['Home', 'Business', 'Health', 'Science', 'Sports','Technology'].map((navItem) => (
                        <NavButton key={navItem} onClick={() => onNavClick(navItem)}>
                            {navItem}
                        </NavButton>
                    ))}
                </NavBox>
                <StyledDivider />
            </StyledToolbar>
        </StyledAppBar>
    );
});

export default NavigationBar;