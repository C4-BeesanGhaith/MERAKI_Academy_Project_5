import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./cartStyle.css";
import { IoIosAddCircle, IoMdRemoveCircleOutline } from "react-icons/io";
import { FaOpencart } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import StripeCheckout from "react-stripe-checkout";

const Cart = ({ userInfo }) => {
  const [order, setOrder] = useState();
  const [finalPrice, setFinalPrice] = useState(0);
  const state = useSelector((state) => {
    return {
      LoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const final_price = () => {
    let final = 0;
    for (let i = 0; i < order.length; i++) {
      final += order[i].price * order[i].quantity;
    }
    setFinalPrice(final);
  };

  // ---------------------------------------------------------------------------------

  const getALlUserOrder = () => {
    axios
      .get(`http://localhost:5000/orders/${userInfo.userId}`)
      .then((res) => {
        setOrder(res.data.result);
      })
      .catch((err) => {});
  };

  // ---------------------------------------------------------------------------------

  const deleteAllCartOfUser = () => {
    axios
      .delete(`http://localhost:5000/orders/deleteCart/${userInfo.userId}`)
      .then((res) => {
        getALlUserOrder();
      })
      .catch((err) => {
        throw err;
      });
  };

  // ---------------------------------------------------------------------------------

  const onToken = (token) => {
    deleteAllCartOfUser();
  };

  useEffect(() => {
    getALlUserOrder();
  }, []);
  setTimeout(() => {
    final_price();
  }, 1000);

  return (
    <>
      <div className="divContainerCart">
        <div className="divCartPage">
          <div className="cartPage">
            <FaOpencart className="cartIcon" />
            <h1>My Cart</h1>
          </div>
        </div>
        <div className="underLineCart"></div>
        <div className="divTable">
          <table className="table">
            <thead>
              <tr className="thCart">
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.map((ord, index) => {
                  return (
                    <tr key={index} className="trCart">
                      <td>
                        <img className="cartImg" src={ord.image && ord.image} />
                      </td>
                      <td>{ord.nameProduct && ord.nameProduct}</td>
                      <td>{ord.price && ord.price} JD</td>
                      <td>
                        <IoMdRemoveCircleOutline
                          className="max-min"
                          onClick={() => {
                            axios
                              .put(
                                `http://localhost:5000/orders/edit/${ord.id}`,
                                {
                                  quantity: ord.quantity - 1,
                                  user_id: userInfo.userId,
                                }
                              )
                              .then((res) => {
                                getALlUserOrder();
                              })
                              .catch((err) => {
                                throw err;
                              });
                          }}
                        />

                        {ord.quantity && ord.quantity}
                        <IoIosAddCircle
                          className="max-min"
                          onClick={() => {
                            axios
                              .put(
                                `http://localhost:5000/orders/edit/${ord.id}`,
                                {
                                  quantity: ord.quantity + 1,
                                  user_id: userInfo.userId,
                                }
                              )
                              .then((res) => {
                                getALlUserOrder();
                              })
                              .catch((err) => {
                                throw err;
                              });
                          }}
                        />
                      </td>
                      <td>{ord.price && ord.price * ord.quantity} JD</td>
                      <td>
                        <TiDelete
                          className="deleteIcons"
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:5000/orders/delete/${userInfo.userId}/${ord.product_id}`
                              )
                              .then((res) => {
                                getALlUserOrder();
                              })
                              .catch((err) => {
                                throw err;
                              });
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="divPrice">
            <p className="finalprice">
              Total Price:{finalPrice && finalPrice} JD
            </p>
          </div>
          <div className="stripe">
            <StripeCheckout
              style={{ width: "20%", "background-image": "none" }}
              label="pay"
              name="jebnalk"
              currency="jod"
              panelLabel="Buy"
              onClick={() => {
                console.log("hi");
              }}
              // amount = {finalPrice}
              token={onToken}
              stripeKey="pk_test_51KPGonGxWziBD99WBnUQCBsLEOyRUw97hQpp53bgiNu1dLCmysV7OyGMLesafuguPkZvFp3tOsbRoTitdiCXvdpw00Ztg1W3bO"
            >
              <div><button className="btn">Check Out</button></div>
            </StripeCheckout>
          </div>  
        </div>
        
      </div>
    </>
  );
};

export default Cart;
