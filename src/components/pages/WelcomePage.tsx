import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { AccessPrivateDataButton } from '../AccessPrivateDataButton';
import axios from 'axios';
import { PageWrapper } from '../layout/PageWrapper';
import { useAuth } from '../../shared/auth/auth-hooks';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../shared/auth/auth-reducer';

export const WelcomePage = () => {
    const { user } = useAuth();
    const [isReturning, setIsReturning] = useState(false);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(AuthActions.signOutRequest());
    };

    useEffect(() => {
        const postLoginToBackend = async () => {
            const res = await axios.post('/api/player/login', {
                email: user?.email,
                name: user?.displayName,
            });
            setIsReturning(res.data.isReturning);
        };
        postLoginToBackend();
    });

    return (
        <PageWrapper>
            <div>
                Welcome{isReturning && ' back'}, {user?.displayName}
            </div>
            <AccessPrivateDataButton />
            <Button color='primary' variant='contained' onClick={handleLogOut}>
                Logout
            </Button>
        </PageWrapper>
    );
};
