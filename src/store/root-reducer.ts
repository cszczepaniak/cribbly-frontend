import { combineReducers } from '@reduxjs/toolkit';
import { teamReducer } from '../components/team/state/team-reducer';
import { tournamentReducer } from '../components/tournament/state/tournament-reducer';
import { authReducer } from '../shared/auth/auth-reducer';
import { settingsReducer } from '../shared/settings/settings-reducer';

export const rootReducer = combineReducers({
    tournament: tournamentReducer,
    settings: settingsReducer,
    auth: authReducer,
    team: teamReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
