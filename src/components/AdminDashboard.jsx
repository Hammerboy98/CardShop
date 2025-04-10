import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState({ id: '', name: '', description: '' });
  const [newCard, setNewCard] = useState({ name: '', description: '' });

  const navigate = useNavigate();

  // Funzione per caricare le carte
  const fetchCards = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }

    try {
      const response = await fetch('http://localhost:7140/api/cards', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCards(data);
        setLoading(false);
      } else {
        setError('Error fetching cards');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error during fetch:', err);
      setError('An error occurred while fetching cards');
      setLoading(false);
    }
  };

  // Funzione per eliminare una carta
  const handleDelete = async (id) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }

    try {
      const response = await fetch(`http://localhost:7140/api/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCards(cards.filter(card => card.id !== id));
        alert('Card deleted successfully');
      } else {
        alert('Failed to delete the card');
      }
    } catch (err) {
      console.error('Error during delete:', err);
      alert('An error occurred while deleting the card');
    }
  };

  // Funzione per aggiungere una nuova carta
  const handleAddCard = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }

    try {
      const response = await fetch('http://localhost:7140/api/cards', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        const addedCard = await response.json();
        setCards([...cards, addedCard]);
        setNewCard({ name: '', description: '' });
        alert('Card added successfully');
      } else {
        alert('Failed to add the card');
      }
    } catch (err) {
      console.error('Error during add:', err);
      alert('An error occurred while adding the card');
    }
  };

  // Funzione per modificare una carta esistente
  const handleEditCard = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }

    try {
      const response = await fetch(`http://localhost:7140/api/cards/${currentCard.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentCard),
      });

      if (response.ok) {
        const updatedCard = await response.json();
        setCards(cards.map(card => (card.id === currentCard.id ? updatedCard : card)));
        setIsEditing(false);
        setCurrentCard({ id: '', name: '', description: '' });
        alert('Card updated successfully');
      } else {
        alert('Failed to update the card');
      }
    } catch (err) {
      console.error('Error during update:', err);
      alert('An error occurred while updating the card');
    }
  };

  // Funzione per modificare il valore nei moduli
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setCurrentCard({ ...currentCard, [name]: value });
    } else {
      setNewCard({ ...newCard, [name]: value });
    }
  };

  // Carica le carte al montaggio del componente e verifica autenticazione
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;

    if (!token || role !== 'admin') {
      navigate('/login'); // Reindirizza se non autenticato o se non è admin
    } else {
      fetchCards(); // Solo carica le carte se l'utente è un admin
    }
  }, [navigate]); // Aggiungi navigate nella dipendenza

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Cards</h2>

      {/* Form di aggiunta carta */}
      <h3>Add New Card</h3>
      <form onSubmit={handleAddCard}>
        <input
          type="text"
          name="name"
          value={newCard.name}
          onChange={handleInputChange}
          placeholder="Card Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newCard.description}
          onChange={handleInputChange}
          placeholder="Card Description"
          required
        />
        <button type="submit">Add Card</button>
      </form>

      {/* Gestione del caricamento */}
      {loading && <p>Loading cards...</p>}

      {/* Gestione degli errori */}
      {error && <p>{error}</p>}

      {/* Elenco delle carte */}
      <h3>Existing Cards</h3>
      <ul>
        {cards.length === 0 ? (
          <p>No cards available.</p>
        ) : (
          cards.map(card => (
            <li key={card.id}>
              <div>
                <p>{card.name}</p>
                <p>{card.description}</p>

                {/* Modifica carta */}
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentCard({ ...card });
                  }}
                >
                  Edit
                </button>

                {/* Elimina carta */}
                <button onClick={() => handleDelete(card.id)}>Delete</button>
              </div>

              {/* Modulo di modifica carta */}
              {isEditing && currentCard.id === card.id && (
                <div>
                  <h4>Edit Card</h4>
                  <form onSubmit={handleEditCard}>
                    <input
                      type="text"
                      name="name"
                      value={currentCard.name}
                      onChange={handleInputChange}
                      placeholder="Card Name"
                      required
                    />
                    <input
                      type="text"
                      name="description"
                      value={currentCard.description}
                      onChange={handleInputChange}
                      placeholder="Card Description"
                      required
                    />
                    <button type="submit">Update Card</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                  </form>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;

