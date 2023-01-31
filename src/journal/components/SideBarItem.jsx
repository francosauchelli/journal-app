import { useMemo } from 'react';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ note }) => {
    const { title, body } = note;

    const dispatch = useDispatch();

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring( 0, 17 ) + '...'
            : title;
    }, [title]);

    const newBody = useMemo( () => {
        return body.length > 30
            ? body.substring(0,30) + '...'
            : body;

    }, [body]);

    const onClickNote = () => {
        dispatch( setActiveNote( note ));
    };

    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={ onClickNote }    
            >
                <ListItemIcon >
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ newBody } />
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};