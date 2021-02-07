import { Button } from '@material-ui/core';
import React from 'react';
import { useAuthToken } from '../hooks/useAuth';
import axios from 'axios';

export const AccessPrivateDataButton = () => {
    const token = useAuthToken();

    const handleAccessPrivateData = async () => {
        if (!token) {
            console.error('No token found');
        }
        try {
            const res = await axios.get('/sample/private', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(res.data);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <Button variant='contained' onClick={handleAccessPrivateData}>
            Access Private Data
        </Button>
    );
};
