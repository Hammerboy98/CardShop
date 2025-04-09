import React from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector per leggere lo stato
import { removeFromCart, updateQuantity } from "../redux/cartSlice"; // Importiamo l'azione removeFromCart e updateQuantity

const Cart = () => {
  const dispatch = useDispatch(); // Funzione dispatch
  const cart = useSelector((state) => state.cart.items); // Otteniamo gli articoli dal carrello

  const handleRemoveFromCart = (cardId) => {
    const existingCard = cart.find(item => item.id === cardId);
    if (existingCard.quantity > 1) {
      // Se la quantità è maggiore di 1, riduciamo la quantità di 1
      dispatch(updateQuantity({ cardId, newQuantity: existingCard.quantity - 1 }));
    } else {
      // Se la quantità è 1, rimuoviamo completamente il prodotto dal carrello
      dispatch(removeFromCart(cardId));
    }
  };

  const handleQuantityChange = (e, cardId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      dispatch(updateQuantity({ cardId, newQuantity })); // Aggiungiamo l'azione per aggiornare la quantità
    }
  };

  // Calcolare il totale del carrello
  const calculateTotal = () => {
    return cart.reduce((total, card) => total + card.price * card.quantity, 0).toFixed(2);
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
              className="list-group-item d-flex justify-content-between align-items-center bg-dark"
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
              
              {/* Selettore della quantità */}
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  min="1"
                  value={card.quantity}
                  onChange={(e) => handleQuantityChange(e, card.id)} // Aggiorna la quantità
                  style={{
                    width: "50px",
                    textAlign: "center",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <button
                  className="btn btn-danger btn-sm rounded-0"
                  onClick={() => handleRemoveFromCart(card.id)} // Gestiamo la rimozione dal carrello
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Mostra il totale del carrello */}
      {cart.length > 0 && (
        <div className="text-white mt-4 fw-bold">
          <h4>Total: €{calculateTotal()}</h4>
        </div>
      )}

      <div style={{ height: "180px" }}></div>
    </div>
  );
};

export default Cart;

