import { ModelFactory } from '../../testing/model-factory';
import { generateState } from '../../testing/redux-test-utils';
import { SettingsActions, settingsReducer } from './settings-reducer';

describe('settings reducer', () => {
    test('load settings success loads the settings into redux', () => {
        const settings = ModelFactory.createAppSettings();
        const state = generateState(settingsReducer, SettingsActions.loadSettingsSuccess(settings));

        expect(state).toEqual(settings);
    });
});
