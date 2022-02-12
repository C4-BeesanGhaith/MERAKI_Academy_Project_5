import React from "react";
import { useSelector } from "react-redux";
import "./userProfile.css";
import { useNavigate } from "react-router-dom";
//======================================================

const UserProfile = ({ userInfo }) => {
  const state = useSelector((state) => {
    return {
      LoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const imag =
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";
    const navigate = useNavigate();
  return (
    <>
      <div className="divContainer">
        {userInfo ? (
          <>
            <div>
              <p className="welcome"> Welcome {userInfo.firstName} </p>
            </div>
            <div className="line"></div>
            <div className="profile">
              <p className="details">Account Details:</p>
              <div className="userInfo">
                <div className="prof-cont">
                <div className="profileImg">
                  <img src={imag} alt="userImg" className="userImg" />
                </div>
                <div className="infoProfile">
                  <p>
                    {" "}
                    {userInfo.firstName} {userInfo.lastName}{" "}
                  </p>
                  <p> {userInfo.email} </p>
                </div>
                </div>
            <div className="user-fav">
              <p onClick={() => {
                navigate("/fav")
              }}> Your favorate list </p>
            </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default UserProfile;
