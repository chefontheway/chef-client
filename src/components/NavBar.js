import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import classNames from "classnames";
import logo from '../images/logo.svg'
function NavBar() {

  const  { isLoggedIn, logOutUser} = useContext(AuthContext);
  const [showLink, setShowLink] = useState(false)

 const handleShowLinks = () => {
    setShowLink(!showLink);
  }

  const closeMenu = () => {
    setShowLink(false);
  }
  // console.log(showLink);
  return (
    <div>
      <nav>
        <div className={`${showLink ? "showNav" : "hide-nav"}`}>
          <ul>
            <Link to='/' onClick={closeMenu}>
              <img className="logo" src={logo} alt="logo"/>
            </Link>

            <Link to="/services" onClick={closeMenu}>
              <li>Our chefs</li>
            </Link>


            {isLoggedIn && (
            <> 
                <Link to="/profile" onClick={closeMenu}>
                  <li>Profile</li>
                </Link>
                <Link to="/message" onClick={closeMenu}>
                  <li>Contact Us</li>
                </Link>

              <div className="btn-logout navbar">
                <Link>
                  <li onClick={logOutUser}>Log Out</li>
                </Link>
              </div>
            </>
            )}


            {!isLoggedIn && (
            <div className="navbarAuth navbar">
            
              <Link to="/signup" onClick={closeMenu}>
                <li>Sign Up</li>
              </Link>
              <Link to="/login" onClick={closeMenu}>
                <li>Log In</li>
              </Link>
            </div>
            )}
          </ul>
        </div>
        <button className={classNames ("navbar-burger", {'open': showLink})} onClick={handleShowLinks}>
          <span className="burger-bar"></span>
        </button>
      </nav>


    </div>
  );
}

export default NavBar;
