import "./login.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import axios from "axios";

//==============================================================================

const Login = ({ setUserInfo }) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const handelFailure = (result) => {
    console.log(result);
  };

  
  const navigate = useNavigate();
  
  const handleLogin = (googleData) => {
    dispatch(login(googleData.tokenId));

    setUserInfo({
      userId: googleData.profileObj.googleId,
      firstName: googleData.profileObj.givenName,
      lastName: googleData.profileObj.familyName,
      email: googleData.profileObj.email,
      image: googleData.profileObj.imageUrl,
      role: 1,
    });
    
    navigate("/home");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState();

  //========================================
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login/", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("");
        localStorage.setItem("token", res.data.token);
        dispatch(login(res.data.token));
        setUserInfo(res.data.payload);
        setUser(res.data.payload);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  //========================================

  useEffect(() => {
    if (state.isLoggedIn)
      user.role == 1 ? navigate("/home") : navigate("/admin");
  }, [user]);

  //========================================

  return (
    <>
      <div className="divImage">
        <div className="containerLogin">
          <div className="divLogin">
            <p className="TitleLogin">Login</p>
            <p className="paragLogin">Please login below account detail</p>
            <form className="formLogin" onSubmit={loginUser}>
              <br />

              <input
                className="inputLogin"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                className="inputLogin"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button className="btnLogin">Sign in</button>
            </form>

            {status
              ? message && <div className="SuccessMessageLogin">{message}</div>
              : message && <div className="ErrorMessageLogin">{message}</div>}
          </div>
          <div className="divLogin2">
            <p className="paraghraphQ">Don't have an account?</p>
            <button
              className="btnCreateAcc"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create Account
            </button>
            <div>
              <GoogleLogin
                clientId="1036615723540-ppf72gmnljg8fi0msga16shtnt5mnsc0.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleLogin}
                onFailure={handelFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <p className="paraghraphC">Terms & Conditions</p>
            <p className="paraghraph">
              Your privacy and security are important to us. For more
              information on how we use your data read our
            </p>
            <p className="paraghraphC">privacy policy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
