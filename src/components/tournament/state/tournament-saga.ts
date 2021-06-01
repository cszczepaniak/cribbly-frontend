import axios, { AxiosError, AxiosResponse } from 'axios';
import { Tournament } from './tournament-model';
import { TournamentActions } from './tournament-reducer';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchNextTournament() {
    try {
        const res: AxiosResponse<Tournament> = yield axios.get('/api/tournament/next');
        yield put(TournamentActions.loadNextTournamentSuccess(res.data));
    } catch (err) {
        const error: AxiosError = err;
        yield put(TournamentActions.loadNextTournamentFailure(error.response?.data));
    }
}

export function* tournamentSaga() {
    yield takeEvery(TournamentActions.loadNextTournamentRequest.type, fetchNextTournament);
}
