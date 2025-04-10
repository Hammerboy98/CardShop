import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [hoveredCard, setHoveredCard] = useState(null); // Stato per tracciare l'immagine sotto il mouse

  const handleRemoveFromCart = (cardId) => {
    const existingCard = cart.find(item => item.id === cardId);
    if (existingCard.quantity > 1) {
      dispatch(updateQuantity({ cardId, newQuantity: existingCard.quantity - 1 }));
    } else {
      dispatch(removeFromCart(cardId));
    }
  };

  const handleQuantityChange = (e, cardId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      dispatch(updateQuantity({ cardId, newQuantity }));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, card) => total + card.price * card.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    const total = calculateTotal();
    alert(`Thank you for your order of €${total}! Your cart is now empty.`);
    dispatch(clearCart());
  };

  // Funzioni per l'hover
  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="container">
      <h2 className="text-white mt-4 fw-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-white text-center fw-bold mt-5">
          Your cart is empty!
        </p>
      ) : (
        <ul className="list-group">
          {cart.map((card) => (
            <li
              key={card.id}
              className="list-group-item d-flex justify-content-between align-items-center bg-dark"
            >
              <div className="mx-1">
                <Link to={`/card/${card.id}`}>
                  <div
                    onMouseEnter={() => handleMouseEnter(card.id)} // Mouse sopra
                    onMouseLeave={handleMouseLeave} // Mouse fuori
                    style={{
                      transition: "transform 0.3s ease", // Transizione per l'effetto
                      transform: hoveredCard === card.id ? "scale(1.1)" : "scale(1)", // Ingrandimento
                    }}
                  >
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      style={{ width: "150px" }}
                    />
                  </div>
                </Link>
              </div>
              <div className="text-info fw-bold">
                {card.name} - €{card.price}
              </div>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  min="1"
                  value={card.quantity}
                  onChange={(e) => handleQuantityChange(e, card.id)}
                  style={{
                    width: "50px",
                    textAlign: "center",
                    borderRadius: "15px",
                    marginRight: "10px",
                  }}
                />
                <button
                  className="btn btn-danger btn-sm rounded-2"
                  onClick={() => handleRemoveFromCart(card.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="d-flex justify-content-center align-items-center flex-column mt-4">
          <div className="text-white fw-bold">
            <h4 className="fw-bold text-danger">Total: €{calculateTotal()}</h4>
          </div>
          <button
            className="btn btn-success mt-3"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
        
      )}
      <a href="/cards" className="btn btn-link mt-4 text-decoration-none text-center text-white fw-bold">
            ← Back to Cards Collection
          </a>
          <a href="/" className="btn btn-link mt-4 text-decoration-none text-center text-white fw-bold">
            ← Back Home
          </a>
      <div style={{ height: "180px" }}></div>
    </div>
  );
};

export default Cart;




