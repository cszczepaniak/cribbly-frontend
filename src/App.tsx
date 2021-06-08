import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { SettingsActions } from './shared/settings/settings-reducer';
import { LandingPage } from './components/pages/LandingPage';
import { AuthenticatedApp } from './components/layout/AuthenticatedApp';

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
            <Switch>
                <Route exact path='/'>
                    <LandingPage />
                </Route>
                <Route path='/app'>
                    <AuthenticatedApp />
                </Route>
            </Switch>
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
