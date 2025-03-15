import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AddProductPopup({ isOpen, onClose, onAddProduct, isLoading }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyCost, setBuyCost] = useState("");
  const [typeOfProduct, setTypeOfProduct] = useState("");
  const [articuleRef, setArticuleRef] = useState("");
  const [userName, setUserName] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setUserName(currentUser.name);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddProduct({
      image: image,
      name: name,
      price: price,
      quantity: quantity,
      buyCost: buyCost,
      typeOfProduct: typeOfProduct,
      articuleRef: articuleRef,
    });
  }
  useEffect(() => {
    setImage("");
    setName("");
    setPrice("");
    setQuantity("");
    setBuyCost(""), setTypeOfProduct("");
    setArticuleRef("");
  }, [onClose]);

  return (
    <PopupWithForm
      name="addproduct"
      title="New Product"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTitle={isLoading ? "Guardando..." : "Guardar"}
    >
      <div className="product__popup-content">
        <div className="product__top-section">
          <div className="form__input-floating-container">
            <input
              type="url"
              name="image"
              id="add-product-image"
              value={image || ""}
              onChange={(e) => setImage(e.target.value)}
              placeholder=" "
              className="form__input"
              required
            />
            <label
              htmlFor="add-product-image"
              className="form__input-floating-label"
            >
              URL de la imagen
            </label>
            <span
              id="add-product-image-error"
              className="form__error-visible"
            ></span>
          </div>

          <div className="form__input-floating-container ">
            <input
              type="text"
              name="name"
              id="add-product-name"
              autoComplete="off"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              className="form__input"
              required
            />
            <label
              htmlFor="add-product-name"
              className="form__input-floating-label"
            >
              Nombre del producto
            </label>
            <span
              id="add-product-name-error"
              className="form__error-visible"
            ></span>
          </div>
        </div>

        <div className="product__edit-section">
          <div className="form__input-row">
            <div className="form__input-floating-container form__input-half">
              <input
                type="number"
                name="price"
                id="add-product-price"
                value={price || ""}
                onChange={(e) => setPrice(e.target.value)}
                placeholder=" "
                className="form__input"
                required
              />
              <label
                htmlFor="add-product-price"
                className="form__input-floating-label"
              >
                Precio
              </label>
              <span
                id="add-product-price-error"
                className="form__error-visible"
              ></span>
            </div>

            <div className="form__input-floating-container form__input-half">
              <input
                type="number"
                name="quantity"
                id="add-product-quantity"
                value={quantity || ""}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder=" "
                className="form__input"
                required
              />
              <label
                htmlFor="add-product-quantity"
                className="form__input-floating-label"
              >
                Cantidad
              </label>
              <span
                id="add-product-quantity-error"
                className="form__error-visible"
              ></span>
            </div>
          </div>

          <div className="form__input-row">
            <div className="form__input-floating-container form__input-half">
              <input
                type="text"
                name="typeOfProduct"
                id="add-product-typeOfProduct"
                value={typeOfProduct || ""}
                onChange={(e) => setTypeOfProduct(e.target.value)}
                placeholder=" "
                className="form__input"
                required
              />
              <label
                htmlFor="add-product-typeOfProduct"
                className="form__input-floating-label"
              >
                Tipo de producto
              </label>
              <span
                id="add-product-typeOfProduct-error"
                className="form__error-visible"
              ></span>
            </div>

            <div className="form__input-floating-container form__input-half">
              <input
                type="text"
                name="buyCost"
                id="add-product-buyCost"
                value={buyCost || ""}
                onChange={(e) => setBuyCost(e.target.value)}
                placeholder=" "
                className="form__input"
                required
              />
              <label
                htmlFor="add-product-buyCost"
                className="form__input-floating-label"
              >
                Costo de compra
              </label>
              <span
                id="add-product-buyCost-error"
                className="form__error-visible"
              ></span>
            </div>
          </div>

          <div className="form__input-floating-container">
            <input
              type="text"
              name="articuleRef"
              id="add-product-articuleRef"
              value={articuleRef}
              onChange={(e) => setArticuleRef(e.target.value)}
              placeholder=" "
              className="form__input"
              required
            />
            <label
              htmlFor="add-product-articuleRef"
              className="form__input-floating-label"
            >
              Descripción o referencia
            </label>
            <span
              id="add-product-articuleRef-error"
              className="form__error-visible"
            ></span>
          </div>
        </div>

        {/* Sección inferior - Campos no editables */}
        <div className="product__readonly-section">
          <div className="form__input-row">
            <div className="form__input-container form__input-half">
              <input
                type="text"
                id="creation-date"
                placeholder=" "
                value={new Date().toLocaleDateString()}
                className="form__input-disabled"
                disabled
              />
              <label htmlFor="creation-date" className="form__input-label">
                Fecha de creación
              </label>
            </div>

            <div className="form__input-container form__input-half">
              <input
                type="text"
                id="owner"
                name="owner"
                value={userName || ""}
                placeholder=" "
                className="form__input-disabled"
                disabled
              />
              <label htmlFor="owner" className="form__input-label">
                Creado por
              </label>
            </div>
          </div>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default AddProductPopup;
