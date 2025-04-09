import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCards } from "../api/cards";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";

const MyHome = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        setCards(data.slice(20, 29)); // Solo le prime 9 carte
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
    const quantity = quantities[card.id] || 1; // Usa la quantità selezionata, default a 1 se non selezionata
    const cardWithQuantity = { ...card, quantity }; // Aggiungiamo la quantità all'oggetto carta
    dispatch(addToCart(cardWithQuantity)); // Dispatchiamo l'azione con la quantità
  };

  return (
    <div>
      {/* Hero section */}
      <div className="text-white text-center p-5 bg-dark">
        <h1 className="fw-bold">Welcome To CardShop</h1>
        <p
          style={{ maxWidth: "350px", margin: "0 auto" }}
          className="fw-bolder"
        >
          Your ultimate destination for collectible trading cards! Whether
          you're a seasoned collector or just getting started, you'll find a
          wide variety of cards from all your favorite expansions. Browse,
          discover, and build your dream collection—right here.
        </p>
        <a href="/cards" className="btn btn-primary mt-3 rounded-0 fw-bold">
          Browse Our Card Collection
        </a>
      </div>

      {/* Featured Cards section */}
      <div className="container mt-5 bg-dark">
        <h2 className="text-center mb-4 fw-bold text-white">Featured Cards</h2>
        <div className="row justify-content-center">
          {cards.map((card) => (
            <div className="col-md-4 mb-4" key={card.id}>
              <div className="card border-0">
                <img
                  src={card.imageUrl}
                  className="card-img-top"
                  alt={card.name}
                  style={{ width: "100%", height: "500px" }}
                />
                <div className="card-body text-center bg-dark">
                  <h5 className="card-title text-info fw-bold">{card.name}</h5>
                  <p className="card-text text-white fw-bold">
                    {card.expansion} - €{card.price}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="number"
                      min="1"
                      value={quantities[card.id] || 1} // Usa il valore della quantità o 1 come default
                      style={{
                        width: '50px',
                        padding: '5px',
                        textAlign: 'center',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                      }}
                      onChange={(e) => handleQuantityChange(e, card)} // Funzione per aggiornare la quantità
                    />
                    <button
                      className="btn btn-warning rounded-0 p-1 fw-bold"
                      style={{ width: "50px", padding: "10px" }}
                      onClick={() => handleAddToCart(card)} // Usa la funzione già definita
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

