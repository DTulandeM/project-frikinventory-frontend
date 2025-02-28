import React, { useState } from "react";
import searchIcon from "../images/iconSearch.png";
import userImage from "../images/profile_photo.jpg";
import bellIcon from "../images/bell.svg";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true); // Simulación de notificación
  const handleClick = () => {
    setHasNotifications(false); // Borra la notificación al hacer clic
  };
  return (
    <header className="header">
      <p className="header__title">Dashboard</p>
      <div className="header__container">
        <img className="header__search-icon" src={searchIcon} alt="Buscar" />
        <input
          className="header__search"
          type="text"
          placeholder="Search item, order, etc"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="header__profile-avatar-circle">
          <img src={userImage} className="header__profile-avatar" />
        </div>
        <div className="header__userProfile">
          <h1 className="header__profile-name">Isabel C. Vivas</h1>

          <p className="header__profile-type">Super Admin</p>
        </div>
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
