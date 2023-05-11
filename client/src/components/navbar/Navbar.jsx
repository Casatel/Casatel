import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const handleRegister = () => {
    navigate("/registration", { state: {} });
  };

  const handleLogin = () => {
    navigate("/login", { state: {} });
  };

  useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        setUser(null);
      }
  }, []);

  const oauthLogout = async () => {
    window.open("http://localhost:8000/api/auth/oauthLogout", "_self");
    localStorage.removeItem("user");
    setUser(null);
  };

  const jwtLogout = async () => {
    await axios.get("http://localhost:8000/api/auth/logout", {withCredentials: true});
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="navContainer">
      <Link to="/" className="logo">
        <span className="logo">Casatel</span>
      </Link>
        <div className="navItems">
          {user ? (
            <>
            {user.displayName ? (
              <>
                <span className="navUsername">{user.displayName}</span>
                <button className="navButton" onClick={oauthLogout}>
                  Logout
                </button>
              </>
            ):(
              <>
                <span className="navUsername">{user.username}</span>
                <button className="navButton" onClick={jwtLogout}>
                  Logout
                </button>
              </>
            )}
            </>
          ) : (
            <>
              <button className="navButton" onClick={handleRegister}>
                Register
              </button>
              <button className="navButton" onClick={handleLogin}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;