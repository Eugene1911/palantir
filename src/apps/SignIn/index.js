import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles';

import useAuthState from './services/useAuthState';
import useAuthReducer from './services/useAuthReducer';

export default function SignIn() {
  const classes = useStyles();
  const { authForm, onChangeAuthFielsHandler } = useAuthState();
  const {
    onSubmitAuthFormState,
    onSubmitAuthForm,
  } = useAuthReducer();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>

        {onSubmitAuthFormState.isFetching && <CircularProgress />}

        <form
          className={classes.form}
          noValidate
          onSubmit={event => onSubmitAuthForm(event, authForm)}
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            onChange={onChangeAuthFielsHandler}
            autoComplete='email'
            value={authForm.email}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            onChange={onChangeAuthFielsHandler}
            value={authForm.password}
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
