import './Cart.scss'
import { useState, useEffect } from "react";
import { CartItem } from "../CartItem/CartItem";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCartContext } from '../../contexts/cart/CartContext';

export const Cart = () => {
  const { cart, deleteCart, finishPurchase } = useCartContext()
  const [cartTotal, setCartTotal] = useState(cart.reduce((amount, item) => item.total + amount, 0))
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    setCartTotal(cart.reduce((amount, item) => item.total + amount, 0))
  }, [cart]);

  const handleDeleteCart = () => {
    MySwal.fire({
      html: `¿Estás seguro/a que deseas vaciar el carrito de compras?`,
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCart()
      }
    })
  }

  const handleFinishPurchase = () => {
    MySwal.fire({
      html: `¿Estás seguro/a que deseas finalizar tu compra?`,
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        finishPurchase()
      }
    })
  }


  return (
    <main className='row container-fluid justify-content-center my-5 mx-0'>
      {cart.length !== 0 ? (
        <div className='row justify-content-center'>

          {cart.map((item) => (<CartItem key={item._id} item={item}
            onRefresh={() => setCartTotal(cart.reduce((amount, item) => item.total + amount, 0))} />))}
          <hr />

          {/* Total */}
          <div className="row justify-content-center col-12 col-sm-8 col-md-4 text-center my-5">
            <div className='cart-summary pt-3'>
              <p className="text-center mb-4 fs-3">Final</p>
              <ul className="summary-table px-2">
                <li className="mb-4"><span className='fs-5'><b>Subtotal:</b></span> <span className='fs-5'>${cartTotal * 0.78}</span></li>
                <li className="mb-4"><span className='fs-5'><b>IVA:</b></span> <span className='fs-5'>${cartTotal * 0.22}</span></li>
                <hr />
                <li className="mb-4"><span className='fs-5'><b>Total: </b></span>
                  <span className='fs-5'>${cartTotal}</span></li>
              </ul>
            </div>

            <div className="justify-content-between row mb-5">
              <button className='mt-5 col-4 col-sm-4 btnVaciar' onClick={handleDeleteCart}>Vaciar carrito</button>
              {/* <button className='mt-5 col-4 col-sm-4 btnSeguirComprando'><NavLink className='fs-6' to={'/'}>Seguir
                comprando</NavLink></button> */}
              <button className='mt-5 col-4 col-sm-4 btnSeguirComprando' onClick={handleFinishPurchase}>COMPRAR!</button>

            </div>
          </div>
        </div>
      )


        : (<div className='row justify-content-center my-5'>
          <ol className="list-group col-10 col-md-6">
            <li className="list-group-item row justify-content-between align-content-center">
              <div className="ms-2 me-auto">
                <div className="fw-bold fs-5">Aún no has agregado artículos a tu compra</div>
                $0
              </div>
            </li>
            <button className="btn col-6 col-lg-4 mt-3 btnSeguirComprando"><NavLink className='fs-6' to={'/'}>Seguir
              comprando</NavLink></button>
          </ol>
        </div>)}
    </main>
  );
};

