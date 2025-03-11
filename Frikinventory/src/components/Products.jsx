import React from "react";
import DataTable from "react-data-table-component";
import searchIcon from "../images/iconSearch.png";
import { useState, useEffect } from "react";
import ProductExpandableRow from "./ProductExpandableRow";

function CustomHeader({ searchTerm, setSearchTerm, addProduct }) {
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
        <button onClick={addProduct} className="product__buttonAdd">
          Add Product
        </button>
      </div>
    </div>
  );
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(value);
};

const Products = ({
  products,
  editProduct,
  addProduct,
  onDeleteProduct,
  isLoading,
}) => {
  const [expandedRows, setExpandedRows] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!products || products.length === 0) return;

    const filtered = products.filter((product) =>
      [product.name, product._id].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products, isLoading]);

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
      selector: (row) => row._id.slice(0, 6),
      sortable: true,
    },
    {
      name: "Product name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => formatCurrency(row.price),
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
              setExpandedRows(expandedRows === row._id ? null : row._id);
            }}
          ></button>
          <button
            className="product__button-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteProduct(row);
            }}
          ></button>
        </div>
      ),
    },
  ];

  return (
    <div className="product-table">
      <DataTable
        columns={columns}
        data={filteredProducts}
        selectableRows
        subHeader
        subHeaderComponent={
          <CustomHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            addProduct={addProduct}
          />
        }
        expandableRows
        expandableRowsComponent={({ data }) => (
          <ProductExpandableRow data={data} onSave={editProduct} />
        )}
        expandOnRowClicked={false}
        expandableRowExpanded={(row) => row._id === expandedRows}
        expandOnRowDoubleClicked={true}
        expandableIcon={{
          collapsed: null,
          expanded: null,
        }}
      />
    </div>
  );
};

export default Products;
