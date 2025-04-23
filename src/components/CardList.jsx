import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { getAllCards } from '../api/cards';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null); // Stato per tracciare l'immagine sotto il mouse
  const dispatch = useDispatch();
  const location = useLocation(); // Accesso ai query param dalla URL

  const queryParams = new URLSearchParams(location.search);
  const nameFilter = queryParams.get("name")?.toLowerCase() || "";
  const expansionFilter = queryParams.get("expansion")?.toLowerCase() || "";

  const handleQuantityChange = (e, card) => {
    const updatedQuantities = { ...quantities, [card.id]: e.target.value };
    setQuantities(updatedQuantities);
  };

  const handleAddToCart = (card) => {
    const quantity = quantities[card.id] || 1;
    dispatch(addToCart({ ...card, quantity }));
  };

  useEffect(() => {
    setLoading(true);
    getAllCards()
      .then((data) => {
        const filtered = data.filter((card) => {
          const matchName = card.name.toLowerCase().includes(nameFilter);
          const matchExpansion = card.expansion.toLowerCase().includes(expansionFilter);
          return matchName && matchExpansion;
        });

        setCards(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching cards');
        setLoading(false);
        console.error(err);
      });
  }, [nameFilter, expansionFilter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2 className="mx-4 text-center fw-bold text-warning">🔍Our Products</h2>
      <div className="container d-flex flex-wrap justify-content-center gap-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} style={{ padding: '20px', width: '240px' }}>
              <Link to={`/card/${card.id}`} className="text-decoration-none">
                <div
                  onMouseEnter={() => handleMouseEnter(card.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    transform: hoveredCard === card.id ? "scale(1.05)" : "scale(1)",
                    boxShadow: hoveredCard === card.id ? "0 4px 20px rgba(255, 193, 7, 0.3)" : "0 10px 15px rgba(0, 0, 0, 0.1)",
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: '#1c1c1c',
                    padding: '10px',
                  }}
                >
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    style={{
                      width: '100%',
                      height: '250px',
                      borderRadius: '16px',
                      objectFit: 'contain',
                      transition: "transform 0.3s ease",
                      transform: hoveredCard === card.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                </div>
              </Link>

              <h6 className="fw-bolder text-center text-primary mt-3">{card.name}</h6>
              <h6 className="fw-bold text-center text-danger">Expansion: {card.expansion}</h6>
              <p className="fw-bold text-center text-white">Rarity: {card.rarity}</p>
              <p className="fw-bold text-center text-info">Price: €{card.price}</p>
              <p className='fw-bold text-center text-warning'>Category: {card.category}</p>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  style={{
                    width: '60px',
                    padding: '8px',
                    textAlign: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '15px',
                    fontSize: '16px',
                    backgroundColor: '#f8f9fa',
                  }}
                  onChange={(e) => handleQuantityChange(e, card)}
                />
                <button
                  className="btn btn-warning rounded-0 p-1 fw-bold"
                  style={{
                    width: '55px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleAddToCart(card)}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff9800")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#fbc02d")}
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white fw-bold mx-1">No cards found with current filters.</p>
        )}
      </div>
    </div>
  );
};

export default CardList;





