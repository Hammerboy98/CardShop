import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState({ id: '', name: '', imageUrl: '', expansion: '', rarity: '', price: '',category:'' });
  const [newCard, setNewCard] = useState({ name: '', imageUrl: '', expansion: '', rarity: '', price: '',category:'' });
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();

  // Funzione per caricare le carte
  const fetchCards = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }

    try {
      const response = await fetch('https://localhost:7140/api/cards', {
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
      const response = await fetch(`https://localhost:7140/api/cards/${id}`, {
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
      const response = await fetch('https://localhost:7140/api/cards', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        const addedCard = await response.json();
        setCards([addedCard, ...cards]);

        setNewCard({ name: '', imageUrl: '', expansion: '', rarity: '', price: '',category:'' });
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
    e.preventDefault(); // Previene il comportamento di default del form (refresh della pagina)

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7140/api/cards/${currentCard.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentCard),
      });

      if (response.ok) {
        let updatedCard = currentCard; // fallback
      
        if (response.status !== 204) {
          updatedCard = await response.json();
        }
      
        setCards(cards.map(card => (card.id === currentCard.id ? updatedCard : card)));
        setIsEditing(false);
        setCurrentCard({ id: '', name: '', imageUrl: '', expansion: '', rarity: '', price: '',category:'' });
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
    
    if (!token) {
      navigate('/login');
      return;
    }
  
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
  
      const username = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  
      console.log('Decoded token:', { username, role });
  
      if (role !== 'admin' && username !== 'Ettore') {
        navigate('/login');
        return;
      }
  
      fetchCards();
    } catch (err) {
      console.error('Token decoding failed:', err);
      navigate('/login');
    }
  }, [navigate]);
  
  // Gestione dell'effetto hover
  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div style={styles.container}>
      <h1 className='text-center'>Admin Dashboard</h1>
      <h2 className='text-center'>Manage Cards</h2>

      {/* Form di aggiunta carta */}
      <h3 className='text-center'>Add New Card</h3>
      <form onSubmit={handleAddCard} style={styles.form}>
        <input
          type="text"
          name="name"
          value={newCard.name}
          onChange={handleInputChange}
          placeholder="Card Name"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="imageUrl"
          value={newCard.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="expansion"
          value={newCard.expansion}
          onChange={handleInputChange}
          placeholder="Expansion"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="rarity"
          value={newCard.rarity}
          onChange={handleInputChange}
          placeholder="Rarity"
          required
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          value={newCard.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="category"
          value={newCard.category}
          onChange={handleInputChange}
          placeholder="Category"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Card</button>
      </form>

      {/* Gestione del caricamento */}
      {loading && <p style={styles.text}>Loading cards...</p>}

      {/* Gestione degli errori */}
      {error && <p style={styles.text}>{error}</p>}

      {/* Elenco delle carte */}
      <h3>Existing Cards</h3>
      <div style={styles.cardContainer}>
        {cards.length === 0 ? (
          <p style={styles.text}>No cards available.</p>
        ) : (
          cards.map(card => (
            <div
              key={card.id}
              style={styles.card}
            >
              <Link to={`/card/${card.id}`} style={styles.link}>
                <div
                  onMouseEnter={() => handleMouseEnter(card.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    ...styles.cardImageContainer,
                    transform: hoveredCard === card.id ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    style={styles.cardImage}
                  />
                </div>
              </Link>
              <h6 style={styles.cardTitle}>{card.name}</h6>
              <h6 style={styles.cardExpansion}>Expansion: {card.expansion}</h6>
              <p style={styles.cardText}>Rarity: {card.rarity}</p>
              <p style={styles.cardText}>Price: €{card.price}</p>
              <p className='fw-bold text-center text-white'>Category: {card.category}</p>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setCurrentCard(card);
                }}
                style={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>

              {/* Form di modifica carta */}
              {isEditing && currentCard.id === card.id && (
                <div style={styles.formContainer}>
                  <h4>Edit Card</h4>
                  <form onSubmit={handleEditCard} style={styles.form}>
                    <input
                      type="text"
                      name="name"
                      value={currentCard.name}
                      onChange={handleInputChange}
                      placeholder="Card Name"
                      required
                      style={styles.input}
                    />
                    <input
                      type="text"
                      name="imageUrl"
                      value={currentCard.imageUrl}
                      onChange={handleInputChange}
                      placeholder="Image URL"
                      required
                      style={styles.input}
                    />
                    <input
                      type="text"
                      name="expansion"
                      value={currentCard.expansion}
                      onChange={handleInputChange}
                      placeholder="Expansion"
                      required
                      style={styles.input}
                    />
                    <input
                      type="text"
                      name="rarity"
                      value={currentCard.rarity}
                      onChange={handleInputChange}
                      placeholder="Rarity"
                      required
                      style={styles.input}
                    />
                    <input
                      type="number"
                      name="price"
                      value={currentCard.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                      required
                      style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Update Card</button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      style={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#121212',
    color: '#fff',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '16px',
    width: '100%',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cancelButton: {
    padding: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    flex: '1 1 250px',
    maxWidth: '300px',
    backgroundColor: '#1e1e1e',
    borderRadius: '16px',
    textAlign: 'center',
    padding: '16px',
    boxSizing: 'border-box',
  },
  link: {
    textDecoration: 'none',
    display: 'block',
    marginBottom: '10px',
  },
  cardImageContainer: {
    transition: 'transform 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: 'auto',
    aspectRatio: '2/3',
    borderRadius: '16px',
    objectFit: 'cover',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#00bfff',
    fontSize: '18px',
    margin: '8px 0 4px',
  },
  cardExpansion: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '16px',
  },
  cardText: {
    fontWeight: 'bold',
    color: '#aaa',
    fontSize: '14px',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: '14px',
    marginTop: '10px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
  },
  formContainer: {
    marginTop: '20px',
    backgroundColor: '#2c2c2c',
    padding: '20px',
    borderRadius: '16px',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
};


export default AdminDashboard;






