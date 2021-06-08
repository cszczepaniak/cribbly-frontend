import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Store } from 'redux';
import { createTestStore } from './redux-test-utils';
import { Route, Router, Switch } from 'react-router-dom';

interface RenderOptions {
    store: Store;
}

export function renderWithProviders(
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    opts: RenderOptions = { store: createTestStore() },
) {
    return render(<Provider store={opts.store}>{ui}</Provider>);
}

interface RenderAtRouteOptions extends RenderOptions {
    routePath: string;
    initialEntries?: string[];
}
export function renderAtRouteWithProviders(
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    opts: RenderAtRouteOptions = { store: createTestStore(), routePath: '' },
) {
    const history = createMemoryHistory({ initialEntries: opts.initialEntries });
    return {
        ...renderWithProviders(
            <Router history={history}>
                <Switch>
                    <Route path={opts.routePath}>{ui}</Route>
                </Switch>
            </Router>,
            opts,
        ),
        history,
    };
}
