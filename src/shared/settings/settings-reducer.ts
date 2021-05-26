import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings } from './settings-model';

const defaultSettings: AppSettings = {
    firebaseConfig: {
        apiKey: '',
        appId: '',
        authDomain: '',
        messagingSenderId: '',
        projectId: '',
        storageBucket: '',
    },
};

const settingsSlice = createSlice({
    name: 'app settings',
    initialState: defaultSettings,
    reducers: {
        loadSettingsRequest() {},
        loadSettingsSuccess(_, { payload }: PayloadAction<AppSettings>) {
            return payload;
        },
    },
});

export const SettingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
