import React from 'react';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const MyNavbar = () => {

    const [cartCount, setCartCount] = useState(0); // Stato per il numero di articoli nel carrello

  // Funzione per aggiungere un prodotto al carrello (come esempio)
  const addToCart = () => {
    setCartCount(cartCount + 1); // Incrementa il numero di articoli nel carrello

  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">CardShop</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/cards">Cards</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/contact">Contact Us</a>
            </li>
          </ul>
          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cerca carte"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark " type="submit">Cerca</button>
          </form>
          <div className="ms-3">
            <button className="btn btn-outline-dark" onClick={addToCart}>
              <FaShoppingCart /> {cartCount > 0 && <span className="badge bg-danger">{cartCount}</span>}
            </button>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default MyNavbar;