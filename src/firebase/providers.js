import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword,
    updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from './';


const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = async() => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // user data
            displayName, email, photoURL, uid,
        }

    } catch ( error ) {

        const errorMessage = error.message;
        
        return {
            ok: false,
            errorMessage,
        }
    }
};

export const loginUserWithEmailPassword = async({ email, password }) => {

    try {   
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            // user data
            uid, photoURL, displayName, email
        }
        
    } catch (error) {

        return {
            ok: false, errorMessage: error.message,
        }
        
    }
}

export const registerUserWithEmailPassword = async({ displayName, email, password }) => {

    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user

        updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid, photoURL, displayName, email 
        }
        
    } catch (error) {

        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const signOutUser = async() => {
    
    return await FirebaseAuth.signOut();

}