import React, { useState, useContext } from "react";
import searchIcon from "../images/iconSearch.png";
import bellIcon from "../images/bell.svg";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ isLoggedIn, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  let pageTitle;

  if (isLoggedIn && location.pathname === "/") {
    pageTitle = "DashBoard";
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showEditOptions, setShowEditOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowEditOptions(true);
  };

  const handleMouseLeave = () => {
    setShowEditOptions(false);
  };

  const handleClick = () => {
    setHasNotifications(false);
  };
  return (
    <header className="header">
      <p className="header__title">{pageTitle}</p>
      <div className="header__container">
        <img className="header__search-icon" src={searchIcon} alt="Buscar" />
        <input
          className="header__search"
          type="text"
          placeholder="Search item, order, etc"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoggedIn && (
          <div
            className="header__user-info-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="header__user-profile">
              <img
                src={currentUser.userImage || "/path/to/default-avatar.png"}
                alt="User profile"
                className="header__user-image"
              />
            </div>
            <div className="header__user-info">
              <span className="header__user-name">{currentUser.name}</span>
              {currentUser.typeUser && (
                <span className="header__user-type">
                  {currentUser.typeUser}
                </span>
              )}
            </div>

            {showEditOptions && (
              <div className="header__edit-dropdown">
                <button className="header__edit-button" onClick={onEditProfile}>
                  Editar Perfil
                </button>
              </div>
            )}
          </div>
        )}
        <div>
          <button className="header__notification-btn" onClick={handleClick}>
            <img
              src={bellIcon}
              alt="Notificaciones"
              className="header__bell-icon"
            />
            {hasNotifications && (
              <span className="header__notification-badge"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
