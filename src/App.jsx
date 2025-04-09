import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardList from "./components/CardList";
import MyNavbar from "./components/MyNavbar";
import Cart from "./components/Cart";
import MyHome from "./components/MyHome";
import MyFooter from "./components/MyFooter";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import MagicPage from "./components/MagicPage"; // Importa la nuova pagina Magic
import PokemonPage from "./components/PokemonPage"; // Importa la nuova pagina Pokémon

function App() {
  return (
    <Router>
      <MyNavbar /> {/* Navbar visibile su tutte le pagine */}
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
        </Routes>
        <MyFooter /> {/* Footer visibile su tutte le pagine */}
      </div>
    </Router>
  );
}

export default App;

