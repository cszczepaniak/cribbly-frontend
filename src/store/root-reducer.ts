import { combineReducers } from '@reduxjs/toolkit';
import { tournamentReducer } from '../components/tournament/state/tournament-reducer';

export const rootReducer = combineReducers({
    tournament: tournamentReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
