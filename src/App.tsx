import Layout from './Components/Layout'
import './App.css'
import { MainRoutes } from './Components/Routes/routes'
import Navbar from './Components/Ui/Navbar'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './Components/LoginPage/login'

function App() {
  return (
    <div className='App'>
      <div className='dashboard-page'>
        <Layout>
          <Navbar />
          <div className='dash-container'>
            <MainRoutes />
          </div>
        </Layout>
        {/* <Routes>
          <Route path='/' element={<LoginPage />} />
        </Routes> */}
      </div>
    </div>
  )
}

export default App
