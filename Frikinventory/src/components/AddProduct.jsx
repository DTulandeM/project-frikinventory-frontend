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
          <div className="form__input-container popup__image-container">
            <p className="form__product-title">Imagen del Producto</p>
            <input
              type="url"
              name="image"
              id="add-product-image"
              value={image || ""}
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL de la imagen"
              className="form__input"
              required
            />
            <span
              id="add-product-image-error"
              className="form__error-visible"
            ></span>
          </div>

          <div className="form__input-container popup__name-container">
            <p className="form__product-title">Nombre del Producto</p>
            <input
              type="text"
              name="name"
              id="add-product-name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del producto"
              className="form__input"
              required
            />
            <span
              id="add-product-name-error"
              className="form__error-visible"
            ></span>
          </div>
        </div>

        <div className="product__edit-section">
          <div className="form__input-row">
            <div className="form__input-container form__input-half">
              <p className="form__product-title">Precio</p>
              <input
                type="number"
                name="price"
                id="add-product-price"
                value={price || ""}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Precio"
                className="form__input"
                required
              />
              <span
                id="add-product-price-error"
                className="form__error-visible"
              ></span>
            </div>

            <div className="form__input-container form__input-half">
              <p className="form__product-title">Cantidad</p>
              <input
                type="number"
                name="quantity"
                id="add-product-quantity"
                value={quantity || ""}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Cantidad"
                className="form__input"
                required
              />
              <span
                id="add-product-quantity-error"
                className="form__error-visible"
              ></span>
            </div>
          </div>

          <div className="form__input-row">
            <div className="form__input-container form__input-half">
              <p className="form__product-title">Tipo de Producto</p>
              <input
                type="text"
                name="typeOfProduct"
                id="add-product-typeOfProduct"
                value={typeOfProduct || ""}
                onChange={(e) => setTypeOfProduct(e.target.value)}
                placeholder="Tipo de producto"
                className="form__input"
                required
              />
              <span
                id="add-product-typeOfProduct-error"
                className="form__error-visible"
              ></span>
            </div>

            <div className="form__input-container form__input-half">
              <p className="form__product-title">Costo de Compra</p>
              <input
                type="text"
                name="buyCost"
                id="add-product-buyCost"
                value={buyCost || ""}
                onChange={(e) => setBuyCost(e.target.value)}
                placeholder="Costo de compra"
                className="form__input"
                required
              />
              <span
                id="add-product-buyCost-error"
                className="form__error-visible"
              ></span>
            </div>
          </div>

          <div className="form__input-container">
            <p className="form__product-title">Descripción</p>
            <input
              type="text"
              name="articuleRef"
              id="add-product-articuleRef"
              value={articuleRef}
              onChange={(e) => setArticuleRef(e.target.value)}
              placeholder="Descripción o referencia"
              className="form__input"
              required
            />
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
              <p className="form__product-title">Fecha de creación</p>
              <input
                type="text"
                placeholder={new Date().toLocaleDateString()}
                className="form__input-disabled"
                disabled
              />
            </div>

            <div className="form__input-container form__input-half">
              <p className="form__product-title">Creado por</p>
              <input
                type="text"
                name="owner"
                value={userName || ""}
                placeholder="Usuario actual"
                className="form__input-disabled"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default AddProductPopup;
