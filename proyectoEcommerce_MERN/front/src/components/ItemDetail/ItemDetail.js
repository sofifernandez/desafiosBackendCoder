import "./ItemDetail.scss"
import { NavLink } from "react-router-dom";
import { ItemCount } from "../ItemCount/ItemCount";
import { useCartContext } from '../../contexts/cart/CartContext';

export const ItemDetail = ({ item }) => {
  const { addToCart } = useCartContext()


  const onAddHandle = (counter) => {
    if (counter > 0) {
      addToCart(item, counter)
    }
  };

  return (
    <div className="container-fluid row col-11 col-sm-9 mt-5 align-content-center justify-content-center">
      <div className="col-12 col-lg-7 align-self-center">
        <img className="img-fluid" src={item.imagen} alt="s" />
      </div>
      <div className="col-12 col-lg-5 mb-3 row justify-content-center">
        <div className="single_product_desc row justify-content-center">
          {/* <!-- Product Meta Data --> */}
          <div className="product-meta-data mb-3">
            <div className="line"></div>
            <p className="product-price">${item.precio}</p>

            <h3>{item.nombre}</h3>

            {/* <!-- Ratings & Review --> */}
            <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
              <div className="ratings">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
              </div>
              <div className="review">
                <a href="/#">Escribe una reseña</a>
              </div>
            </div>
            {/* <!-- Avaiable --> */}
            {/* <StockHandler item={item} onHandleStock={onAddHandle}></StockHandler> */}
          </div>
          {/* Descripcion */}
          <div className="short_overview my-5">
            <p>
              {item.description}
            </p>
          </div>

          {/* <!-- Add to Cart Form --> */}
          {<ItemCount inicial={0} stock={item.stock} id={item._id} onAdd={onAddHandle}/>}
        </div>

      </div>
      <button className="btn col-6 col-lg-3 mt-3 btnSeguirComprando"><NavLink className='fs-6' to={'/'}>Volver</NavLink></button>
    </div>
  );
};
