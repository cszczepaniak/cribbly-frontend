import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './components/routing/Routes';
import { ProvideAuth } from './hooks/useAuth';
import { Provider } from 'react-redux';
import { store } from './store';

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
            <Provider store={store}>
                <ProvideAuth>
                    <BrowserRouter>
                        <Routes />
                    </BrowserRouter>
                </ProvideAuth>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
