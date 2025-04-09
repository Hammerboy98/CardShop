import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCards } from "../api/cards";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom"; // Per la navigazione tra le pagine

const MyHome = () => {
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        const displayedCards = data.slice(20, 29); // Mostra solo le prime 9 carte
        setCards(displayedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleQuantityChange = (e, card) => {
    const updatedQuantities = { ...quantities, [card.id]: e.target.value };
    setQuantities(updatedQuantities);
  };

  const handleAddToCart = (card) => {
    const quantity = quantities[card.id] || 1;
    const cardWithQuantity = { ...card, quantity };
    dispatch(addToCart(cardWithQuantity));
  };

  return (
    <div>
      {/* Hero section */}
      <div className="text-white text-center p-5 bg-dark">
        <h1 className="fw-bold">Welcome To CardShop</h1>
        <p
          style={{ maxWidth: "450px", margin: "0 auto" }}
          className="fw-bolder"
        >
          Your ultimate destination for collectible trading cards! Whether
          you're a seasoned collector or just getting started, you'll find a
          wide variety of cards from all your favorite expansions. Browse,
          discover, and build your dream collection—right here.
        </p>
        <a href="/cards" className="btn btn-primary mt-3 rounded-0 fw-bold">
          Browse Our Complete Card Collection
        </a>
      </div>

      {/* Filtro per gioco */}
      <div className="container mt-5 text-center">
        <h2 className="text-white mb-4 fw-bold">Filter By Expansion</h2>
        <div className="d-flex justify-content-center gap-3">
          <div
            className="card bg-dark text-white border-0 mx-5"
            style={{ cursor: "pointer", width: "200px" }}
          >
            <Link
              to="/pokemon" // Link alla pagina delle carte Pokémon
              className="text-decoration-none text-white"
            >
              <img
                src="https://clazo-pokemon.netlify.app/static/media/portadapokemon.5b8a5f11.png" // Immagine Pokémon
                alt="Pokémon"
                className="card-img-top"
                style={{ height: "175px", width: "100%" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Pokémon</h5>
              </div>
            </Link>
          </div>

          <div
            className="card bg-dark text-white border-0 mx-5"
            style={{ cursor: "pointer", width: "200px" }}
          >
            <Link
              to="/magic" // Link alla pagina delle carte Magic
              className="text-decoration-none text-white"
            >
              <img
                src="https://www.nextplayer.it/wp-content/uploads/2025/02/magicthegathering.jpeg" // Immagine Magic
                alt="Magic"
                className="card-img-top"
                style={{ height: "150px", width: "100%" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Magic: The Gathering</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Cards section */}
      <div className="container mt-5 bg-dark">
        <h2 className="text-center mb-4 fw-bold text-white">Featured Cards</h2>
        <div className="row justify-content-center">
          {cards.map((card) => (
            <div className="col-md-4 mb-4" key={card.id}>
              <div style={{ width: "300px" }} className="card border-0 mx-5">
                <img
                  src={card.imageUrl}
                  className="card-img-top"
                  alt={card.name}
                  style={{ width: "100%", height: "400px" }}
                />
                <div className="card-body text-center bg-dark">
                  <h5 className="card-title text-info fw-bold">{card.name}</h5>
                  <p className="card-text text-white fw-bold">
                    {card.expansion} - €{card.price}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="number"
                      min="1"
                      value={quantities[card.id] || 1} // Usa il valore della quantità o 1 come default
                      style={{
                        width: "50px",
                        padding: "5px",
                        textAlign: "center",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                      }}
                      onChange={(e) => handleQuantityChange(e, card)} // Funzione per aggiornare la quantità
                    />
                    <button
                      className="btn btn-warning rounded-0 p-1 fw-bold"
                      style={{ width: "50px", padding: "10px" }}
                      onClick={() => handleAddToCart(card)} // Usa la funzione già definita
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyHome;



