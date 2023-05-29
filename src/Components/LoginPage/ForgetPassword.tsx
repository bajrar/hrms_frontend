import { useEffect, useState } from "react";
import { apis } from "../apis/constants/ApisService";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { API_URL } from "../../Components/apis/constants/constant";

type ForgetPasswordProps = {};

export const ForgetPassword = ({}: ForgetPasswordProps) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(inputs);
    if (!inputs.email) {
      message.error("All fields are required.");
      return;
    }
    try {
      const apiUrl = `${API_URL}/users/forgotPassword`; // Replace with your API endpoint URL

      setLoading(true); // Set loading state to true

      const response = await axios.post(apiUrl, inputs);

      console.log(response.data);

      if (response.status === 200) {
        const { email, otp } = response.data;

        // Store email and otp in cookies
        document.cookie = `email=${email}; path=/`;
        document.cookie = `otp=${otp}; path=/`;

        navigate("/verifyOtp");
      }
    } catch (error) {
      console.log(error);
      message.error("Invalid Credentials");
    } finally {
      setLoading(false); // Set loading state to false regardless of success or error
    }
  };

  return (
    <main className="loginpage_main">
      <div className="main_container container virtuosway-hr-login-page">
        <form onSubmit={handleSubmit}>
          <div className="main-logo-container d-flex align-items-center justify-content-center">
            <div className="logo ">
              <img src="/images/virtuos-logo.svg" alt="logo" />
            </div>
          </div>
          <h2 className="sign-up-header">FORGOT PASSWORD? </h2>
          <p className="sign-up-text">
            To recover your password, enter your email address linked with your
            slack account
          </p>
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
            <p className="note-message">
              Note: example@eeposit.com / example@virtuosway.com
            </p>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
};
