import React from 'react';
import { AppBar as MuiAppBar, Button, makeStyles, Toolbar } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { Routes } from '../../shared/routing/routes';

const useStyles = makeStyles(theme => ({
    appBarButton: {
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

export const AppBar = () => {
    const classes = useStyles();
    return (
        <MuiAppBar position='fixed'>
            <Toolbar>
                <Button
                    aria-label='home'
                    component={Link}
                    to={Routes.home}
                    className={classes.appBarButton}
                    disableRipple
                    variant='text'
                >
                    Home
                </Button>
                <Button
                    aria-label='team'
                    component={Link}
                    to={Routes.team}
                    className={classes.appBarButton}
                    disableRipple
                    variant='text'
                >
                    My Team
                </Button>
            </Toolbar>
        </MuiAppBar>
    );
};
