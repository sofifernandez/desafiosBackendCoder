import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar/NavBar.js'
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer"
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer"
import { CartProvider } from './contexts/cart/CartContext';
import { UserProvider } from './contexts/UserContext';
import { Cart } from './components/Cart/Cart'
import { LogIn } from "./components/LogIn/LogIn"

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<ItemListContainer />} />
            <Route exact path="/:categoria" element={<ItemListContainer />} />
            <Route exact path="/producto/:productoID" element={<ItemDetailContainer />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/login" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;