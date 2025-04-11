import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import MyImage from "../assets/MyImage.png";

const MyNavbar = () => {
  const cartCount = useSelector((state) => state.cart.items.length);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);
  const role = useSelector((state) => state.auth.user?.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRole = username === "Ettore" ? "admin" : role;

  const [searchName, setSearchName] = React.useState("");
  const [searchExpansion, setSearchExpansion] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchName) queryParams.set("name", searchName);
    if (searchExpansion) queryParams.set("expansion", searchExpansion);
    navigate(`/cards?${queryParams.toString()}`);
    setSearchName("");
    setSearchExpansion("");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-primary sticky-top py-2 px-3">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img style={{ width: "50px", borderRadius: "50%" }} src={MyImage} alt="logo" />
        </Link>

        {/* Bottone hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu collapsabile */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {/* Link di navigazione */}
          <ul className="navbar-nav me-auto mb-2 mb-xl-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cards">Cards</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
            {isAuthenticated && userRole === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              </li>
            )}
          </ul>

          {/* Ricerca + Carrello + Auth */}
          <div className="d-flex flex-column flex-xl-row align-items-xl-center gap-2 w-100 w-xl-auto">
            <form
              className="d-flex flex-column flex-sm-row gap-2 w-100"
              role="search"
              onSubmit={handleSearch}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <input
                className="form-control"
                type="search"
                placeholder="Expansion"
                value={searchExpansion}
                onChange={(e) => setSearchExpansion(e.target.value)}
              />
              <button className="btn btn-dark" type="submit">Search</button>
            </form>

            {/* Login / Logout */}
            <div className="d-flex gap-2 mt-2 mt-xl-0">
              {!isAuthenticated ? (
                <Link className="btn btn-outline-light" to="/login">Login</Link>
              ) : (
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              )}

              {/* Carrello */}
              <Link to="/cart" className="btn btn-outline-light position-relative">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;






