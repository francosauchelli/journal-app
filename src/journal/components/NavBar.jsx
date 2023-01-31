import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, IconButton, Grid, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { startLogout } from '../../store/auth';


export const NavBar = ({ drawerWidth }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <AppBar 
            position = 'fixed'
            sx = {{
                width: { sm: ` calc( 100% - ${ 240 }px )`}, 
                ml: { sm: `${ drawerWidth }px`}
            }}    
        >
            <Toolbar>
                <IconButton
                    color = "inherit"
                    edge = "start"
                    sx = {{ mr: 2, display: { sm: 'none' }}}
                >
                    <MenuOutlined />
                </IconButton>
                <Grid container
                    direction='row' 
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Typography variant='h6' noWrap component='div'>JournalApp</Typography>
                    <IconButton 
                        onClick={ onLogout }
                    >
                        <LogoutOutlined sx={{ color: 'secondary.main' }}/>
                    </IconButton>
                </ Grid>
            </Toolbar>
        </AppBar>
    );
}