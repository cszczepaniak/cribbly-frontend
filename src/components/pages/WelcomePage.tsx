import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../../shared/auth/auth-hooks';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../shared/auth/auth-reducer';

export const WelcomePage = () => {
    const { player, isReturning } = useAuth();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(AuthActions.signOutRequest());
    };

    return (
        <>
            <div>
                Welcome{isReturning && ' back'}, {player?.name}
            </div>
            <Button aria-label='sign out' color='primary' variant='contained' onClick={handleLogOut}>
                Logout
            </Button>
        </>
    );
};
