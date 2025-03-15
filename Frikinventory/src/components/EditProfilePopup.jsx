import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditUserProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setUserImage(currentUser.userImage || "");
      setPreviewError(false);
    }
  }, [currentUser, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setUserImage("");
      setPreviewError(false);
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      userImage: userImage,
    });
  }

  function handleImageError() {
    setPreviewError(true);
  }

  return (
    <PopupWithForm
      name="editprofile"
      title="Editar Perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTitle={isLoading ? "Guardando..." : "Guardar"}
    >
      <div className="profile__popup-content">
        <div className="profile__image-preview-container">
          {userImage && !previewError ? (
            <img
              src={userImage}
              alt="Vista previa"
              className="profile-image-preview"
              onError={handleImageError}
            />
          ) : (
            ""
          )}
        </div>

        <div className="profile__top-section">
          <div className="form__input-floating-container">
            <input
              type="url"
              name="userImage"
              id="edit-profile-image"
              value={userImage || ""}
              onChange={(e) => {
                setUserImage(e.target.value);
                setPreviewError(false);
              }}
              placeholder=" "
              className="form__input"
            />
            <label
              id="edit-profile-image-label"
              htmlFor="profile-image"
              className="form__input-floating-label"
            >
              Imagen del perfil
            </label>
            <span
              id="edit-profile-image-error"
              className="form__error-visible"
            ></span>
          </div>

          <div className="form__input-floating-container">
            <input
              autoComplete="off"
              type="text"
              name="name"
              id="edit-profile-name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              className="form__input"
              required
            />
            <label
              id="edit-profile-name-label"
              name="profile-name"
              htmlFor="profile-name"
              className="form__input-floating-label"
            >
              Nombre del perfil
            </label>
            <span
              id="edit-profile-name-error"
              className="form__error-visible"
            ></span>
          </div>
        </div>

        <div className="profile__readonly-section">
          <div className="form__input-row">
            <div className="form__input-container form__input-half">
              <p className="form__product-title">Fecha de actualización</p>
              <input
                type="text"
                placeholder={new Date().toLocaleDateString()}
                className="form__input-disabled"
                disabled
              />
            </div>

            <div className="form__input-container form__input-half">
              <p className="form__product-title">Email</p>
              <input
                type="text"
                value={currentUser.email || ""}
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

export default EditUserProfilePopup;
