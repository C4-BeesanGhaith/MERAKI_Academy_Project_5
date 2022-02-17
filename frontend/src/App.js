import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navigation from "./components/navigation/navigation";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import UserProfile from "./components/userProfile/userProfile";
import Cart from "./components/cart/Cart";
import HeroPage from "./components/heroPage/HeroPage";
import Admin from "./components/admin/admin";

import FsvList from "./components/fav-list/FsvList";
import Chart from "./components/admin/chart";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [finalPrice, setFinalPrice] = useState(0);
  const [wishlist, setWishList] = useState();
  
  return (
    <div className="App">
      <Navigation userInfo={userInfo} />
      <Routes>
        <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile userInfo={userInfo} />} />
        <Route
          path="/home"
          element={<Home userInfo={userInfo} setWishList={setWishList} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              userInfo={userInfo}
              finalPrice={finalPrice}
              setFinalPrice={setFinalPrice}
            />
          }
        />
        <Route path="/" element={<HeroPage />} />
        <Route
          path="/cart"
          element={
            <Cart
              userInfo={userInfo}
              finalPrice={finalPrice}
              setFinalPrice={setFinalPrice}
            />
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Chart />} />

        <Route path="/fav" element={<FsvList userInfo={userInfo} />} />
      </Routes>
    </div>
  );
}

export default App;
