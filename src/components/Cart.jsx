import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleRemoveFromCart = (cardId) => {
    const existingCard = cart.find((item) => item.id === cardId);
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

  const handleMouseEnter = (id) => setHoveredCard(id);
  const handleMouseLeave = () => setHoveredCard(null);

  return (
    <div className="container py-5">
      <h2 className="text-white text-center mb-5 fw-bold">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-white text-center fw-bold mt-5">Your cart is empty!</p>
      ) : (
        <div className="row justify-content-center g-4">
          {cart.map((card) => (
            <div
              key={card.id}
              className="col-12 col-md-10 col-lg-8"
            >
              <div className="bg-dark text-white rounded-4 shadow-lg p-3 d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center flex-wrap gap-3">
                  <Link to={`/card/${card.id}`}>
                    <div
                      onMouseEnter={() => handleMouseEnter(card.id)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        transition: "transform 0.3s ease",
                        transform: hoveredCard === card.id ? "scale(1.07)" : "scale(1)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#1c1c1c",
                        padding: "6px",
                      }}
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        style={{ width: "120px", height: "auto", objectFit: "contain" }}
                      />
                    </div>
                  </Link>

                  <div>
                    <h5 className="text-warning fw-bold">{card.name}</h5>
                    <p className="mb-1 text-muted">{card.category}</p>
                    <p className="mb-0 fw-bold">€{card.price}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                  <input
                    type="number"
                    min="1"
                    value={card.quantity}
                    onChange={(e) => handleQuantityChange(e, card.id)}
                    className="form-control text-center"
                    style={{
                      width: "60px",
                      borderRadius: "10px",
                    }}
                  />
                  <button
                    className="btn btn-outline-danger rounded-pill px-3 fw-bold"
                    onClick={() => handleRemoveFromCart(card.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="text-center mt-5">
          <h4 className="text-white fw-bold mb-3">
            🧾 Total: <span className="text-success">€{calculateTotal()}</span>
          </h4>
          <button className="btn btn-success btn-lg px-5 rounded-pill fw-bold" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}

      <div className="text-center mt-5">
        <Link to="/cards" className="btn btn-link text-white fw-bold text-decoration-none">
          ← Back to Cards Collection
        </Link>
        <br />
        <Link to="/" className="btn btn-link text-white fw-bold text-decoration-none">
          ← Back Home
        </Link>
      </div>

      <div style={{ height: "150px" }}></div>
    </div>
  );
};

export default Cart;





