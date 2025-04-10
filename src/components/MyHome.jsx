import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCards } from "../api/cards";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom"; // Per la navigazione tra le pagine

const MyHome = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null); // Stato per il mouse hover
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        const displayedCards = data.slice(20, 29); // Mostra solo le prime 9 carte
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

  // Funzione per gestire l'hover dell'immagine
  const handleMouseEnter = (id) => {
    setHoveredCard(id); // Memorizza l'id della carta per cui è stato attivato l'hover
  };

  const handleMouseLeave = () => {
    setHoveredCard(null); // Rimuove l'id quando il mouse esce
  };

  return (
    <div>
      {/* Hero section */}
      <div className="text-white text-center p-5 bg-dark">
        <h1 className="fw-bold">Welcome To CardShop</h1>
        <p
          style={{ maxWidth: "450px", margin: "0 auto" }}
          className="fw-bolder"
        >
          Your ultimate destination for collectible trading cards! Whether
          you're a seasoned collector or just getting started, you'll find a
          wide variety of cards from all your favorite expansions. Browse,
          discover, and build your dream collection—right here.
        </p>
        <a href="/cards" className="btn btn-primary mt-3 rounded-0 fw-bold">
          Browse Our Complete Card Collection
        </a>
      </div>

      {/* Filtro per gioco */}
      <div className="container mt-5 text-center">
        <h2 className="text-white mb-4 fw-bold">Filter By Expansion</h2>
        <div className="d-flex justify-content-center gap-3">
          <div
            className="card bg-dark text-white border-0 mx-5"
            style={{ cursor: "pointer", width: "200px" }}
          >
            <Link
              to="/pokemon" // Link alla pagina delle carte Pokémon
              className="text-decoration-none text-white"
            >
              <img
                src="https://clazo-pokemon.netlify.app/static/media/portadapokemon.5b8a5f11.png" // Immagine Pokémon
                alt="Pokémon"
                className="card-img-top"
                style={{ height: "175px", width: "100%" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Pokémon</h5>
              </div>
            </Link>
          </div>

          <div
            className="card bg-dark text-white border-0 mx-5"
            style={{ cursor: "pointer", width: "200px" }}
          >
            <Link
              to="/magic" // Link alla pagina delle carte Magic
              className="text-decoration-none text-white"
            >
              <img
                src="https://carrettodicarta.it/wp-content/uploads/2024/07/Magic-The-Gathering-Logo.png" // Immagine Magic
                alt="Magic"
                className="card-img-top"
                style={{ height: "150px", width: "100%" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title text-center">Magic: The Gathering</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Cards section */}
      <div className="container mt-5 bg-dark ps-xl-1">
        <h2 className="text-center mb-4 fw-bold text-white">Featured Cards</h2>
        <div className="row justify-content-center g-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center"
            >
              <div
                className="card border-0 bg-dark"
                style={{ width: "100%", maxWidth: "300px" }}
              >
                <Link to={`/card/${card.id}`}>
                  <div
                    style={{
                      height: "350px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#212529",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        borderRadius: "16px",
                        transition: "transform 0.3s ease", // Aggiungi transizione per effetto smooth
                        transform:
                          hoveredCard === card.id ? "scale(1.1)" : "scale(1)", // Ingrandisce solo la carta con il mouse sopra
                      }}
                      onMouseEnter={() => handleMouseEnter(card.id)} // Attiva hover
                      onMouseLeave={handleMouseLeave} // Rimuove hover
                    />
                  </div>
                </Link>
                <div className="card-body text-center">
                  <h5 className="card-title text-info fw-bold">{card.name}</h5>
                  <p className="card-text text-white fw-bold">
                    {card.expansion} - €{card.price}
                  </p>
                  <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
                    <input
                      type="number"
                      min="1"
                      value={quantities[card.id] || 1}
                      className="form-control text-center"
                      style={{
                        width: "60px",
                        padding: "5px",
                        border: "1px solid #ddd",
                        borderRadius: "15px",
                      }}
                      onChange={(e) => handleQuantityChange(e, card)}
                    />
                    <button
                      className="btn btn-warning rounded-0 fw-bold"
                      style={{ width: "50px", height: "38px" }}
                      onClick={() => handleAddToCart(card)}
                    >
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

export default MyHome;




