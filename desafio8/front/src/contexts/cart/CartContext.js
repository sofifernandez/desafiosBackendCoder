import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/*creo el context*/
const CartContext = createContext();

/*exporto el context como custom hook */
export const useCartContext = () => useContext(CartContext);

/* hago el return del provider */
export const CartProvider = ({ children }) => {

    //STATES
    const [cartId, setCartId] = useState();
    const [cart, setCart] = useState([]);

    const URI = 'http://localhost:8080/api/carrito'
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        getCarts()
    }, []);

    //  useEffect(() => {
    //     if (cart.length === 0 && !cartId) {
    //         console.log('no hay productos')
    //         axios.delete(URI + `/${cartId}`)
    //     }
    // }, [cartId,cart]); //--> ESTO NO FUNCIONÓ, QUERÍA QUE ELIMINARA COMPLETAMENTE EL CARRITO, CON SU ID Y FECHA CUANDO SE ELIMINARA EL ULTIMO PRODUCTO DEL CART

   
    //CREATE NEW CART 
    const newCart = async () => {
        await axios.post(URI)
                    .then((response) => {
            setCartId(response.data)
        }, (error) => {
            console.log(error);
                    })
    }

    // GET CART BY ID-------------------------------------------------------------------------------
    const getCarts = async () => {
        const res = await axios
            .get(URI) //--> GET ALL CARTS
        const allCarts = res.data
        if (allCarts.length > 0) {
            const idCart = allCarts[0].id //--> selecciono el primero del array, despues será según usuario digo yo...
            const req = await axios //--> GET CART BY ID
                .get(URI + `/${idCart}`)
            const userCart = req.data
            setCart(userCart.products)
            setCartId(userCart.id)
        }
    }

    //DELETE CART BY ID
    const deleteCart = async () => {
        if (cartId !== undefined) {
            await axios.delete(URI + `/${cartId}`)
            setCartId(undefined);
        }
        setCart([]);
    }

    //ADD PRODUCTS TO CART
    const addToCart = async (item, counter, onCartPage = false) => {
        if (cartId === undefined) {
            await newCart()
            await getCarts()
        }
        if (!onCartPage) {
            const existe = cart.some(el => el.id === item.id);
            if (existe) {
                const objIndex = cart.findIndex((obj => obj.id === item.id))
                const newQuantity = cart[objIndex].quantity + counter
                if (newQuantity <= cart[objIndex].stock) {
                    cart[objIndex].quantity += counter
                    cart[objIndex].total = cart[objIndex].precio * cart[objIndex].quantity
                    // SEND TO BACK-----------------------------------------------------
                    await axios.post(URI + `/${cartId}/productos`, cart[objIndex])
                    
                    MySwal.fire({
                        icon: 'success',
                        text: `Agregaste ${item.nombre} de nuevo al carrito`,
                        imageUrl: `${item.imagen}`,
                        imageWidth: 100,
                        imageHeight: 100,
                        timer: 1300,
                        showConfirmButton: false,

                    })
                } else if (newQuantity > cart[objIndex].stock) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Queda/n ${cart[objIndex].stock - cart[objIndex].quantity} disponibles`,
                    })
                }

            } else {
                item = {
                    ...item,
                    quantity: counter,
                    total: item.precio * counter,
                    talles: [],
                }
                // SEND TO BACK--------------------------------
                await axios.post(URI + `/${cartId}/productos`, item)
                setCart([...cart, item])
                

                MySwal.fire({
                    icon: 'success',
                    text: `Agregaste ${item.nombre} al carrito`,
                    imageUrl: `${item.imagen}`,
                    imageWidth: 100,
                    imageHeight: 100,
                    timer: 1300,
                    showConfirmButton: false,

                })
            };

        } else if (onCartPage) {
            const objIndex = cart.findIndex((obj => obj.id === item.id))
            cart[objIndex].quantity = counter
            cart[objIndex].total = cart[objIndex].precio * cart[objIndex].quantity
            // SEND TO BACK-----------------------------------------------------
            await axios.post(URI + `/${cartId}/productos`, cart[objIndex])
        }
    };

    // REMOVE ITEM 
    const removeItem = async (id) => {
        await axios.delete(URI + `/${cartId}/productos/${id}`)
        setCart(cart.filter((item) => item.id !== id))
    };


    //OTROS
    //     const showCart = () => {
    //         if (cart.length > 0)
    //         return true
    //   };

    return (
        <CartContext.Provider value={{ newCart, deleteCart, addToCart, removeItem, getCarts, cartId, cart }}>
            {children}
        </CartContext.Provider>
    );
}