import "./CartWidget.scss"
//import CartContext from "../../contexts/cart/CartContext";
import {  useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useCartContext } from '../../contexts/cart/CartContext';

export const CartWidget = () => {
  //const { cart, isCart } = useContext(CartContext);
  const { cart } = useCartContext()
    const [totalItems, setTotalItems]=useState(0)
    
    const total = cart.reduce(function (a, b) { return a + b.quantity; }, 0);
    
  
      useEffect(() => {
        setTotalItems(cart.reduce(function (a, b) { return a + b.quantity; }, 0))
      }, [cart, total])

    return (
        <NavLink className='px-1 cart__icon row' href="carrito_tabla.html" id='btnCarritoNav' to='/cart'>
            <i className="fas fa-shopping-cart">
                { totalItems > 0 ?
                    (<span className="badge rounded-pill animate__animated animate__zoomIn" id="lblCartCount">{totalItems}</span>) : null}
            </i>
        </NavLink>

    )
}