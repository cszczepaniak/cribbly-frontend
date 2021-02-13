import {
    Backdrop,
    Button,
    CircularProgress,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import { Player } from '../../../models/Player';

const useStyles = makeStyles(theme => ({
    error: {
        color: theme.palette.error.main,
    },
}));

interface Props {
    onSearch: (player: Player) => void;
}

export const TeamSearch: React.FunctionComponent<Props> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const classes = useStyles();

    const onSearchClick = () => {
        axios
            .get<Player>('/api/player', {
                headers: {
                    Email: query,
                },
            })
            .then(response => {
                onSearch(response.data);
                setIsLoading(false);
                if (error.length > 0) {
                    setError('');
                }
            })
            .catch(() => setError('Player not found'));
    };

    if (isLoading) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>
        );
    }

    return (
        <>
            <Typography>
                You're not on a team yet. Type a player's email in below to
                start creating a team.
            </Typography>
            <TextField
                variant='outlined'
                fullWidth
                placeholder='Enter an email address...'
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            {error.length > 0 && (
                <Typography className={classes.error}>
                    Player not found
                </Typography>
            )}
            <Button onClick={onSearchClick}>Search</Button>
        </>
    );
};
