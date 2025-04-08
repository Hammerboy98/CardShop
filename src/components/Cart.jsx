import React from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector per leggere lo stato
import { removeFromCart } from "../redux/cartSlice"; // Importiamo l'azione removeFromCart

const Cart = () => {
  const dispatch = useDispatch(); // Funzione dispatch
  const cart = useSelector((state) => state.cart.items); // Otteniamo gli articoli dal carrello

  const handleRemoveFromCart = (cardId) => {
    dispatch(removeFromCart(cardId)); // Dispathiamo l'azione per rimuovere una carta dal carrello
  };

  return (
    <div className="container">
      <h2 className="text-white mt-4 fw-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-white text-center fw-bold mt-5">
          Il carrello è vuoto!
        </p>
      ) : (
        <ul className="list-group">
          {cart.map((card) => (
            <li
              key={card.id}
              className="list-group-item d-flex justify-content-between align-items-center bg-dark "
            >
              <div className="mx-1">
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  style={{ width: "100px" }}
                />
              </div>
              <div className="text-white fw-bold">
                {card.name} - €{card.price}
              </div>
              <button
                className="btn btn-danger btn-sm rounded-0"
                onClick={() => handleRemoveFromCart(card.id)} // Gestiamo la rimozione dal carrello
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div style={{ height: "180px" }}></div>
    </div>
  );
};

export default Cart;
