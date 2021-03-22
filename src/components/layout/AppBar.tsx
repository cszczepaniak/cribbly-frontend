import React from 'react';
import {
    AppBar as MuiAppBar,
    Button,
    makeStyles,
    Toolbar,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

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
                    component={Link}
                    to='/home'
                    className={classes.appBarButton}
                    disableRipple
                    variant='text'
                >
                    Home
                </Button>
                <Button
                    component={Link}
                    to='/team'
                    className={classes.appBarButton}
                    disableRipple
                    variant='text'
                >
                    My Team
                </Button>
                <Button
                    component={Link}
                    to='/standings'
                    className={classes.appBarButton}
                    disableRipple
                    variant='text'
                >
                    Standings
                </Button>
            </Toolbar>
        </MuiAppBar>
    );
};
