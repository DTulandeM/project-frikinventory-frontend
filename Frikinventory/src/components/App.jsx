import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import "../index.css";
import SideMenu from "./SideMenu";
import AddproductPopup from "./AddProduct";
import Footer from "./footer";
import api from "../utils/api";
import { Authorization, CheckToken, Signup } from "../utils/auth";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ProtectedRoute, PublicRoute } from "./ProtectedRoute.jsx";
import Main from "./Main";
import InfoTooltip from "./InfoTooltip.jsx";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup.jsx";
import EditUserProfilePopup from "./EditProfilePopup.jsx";

function App() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistedIn, setIsRegistedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [cards, setCards] = useState([
    {
      title: "Total Products",
      total: products.length,
      percentage: -6.53,
      initialTimeFrame: "last week",
    },
    {
      title: "Total Products",
      total: 4892,
      percentage: 6.53,
      initialTimeFrame: "last week",
    },
    {
      title: "Total Products",
      total: 4892,
      percentage: -5.53,
      initialTimeFrame: "last week",
    },
    {
      title: "Total Products",
      total: 4892,
      percentage: 7.53,
      initialTimeFrame: "last week",
    },
  ]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api.setAuthToken(jwt);
      CheckToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            return Promise.all([api.getUserInfo(), api.getProducts()]);
          } else {
            throw new Error("Token inválido");
          }
        })
        .then(([userInfo, products]) => {
          setCurrentUser(userInfo);
          setProducts(products);
        })
        .catch((err) => {
          setIsLoggedIn(false);
        });
    }
  }, [isLoggedIn]);
  const updateStockCards = useCallback((products, timeFrame = "last week") => {
    const now = new Date();
    let filteredProducts = [];

    switch (timeFrame) {
      case "last week":
        filteredProducts = products.filter(
          (p) =>
            new Date(p.createdAt) >= new Date(now.setDate(now.getDate() - 7))
        );
        break;
      case "last month":
        filteredProducts = products.filter(
          (p) =>
            new Date(p.createdAt) >= new Date(now.setMonth(now.getMonth() - 1))
        );
        break;
      case "last year":
        filteredProducts = products.filter(
          (p) =>
            new Date(p.createdAt) >=
            new Date(now.setFullYear(now.getFullYear() - 1))
        );
        break;
      default:
        filteredProducts = products;
        break;
    }

    const totalProducts = filteredProducts.length;
    const lowStockCount = filteredProducts.filter(
      (p) => p.quantity < 5 && p.quantity > 0
    ).length;
    const outStockCount = filteredProducts.filter(
      (p) => p.quantity === 0
    ).length;
    const availableStockCount = totalProducts - lowStockCount - outStockCount;

    const lowStockPercentage = totalProducts
      ? (lowStockCount / totalProducts) * 100
      : 0;
    const outStockPercentage = totalProducts
      ? (outStockCount / totalProducts) * 100
      : 0;
    const availableStockPercentage = totalProducts
      ? (availableStockCount / totalProducts) * 100
      : 0;

    setCards([
      {
        title: "Total Products",
        total: totalProducts,
        percentage: 0,
        initialTimeFrame: timeFrame,
      },
      {
        title: "Available Stock",
        total: availableStockCount,
        percentage: availableStockPercentage.toFixed(0),
        initialTimeFrame: timeFrame,
      },
      {
        title: "Low Stock",
        total: lowStockCount,
        percentage: lowStockPercentage.toFixed(0),
        initialTimeFrame: timeFrame,
      },
      {
        title: "Out Stock",
        total: outStockCount,
        percentage: outStockPercentage.toFixed(0),
        initialTimeFrame: timeFrame,
      },
    ]);
  });

  async function onLogin(email, password, rememberMe) {
    try {
      const res = await Authorization(email, password, rememberMe);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        api.setAuthToken(res.token);
        const userData = await CheckToken(res.token);
        if (userData) {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        }

        handleInfoTooltipOpen();
        setTimeout(() => {
          closeAllPopups();
          navigate("/");
        }, 1500);
      } else {
        console.log("Error de autenticación: token no recibido");
        handleInfoTooltipOpen();
      }
    } catch (error) {
      console.log("Error al intentar iniciar sesión:", error);
      handleInfoTooltipOpen();
    }
  }
  async function onSignUp(email, password) {
    try {
      const res = await Signup(email, password);
      if (res._id) {
        setIsRegistedIn(true);
        handleInfoTooltipOpen();
        setTimeout(() => {
          closeAllPopups();
          setIsRegistedIn(false);
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.log("Error al intentar registrarse:", error);
      handleInfoTooltipOpen();
    }
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);

    return <Navigate to="/signin" />;
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }
  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsAddProductOpen(false);
    setIsDeletePopupOpen(false);
    setIsEditProfileOpen(false);
  }
  function handleUpdateProduct({
    _id,
    name,
    price,
    quantity,
    buyCost,
    typeOfProduct,
    articuleRef,
  }) {
    setIsLoading(true);
    api
      .editProduct({
        _id,
        name,
        price,
        quantity,
        buyCost,
        typeOfProduct,
        articuleRef,
      })
      .then((result) => {
        if (Array.isArray(result)) {
          setProducts(result);
        } else {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === _id ? result : product
            )
          );
        }
      });
  }
  function handleAddClick() {
    setIsAddProductOpen(true);
  }

  function handleAddProduct({
    image,
    name,
    price,
    quantity,
    buyCost,
    typeOfProduct,
    articuleRef,
  }) {
    setIsLoading(true);
    api
      .addNewProduct({
        image,
        name,
        price,
        quantity,
        buyCost,
        typeOfProduct,
        articuleRef,
      })
      .then((newProduct) => {
        setProducts([newProduct, ...products]);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleDeleteConfirmation(product) {
    setSelectedProduct(product);
    setIsDeletePopupOpen(true);
  }

  function handleProductDelete() {
    if (!selectedProduct) return;
    setIsLoading(true);

    api
      .removeProduct(selectedProduct._id)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p._id !== selectedProduct._id)
        );
        updateStockCards(
          products.filter((p) => p._id !== selectedProduct._id),
          cards[0].initialTimeFrame
        );
      })

      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleUpdateUser({ name, userImage }) {
    setIsLoading(true);
    api
      .editUser({ name, userImage })
      .then((result) => {
        setCurrentUser(result);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                {isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <>
                  <Login onLogin={onLogin} />
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    isLoggedIn={isLoggedIn}
                  />
                </>
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <>
                  <Register register={onSignUp} />
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    isLoggedIn={isRegistedIn}
                  />
                </>
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    onEditProfile={handleEditProfileClick}
                  />
                  <SideMenu onSignOut={onSignOut} />
                  <Main
                    cards={cards}
                    products={products}
                    editProduct={handleUpdateProduct}
                    updateStockCards={updateStockCards}
                    addProduct={handleAddClick}
                    deleteProduct={handleDeleteConfirmation}
                    isLoading={isLoading}
                  />
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    isLoggedIn={isLoggedIn}
                  />
                  <AddproductPopup
                    isOpen={isAddProductOpen}
                    onClose={closeAllPopups}
                    onAddProduct={handleAddProduct}
                    isLoggedIn={isLoading}
                  />
                  <DeleteConfirmationPopup
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    isLoading={isLoading}
                    onProductDelete={handleProductDelete}
                  />
                  <EditUserProfilePopup
                    isOpen={isEditProfileOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
