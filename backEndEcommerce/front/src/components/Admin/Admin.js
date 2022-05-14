import { useState } from "react";
import Axios from "axios";
//import axios from '../../Middleware/axios.middleware.js'
import { ProductForm } from "../ProductForm/ProductForm";



export const Admin = () => {
    const [logInInfo, setLogInInfo] = useState();
    const [authorized, setAuthorized] = useState(false)

    const URI = 'http://localhost:8080/api/admin'

    const handleFormChange = (e) => {
        setLogInInfo({
            ...logInInfo,
            [e.target.name]: e.target.value
        })
    };

    const onHandleLogIn = (e) => {
        e.preventDefault()
        Axios({
            method: "POST",
            data: logInInfo,
            withCredentials: true,
            url: "http://localhost:8080/api/admin/login",
        }).then((res) => console.log(res));
    };

    const onHandleLogOut = async (e) => {
        e.preventDefault()
        try {
            await Axios.get(URI + '/logout', logInInfo).then((response) => setAuthorized(response.data))
        } catch (err) {
            console.log(err)
        }
    }

    // const onHandleRegister = async (e) => {
    //     e.preventDefault()
    //     try {
    //         await         Axios({
    //         method: "POST",
    //         data: logInInfo,
    //         withCredentials: true,
    //         url: "http://localhost:8080/api/admin/signup",
    //     }).then((res) => console.log(res));
    //     } catch (err) {
    //         console.log(err)
    //     }
    // };

    const onHandleRegister = async (e) => {
        e.preventDefault()
        console.log(JSON.stringify({ logInInfo}))
    const res = await fetch('http://localhost:8080/api/admin/signup', {
      withCredntials: true,
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ logInInfo})
    })
    return res
  }
    
    // const getUser = () => {
    //      Axios({
    //         method: "GET",
    //         withCredentials: true,
    //         url: "http://localhost:8080/api/admin/user",
    //     }).then((res) => console.log(res));
            
    // }

    return (
        <div className="row container-fluid justify-content-center mt-5 mx-0">
            <form className="row col-10 col-md-6 justify-content-center" name='formLogIn' id='formLogIn'>
                <h2>Registrarse</h2>
                <div className="col-12 mb-2 row justify-content-center">
                    <input className="mb-2" type="text" name="username" placeholder="Nombre de usuario" onChange={handleFormChange} />
                    <input className="mb-2" type="text" name="password" placeholder="Contraseña" onChange={handleFormChange} />
                    <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleRegister}>Registrarse</button>
                </div>
            </form>
            <form className="row col-12 col-md-6 justify-content-center" name='formLogIn' id='formLogIn'>
                <h2>Login usuario</h2>
                <div className="col-11 mb-2 row justify-content-center">
                    <input className="mb-2" type="text" name="username" placeholder="Nombre de usuario" onChange={handleFormChange} />
                    <input className="mb-2" type="text" name="password" placeholder="Contraseña" onChange={handleFormChange} />
                    <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleLogIn}>Log in</button>
                    <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleLogOut}>Log out</button>
                </div>
            </form>



            {authorized ? <ProductForm /> : null}

        </div>
    )
}