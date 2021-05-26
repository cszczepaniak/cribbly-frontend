import React from 'react';
import { AppComponent } from './App';
import { SettingsActions } from './shared/settings/settings-reducer';
import { createTestStore } from './testing/redux-test-utils';
import { renderWithProviders } from './testing/render';

describe('AppComponent', () => {
    test('requests to load settings right away', () => {
        const store = createTestStore();
        renderWithProviders(<AppComponent />, { store });

        expect(store.getActions()).toContainEqual(SettingsActions.loadSettingsRequest());
    });
});
