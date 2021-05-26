import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tournament } from './tournament-model';
import { initialTournamentState } from './tournament-state';

const tournamentSlice = createSlice({
    name: 'tournament',
    initialState: initialTournamentState,
    reducers: {
        loadNextTournamentRequest(state) {
            state.isLoading = true;
        },
        loadNextTournamentSuccess(state, { payload }: PayloadAction<Tournament>) {
            state.isLoading = false;
            state.tournament = payload;
        },
        loadNextTournamentFailure(state, { payload }: PayloadAction<string>) {
            state.isLoading = false;
            state.error = payload;
        },
    },
});

export const TournamentActions = tournamentSlice.actions;
export const tournamentReducer = tournamentSlice.reducer;
