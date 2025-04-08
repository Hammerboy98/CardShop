import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';  // Importiamo Link da react-router-dom

const MyNavbar = () => {
  // Ottieni il numero di articoli nel carrello dallo stato Redux
  const cartCount = useSelector((state) => state.cart.items.length);

  // Funzione per gestire la ricerca senza ricaricare la pagina
  const handleSearch = (e) => {
    e.preventDefault(); // Impedisce che il form venga inviato
    console.log("Cerca carte");
    // Puoi aggiungere logica di ricerca qui
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        {/* Logo che riporta alla home */}
        <Link className="navbar-brand" to="/">CardShop</Link>

        {/* Bottone per la visualizzazione del menu mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu di navigazione */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/cards">Cards</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/contact">Contact Us</Link>
            </li>
          </ul>

          {/* Form di ricerca */}
          <form className="d-flex ms-auto" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cerca carte"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="submit">Cerca</button>
          </form>

          {/* Bottone del carrello */}
          <div className="ms-3 ">
            <Link to="/cart" className="btn btn-outline-dark">
              <FaShoppingCart />
              {cartCount > 0 && <span className="badge bg-danger mx-1">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;

