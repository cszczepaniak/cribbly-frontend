import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { createTestStore } from './redux-test-utils';

interface RenderOptions {
    store: Store;
}

export function renderWithProviders(
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    opts: RenderOptions = { store: createTestStore() },
) {
    return render(<Provider store={opts.store}>{ui}</Provider>);
}
