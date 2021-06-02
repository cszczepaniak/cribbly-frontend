import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import { Player } from '../../models/Player';

export interface AuthState {
    isSignedIn: boolean;
    isLoading: boolean;
    user: firebase.User | null;
    player: Player | null;
}

interface SignInSuccessPayload {
    user: firebase.User | null;
    player: Player;
}

const initialAuth: AuthState = {
    isSignedIn: false,
    isLoading: false,
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
        signInSuccess(state, { payload }: PayloadAction<SignInSuccessPayload>) {
            state.isLoading = false;
            state.isSignedIn = true;
            state.user = payload.user;
            state.player = payload.player;
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
