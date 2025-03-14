import { useState } from "react";
import { Link } from "react-router-dom";
import icon_Person from "../images/icon _person outline_.svg";
import icon_Password from "../images/icon_lock.svg";
import googleLogo from "../images/google-logo.png";

function Singin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password, rememberMe);
  }

  return (
    <form className="home" noValidate>
      <h1 className="home__title">USER LOGIN</h1>
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
        <div className="options-row">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="checkbox-custom"></span>
            Remember me
          </label>

          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </div>

        <button
          name="btnLogin"
          type="submit"
          className="home__button"
          onClick={handleSubmit}
        >
          Login
        </button>
        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-button">
          <img src={googleLogo} alt="Google logo" className="google-icon" />
          Continue with google
        </button>

        <span className="home__foot">
          ¿Aún no eres miembro?{" "}
          <Link className="home__link" to="/signup">
            Regístrate aquí
          </Link>
        </span>
      </fieldset>
    </form>
  );
}

export default Singin;
