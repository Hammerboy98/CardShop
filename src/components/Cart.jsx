import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

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
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  style={{ width: "150px" }}
                />
              </div>
              <div className="text-white fw-bold">
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
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <button
                  className="btn btn-danger btn-sm rounded-0"
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
            <h4>Total: €{calculateTotal()}</h4>
          </div>
          <button
            className="btn btn-success mt-3"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}

      <div style={{ height: "180px" }}></div>
    </div>
  );
};

export default Cart;



