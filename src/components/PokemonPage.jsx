import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCardsByCategory } from "../api/cards";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const PokemonPage = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const handleMouseEnter = (id) => setHoveredCard(id);
  const handleMouseLeave = () => setHoveredCard(null);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold text-warning display-4">✨ Pokémon Cards</h2>
      <div className="row justify-content-center g-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
              <div
                className="bg-dark text-white rounded-4 shadow-lg overflow-hidden"
                style={{ width: "100%", maxWidth: "300px" }}
              >
                <Link to={`/card/${card.id}`} className="text-decoration-none">
                  <div
                    onMouseEnter={() => handleMouseEnter(card.id)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      height: "320px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#1e1e1e",
                      transition: "transform 0.3s ease",
                      transform: hoveredCard === card.id ? "scale(1.03)" : "scale(1)",
                      padding: "12px",
                    }}
                  >
                    <img
  src={card.imageUrl}
  alt={card.name}
  style={{
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
    borderRadius: "12px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    transform: hoveredCard === card.id ? "scale(1.1)" : "scale(1)",
    boxShadow:
      hoveredCard === card.id
        ? "0 0 20px 5px rgba(255, 215, 0, 0.5)" // Ombra gialla dorata in hover
        : "none",
  }}
  onMouseEnter={() => handleMouseEnter(card.id)}
  onMouseLeave={handleMouseLeave}
/>
                  </div>
                </Link>

                <div className="card-body text-center px-3 pb-4">
                  <h5 className="card-title text-info fw-bold">{card.name}</h5>
                  <p className="text-danger fw-semibold mb-3">
                    {card.expansion} <br /> €{card.price}
                  </p>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={quantities[card.id] || 1}
                      className="form-control"
                      style={{
                        width: "60px",
                        textAlign: "center",
                        borderRadius: "12px",
                      }}
                      onChange={(e) => handleQuantityChange(e, card.id)}
                    />
                    <button
                      className="btn btn-warning rounded-pill fw-bold d-flex align-items-center justify-content-center"
                      style={{ width: "45px", height: "40px" }}
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

        <div className="text-center mt-4">
          <Link to="/cards" className="btn btn-link text-white fw-bold text-decoration-none">
            ← Back To Cards Collection
          </Link>
          <br />
          <Link to="/" className="btn btn-link text-white fw-bold text-decoration-none">
            ← Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;







