import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCardsByCategory } from "../api/cards";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const PokemonPage = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null); // Stato per l'hover
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCardsByCategory("Pokemon");
        setCards(data);
      } catch (error) {
        console.error("Errore nel recupero delle carte Pokémon:", error);
      }
    };
  
    fetchCards();
  }, []);

  const handleQuantityChange = (e, cardId) => {
    setQuantities({ ...quantities, [cardId]: e.target.value });
  };

  const handleAddToCart = (card) => {
    const quantity = quantities[card.id] || 1;
    dispatch(addToCart({ ...card, quantity }));
  };

  // Gestione dell'hover
  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold text-white">Pokémon Cards</h2>
      <div className="row justify-content-center">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 d-flex justify-content-center mb-4"
            >
              <div className="card border-0 bg-dark text-white" style={{ width: "100%", maxWidth: "300px" }}>
                <Link to={`/card/${card.id}`}>
                  <div
                    style={{
                      height: "350px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#212529",
                      borderRadius: "10px",
                      padding: "15px",
                    }}
                  >
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="card-img-top"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                        transition: "transform 0.3s ease", // Transizione per l'effetto
                        transform: hoveredCard === card.id ? "scale(1.1)" : "scale(1)", // Ingrandisce se hover
                      }}
                      onMouseEnter={() => handleMouseEnter(card.id)} // Mouse sopra
                      onMouseLeave={handleMouseLeave} // Mouse fuori
                    />
                  </div>
                </Link>
                <div className="card-body text-center">
                  <h5 className="card-title text-info fw-bold">{card.name}</h5>
                  <p className="card-text fw-bold">
                    {card.expansion} - €{card.price}
                  </p>
                  <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                    <input
                      type="number"
                      min="1"
                      value={quantities[card.id] || 1}
                      className="form-control"
                      style={{
                        width: "60px",
                        textAlign: "center",
                        borderRadius: "15px",
                      }}
                      onChange={(e) => handleQuantityChange(e, card.id)}
                    />
                    <button
                      className="btn btn-warning rounded-0 fw-bold d-flex align-items-center justify-content-center"
                      style={{ width: "50px", height: "40px" }}
                      onClick={() => handleAddToCart(card)}
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No Pokémon cards available.</p>
        )}
         <a href="/cards" className="btn btn-link mt-4 text-decoration-none  text-white fw-bold">
            ← Back To Cards Collection
          </a>
          <a href="/" className="btn btn-link mt-4 text-decoration-none  text-white fw-bold">
            ← Back Home
          </a>
      </div>
    </div>
  );
};

export default PokemonPage;






