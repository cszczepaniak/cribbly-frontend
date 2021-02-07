import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { AppBar } from './AppBar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    appBarOffset: theme.mixins.toolbar,
}));

export const PageWrapper: React.FunctionComponent = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar />
            <main className={classes.content}>
                <div className={classes.appBarOffset} />
                <Container maxWidth='lg' className={classes.container}>
                    <div>{children}</div>
                </Container>
            </main>
        </div>
    );
};
