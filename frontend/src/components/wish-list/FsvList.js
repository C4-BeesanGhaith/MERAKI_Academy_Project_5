import React, { useEffect, useState } from "react";
import axios from "axios";
function FsvList(wishlist, userInfo) {
  const [fav, setFav] = useState();
  console.log(fav);
  useEffect(() => {
    axios
      .get(`/orders/FavortList/${userInfo.userId}`)
      .then((res) => {
        console.log(res.data.result);
        setFav(res.data.result);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="divProduct">
      {fav &&
        fav.map((product, i) => {
          return (
            <div className="productsContainer">
              <img
                className="productImg"
                src={product.image && product.image}
              ></img>
              <div>
                <div className="productName">
                  {product.nameProduct && product.nameProduct}{" "}
                  <div className="price">
                    {product.price && product.price} JD
                  </div>
                </div>
                <br />
                <div className="description">
                  {product.description && product.description}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default FsvList;
