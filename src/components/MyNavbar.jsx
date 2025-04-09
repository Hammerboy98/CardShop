import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Importiamo Link da react-router-dom
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
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
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        {/* Logo che riporta alla home */}
        <Link className="navbar-brand" to="/">
          CardShop
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
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/cards">
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Form di ricerca */}
          <form
            className="d-flex ms-auto gap-2"
            role="search"
            onSubmit={handleSearch}
          >
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
          <div className="ms-3 ">
            <Link to="/cart" className="btn btn-outline-dark">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="badge bg-danger mx-1">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
