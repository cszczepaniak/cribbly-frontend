import { all } from '@redux-saga/core/effects';
import { tournamentSaga } from '../components/tournament/state/tournament-saga';
import { createAuthSaga } from '../shared/auth/auth-saga';
import { settingsSaga } from '../shared/settings/settings-saga';

export function* rootSaga() {
    yield all([tournamentSaga(), settingsSaga(), createAuthSaga()()]);
}
