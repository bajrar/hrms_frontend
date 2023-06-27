import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage } from './Components/LoginPage/login';
import { MainRoutes } from './Components/Routes/routes';
import { useAppSelector } from './hooks/useTypedSelector';
import { ForgetPassword } from './Components/LoginPage/ForgetPassword';
import { ProtectedOtpRoute } from './Components/Routes/protectedOtp';
import { OtpSection } from './Components/LoginPage/OtpSection';
import { ChangePassword } from './Components/LoginPage/ChangePassword';

function App() {
  const auth = localStorage.getItem('token');
  const isLogined = useAppSelector((state: any) => state.authSlice.isLogined);
  return (
    <>
      {isLogined || auth ? (
        <div className='App'>
          <div className='dashboard-page'>
            <div className='dash-container'>
              <MainRoutes />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Routes>
            <Route element={<ProtectedOtpRoute />}>
              <Route path='/verifyOtp' element={<OtpSection />} />
              <Route path='/ChangePassword' element={<ChangePassword />} />
            </Route>
            <Route path='/forgotPassword' element={<ForgetPassword />} />
          </Routes>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default App;
