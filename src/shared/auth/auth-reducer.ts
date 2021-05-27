import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/app';

interface AuthState {
    isSignedIn: boolean;
    isLoading: boolean;
    user: firebase.User | null;
}

const initialAuth: AuthState = {
    isSignedIn: false,
    isLoading: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuth,
    reducers: {
        signInWithGoogleRequest(state) {
            state.isLoading = true;
            state.isSignedIn = false;
            state.user = null;
        },
        signInSucess(state, { payload }: PayloadAction<firebase.User | null>) {
            state.isLoading = false;
            state.isSignedIn = true;
            state.user = payload;
        },
        signOutRequest(state) {
            state.isSignedIn = false;
            state.user = null;
        },
    },
});

export const AuthActions = authSlice.actions;
export const authReducer = authSlice.reducer;
