import { Navigate, Route, Routes } from 'react-router-dom';

import { useCheckAuth } from '../hooks';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CheckingAuth } from '../ui/components';


export const AppRouter = () => {

    const { status } = useCheckAuth();
        
    if( status === 'checking' ) return (
        <CheckingAuth />
    );

    return (
        <Routes>

            {
                ( status === 'authenticated' )
                ? <Route path='/*' element={ <JournalRoutes /> } />
                : <Route path='/auth/*' element={ <AuthRoutes /> } />
            }

            <Route path='/*' element={ <Navigate to='/auth/login' /> } />

            {/* Login and register */}
            {/* <Route path='/auth/*' element={ <AuthRoutes /> } /> */}

            {/* JournalApp */}
            {/* <Route path='/' element={ <JournalRoutes /> } /> */}
        </Routes>
    );
}