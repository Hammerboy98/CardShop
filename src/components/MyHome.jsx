import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCards } from "../api/cards";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyHome = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        const displayedCards = data.slice(20, 29);
        setCards(displayedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleQuantityChange = (e, card) => {
    const updatedQuantities = { ...quantities, [card.id]: e.target.value };
    setQuantities(updatedQuantities);
  };

  const handleAddToCart = (card) => {
    const quantity = quantities[card.id] || 1;
    const cardWithQuantity = { ...card, quantity };
    dispatch(addToCart(cardWithQuantity));
  };

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="text-white text-center p-5 bg-dark" style={styles.heroSection}>
        <h1 className="fw-bold" style={styles.heroTitle}>Welcome To CardShop</h1>
        <p className="fw-bolder" style={styles.heroText}>
          Your ultimate destination for collectible trading cards! Whether you're a seasoned collector or just getting started, you'll find a wide variety of cards from all your favorite expansions. Browse, discover, and build your dream collection—right here.
        </p>
        <a href="/cards" className="btn btn-primary mt-3 rounded-0 fw-bold" style={styles.heroButton}>Browse Our Complete Card Collection</a>
      </div>

      {/* Filter by Expansion Section */}
      <div className="container mt-5 text-center">
        <h2 className="text-white mb-4 fw-bold">Filter By Expansion</h2>
        <div className="d-flex justify-content-center gap-3">
          {/* Pokémon */}
          <div className="card bg-dark text-white border-0 mx-3" style={styles.card} onMouseEnter={() => handleMouseEnter('pokemon')} onMouseLeave={handleMouseLeave}>
            <Link to="/pokemon" className="text-decoration-none text-white">
              <img
                src="https://clazo-pokemon.netlify.app/static/media/portadapokemon.5b8a5f11.png"
                alt="Pokémon"
                className="card-img-top"
                style={styles.cardImage}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Pokémon</h5>
              </div>
            </Link>
          </div>

          {/* Magic */}
          <div className="card bg-dark text-white border-0 mx-3" style={styles.card} onMouseEnter={() => handleMouseEnter('magic')} onMouseLeave={handleMouseLeave}>
            <Link to="/magic" className="text-decoration-none text-white">
              <img
                src="https://carrettodicarta.it/wp-content/uploads/2024/07/Magic-The-Gathering-Logo.png"
                alt="Magic"
                className="card-img-top"
                style={styles.cardImage}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Magic: The Gathering</h5>
              </div>
            </Link>
          </div>

          {/* Yu-Gi-Oh! */}
          <div className="card bg-dark text-white border-0 mx-3" style={styles.card} onMouseEnter={() => handleMouseEnter('yugioh')} onMouseLeave={handleMouseLeave}>
            <Link to="/yugioh" className="text-decoration-none text-white">
              <img
                src="https://www.konami.com/crossmedia/assets/images/products/Yugioh_logo.png"
                alt="Yu-Gi-Oh!"
                className="card-img-top mt-3"
                style={styles.cardImage}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Yu-Gi-Oh!</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="container mt-5 bg-dark ps-xl-1">
        <h2 className="text-center mb-4 fw-bold text-white">Featured Cards</h2>
        <div className="row justify-content-center g-4">
          {cards.map((card) => (
            <div key={card.id} className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
              <div className="card border-0 bg-dark" style={styles.cardWrapper}>
                <Link to={`/card/${card.id}`}>
                  <div className="card-img-container" style={styles.cardImageWrapper}>
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      style={hoveredCard === card.id ? { ...styles.cardImage, transform: "scale(1.1)" } : styles.cardImage}
                      onMouseEnter={() => handleMouseEnter(card.id)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                </Link>
                <div className="card-body text-center">
                  <h5 className="card-title text-info fw-bold">{card.name}</h5>
                  <p className="card-text text-danger fw-bold">{card.expansion} - €{card.price}</p>
                  <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
                    <input
                      type="number"
                      min="1"
                      value={quantities[card.id] || 1}
                      className="form-control text-center"
                      style={styles.input}
                      onChange={(e) => handleQuantityChange(e, card)}
                    />
                    <button className="btn btn-warning rounded-0 fw-bold" style={styles.addToCartButton} onClick={() => handleAddToCart(card)}>
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  heroSection: {
    backgroundImage: 'url("https://example.com/hero-image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '80px 0',
  },
  heroTitle: {
    fontSize: '3.5rem',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
  },
  heroText: {
    maxWidth: '650px',
    margin: '0 auto',
    fontSize: '1.2rem',
  },
  heroButton: {
    fontSize: '1.1rem',
    padding: '12px 25px',
  },
  card: {
    cursor: 'pointer',
    width: '250px',  
    transition: 'transform 0.3s ease',
  },
  cardImage: {
    height: '220px', 
    width: '100%',
    objectFit: 'contain',
    transition: 'transform 0.3s ease',
  },
  cardImageWrapper: {
    height: '350px', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212529',
    borderRadius: '10px',
    overflow: 'hidden',
    padding: '10px',
  },
  cardWrapper: {
    maxWidth: '300px',
    width: '100%',
  },
  input: {
    width: '60px',
    padding: '5px',
    border: '1px solid #ddd',
    borderRadius: '15px',
  },
  addToCartButton: {
    width: '50px',
    height: '38px',
  },
};

export default MyHome;






