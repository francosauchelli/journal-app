import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { startNewNote } from '../../store/journal/thunks';
import JournalLayout from '../layout/JournalLayout';
import { NoViewSelected, NoteView } from '../views';

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, activeNote } = useSelector( state => state.journal );

    const onAddNewNote = () => {
        dispatch( startNewNote() )
    }

    return (
        <JournalLayout>
            {
                ( !!activeNote )
                ? <NoteView />
                : <NoViewSelected />
            }

            <IconButton 
                disabled={ isSaving }
                size='large'
                sx={{ 
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50,
                }}
                onClick={ onAddNewNote }
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </ IconButton>
        </JournalLayout>
    );
}