import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { getEnvVariables } from '../helpers';


export const AppRouter = () => {

    const authStatus = 'auth';

    console.log(getEnvVariables());
    
  return (
    <Routes>
        {
             (authStatus == 'not-auth') 
             ?
             <Route path='/auth/*' element={<LoginPage />}/>
             :
             <Route path='/*' element={<CalendarPage />} />
        }

        <Route path='/*' element={ <Navigate to="/auth/login" /> } />

    </Routes>

  )
}