import { Action, Reducer } from 'redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { rootReducer, RootState } from '../store/root-reducer';
import createSagaMiddleware from 'redux-saga';

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

function createRootState(...actions: Action[]): RootState {
    return generateState(rootReducer, ...actions);
}
