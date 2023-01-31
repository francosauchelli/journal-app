import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
    displayName: '',
    email: '',
    password: '',
};

const formValidations = {
    displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.' ],
    email: [ (value) => value.includes('@'), 'El email debe contener una @.' ],
    password: [ (value) => value.length >= 6, 'El password debe contener al menos 6 carácteres.' ],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector( state => state.auth );

    // para que no se esté recalculando cada vez que se modifica un valor del formulario.
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

    const [ formSubmitted, setFormSubmitted ] = useState( false );

    const { 
        displayName, email, password, formState, onChangeForm,
        displayNameValid, emailValid, passwordValid, isFormValid
    } = useForm( formData, formValidations );

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted( true );
        if( !isFormValid ) return;

        dispatch( startCreatingUserWithEmailPassword( formState ));
    }

    return (
        <AuthLayout title='Create Account' >
                <form 
                    onSubmit={ onSubmit }
                    className='animate__animated animate__fadeIn animate__faster'
                >
                    <Grid item
                        xs={ 12 }
                        sx={{ mt: 2 }}
                    >
                        <TextField 
                            label="Name"
                            type="text"
                            fullWidth
                            name='displayName'
                            value={ displayName }
                            onChange={ onChangeForm }
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ displayNameValid && displayNameValid }
                        />

                    </Grid>
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
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid && emailValid }
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
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid && passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
                        <Grid item
                            xs={ 12 }
                            // se puede usar sx= para ocultar, pero para variar utilizo la prop "display"
                            display={ ( !!errorMessage && !isCheckingAuthentication ) ? '' : 'none' }
                        >
                            <Alert 
                                severity="error"
                            >
                                { errorMessage }
                            </Alert>
                        </Grid>
                        <Grid item
                            xs={ 12}
                            >
                            <Button
                                type='submit'
                                disabled={ isCheckingAuthentication }
                                variant='contained'
                                fullWidth
                                >
                                <Typography sx={{ ml: 1 }}>Create Account</Typography> 
                            </Button>
                        </Grid>

                        <Grid container 
                            direction="row" 
                            justifyContent="end"    
                        >
                            <Typography sx={{ mr: 1, mt: 1 }}>Already Have An Account?</Typography>
                            <Link 
                                component={ RouterLink } to='/auth/login' 
                                color="inherit" sx={{ mt: 1 }}
                            >
                                    Log In
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
    );
}