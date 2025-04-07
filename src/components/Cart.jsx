import React from 'react';
import { useDispatch, useSelector } from 'react-redux';  // useSelector per leggere lo stato
import { removeFromCart } from '../redux/cartSlice';  // Importiamo l'azione removeFromCart

const Cart = () => {
  const dispatch = useDispatch();  // Funzione dispatch
  const cart = useSelector((state) => state.cart.items);  // Otteniamo gli articoli dal carrello

  const handleRemoveFromCart = (cardId) => {
    dispatch(removeFromCart(cardId));  // Dispathiamo l'azione per rimuovere una carta dal carrello
  };

  return (
    <div className="container">
      <h2>Il tuo Carrello</h2>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto!</p>
      ) : (
        <ul className="list-group">
          {cart.map((card) => (
            <li key={card.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <img src={card.imageUrl} alt={card.name} style={{ width: '50px' }} />
                {card.name} - ${card.price}
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveFromCart(card.id)}  // Gestiamo la rimozione dal carrello
              >
                Rimuovi
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;