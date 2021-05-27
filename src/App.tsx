import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './components/routing/Routes';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { SettingsActions } from './shared/settings/settings-reducer';

const theme = createMuiTheme({
    props: {
        MuiButton: {
            variant: 'contained',
            color: 'primary',
        },
    },
});

export function AppComponent() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SettingsActions.loadSettingsRequest());
    }, [dispatch]);
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AppComponent />
            </Provider>
        </ThemeProvider>
    );
}

export default App;
