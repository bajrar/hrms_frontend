import './Login.css';
import { useEffect, useState } from 'react';
import { apis } from '../apis/constants/ApisService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, login } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../store';
import { getUserData, getUserDetails } from '../../redux/features/userSlice';
import { verifyTokenStatus } from '../../redux/features/verifyTokenSlice';
import Spinner from '../Spinner/Spinner';
import { API_URL } from '../apis/constants/constant';
import axios from 'axios';
type LoginPageProps = {};

export const LoginPage = ({}: LoginPageProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({} as any);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const userRole = useAppSelector((state: RootState) => state.userSlice.value);
  const auth = localStorage.getItem('token');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
      toast.error('All fields are required.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await apis.getLogin(inputs);
      dispatch(getToken(res.data.token));
      dispatch(getUserData(res.data.user));
      dispatch(getUserDetails(res.data.userDetails));
      setLoginData(res.data.user);
      if (res.status === 200) {
        localStorage.setItem('userDetails', JSON.stringify(res.data?.userDetails));
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('email', res.data.user.email);

        if (res.data.user.isFirsttimeLogin) {
          try {
            const apiUrl = `${API_URL}/users/forgotPassword`;
            const response = await axios.post(apiUrl, { email: res.data.user.email });
            if (response.status === 200) {
              navigate('/verifyOtp');
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          navigate('/');
        }
        dispatch(login());
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Credentials');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(verifyTokenStatus() as any);
  }, []);
  return (
    <>
      {auth ? (
        <Spinner />
      ) : (
        <main className="loginpage_main">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="main_container container virtuosway-hr-login-page">
            <form onSubmit={handleSubmit}>
              <div className="main-logo-container d-flex align-items-center justify-content-center">
                <div className="logo ">
                  <img src="/images/virtuos-logo.svg" alt="logo" />
                </div>
              </div>
              <h2 className="sign-up-header">Sign in </h2>
              <p className="sign-up-text">Enter your sign in credentials.</p>
              <div className="form_container">
                <div className="labels">
                  <label htmlFor="">Email:</label>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your work email"
                  onChange={handleChange}
                />
                <p className="note-message">Note: example@eeposit.com / example@virtuosway.com</p>
              </div>
              <div className="form_container">
                <div className="labels">
                  <label htmlFor="">Password:</label>
                </div>
                <div className="password-input-container">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                  <button
                    type="button" // Change the button type to "button" instead of "submit"
                    className="toggle-password-visibility"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <Link to="/forgotPassword" className="forgot-password">
                Forgot password?
              </Link>
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? '#DBDFEA' : '',
                }}
              >
                {isLoading ? (
                  <>
                    <div>
                      <Spin style={{ color: 'white' }} />
                    </div>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </main>
      )}
    </>
  );
};
