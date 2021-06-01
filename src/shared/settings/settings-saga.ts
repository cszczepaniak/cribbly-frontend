import { takeEvery } from '@redux-saga/core/effects';
import axios, { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';
import { AppSettings } from './settings-model';
import { SettingsActions } from './settings-reducer';

function* loadSettings() {
    const res: AxiosResponse<AppSettings> = yield axios.get('/settings.json');
    yield put(SettingsActions.loadSettingsSuccess(res.data));
}

export function* settingsSaga() {
    yield takeEvery(SettingsActions.loadSettingsRequest.type, loadSettings);
}
