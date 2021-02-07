import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';
import { AccessPrivateDataButton } from '../AccessPrivateDataButton';
import axios from 'axios';

export const WelcomePage = () => {
    const { user, signOut } = useAuth();
    const [isReturning, setIsReturning] = useState(false);

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
        <div>
            <div>
                Welcome{isReturning && ' back'}, {user?.displayName}
            </div>
            <AccessPrivateDataButton />
            <Button color='primary' variant='contained' onClick={signOut}>
                Logout
            </Button>
        </div>
    );
};
