import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.css';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal/thunks';

export const NoteView = () => {

    const { activeNote, isSaving, savedMessage } = useSelector( state => state.journal );
    const dispatch = useDispatch();

    const { body, title, date, formState, onChangeForm } = useForm( activeNote );

    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return newDate.toUTCString();
        
    }, [date]);

    useEffect( () => {
        dispatch( setActiveNote( formState ));
    }, [formState]);

    useEffect( () => {
        if( savedMessage.length > 0 ) {
            Swal.fire( 'Great!', savedMessage, 'success' );
        }
    }, [savedMessage]);

    const inputFileRef = useRef();

    const onSaveNote = () => {
        dispatch( startSavingNote() );
    };

    const onFileInputChange = ({ target }) => {
        if( target.files.length === 0 ) return;

        dispatch( startUploadingFiles( target.files ) );
    }

    const onDeleteNote = () => {
        console.log( 'se presiona')
        dispatch( startDeletingNote() );
    }
            
    return (
        <Grid container
            spacing={ 0 }
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: 'calc( 100vh - 100px )', borderRadius: 2 }}
        >   
            {/* <Grid item
                alignContent='left'
            > */}
                <Typography fontSize={ 29 } fontWeight='light' >
                    { dateString }
                </Typography>
            {/* </Grid> */}
            <Grid container
                justifyContent='end'
            >
                <input
                    type="file"
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                    ref={ inputFileRef }
                />
                <IconButton
                    color='primary'
                    disabled={ isSaving }
                    onClick={ () => inputFileRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>
                <Button
                    color='primary' 
                    sx={{ padding: 2 }}
                    onClick={ onSaveNote }
                    disabled={ isSaving }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                    Save
                </Button>
            </Grid>
            <Grid 
                container
                justifyContent='end'
            >
                <Button
                    color='error'
                    onClick={ onDeleteNote }
                >
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid>
            <Grid container >
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Note title'
                    label='Title'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={ title }
                    onChange={ onChangeForm }
                />
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    minRows={ 5 }
                    placeholder='What happened today?'
                    sx={{ border: 'none', mb: 1 }}
                    name='body'
                    value={ body }
                    onChange={ onChangeForm }
                />
            </Grid>
            <Grid container
                sx={{ width: '100%', mb: 1 }}
            >
                <ImageGallery images={ activeNote.imageURLs }/>
            </Grid>


        </Grid>
    );
}
 