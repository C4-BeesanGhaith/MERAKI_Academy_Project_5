import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillCartCheckFill } from "react-icons/bs";
import "../orders/orders.css";
//
const Orders = () => {
  const [orders, setOrdes] = useState();
  const getAllOrder = () => {
    axios
      .get("/orders/search/cart")
      .then((res) => {
        setOrdes(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllOrder();
  }, [orders]);
  return (
    <>
      <div className="divContainerOrder">
        <div className="divOrderPage">
          <div className="OrderPage">
            <BsFillCartCheckFill className="orderIcon" />
            <h1>Orders List</h1>
          </div>
        </div>
        <div className="underLineO"></div>
        <div className="order-table">
          <table>
            <tr>
              <th className="thOrder">Cart ID</th>
              <th className="thOrder">Product Name</th>
              <th className="thOrder">Quantity</th>
              <th className="thOrder">Category</th>
              <th className="thOrder"> Client </th>
            </tr>
            {orders &&
              orders.map((order) => {
                return (
                  <>
                    <tr>
                      <td className="tdOrder"> {order.id && order.id} </td>
                      <td className="tdOrder">{order.nameProduct && order.nameProduct}</td>
                      <td className="tdOrder">{order.quantity && order.quantity}</td>
                      <td className="tdOrder">{order.type && order.type}</td>
                      <td className="tdOrder">
                        {order.firstName && order.firstName}
                        {order.lastName && order.lastName}
                      </td>
                    </tr>
                  </>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
