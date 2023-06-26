import './App.css';
import { LoginPage } from './Components/LoginPage/login';
import { MainRoutes } from './Components/Routes/routes';

function App() {
  const auth = localStorage.getItem('token');

  return (
    <>
      {!auth ? (
        <LoginPage />
      ) : (
        <div className='App'>
          <div className='dashboard-page'>
            {/* <Layout>
          <Navbar /> */}
            <div className='dash-container'>
              <MainRoutes />
            </div>
            {/* </Layout> */}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
