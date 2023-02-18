import React, { useContext } from "react";
import { GlobalContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
const lillyImagePath = require("../../assets/images/Lilly_logo_logotype.png");
const Header = () => {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useContext(GlobalContext).currentPath;
  const [isLoggedIn, setIsLoggedIn] = useContext(GlobalContext).isLoggedIn;
  let currPath = window.location.pathname;
  const signinFromNavHandler = () => {
    setCurrentPath("/signin");
  };
  const signoutFromNavHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
    navigate("../");
  };
  return (
    <div className="header">
      <ul className="nav">
        <div className="justify-content-start logo-section">
          <div>
            <img src={lillyImagePath} className="lilly-logo" />
          </div>
        </div>
        <div className="justify-content-end link-section">
          <li className="nav-item">
            {currPath === "/" && <Link className="nav-link" to="/signin" onClick={signinFromNavHandler}>Signin</Link>}
            {currPath === "/profile" && <Link className="nav-link" to="/" onClick={signoutFromNavHandler}>Signout</Link>}
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Header;