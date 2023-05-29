import { useEffect, useState } from "react";
import { apis } from "../apis/constants/ApisService";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { message } from "antd";
import { API_URL } from "../apis/constants/constant";

type OptSectionProps = {};

export const OtpSection = ({}: OptSectionProps) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    otp: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

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
  const otp = cookieValues.otp;

  console.log(email, otp);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(inputs);
    if (!inputs.otp) {
      message.error("Enter the OTP.");
      return;
    }
    try {
      setLoading(true); // Set loading state to true

      if (inputs.otp === otp) {
        navigate("/ChangePassword");
      } else {
        message.error("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
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
          <h2 className="sign-up-header">Enter The Code </h2>
          <p className="sign-up-text">
            A verification code has been sent to your Slack account. Please
            check your account to retrieve it.
          </p>
          <div className="form_container">
            <div className="labels">
              <label htmlFor="">Enter Code:</label>
            </div>
            <input
              type="number"
              name="otp"
              id="otp"
              placeholder="Enter the code"
              onChange={handleChange}
            />
            <p className="note-message">
              Didn't get the code? <Link to="/forgetPassword">Resend OTP</Link>{" "}
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
