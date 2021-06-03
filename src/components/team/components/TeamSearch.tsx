import React from 'react';
import { Backdrop, Button, CircularProgress, TextField, Typography } from '@material-ui/core';

interface Props {
    searchQuery: string;
    onSearchPlayerClick: () => void;
    onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TeamSearch: React.FunctionComponent<Props> = ({
    onSearchPlayerClick,
    onSearchQueryChange,
    searchQuery,
}) => {
    if (false) {
        return (
            <Backdrop open={true}>
                <CircularProgress />
            </Backdrop>
        );
    }

    return (
        <>
            <Typography>You're not on a team yet. Type a player's email in below to start creating a team.</Typography>
            <TextField
                variant='outlined'
                fullWidth
                placeholder='Enter an email address...'
                value={searchQuery}
                onChange={onSearchQueryChange}
                inputProps={{ 'aria-label': 'search' }}
            />
            <Button aria-label='search' onClick={onSearchPlayerClick}>
                Search
            </Button>
        </>
    );
};
