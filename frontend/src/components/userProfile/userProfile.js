import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./userProfile.css";
import { useNavigate } from "react-router-dom";
import FsvList from "../fav-list/FsvList";
import axios from "axios";
//======================================================

const UserProfile = ({ userInfo }) => {
  const state = useSelector((state) => {
    return {
      LoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const [history, setHistory] = useState([]);
  const getAllHistoryCartOfUser = () => {
    axios
      .get(`http://localhost:5000/orders/gethistory/${userInfo.userId}`)
      .then((res) => {
        console.log(res.data.result);
        setHistory(res.data.result);
      })
      .catch((err) => {});
  };
  const [favStatus, setFavStatus] = useState(false);
  const [hisStatus, setHisStatus] = useState(false);
  const imag =
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";
  const navigate = useNavigate();
  return (
    <>
      <div className="divContainer">
        <div className="user-cont">
          <div className="profile">
            <img src={imag} alt="userImg" className="userImg" />
            <p>
              {userInfo.firstName} {userInfo.lastName}
            </p>
          </div>
          <div className="user-info">
            <div
              className="favorate"
              onClick={() => {
                setFavStatus(true);
                setHisStatus(false);
              }}
            >
              <p className="fl">My favorate list</p>
            </div>
            <div
              className="history"
              onClick={() => {
                setHisStatus(true);
                setFavStatus(false);
              }}
            >
              <div
                className="mh"
                onClick={() => {
                  getAllHistoryCartOfUser();
                }}
              >
                <p className="history">My Orders</p>
              </div>
            </div>
          </div>
        </div>
        {favStatus ? (
          <>
            <div className="favorate">
              <FsvList userInfo={userInfo} />
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="divHistory">
          {hisStatus ? (
            <>
              <p>My Orders History</p>
              <div className="hist">
                <table className="histTable">
                  <thead className="thCart">
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length != 0 ? (
                      history.map((hist, index) => {
                        return (
                          <tr key={index} className="trCart">
                            <td>
                              <img
                                className="cartImg"
                                src={hist.image && hist.image}
                              />
                            </td>
                            <td>{hist.nameProduct && hist.nameProduct}</td>
                            <td>{hist.price && hist.price} JD</td>
                            <td>{hist.quantity && hist.quantity}</td>
                            <td>
                              {hist.price && hist.price * hist.quantity} JD
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div>
                        <p className="history-mass"> I don't have history order yet </p>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default UserProfile;
