import "./register.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//-------------------------------------------------------------------------------------

const Register = () => {
  const state = useSelector((state) => {
    return {
      LoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false); //to massege if true show true message if false show false message
  const role_id = 1; //as user

  //-----------------------------------------------------

  const addUserInfo = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/users", {
        firstName,
        lastName,
        country,
        email,
        password,
        role_id,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage("The user has been created successfully");
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  //----------------------------------------------------------

  return (
    <>
      <div className="containerRegister">
        <div className="divRegister">
          {!state.LoggedIn ? (
            <>
              <p className="TitleRegister">Create Account</p>
              <p className="paragRegister">Please login below account detail</p>
              <form className="formRegister" onSubmit={addUserInfo}>
                <br />
                <input
                  className="inputRegister"
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
                <input
                  className="inputRegister"
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <br />
                <input
                  className="inputRegister"
                  type="text"
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                />
                <br />
                <input
                  className="inputRegister"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  className="inputRegister"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className="btnRegister">Create</button>
                <br />
              </form>
              {status
                ? message && (
                    <div className="SuccessMessageRegister">{message}</div>
                  )
                : message && (
                    <div className="ErrorMessageRegister">{message}</div>
                  )}
            </>
          ) : (
            <p>Logout First</p>
          )}
        </div>
        <div className="divRegister2">
          <p className="paraghraphQ">Already an account holder?</p>
          <button
            className="btnLog_in"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </button>
          <p className="paraghraphC">Terms & Conditions</p>
          <p className="paraghraph">
            Your privacy and security are important to us. For more information
            on how we use your data read our
          </p>
          <p className="paraghraphC">privacy policy</p>
        </div>
      </div>
    </>
  );
};

export default Register;
