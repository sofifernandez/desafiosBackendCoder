import { useState } from "react";
import axios from 'axios'
//import axios from '../../Middleware/axios.middleware.js'
import { ProductForm } from "../ProductForm/ProductForm";



export const Admin = () => {
    const [logIn, setLogIn] = useState();
    const [authorized, setAuthorized] = useState(false)

    const URI = 'http://localhost:8080/api/admin'

    //axios.defaults.withCredentials = true;
    const handleFormChange = (e) => {
        setLogIn({
            ...logIn,
            [e.target.name]: e.target.value
        })
    };

    const onHandleLogIn = async (e) => {
        e.preventDefault()
        console.log(logIn)
        try {
            await axios.post(URI, logIn).then((response) => setAuthorized(response.data))
        } catch (err) {
            console.log(err)
        }
    }

    const onHandleLogOut = async (e) => {
        e.preventDefault()
        try {
            await axios.get(URI+'/logout', logIn).then((response) => setAuthorized(response.data))
        } catch (err) {
            console.log(err)
        }
    }

    console.log(authorized)
    
    return (
        <div className="row container-fluid justify-content-center mt-5 mx-0">
            <form className="row col-6 justify-content-center" name='formLogIn' id='formLogIn'>
                <h2>Login usuario</h2>
                <div className="col-11 mb-2 row justify-content-center">
                    <input className="mb-2" type="text" name="userName" placeholder="Nombre de usuario" onChange={handleFormChange} />
                    <input className="mb-2" type="text" name="password" placeholder="Contraseña" onChange={handleFormChange} />
                    <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleLogIn}>Log in</button>
                    <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleLogOut}>Log out</button>
                </div>
            </form>

            {authorized ? <ProductForm /> : null}

        </div>
    )
}