import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { getAllCards } from '../api/cards';
import { useLocation } from 'react-router-dom'; // Per leggere i query param
import { Link } from 'react-router-dom';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null); // Stato per tracciare l'immagine sotto il mouse
  const dispatch = useDispatch();
  const location = useLocation(); // Accesso ai query param dalla URL

  // Prendi i filtri dalla query string
  const queryParams = new URLSearchParams(location.search);
  const nameFilter = queryParams.get("name")?.toLowerCase() || "";
  const expansionFilter = queryParams.get("expansion")?.toLowerCase() || "";

  // Funzione per aggiornare la quantità
  const handleQuantityChange = (e, card) => {
    const updatedQuantities = { ...quantities, [card.id]: e.target.value };
    setQuantities(updatedQuantities);
  };

  // Funzione per aggiungere il prodotto al carrello
  const handleAddToCart = (card) => {
    const quantity = quantities[card.id] || 1; // Usa la quantità selezionata, default a 1
    dispatch(addToCart({ ...card, quantity }));
  };

  useEffect(() => {
    setLoading(true);
    getAllCards()
      .then((data) => {
        // Filtriamo in base ai parametri della query
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

  // Funzioni per l'hover
  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="mx-4 text-center fw-bold text-white">Our Products</h2>
      <div className="col-12 mx-sm-5 mx-md-4 ps-md-2 mx-lg-4 mx-xl-2 mx-xxl-4 ps-xxl-0" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} style={{ padding: '10px', width: '200px' }}>
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
                    style={{ width: '100%', height: '250px', borderRadius: "16px" }}
                  />
                </div>
              </Link>
              <h6 className="fw-bolder text-center text-primary mt-3">{card.name}</h6>
              <h6 className="fw-bold text-center text-white">Expansion: {card.expansion}</h6>
              <p className="fw-bold text-center text-white">Rarity: {card.rarity}</p>
              <p className="fw-bold text-center text-white">Price: €{card.price}</p>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  style={{
                    width: '50px',
                    padding: '5px',
                    textAlign: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '15px',
                  }}
                  onChange={(e) => handleQuantityChange(e, card)} // Funzione per aggiornare la quantità
                />
                <button
                  className="btn btn-warning rounded-0 p-1 fw-bold"
                  style={{ width: '50px', padding: '10px' }}
                  onClick={() => handleAddToCart(card)} // Usa la funzione già definita
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




