import { Grid, Typography } from '@mui/material';
import { StickyNote2 } from '@mui/icons-material';


export const NoViewSelected = () => {
    return ( 
        <Grid container 
            spacing={ 0 }
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: 'calc( 100vh - 100px )', backgroundColor: 'primary.main', borderRadius: 2 }}
        >
            <Grid item xs={ 12 } >
                <StickyNote2 sx={{ fontSize: 100, color: 'white' }} />
            </Grid>
            <Grid item xs={ 12 }>
                <Typography 
                    color='white'
                    variant='h5'
                >Selecciona o crea una entrada.</Typography>
            </Grid>
        </Grid>
    );
}