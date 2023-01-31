import { checkingCredentials, login, logout } from './';
import { loginUserWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle, signOutUser } from '../../firebase';
import { clearNotesLogout } from '../journal';

// export const checkingAuthentication = () => {
//     return async( dispatch ) => {
//         dispatch( checkingCredentials() );
//     }
// }

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();

        if ( !result.ok ) return dispatch( logout( result ));

        dispatch( login( result ));
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, errorMessage, uid, displayName, photoURL } = await( loginUserWithEmailPassword({ email, password }));

        if( !ok ) return dispatch( logout({ errorMessage }));

        dispatch( login({ uid, email, displayName, photoURL }));
        
    }
}

export const startCreatingUserWithEmailPassword = ({ displayName, email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage } = await( registerUserWithEmailPassword({ displayName, email, password }) );

        if( !ok ) return dispatch( logout({ errorMessage }));
        
        dispatch( login({ uid, email, displayName, photoURL }) );
    }
};

export const startLogout = () => {

    return async ( dispatch ) => {

        await signOutUser();

        dispatch( clearNotesLogout() );

        dispatch( logout({ errorMessage: null }) );
    }
};