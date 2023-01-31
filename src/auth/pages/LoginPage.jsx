import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const initialState = {
    email: '',
    password: '',
}

export const LoginPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector( state => state.auth );

    const isAuthenticating = useMemo( () => status === 'checking', [status]);

    const { email, password, onChangeForm } = useForm( initialState );

    const onSubmitForm = ( event ) => {
        event.preventDefault();

        dispatch( startLoginWithEmailPassword({ email, password }));
    };

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    }

    return (
        <AuthLayout title='Login' >
                <form
                    className='animate__animated animate__fadeIn animate__faster'
                    onSubmit={ onSubmitForm }>
                    <Grid item
                        xs={ 12 }
                        sx={{ mt: 2 }}
                    >
                        <TextField 
                            label="e-mail"
                            type="email"
                            fullWidth
                            name='email'
                            value={ email }
                            onChange={ onChangeForm }
                        />

                    </Grid>
                    <Grid item
                        xs={ 12 }
                        sx={{ mt: 2 }}
                    >
                        <TextField 
                            label="Password"
                            type="password"
                            fullWidth
                            name='password'
                            value={ password }
                            onChange={ onChangeForm }
                        />
                    </Grid>

                    <Grid container
                        sx={{ mt: 2 }}
                        display={ ( !!errorMessage && !isAuthenticating ) ? '' : 'none' }
                    >
                        <Grid item
                            xs={ 12 } sm={ 12 }
                        >
                            <Alert 
                                severity='error'
                            >
                                { errorMessage }
                            </Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 0 }} >
                        <Grid item
                            xs={ 12} sm={ 6 }
                            >
                            <Button 
                                disabled={ isAuthenticating }
                                type='submit'
                                variant='contained'
                                fullWidth
                                >
                                <Typography>Login</Typography> 
                            </Button>
                        </Grid>
                        <Grid item
                            xs={ 12} sm={ 6 }
                            >
                            <Button
                                disabled={ isAuthenticating }
                                onClick={ onGoogleSignIn }
                                variant='contained'
                                fullWidth
                                >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Gmail</Typography> 
                            </Button>
                        </Grid>

                        <Grid container 
                            direction="row" 
                            justifyContent="end"    
                        >
                            <Link 
                                component={ RouterLink } to='/auth/register' 
                                color="inherit" sx={{ mt: 1 }}
                            >
                                    Create Account
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
    );
}