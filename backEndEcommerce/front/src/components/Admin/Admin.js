import { useState } from "react";
import axios from 'axios'
import { ProductForm } from "../ProductForm/ProductForm";



export const Admin = () => {
    const [logIn, setLogIn] = useState();
    const [response, setResponse] = useState()

    const URI = 'http://localhost:8080/api/admin'


    //axios.defaults.withCredentials = true;

    const handleFormChange = (e) => {
        setLogIn({
            ...logIn,
            [e.target.name]: e.target.value
        })
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(logIn)
        try {
            await axios.post(URI, logIn)
        } catch (err) {
            console.log(err)
        }
    }

    

    // const onHandleSubmit = async (e) => {
    //     e.preventDefault()
    //     console.log(logIn)
    //     try {
    //         await login(logIn)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // function login(credentials) {
    //     return fetch('http://localhost:8080/api/admin/login', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(credentials)
    //     })
    // }


        return (
            <div className="row container-fluid justify-content-center mt-5 mx-0">
                <form className="row col-6 justify-content-center" name='formLogIn' id='formLogIn'>
                    <h2>Login usuario</h2>
                    <div className="col-11 mb-2 row justify-content-center">
                        <input className="mb-2" type="text" name="userName" placeholder="Nombre de usuario" onChange={handleFormChange} />
                        <input className="mb-2" type="text" name="password" placeholder="Contraseña" onChange={handleFormChange} />
                        <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleSubmit}>Log in</button>
                    </div>
                </form>
                {response ? <div>
                    <ProductForm />
                </div> : null}
            </div>
        )
    }