import { useState } from "react";
import { Link } from "react-router-dom";
import icon_Person from "../images/icon _person outline_.svg";
import icon_Password from "../images/icon_lock.svg";

function Singup({ register }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password);
  }

  return (
    <form className="home" noValidate>
      <h1 className="home__title">REGISTRO DE USUARIOS</h1>
      <fieldset className="home__fieldset">
        <div className="home__input-field">
          <span className="home__input-icon">
            <img src={icon_Person} alt="User" className="home__icon" />
          </span>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="home__input"
            id="email"
            placeholder="Username"
            required
          />
        </div>
        <div className="home__input-field">
          <span className="home__input-icon">
            <img src={icon_Password} alt="password" className="home__icon" />
          </span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="home__input"
            id="password"
            placeholder="Contraseña"
            required
          />
        </div>

        <button
          name="btnRegister"
          type="submit"
          className="home__button"
          onClick={handleSubmit}
        >
          Registro
        </button>

        <span className="home__foot">
          ¿Eres miembro?{" "}
          <Link className="home__link" to="/signin">
            Inicia sección aquí
          </Link>
        </span>
      </fieldset>
    </form>
  );
}

export default Singup;
