import { useState, useEffect } from "react";
//import axios from '../../Middleware/axios.middleware.js'
import { ProductForm } from "../ProductForm/ProductForm";



export const Admin = () => {
    const [logInInfo, setLogInInfo] = useState();
    const [signUpInfo, setSignUpInfo] = useState();
    const [user, setUser] = useState()
    const [errLogIn, setErrLogIn] = useState(false)
    const [errSignUp, setErrSignUp]= useState(false)

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        const res = await fetch('http://localhost:8080/api/user/admin', {
            withCredntials: true,
            credentials: 'include',
            method: 'POST'
        }).then(res => res.json())
        if (res.status === 401) {
            console.log('no user')
        } else {
        setUser(res.user)
        }
    }

    //SET THE FORMS***************************************************8
    const handleFormLogIn = (e) => {
        setLogInInfo({
            ...logInInfo,
            [e.target.name]: e.target.value
        })
    };
    const handleFormSignUp = (e) => {
        setSignUpInfo({
            ...signUpInfo,
            [e.target.name]: e.target.value
        })
    };
    //------------------------------------------------------------

    //SUBMIT FORMS-*****************************************************
    const onHandleLogIn = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:8080/api/user/login', {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ logInInfo })
        })
        
        const resJSON = await res.json()
        if (!resJSON) {
            setErrLogIn(true)
        } else {
            setUser(resJSON.user)
        } 
        getUser()
    };

    const onHandleRegister = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:8080/api/user/signUp', {
            withCredntials: true,
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ signUpInfo })
        })
        const resJSON = await res.json()
       if (!resJSON) {
            setErrSignUp(true)
        } else {
           setUser(resJSON.user)
           setErrSignUp(false)
        } 
        getUser()
    }

    const onHandleLogOut = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:8080/api/user/logout', {
            withCredntials: true,
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        setUser(false)

    }

    return (
        <div className="row container-fluid justify-content-center mt-5 mx-0">
            <form className="row col-10 col-md-6 justify-content-center" name='formLogIn' id='formLogIn'>
                <h2>Registrarse</h2>
                <div className="col-12 mb-2 row justify-content-center">
                    <input className="mb-2" type="text" name="firstName" placeholder="Nombre" onChange={handleFormSignUp} />
                    <input className="mb-2" type="text" name="lastName" placeholder="Apellido" onChange={handleFormSignUp} />
                    <input className="mb-2" type="text" name="email" placeholder="email" onChange={handleFormSignUp} />
                    <input className="mb-2" type="text" name="password" placeholder="Contraseña" onChange={handleFormSignUp} />
                    <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleRegister}>Registrarse</button>
                </div>
            </form>
            {errSignUp? <div className="row justify-content-center text-center">Error al registrarse</div>: null}
            <form className="row col-12 col-md-6 justify-content-center" name='formLogIn' id='formLogIn'>
                <h2>Login usuario</h2>
                <div className="col-11 mb-2 row justify-content-center">
                    <input className="mb-2" type="text" name="email" placeholder="email usuario" onChange={handleFormLogIn} />
                    <input className="mb-2" type="text" name="password" placeholder="Contraseña" onChange={handleFormLogIn} />
                    <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleLogIn}>Log in</button>
                    <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleLogOut}>Log out</button>
                </div>
            </form>
            {errLogIn? <div className="row justify-content-center text-center">Usuario o contraseña incorrecto!</div>: null}
            
            {user ?
                <div className="row justify-content-center">
                    <h2 className="text-center">Hola! {user.name}</h2>
                    <ProductForm />
                </div>
                : null}

        </div>
    )
}