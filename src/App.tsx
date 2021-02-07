import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './components/routing/Routes';
import { ProvideAuth } from './hooks/useAuth';
import { ProvideTournament } from './hooks/useTournament';

const theme = createMuiTheme({
    props: {
        MuiButton: {
            variant: 'contained',
            color: 'primary',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ProvideAuth>
                <ProvideTournament>
                    <BrowserRouter>
                        <Routes />
                    </BrowserRouter>
                </ProvideTournament>
            </ProvideAuth>
        </ThemeProvider>
    );
}

export default App;
