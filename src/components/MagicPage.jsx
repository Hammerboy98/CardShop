import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCards } from "../api/cards";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MagicPage = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null); // Stato per il mouse hover
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        setCards(data.slice(24, 48)); // Le carte da 25 a 48 sono Magic
      } catch (error) {
        console.error("Error fetching Magic cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleQuantityChange = (e, cardId) => {
    const updatedQuantities = { ...quantities, [cardId]: e.target.value };
    setQuantities(updatedQuantities);
  };

  const handleAddToCart = (card) => {
    const quantity = quantities[card.id] || 1; // Prende la quantità specificata, altrimenti 1
    const cardWithQuantity = { ...card, quantity };
    dispatch(addToCart(cardWithQuantity)); // Aggiungi la carta al carrello con la quantità
  };

  // Funzione per gestire l'hover dell'immagine
  const handleMouseEnter = (id) => {
    setHoveredCard(id); // Memorizza l'id della carta per cui è stato attivato l'hover
  };

  const handleMouseLeave = () => {
    setHoveredCard(null); // Rimuove l'id quando il mouse esce
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold text-white">Magic: The Gathering Cards</h2>
      <div className="row justify-content-center">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 d-flex justify-content-center mb-4"
            >
              <div className="card border-0 bg-dark text-white" style={{ width: "100%", maxWidth: "300px" }}>
                <Link to={`/card/${card.id}`}>
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="card-img-top"
                    // Aggiungi lo stile inline per l'effetto hover
                    style={{
                      height: "350px",
                      width: "100%",
                      objectFit: "contain",
                      backgroundColor: "#212529",
                      padding: "15px",
                      borderRadius: "56px",
                      transition: "transform 0.3s ease", // Effetto di transizione
                      transform: hoveredCard === card.id ? "scale(1.1)" : "scale(1)", // Applica l'ingrandimento solo se il mouse è sopra
                    }}
                    onMouseEnter={() => handleMouseEnter(card.id)} // Attiva l'hover
                    onMouseLeave={handleMouseLeave} // Rimuove l'hover
                  />
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
                        borderRadius: "5px",
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
          <p className="text-white text-center">No Magic cards available.</p>
        )}
        <a href="/cards" className="btn btn-link mt-4 text-decoration-none text-white fw-bold">
            ← Back To Cards Collection
          </a>
          <a href="/" className="btn btn-link mt-4 text-decoration-none text-white fw-bold">
            ← Back Home
          </a>
      </div>
      
    </div>
    
  );
};

export default MagicPage;






