import { combineReducers } from '@reduxjs/toolkit';
import { tournamentReducer } from '../components/tournament/state/tournament-reducer';
import { settingsReducer } from '../shared/settings/settings-reducer';

export const rootReducer = combineReducers({
    tournament: tournamentReducer,
    settings: settingsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
