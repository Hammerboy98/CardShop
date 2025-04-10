import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Importiamo Link da react-router-dom
import MyImage from "../assets/MyImage.png";

const MyNavbar = ({ isAuthenticated, handleLogout, userRole }) => {
  // Ottieni il numero di articoli nel carrello dallo stato Redux
  const cartCount = useSelector((state) => state.cart.items.length);
  const navigate = useNavigate();

  const [searchName, setSearchName] = React.useState("");
  const [searchExpansion, setSearchExpansion] = React.useState("");

  // Funzione per gestire la ricerca senza ricaricare la pagina
  const handleSearch = (e) => {
    e.preventDefault(); // Impedisce che il form venga inviato
    console.log("Cerca carte");

    const queryParams = new URLSearchParams();
    if (searchName) queryParams.set("name", searchName);
    if (searchExpansion) queryParams.set("expansion", searchExpansion);

    navigate(`/cards?${queryParams.toString()}`);

    setSearchName("");
    setSearchExpansion("");
    // Puoi aggiungere logica di ricerca qui
  };

  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-primary sticky-top">
      <div className="container-fluid">
        {/* Logo che riporta alla home */}
        <Link className="navbar-brand" to="/">
          <img style={{ width: "50px", borderRadius: "50%" }} src={MyImage} alt="logo" />
        </Link>

        {/* Bottone per la visualizzazione del menu mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu di navigazione */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active text-sm-center" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-sm-center" to="/cards">
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-sm-center" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-sm-center" to="/contact">
                Contact Us
              </Link>
            </li>
            {/* Aggiungi la voce di menu per Admin se l'utente è un admin */}
            {isAuthenticated && userRole === "admin" && (
              <li className="nav-item">
                <Link className="nav-link active text-sm-center" to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Form di ricerca */}
          <form className="d-flex ms-auto gap-2 mt-sm-2" role="search" onSubmit={handleSearch}>
            <input
              className="form-control"
              type="search"
              placeholder="Name"
              aria-label="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              className="form-control"
              type="search"
              placeholder="Expansion"
              aria-label="Search by expansion"
              value={searchExpansion}
              onChange={(e) => setSearchExpansion(e.target.value)}
            />
            <button className="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form>

          {/* Bottone del carrello */}
          <div className="ms-3 d-flex justify-content-center align-items-center mt-sm-2 me-sm-4">
            <Link to="/cart" className="btn btn-outline-dark">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="badge bg-danger mx-1">{cartCount}</span>
              )}
            </Link>
            {/* Gestione Login/Logout */}
          <div className="ms-3">
            {!isAuthenticated ? (
              <>
                <Link className="btn btn-outline-dark" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-dark ms-2" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <button className="btn btn-outline-dark" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
          </div>

          
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;


