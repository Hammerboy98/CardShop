import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllCards } from "../api/cards";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const allCards = await getAllCards();
        const selectedCard = allCards.find((c) => c.id.toString() === id);
        setCard(selectedCard);
      } catch (error) {
        console.error("Error loading card:", error);
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
        <h2>Loading card...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-white">
      <div className="row g-5 align-items-start">
        {/* Left column: image and info */}
        <div className="col-md-6 text-center">
          <div
            style={{
              backgroundColor: "black",
              borderRadius: "10px",
              padding: "15px",
              transition: "transform 0.3s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src={card.imageUrl}
              alt={card.name}
              className="img-fluid rounded shadow-lg"
              style={{
                maxHeight: "500px",
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
          <h2 className="mt-4 text-danger fw-bold">{card.name}</h2>
          <p className="text-info fw-bold">Expansion: {card.expansion}</p>
          <p className="h4 text-info fw-bold">Price: €{card.price}</p>
        </div>

        {/* Right column: quantity and cart */}
        <div className="col-md-6 d-flex flex-column justify-content-start align-items-center">
          <div className="bg-dark p-4 rounded shadow-lg w-100 text-center">
            <h4 className="fw-bold mb-3 text-info">Buy now safely!</h4>
            <p className="text-muted">Payment available with:</p>
            <div className="fs-1 text-warning mb-4">
              <FaCcVisa className="me-3" />
              <FaCcMastercard className="me-3" />
              <FaCcPaypal />
            </div>

            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-control text-center"
                style={{ width: "80px", borderRadius: "12px" }}
              />
              <button
                onClick={handleAddToCart}
                className="btn btn-warning fw-bold"
              >
                <FaShoppingCart /> Add to cart
              </button>
            </div>

            <p className="text-success mt-3">In stock – Ready to ship 🚀</p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/cards" className="btn btn-link text-white fw-bold text-decoration-none">
              ← Back to collection
            </Link>
            <br />
            <Link to="/" className="btn btn-link text-white fw-bold text-decoration-none">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;




