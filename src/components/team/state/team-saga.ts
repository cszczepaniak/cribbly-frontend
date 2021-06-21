import { put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Player } from '../../../shared/auth/auth-models';
import { TeamCreateRequest } from './team-model';
import { TeamActions } from './team-reducer';

function* searchPlayer({ payload }: PayloadAction<string>) {
    try {
        const searchResponse: AxiosResponse<Player> = yield axios.get('/api/player', { headers: { Email: payload } });
        yield put(TeamActions.searchPlayerSuccess(searchResponse.data));
    } catch (err) {
        const typedErr: AxiosError = err;
        if (typedErr.response?.status === 404) {
            yield put(TeamActions.searchPlayerNotFound());
            return;
        }
        throw err;
    }
}

function* createTeam({ payload }: PayloadAction<TeamCreateRequest>) {
    const teamCreateResponse: AxiosResponse<number> = yield axios.post('/api/team', payload);
    yield put(TeamActions.createTeamSuccess({ ...payload, id: teamCreateResponse.data }));
}

export function* teamSaga() {
    yield takeLatest(TeamActions.searchPlayerRequest, searchPlayer);
    yield takeEvery(TeamActions.createTeamRequest, createTeam);
}
