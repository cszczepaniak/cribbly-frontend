import React from 'react';
import {
  Button,
  Container,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
  landingPageContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  landingPageContent: {
    height: '25vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const CallToActionButton = withStyles({
  root: {
    height: '5vh',
    fontSize: '1.5rem',
    textTransform: 'none',
    margin: '0 5rem',
  },
})(Button);

export const LandingPage = () => {
  const classes = useStyles();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleOnClick = () => {
    loginWithRedirect({ redirectUri: 'http://localhost:3000/home' });
  };

  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }
  return (
    <Container maxWidth='sm' className={classes.landingPageContainer}>
      <div className={classes.landingPageContent}>
        <div>
          <Typography variant='h2'>Welcome to Cribbly.</Typography>
          <Typography align='center'>
            Next tournament starts on March 14, 2021
          </Typography>
        </div>
        <CallToActionButton
          onClick={handleOnClick}
          color='primary'
          variant='contained'
        >
          Get Started
        </CallToActionButton>
      </div>
    </Container>
  );
};
