import { doc, collection, setDoc, deleteDoc } from 'firebase/firestore/lite';
import { FirestoreDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, setImagesToActiveNote, deleteNoteById } from './journalSlice';
import { loadNotes, uploadFiles } from '../../helpers/journal';

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirestoreDB, `${ uid }/journal/notes` ));
        
        
        await setDoc( newDoc, newNote );
        
        newNote.id = newDoc.id;
        
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ));
    }
};

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( !uid ) throw new Error('El UID del usuario no existe.');

        const notes = await loadNotes( uid );
        
        dispatch( setNotes( notes ) );

    }
};

export const startSavingNote = () => {
    return async( dispatch, getState ) => {
        dispatch( setSaving());

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        const noteToFirebase = { ...activeNote };
        delete noteToFirebase.id;

        const docRef = doc( FirestoreDB, `${ uid }/journal/notes/${ activeNote.id }` );
        await setDoc( docRef, noteToFirebase, { merge: true }); // { merge: true } para que deje los campos que existan en la BD, pero no tenga el "noteToFirestore"

        dispatch( updateNote( activeNote ));
        
    }
};

export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {
        dispatch( setSaving() );

        const uploadFilesPromises = [];

        for ( const file of files ) {
            uploadFilesPromises.push( uploadFiles( file ));
        }

        const imagesURLs = await Promise.all( uploadFilesPromises );

        dispatch( setImagesToActiveNote( imagesURLs ) );

    }

};

export const startDeletingNote = ( id ) => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const docRef = doc( FirestoreDB, `${ uid }/journal/notes/${ activeNote.id }` );

        await deleteDoc( docRef );

        dispatch( deleteNoteById( activeNote.id ) );
    }
} 

