import "./Login.css";
import { useEffect, useState } from "react";
import { apis } from "../apis/constants/ApisService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "../../Components/apis/constants/constant";

import { Link } from "react-router-dom";
import { message } from "antd";

type ChangePasswordProps = {};

export const ChangePassword = ({}: ChangePasswordProps) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const email = localStorage.getItem("email");

  const input = {
    email: email,
    password: inputs.password,
    confirmPassword: inputs.confirmPassword,
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!inputs.password || !inputs.confirmPassword) {
      message.error("All fields are required.");
      return;
    }
    if (inputs.password !== inputs.confirmPassword) {
      message.error("Password didn't match");
      return;
    }
    try {
      setLoading(true); // Set loading state to true

      const apiUrl = `${API_URL}/users/changePassword`; // Replace with your API endpoint URL
      const response = await axios.post(apiUrl, input);
      if (response.status === 200) {
        message.success("Password changed successfully");
        document.cookie =
          "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/");
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Set loading state to false regardless of success or error
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
          <h2 className="sign-up-header">CHANGE PASSWORD </h2>
          <p className="sign-up-text">
            Your OTP code has been verified. Please enter a new password.
          </p>

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
              <label htmlFor=""> Re-enter your new password :</label>
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
};
