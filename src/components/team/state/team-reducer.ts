import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../../shared/auth/auth-models';
import { PlayerSearch, Team, TeamCreateRequest } from './team-model';

interface TeamState {
    team: Team | null;
    playerSearch: PlayerSearch;
}

const initialState: TeamState = {
    team: null,
    playerSearch: {
        isLoading: false,
        hasSearched: false,
        executedQuery: '',
        result: null,
    },
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        createTeamRequest(state, { payload }: PayloadAction<TeamCreateRequest>) {},
        createTeamSuccess(state, { payload }: PayloadAction<Team>) {
            state.team = payload;
        },
        loadTeamRequest() {},
        loadTeamSuccess(state, { payload }: PayloadAction<Team>) {
            state.team = payload;
        },
        searchPlayerRequest(state, { payload }: PayloadAction<string>) {
            state.playerSearch.isLoading = true;
            state.playerSearch.executedQuery = payload;
        },
        searchPlayerSuccess(state, { payload }: PayloadAction<Player>) {
            state.playerSearch.isLoading = false;
            state.playerSearch.hasSearched = true;
            state.playerSearch.result = payload;
        },
        searchPlayerNotFound(state) {
            state.playerSearch.hasSearched = true;
            state.playerSearch.result = null;
        },
        resetPlayerSearch(state) {
            state.playerSearch.hasSearched = false;
            state.playerSearch.result = null;
        },
    },
});

export const TeamActions = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
