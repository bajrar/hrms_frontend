import './Login.css';
import { useEffect, useState } from 'react';
import { apis } from '../apis/constants/ApisService';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../features/authSlice';
import { useDispatch } from 'react-redux';

type LoginPageProps = {};

export const LoginPage = ({}: LoginPageProps) => {
  useEffect(() => {
    const auth = localStorage.getItem('token');
    if (auth) {
      navigate('/dashboard');
    }
  });
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
    try {
      var data = inputs;
      const res = await apis.getLogin(data);
      dispatch(getToken(res.data.token));
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('email', data?.email);
        navigate('/dashboard');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main>
      <div className='main_container container virtuosway-hr-login-page'>
        <form onSubmit={handleSubmit}>
          <div className='main-logo-container d-flex align-items-center justify-content-center'>
            <div className='logo '>
              <img src='/images/virtuos-logo.svg' alt='logo' />
            </div>
          </div>
          <h2 className='sign-up-header'>Sign in </h2>
          <p className='sign-up-text'>Enter your sign in credentials.</p>
          <div className='form_container'>
            <div className='labels'>
              <label htmlFor=''>Email:</label>
            </div>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter your work email'
              onChange={handleChange}
            />
            <p className='note-message'>
              Note: example@eeposit.com / example@virtuosway.com
            </p>
          </div>
          <div className='form_container'>
            <div className='labels'>
              <label htmlFor=''>Password:</label>
            </div>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter password'
              onChange={handleChange}
            />
          </div>
          <p className='forgot-password'>Forgot password?</p>
          <button type='submit' className='login-button'>
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};
