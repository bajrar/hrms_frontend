import "./Login.css";
import { useEffect, useState } from "react";
import { apis } from "../apis/constants/ApisService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "../../Components/apis/constants/constant";

import { Link } from "react-router-dom";

type ChangePasswordProps = {};

export const ChangePassword = ({}: ChangePasswordProps) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const cookies: any = document.cookie;
  // Split the cookies string into individual cookies
  const cookieArray = cookies.split(";");
  // Create an object to store the cookie values
  const cookieValues: any = {};
  // Iterate over the cookieArray and extract the cookie names and values
  cookieArray.forEach((cookie: any) => {
    const [name, value] = cookie.trim().split("=");
    cookieValues[name] = value;
  });
  // Access the email and otp values
  const email = cookieValues.email;

  const input = {
    email: email,
    password: inputs.password,
    confirmPassword: inputs.confirmPassword,
  };
  console.log(input);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!inputs.password || !inputs.confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Password didn't match");
      return;
    }
    try {
      const apiUrl = `${API_URL}/users/changePassword`; // Replace with your API endpoint URL
      const response = await axios.post(apiUrl, input);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
  return (
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
              <label htmlFor="">New Password:</label>
            </div>
            <div className="password-input-container">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form_container">
            <div className="labels">
              <label htmlFor="">Confirm Password:</label>
            </div>
            <div className="password-input-container">
              <input
                type="password"
                name="confirmPassword"
                id="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
          </div>
          <Link to="/forgetPassword" className="forgot-password">
            Forgot password?
          </Link>
          <button type="submit" className="login-button">
            Continue
          </button>
        </form>
      </div>
    </main>
  );
};
