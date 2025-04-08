import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardList from "./components/CardList";
import MyNavbar from "./components/MyNavbar";
import Cart from "./components/Cart";
import MyHome from "./components/MyHome";
import MyFooter from "./components/MyFooter";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <Router>
      <MyNavbar /> {/* Navbar visibile su tutte le pagine */}
      <div className="bg-dark">
        {/* Le Routes renderizzeranno i componenti in base alla route */}
        <Routes>
          <Route path="/" element={<MyHome />} /> {/* Home */}
          <Route path="/cards" element={<CardList />} />{" "}
          {/* Lista delle carte */}
          <Route path="/cart" element={<Cart />} /> {/* Pagina del carrello */}
          <Route path="/about" element={<AboutUs />} />{" "}
          {/* Percorso per About Us */}
          <Route path="/contact" element={<ContactUs />} />{" "}
          {/* Percorso per Contact Us */}
        </Routes>
        <MyFooter/>
      </div>
    </Router>
  );
}

export default App;
