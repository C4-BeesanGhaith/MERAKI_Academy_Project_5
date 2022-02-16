import "./products.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCloudPlusFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { BiEditAlt } from "react-icons/bi";
import { MdCreditScore } from "react-icons/md";
import Cloudinary from "../../cloudinary/cloudinary";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cloudinary, setCloudinary] = useState(false);
  const [image, setImage] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [type, setType] = useState("");
  const [update, setUpdate] = useState(false);

  const getAllProducts = () => {
    axios
      .get("/products/")
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllProducts();
  });

  // -------------------------------------------------------------------

  const deleteProductById = (id) => {
    axios
      .delete(`/products/${id}`)
      .then((res) => {
        getAllProducts();
      })
      .catch((err) => {});
  };

  // -------------------------------------------------------------------

  const updateProductById = (id) => {
    axios
      .patch(`/products/${id}`, {
        image,
        nameProduct,
        description,
        price,
        type,
      })
      .then((res) => {
        getAllProducts();
        console.log(res);
      })
      .catch((err) => {});
  };

  // -------------------------------------------------------------------

  return (
    <>
      <div className="divContainerPro">
        <div className="divProPage">
          <div className="productPage">
            <BsCloudPlusFill
              className="cloud"
              onClick={() => {
                setCloudinary(true);
              }}
            />
            <h1>Products Page</h1>
          </div>
        </div>
        <div className="underLine"></div>
        <div className="divTable">
          {cloudinary ? (
            <div className="divCloudinary">
              <Cloudinary setCloudinary={setCloudinary} />
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr className="thProduct">
                  <th className="thProduct">Product</th>
                  <th className="thProduct">Name</th>
                  <th className="thProduct">Description</th>
                  <th className="thPrice">Price</th>
                  <th className="thProduct">Type</th>
                  <th className="thAction">Actions</th>
                </tr>
              </thead>
              <tbody className="tdProduct">
                {products &&
                  products.map((product, index) => {
                    return (
                      <tr key={index}>
                        {update ? (
                          <>
                            {" "}
                            <td>
                              <img
                                className="productImage"
                                src={product.image && product.image}
                              />
                            </td>
                            <td>
                              <input
                                className="inputUpdatePro"
                                defaultValue={product.nameProduct}
                                onChange={(e) => {
                                  setNameProduct(e.target.value);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                className="inputUpdatePro"
                                defaultValue={product.description}
                                onChange={(e) => {
                                  setDescription(e.target.value);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                className="inputUpdatePro"
                                defaultValue={product.price + ` JD`}
                                onChange={(e) => {
                                  setPrice(e.target.value);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                className="inputUpdatePro"
                                defaultValue={product.type}
                                onChange={(e) => {
                                  setType(e.target.value);
                                }}
                              />
                            </td>
                            <td>
                              <MdCreditScore
                                className="editIcon"
                                onClick={() => {
                                  updateProductById(product.id);
                                  setUpdate(false);
                                }}
                              />
                            </td>
                          </>
                        ) : (
                          <>
                            <td>
                              <img
                                className="productImage"
                                src={product.image && product.image}
                              />
                            </td>
                            <td>
                              {product.nameProduct && product.nameProduct}
                            </td>
                            <td>
                              {product.description && product.description}
                            </td>
                            <td>{product.price && product.price} JD</td>
                            <td>{product.type && product.type}</td>
                            <td>
                              <BiEditAlt
                                className="editIcon"
                                onClick={() => {
                                  setUpdate(true);
                                  setImage(product.image);
                                  setNameProduct(product.nameProduct);
                                  setDescription(product.description);
                                  setPrice(product.price);
                                  setType(product.type);
                                }}
                              />
                              <TiDelete
                                className="deleteIcon"
                                onClick={() => {
                                  deleteProductById(product.id);
                                }}
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
