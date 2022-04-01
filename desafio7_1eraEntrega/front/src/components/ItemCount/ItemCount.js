import "./ItemCount.scss"
import React, { useEffect, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';



export const ItemCount = ({ inicial, stock, ID, onAdd, onCart=false }) => {
  const [counter, setCounter] = useState(inicial);
  const [color, setColor] = useState(false)


  const MySwal = withReactContent(Swal);  
  const increase = (e) => {
    e.preventDefault();
    if (counter < stock) {
      setCounter(counter + 1)
    } else {
      MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Solo hay ${stock} disponibles`,
        })
    }
  }
  
  const decrease = (e) => {
    e.preventDefault();
    if (counter > 0 && !onCart) {
      setCounter(counter - 1)
    } else if (counter > 1 && onCart) {
      setCounter(counter - 1)
    }
  }

  
  const handleClick = (e) => {
    e.preventDefault();
    onAdd(counter)
    if (counter > 0) {
      setColor(true)
    }
  };

  // Esto es para la pagina del Cart, para que se actualice automaticamente los totales
  useEffect(() => {
    if (onCart) {
        onAdd(counter) }
  }, [counter, onAdd, onCart])



  return (
    <div className="col-10 col-sm-9 col-lg-8 row justify-content-center align-content-center justify-self-center mx-0">
      <button className='mx-1 my-0 fs-4 col-3 text-center' id='accionAgregar' onClick={decrease}>-</button>
      <p className="badge rounded-pill mx-1 col-2 text-center" id="lblCartCount">{counter}</p>
      <button className='mx-1 my-0 fs-4 col-3 text-center' id='accionRestar' onClick={increase} >+</button>
      {!onCart && <button className={ `${color === false ? 'btn-Carrito' : 'btn-CarritoDos'} col-9 col-sm-8 justify-self-center mt-2 ` } id={ID} onClick={handleClick}>
                    Agregar al carrito
          </button>}
    </div>
  )
}

