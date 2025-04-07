import "bootstrap/dist/css/bootstrap.min.css";
import CardList from "./components/CardList";
import MyNavbar from "./components/MyNavbar";
import Cart from "./components/Cart";


function App() {
  return <>
  <MyNavbar/>
  <div style={{backgroundColor:' #1D1F26'}} >
  
  <CardList />
  <Cart/>
  </div>
  
  </>;
}

export default App;
