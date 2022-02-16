import React, { useState } from "react";
import Chart from "./chart";
import "../admin/admin.css";
import { GiCheckMark } from "react-icons/gi";
import Users from "./users/users";
import Orders from "./orders/orders";
import Products from "./products/products";



const Admin = () => {
  const [users, setUsers] = useState(false);
  const [orders, setOrders] = useState(false);
  const [products, setProducts] = useState(false);
  const [chart, setChart] = useState(false);
  
  return (
    <div>
      <div className="adminPageContainer">
        <div className="adminPageWrapper">
          <div className="pageContainer">
            <div className="sideBar">
              <div className="adminDashboard"></div>
              <div className="adminDashboard">
                {" "}
                <GiCheckMark className="check" />
                <button
                  className="dashboardButton"
                  onClick={() => {
                    setUsers(false);
                    setOrders(false);
                    setProducts(false);
                    setChart(true);
                  }}
                >
                  {" "}
                  Dashboard
                </button>
              </div>
              <div className="adminDashboard">
                {" "}
                <GiCheckMark className="check"/>
                <button
                  className="dashboardButton"
                  onClick={() => {
                    setUsers(false);
                    setOrders(false);
                    setProducts(true);
                    setChart(false);
                  }}
                >
                  Products
                </button>
              </div>
              <div className="adminDashboard">
                {" "}
                <GiCheckMark className="check"/>
                <button
                  className="dashboardButton"
                  onClick={() => {
                    setUsers(true);
                    setOrders(false);
                    setProducts(false);
                    setChart(false);
                  }}
                >
                  Users
                </button>
              </div>
              <div className="adminDashboard">
                {" "}
                <GiCheckMark className="check"/>
                <button
                  className="dashboardButton"
                  onClick={() => {
                    setUsers(false);
                    setOrders(true);
                    setProducts(false);
                    setChart(false);
                  }}
                >
                  {" "}
                  Orders
                </button>
              </div>
            </div>
            <div className="midPage">
              {users ? (
                <Users />
              ) : orders ? (
                <Orders />
              ) : products ? (
                <Products />
              ) : products ? (
                <Chart />
              ) : (
                <Chart />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
