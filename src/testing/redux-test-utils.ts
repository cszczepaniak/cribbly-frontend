import { Action, Reducer } from 'redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { rootReducer, RootState } from '../store/root-reducer';
import createSagaMiddleware from 'redux-saga';
import firebase from 'firebase/app';
import { Player } from '../shared/auth/auth-models';
import { ModelFactory } from './model-factory';
import { AuthActions } from '../shared/auth/auth-reducer';

export function generateState<T>(reducer: Reducer<T>, ...actions: Action[]): T {
    return actions.reduce(reducer, reducer(undefined, { type: '@@INIT' }));
}

export function createTestStore(...actions: Action[]): MockStore {
    return configureMockStore([])(createRootState(...actions));
}

export function createSagaTestStore(saga: () => Generator<Action>, ...actions: Action[]): MockStore {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureMockStore([sagaMiddleware])(createRootState(...actions));
    sagaMiddleware.run(saga);
    return store;
}

interface CreateLoggedInSagaTestStoreOptions {
    user: firebase.User;
    player: Player;
}
export function createLoggedInSagaTestStore(
    saga: () => Generator<Action>,
    options: Partial<CreateLoggedInSagaTestStoreOptions>,
    ...actions: Action[]
) {
    const user: firebase.User = options.user || ModelFactory.createUser();
    const player: Player =
        options.player ||
        ModelFactory.createPlayer({
            email: user.email || 'not gonna happen',
            name: user.displayName || 'not gonna happen',
        });
    return {
        store: createSagaTestStore(
            saga,
            ...[AuthActions.signInSuccess({ user, player, isReturning: false }), ...actions],
        ),
        user,
        player,
    };
}

function createRootState(...actions: Action[]): RootState {
    return generateState(rootReducer, ...actions);
}
