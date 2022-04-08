import "./ItemList.scss"
import { ItemCount } from "../ItemCount/ItemCount";
import { NavLink } from "react-router-dom";
import { useCartContext } from '../../contexts/cart/CartContext';

export const ItemList = ({ product }) => {
  const { addToCart } = useCartContext()

  const onAddHandle = (counter) => {
    if (counter > 0) {
      addToCart(product, counter)
    }
  };
 
   
  return (
    <div className="row justify-content-center col-12 col-sm-6 mb-5">
      <NavLink to={`/producto/${product.id}`}><img className="card-img-top img-fluid" src={product.imagen} alt="S" /></NavLink>
      <div className="card-body col-11">
        <p className="card-text nombreProducto">
          <b>{product.nombre}</b>
        </p>
        <p className="card-text precioProducto">
          <b>${product.precio}</b>
        </p>
          {/* <StockHandler item={product} onHandleStock={onAddHandle}></StockHandler> */}
      </div>
      <ItemCount inicial={0} stock={product.stock} ID={product.id} onAdd={onAddHandle} />
    </div>
  );
};
