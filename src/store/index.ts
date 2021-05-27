import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, RootState } from './root-reducer';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
            ignoredPaths: ['auth'],
            ignoredActionPaths: ['payload'],
        },
    }).prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
