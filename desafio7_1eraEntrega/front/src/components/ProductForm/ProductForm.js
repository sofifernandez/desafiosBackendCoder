import './ProductForm.scss'
import { useState } from "react";
import axios from 'axios'



export const ProductForm = () => {

    const URI = 'http://localhost:8080/api/productos'
    const [productData, setProductData] = useState({
        nombre: '',
        tipo: '',
        precio: '',
        imagen: '',
        stock: '',
        quantity: 0,
        total: null

    })
    const [prodId, setProdId] = useState('');

    //Manejar el estado
    const handleFormChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        })
    };

    // submitir nuevo producto
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(URI, productData)
        // console.log(productData)
    }

    const onHandleUpdate = async (e) => {
        e.preventDefault()
        await axios.put(URI + `/${prodId}`, productData)
        console.log(e)
    }

    const onHandleDelete = async (e) => {
        e.preventDefault()
        await axios.delete(URI + `/${prodId}`)
        console.log(e)
    }

    const inputs = [
        { name: "nombre", placeholder: "Nombre" },
        { name: "tipo", placeholder: "Categoría" },
        { name: "precio", placeholder: "Precio" },
        { name: "imagen", placeholder: "URL imagen" },
        { name: "stock", placeholder: "Stock" },

    ];

    return (
        <div className="row container-fluid justify-content-center my-5 mx-0">
            <div className='cart-summary pt-3 col-8'>
                <form className="row justify-content-center" name='formMensaje' id='formMensaje'>
                    <div className="col-11 mb-2 row justify-content-center">
                        {inputs.map((input) => (
                            <div key={input.name} className="form-group row">
                                <input
                                    className="mb-1"
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    type="text"
                                    onChange={handleFormChange}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="cart-btn mt-100 row justify-content-center">
                        <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleSubmit}>Submitir</button>
                    </div>
                    <div className="form-group row justify-content-center">
                        <input className="mb-1 col-7" name='id' type="text" placeholder='ID' onChange={(e) => setProdId(e.target.value)} />
                    </div>
                    <div className="cart-btn mt-100 row justify-content-center">
                        <button type='submit' className='mt-1 col-5 btnCheckout mb-1 fs-4' onClick={onHandleUpdate}>Actualizar</button>
                    </div>
                    <div className="cart-btn mt-100 row justify-content-center">
                        <button type='submit' className='mt-1 col-5 btnCheckout mb-1 fs-4' onClick={onHandleDelete}>Eliminar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}