import { waitFor } from '@testing-library/react';
import { FakeServer } from '../../testing/fake-server';
import { ModelFactory } from '../../testing/model-factory';
import { createSagaTestStore } from '../../testing/redux-test-utils';
import { SettingsActions } from './settings-reducer';
import { settingsSaga } from './settings-saga';

describe('settings saga', () => {
    test('requesting settings should call api and dispatch load settings success', async () => {
        const store = createSagaTestStore(settingsSaga);
        const settings = ModelFactory.createAppSettings();
        FakeServer.setupGetRequest('/settings.json', 200, settings);
        store.dispatch(SettingsActions.loadSettingsRequest());

        await waitFor(() => expect(store.getActions()).toContainEqual(SettingsActions.loadSettingsSuccess(settings)));
    });
});
