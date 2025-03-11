import React, { useState, useEffect } from "react";

function ProductExpandableRow({ data, onSave }) {
  const [productData, setProductData] = useState({ ...data });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductData({ ...data });
  }, [data, loading]);

  const handleChange = (field, value) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function handleSaveChanges() {
    const productToSave = {
      _id: productData._id,
      name: productData.name,
      price: productData.price,
      quantity: productData.quantity,
      buyCost: productData.buyCost,
      typeOfProduct: productData.typeOfProduct,
      articuleRef: productData.articuleRef,
    };

    onSave(productToSave);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }
  return (
    <div className="product__expand-row">
      <div className="product__expand-row-container">
        <div className="product__expand-row-image">
          <img
            src={productData.image}
            alt="product"
            className="product__image-exp"
          />
        </div>

        <div className="product__expand-row-item">
          <div className="product__expand-row-item">
            <p className="product__expand-row-title">Product Name</p>
            <input
              type="text"
              className="product__expand-row-content-input"
              value={productData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="product__expand-row2-container">
            <div className="product__expand-row-item">
              <p className="product__expand-row-title">Price</p>
              <input
                type="number"
                className="product__expand-row-content-input"
                value={productData.price || 0}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value))
                }
              />
            </div>
            <div className="product__expand-row-item">
              <p className="product__expand-row-title">Quantity</p>
              <input
                type="number"
                className="product__expand-row-content-input"
                value={productData.quantity || 0}
                onChange={(e) =>
                  handleChange("quantity", parseInt(e.target.value))
                }
              />
            </div>
          </div>

          <div className="product__expand-row2-container">
            <div className="product__expand-row-item">
              <p className="product__expand-row-title">Type of Prodcut</p>
              <input
                type="text"
                className="product__expand-row-content-input"
                value={productData.typeOfProduct || ""}
                onChange={(e) => handleChange("typeOfProduct", e.target.value)}
              />
            </div>
            <div className="product__expand-row-item">
              <p className="product__expand-row-title">Product Id</p>
              <input
                type="text"
                className="product__expand-row-content-input"
                value={productData._id ? productData._id.slice(0, 6) : ""}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="product__expand-row-item">
          <div className="product__expand-row2-container">
            <div className="product__expand-row-item">
              <p className="product__expand-row-title">Buy Cost</p>
              <input
                type="text"
                className="product__expand-row-content-input"
                value={productData.buyCost || ""}
                onChange={(e) => handleChange("buyCost", e.target.value)}
              />
            </div>
            <div className="product__expand-row-item">
              <p className="product__expand-row-title">Created by</p>
              <input
                type="text"
                className="product__expand-row-content-input"
                readOnly
                value={productData.owner?.name || ""}
              />
            </div>
          </div>

          <div className="product__expand-row2-container">
            <div className="product__expand-row-item">
              <p className="product__expand-row-title">Date Added</p>
              <input
                type="text"
                readOnly
                className="product__expand-row-content-input"
                value={
                  productData.createdAt
                    ? productData.createdAt.slice(0, 10)
                    : ""
                }
              />
            </div>
            <div className="product__expand-row-item">
              <p className="product__expand-row-title">Last Updated</p>
              <p className="product__expand-row-content-input">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="product__expand-row2-container">
            <div className="product__expand-row-item">
              <p className="product__expand-row-title">Description</p>
              <input
                type="text"
                className="product__expand-row-content-input"
                value={productData.articuleRef || ""}
                onChange={(e) => handleChange("articuleRef", e.target.value)}
              />
            </div>
            <button
              className="product__button-save"
              onClick={handleSaveChanges}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>

          <div className="product__expand-row2-container"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductExpandableRow;
