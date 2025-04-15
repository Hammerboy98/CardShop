import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import CardList from "./components/CardList";
import MyNavbar from "./components/MyNavbar";
import Cart from "./components/Cart";
import MyHome from "./components/MyHome";
import MyFooter from "./components/MyFooter";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import MagicPage from "./components/MagicPage"; 
import PokemonPage from "./components/PokemonPage"; 
import CardDetail from "./components/CardDetail";
import AdminDashboard from "./components/AdminDashboard"; // Importa la Dashboard Admin
import Login from "./components/Login"; // Importa la pagina di login
import PrivateRoute from "./components/PrivateRoute"; // Importa il componente per la protezione delle rotte
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Stato per gestire l'autenticazione
  const [userRole, setUserRole] = useState(""); // Stato per il ruolo dell'utente

  // Funzione per verificare se l'utente è autenticato
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsAuthenticated(true);

      // Decodifica il token per ottenere il ruolo dell'utente
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role); // Imposta il ruolo (admin, user, etc.)
    }
  }, []);

  return (
    <Router>
      <MyNavbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} /> {/* Navbar visibile su tutte le pagine */}
      <div className="bg-dark">
        {/* Le Routes renderizzeranno i componenti in base alla route */}
        <Routes>
          <Route path="/" element={<MyHome />} /> {/* Home */}
          <Route path="/cards" element={<CardList />} /> {/* Lista delle carte */}
          <Route path="/cart" element={<Cart />} /> {/* Pagina del carrello */}
          <Route path="/about" element={<AboutUs />} /> {/* Pagina About Us */}
          <Route path="/contact" element={<ContactUs />} /> {/* Pagina Contact Us */}
          <Route path="/magic" element={<MagicPage />} /> {/* Pagina Magic */}
          <Route path="/pokemon" element={<PokemonPage />} /> {/* Pagina Pokémon */}
          <Route path="/card/:id" element={<CardDetail />} /> {/* Dettaglio carta */}
          <Route path="/register" element={<Register/>} />
          

          {/* Route Admin protetta */}
          <Route 
            path="/admin"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          
          {/* Route Login */}
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} 
          />
        </Routes>
        <MyFooter /> {/* Footer visibile su tutte le pagine */}
      </div>
    </Router>
  );
}

export default App;




