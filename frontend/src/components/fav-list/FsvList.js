import React, { useEffect, useState } from "react";
import axios from "axios";
import { GiBrokenHeart } from "react-icons/gi";
import "./FsvList.css";
function FsvList({userInfo}) {
  const [fav, setFav] = useState();
  console.log(userInfo);

  const getFav = () => {
    axios
      .get(`/orders/FavortList/${userInfo.userId}`)
      .then((res) => {
        setFav(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        throw err;
      });
  };
  useEffect(() => {
    getFav();
  }, []);
  return (
    <>
    <div className="divFav">
      <p className="msFr"> My Favorite Product </p>
    <div className="divProduct fav">
      {fav &&
        fav.map((wish, i) => {
          return (
            <>
              <div className="productsContainer proFav">
                <img
                  className="productImg"
                  src={wish.image && wish.image}
                ></img>
                <GiBrokenHeart
                  className="delete-fav"
                  onClick={() => {
                    axios
                      .delete(
                        `/orders/deleteFavortList/${wish.id}`
                      )
                      .then((res) => {
                        getFav();
                      })
                      .catch((err) => {});
                  }}
                />
                <div>
                  <div className="productName">
                    {wish.nameProduct && wish.nameProduct}{" "}
                    <div className="price">{wish.price && wish.price} JD</div>
                  </div>
                  <br />
                  <div className="description">
                    {wish.description && wish.description}
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </div>
    </div>
    </>
  );
}

export default FsvList;
