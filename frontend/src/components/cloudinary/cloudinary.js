import axios from "axios";
import React, { useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import "../cloudinary/cloudinary.css";

const Cloudinary = ({ setCloudinary }) => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  //==============================================
  //cloudinary to upload images
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "images");
    data.append("cloud_name", "ds20iwzcn");
    fetch("  https://api.cloudinary.com/v1_1/ds20iwzcn/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };
  //=====================================================
  const handleAddProduct = () => {
    axios
      .post(`/products/`, {
        image: url,
        nameProduct,
        description,
        price,
        type,
      })
      .then((res) => {
        setPrice("");
        setNameProduct("");
        setDescription("");
        setType("");
        setShow(false);
        setUrl("");
        setCloudinary(false);
      })
      .catch((err) => console.log(err));
  };

  //=====================================================
  return (
    <div className="AddContainer">
      <img
        className="addImg"
        src={
          url
            ? url
            : "https://cdn.learnwoo.com/wp-content/uploads/2016/11/Adding-Products_Cropped.png"
        }
      ></img>
      <div>
        <div>
          <MdOutlineAddAPhoto
            className="addImgIcons"
            onClick={() => {
              setShow(true);
            }}
          />
          {show ? (
            <div className="divChoose">
              <input
                className="typeFile"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              <button onClick={uploadImage}>Upload</button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="divInput">
          <div className="addName">
            <label>Name :</label>
          </div>
          <div className="input">
            <input
              className="inputCloudinary"
              placeholder="Name ..."
              value={nameProduct}
              onChange={(e) => {
                setNameProduct(e.target.value);
              }}
            />
          </div>
          <div className="addprice">
            <label>Price :</label>
          </div>
          <div className="input">
            <input className="inputCloudinary"
              placeholder="Price ..."
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="adddescription">
            <label>Description :</label>
          </div>
          <div className="input">
            <input className="inputCloudinary"
              placeholder="Description ..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
          </div>
          <div className="adddescription">
            <label>Category :</label>
          </div>
          <div className="input">
            <input className="inputCloudinary"
              placeholder="Category ..."
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </div>
      <button className="addButton" onClick={handleAddProduct}>
        Add products
      </button>
    </div>
  );
};
export default Cloudinary;
