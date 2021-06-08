import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import { Player } from './auth-models';

type NullableFirebaseUser = firebase.User | null;

export interface AuthState {
    isSignedIn: boolean;
    isLoading: boolean;
    isReturning: boolean;
    user: NullableFirebaseUser;
    player: Player | null;
}

const initialAuth: AuthState = {
    isSignedIn: false,
    isLoading: false,
    isReturning: false,
    user: null,
    player: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuth,
    reducers: {
        signInWithGoogleRequest(state) {
            state.isLoading = true;
            state.isSignedIn = false;
            state.user = null;
            state.player = null;
        },
        signInSuccess(
            _,
            { payload }: PayloadAction<{ user: NullableFirebaseUser; player: Player; isReturning: boolean }>,
        ) {
            return {
                isLoading: false,
                isSignedIn: true,
                ...payload,
            };
        },
        signOutRequest(state) {
            state.isSignedIn = false;
            state.user = null;
            state.player = null;
        },
    },
});

export const AuthActions = authSlice.actions;
export const authReducer = authSlice.reducer;
