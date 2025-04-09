import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCards } from "../api/cards";
import { addToCart } from "../redux/cartSlice"; // Assicurati che il cartSlice sia correttamente configurato
import { FaShoppingCart } from "react-icons/fa";

const PokemonPage = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({}); // Stato per le quantità
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        setCards(data.slice(0, 24)); // Le prime 24 carte sono Pokémon
      } catch (error) {
        console.error("Error fetching Pokémon cards:", error);
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

  return (
    <div>
      <h2 className="text-center mb-4 fw-bold">Pokémon Cards</h2>
      <div className="container">
        <div className="row justify-content-center">
          {cards.length > 0 ? (
            cards.map((card) => (
              <div className="col-md-4 mb-4" key={card.id}>
                <div style={{ width: "300px" }} className="card border-0 mx-5">
                  <img
                    src={card.imageUrl}
                    className="card-img-top"
                    alt={card.name}
                    style={{ width: "100%", height: "400px" }}
                  />
                  <div className="card-body text-center bg-dark">
                    <h5 className="card-title text-info fw-bold">{card.name}</h5>
                    <p className="card-text text-white fw-bold">
                      {card.expansion} - €{card.price}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <input
                        type="number"
                        min="1"
                        value={quantities[card.id] || 1}
                        style={{
                          width: "50px",
                          padding: "5px",
                          textAlign: "center",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                        onChange={(e) => handleQuantityChange(e, card.id)} // Funzione per aggiornare la quantità
                      />
                      <button
                        className="btn btn-warning rounded-0 p-1 fw-bold"
                        style={{ width: "50px", padding: "10px" }}
                        onClick={() => handleAddToCart(card)} // Funzione per aggiungere al carrello
                      >
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No Pokémon cards available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;




