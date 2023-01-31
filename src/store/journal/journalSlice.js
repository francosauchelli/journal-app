import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        activeNote: null,
            // activeNote: {
            //     id: 'ABC123',
            //     title: '',
            //     body: '',
            //     date: 1234567, 
            //     imageURLs: [], // https://image1.jpg, https://image2.jpg, https://image3.jpg
            // }
    },
    reducers: {
        setSaving: (state ) => {
            state.isSaving = true;
            state.savedMessage = '';
        },

        addNewEmptyNote: (state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },

        setActiveNote: (state, action ) => {
            state.activeNote = action.payload;
            state.savedMessage = '';
        },

        setNotes: (state, action ) => {
            state.notes = action.payload;
        },

        updateNote: (state, { payload } ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if( note.id === payload.id ) {
                    return payload;
                }
                return note;
            });

            state.savedMessage = `"${ payload.title }", has been successfully saved.`
        },

        setImagesToActiveNote: ( state, { payload } ) => {
            state.activeNote.imageURLs = [ ...(state.activeNote.imageURLs || []), ...payload ];
            state.isSaving = false;
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.savedMessage = '';
            state.notes = [];
            state.activeNote = null;
        },
        deleteNoteById: (state, action ) => { 
            state.activeNote = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
            state.isSaving = false;
        },
        
    },
})


export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    setActiveNote,
    setImagesToActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions

// export default journalSlice.reducer

