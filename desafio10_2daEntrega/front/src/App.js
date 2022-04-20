import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar/NavBar.js'
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer"
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer"
import { CartProvider } from './contexts/cart/CartContext';
import { Cart } from './components/Cart/Cart'
import {ProductForm} from "./components/ProductForm/ProductForm"


function App() {
  return (
     <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ItemListContainer />} />
           <Route exact path="/producto/:productoID" element={<ItemDetailContainer />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/form" element={<ProductForm />} /> 
        </Routes> 
      </BrowserRouter>
     </CartProvider>
  );
}

export default App;