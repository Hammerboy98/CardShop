import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // Importiamo useDispatch per dispatchare azioni
import { addToCart } from '../redux/cartSlice'; // Importiamo l'azione addToCart
import { getAllCards } from '../api/cards'; // Supponiamo che tu abbia già un'API per ottenere le carte

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [error, setError] = useState(null); // Stato di errore
  const dispatch = useDispatch(); // Otteniamo la funzione dispatch

  useEffect(() => {
    getAllCards()
      .then((data) => {
        setCards(data);
        setLoading(false); // Impostiamo lo stato di caricamento a false quando i dati sono stati ricevuti
      })
      .catch((err) => {
        setError('Error fetching cards'); // Impostiamo il messaggio di errore se c'è un problema
        setLoading(false); // Impostiamo lo stato di caricamento a false anche in caso di errore
        console.error(err);
      });
  }, []);

  const handleAddToCart = (card) => {
    dispatch(addToCart(card)); // Dispatchiamo l'azione per aggiungere al carrello
  };

  if (loading) {
    return <p>Loading...</p>; // Mostriamo un messaggio di caricamento
  }

  if (error) {
    return <p>{error}</p>; // Mostriamo un messaggio di errore
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="mx-4 text-white">Our Products</h2>
      <div className="col-12 mx-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {cards.map((card) => (
          <div key={card.id} style={{ padding: '10px', width: '200px' }}>
            <img src={card.imageUrl} alt={card.name} style={{ width: '100%' }} />
            <h3 className="fw-bold text-center text-primary">{card.name}</h3>
            <p className="fw-bold text-center text-white">Expansion: {card.expansion}</p>
            <p className="fw-bold text-center text-white">Rarity: {card.rarity}</p>
            <p className="fw-bold text-center text-white">Price: €{card.price}</p>
            <button
              className="btn btn-warning rounded-0 mx-4 p-1 fw-bold w-75"
              onClick={() => handleAddToCart(card)} // Quando clicchi il pulsante, aggiungi al carrello
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;