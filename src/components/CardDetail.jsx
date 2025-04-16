import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllCards } from "../api/cards";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const allCards = await getAllCards();
        const selectedCard = allCards.find((c) => c.id.toString() === id);
        setCard(selectedCard);
      } catch (error) {
        console.error("Errore nel caricamento della carta:", error);
      }
    };

    fetchCard();
  }, [id]);

  const handleAddToCart = () => {
    if (card) {
      dispatch(addToCart({ ...card, quantity }));
    }
  };

  if (!card) {
    return (
      <div className="text-center text-white mt-5">
        <h2>Caricamento carta...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-white">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card bg-dark shadow-lg p-3">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="img-fluid"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
            <div className="card-body">
              <h2 className="card-title text-danger fw-bold">{card.name}</h2>
              <p className="card-text text-info fw-bold">{card.expansion}</p>
              <p className="card-text h4 text-danger fw-bold">€{card.price}</p>
              <p className="card-text h4 text-info fw-bold">Category : {card.category}</p>

              <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control text-center"
                  style={{ width: "70px" ,borderRadius:"15px"}}
                />
                <button
                  onClick={handleAddToCart}
                  className="btn btn-warning fw-bold"
                >
                  <FaShoppingCart /> Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>
          <a href="/cards" className="btn btn-link mt-4 text-decoration-none text-white fw-bold">
            ← Torna alla collezione
          </a>
          <a href="/" className="btn btn-link mt-4 text-decoration-none text-white fw-bold">
            ← Torna alla home
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;

