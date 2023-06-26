import './App.css';
import { LoginPage } from './Components/LoginPage/login';
import { MainRoutes } from './Components/Routes/routes';
import { useAppSelector } from './hooks/useTypedSelector';

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
        <LoginPage />
      )}
    </>
  );
}

export default App;
