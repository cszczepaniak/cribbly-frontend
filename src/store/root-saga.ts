import { all } from '@redux-saga/core/effects';
import { tournamentSaga } from '../components/tournament/state/tournament-saga';

export function* rootSaga() {
    yield all([tournamentSaga()]);
}
