import React from "react";
import DataTable from "react-data-table-component";
import searchIcon from "../images/iconSearch.png";
import { useState } from "react";
const Products = ({ products }) => {
  const [expandedRows, setExpandedRows] = useState(null);

  const columns = [
    {
      name: "Image",
      selector: (row) => {
        return (
          <div className="product__image-container">
            <img src={row.image} alt="product" className="product__image" />
          </div>
        );
      },
    },
    {
      name: "Product ID",
      selector: (row) => row.productId,
      sortable: true,
    },
    {
      name: "Product name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => {
        if (row.quantity <= 0) {
          return (
            <div className="product__status-container">
              <p className="product__status-outStock">Out of stock</p>
            </div>
          );
        } else if (row.quantity <= 5) {
          return (
            <div className="product__status-container">
              <p className="product__status-low">low</p>
            </div>
          );
        } else {
          return (
            <div className="product__status-container">
              <p className="product__status-available">Available</p>
            </div>
          );
        }
      },
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="product__button-container">
          <button
            className="product__button-edit"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedRows(
                expandedRows === row.productId ? null : row.productId
              );
            }}
          ></button>
          <button className="product__button-delete"></button>
        </div>
      ),
    },
  ];

  function CustomHeader() {
    const [searchTerm, setSearchTerm] = useState([]);
    return (
      <div className="product__header">
        <h2 className="product__header-title">Products</h2>
        <div className="product__header-container">
          <img className="product__search-icon" src={searchIcon} alt="Buscar" />
          <input
            className="product__search"
            type="text"
            placeholder="Search product, etc"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Botón para agregar */}
          <button className="product__buttonAdd">Add Product</button>
        </div>
      </div>
    );
  }
  function ExpandedComponent({ data }) {
    return (
      <div className="product__expand-row">
        <div className="product__expand-row-container">
          <div className="product__expand-row-image">
            <img
              src={data.image}
              alt="product"
              className="product__image-exp"
            />
          </div>
          <div className="product__expand-row-item">
            <p className="product__expand-row-title">Product Name</p>
            <p className="product__expand-row-content">{data.name}</p>
            <div className="product__expand-row2-container">
              <div className="product__expand-row-item">
                <p className="product__expand-row-title">Supplier</p>
                <p className="product__expand-row-content">Apple</p>
              </div>
              <div className="product__expand-row-item">
                <p className="product__expand-row-title">Supplier</p>
                <p className="product__expand-row-content">Apple</p>
              </div>
            </div>
            <div className="product__expand-row2-container">
              <div className="product__expand-row-item">
                <p className="product__expand-row-title">Supplier</p>
                <p className="product__expand-row-content">Apple</p>
              </div>
              <div className="product__expand-row-item">
                <p className="product__expand-row-title">Supplier</p>
                <p className="product__expand-row-content">Apple</p>
              </div>
            </div>
          </div>
          <div className="product__expand-row-item">
            <div className="product__expand-row-item">
              <div className="product__expand-row2-container">
                <div className="product__expand-row-item">
                  <p className="product__expand-row-title">Supplier</p>
                  <p className="product__expand-row-content">Apple</p>
                </div>
                <div className="product__expand-row-item">
                  <p className="product__expand-row-title">Supplier</p>
                  <p className="product__expand-row-content">Apple</p>
                </div>
              </div>
              <div className="product__expand-row2-container">
                <div className="product__expand-row-item">
                  <p className="product__expand-row-title">Supplier</p>
                  <p className="product__expand-row-content">Apple</p>
                </div>
                <div className="product__expand-row-item">
                  <p className="product__expand-row-title">Supplier</p>
                  <p className="product__expand-row-content">Apple</p>
                </div>
              </div>
              <div className="product__expand-row2-container">
                <div className="product__expand-row-item">
                  <p className="product__expand-row-title">Supplier</p>
                  <p className="product__expand-row-content">Apple</p>
                </div>
                <div className="product__expand-row-item">
                  <button
                    className="product__button-save"
                    onClick={() => setExpandedRows(null)}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-table">
      <DataTable
        columns={columns}
        data={products}
        selectableRows
        subHeader
        subHeaderComponent={<CustomHeader />}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        expandOnRowClicked={false}
        expandableRowExpanded={(row) => row.productId === expandedRows}
        expandableIcon={{
          collapsed: null,
          expanded: null,
        }}
      />
    </div>
  );
};

export default Products;
