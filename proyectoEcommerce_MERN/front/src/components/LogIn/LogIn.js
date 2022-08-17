import './LogIn.scss'
import { useState, useEffect } from "react";
import { Chat } from '../Chat/Chat'
import { ProductForm } from "../ProductForm/ProductForm";



export const LogIn = () => {
    const [logInInfo, setLogInInfo] = useState();
    const [signUpInfo, setSignUpInfo] = useState();
    const [user, setUser] = useState()
    const [errLogIn, setErrLogIn] = useState(false)
    const [errSignUp, setErrSignUp] = useState(false)
    const [internationalPrefix, setInternationaPrefix] = useState();

   

    useEffect(() => {
        getUser()
        phones()
    }, []);

    const getUser = async () => {
        const res = await fetch('http://localhost:8080/api/user/verify', {
            withCredntials: true,
            credentials: 'include',
            method: 'POST'
        }).then(res => res.json())
        if (res.status === 401) {
            setUser()
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
        console.log(resJSON)
        if (!resJSON) {
            setErrLogIn(true)
        } else {
            setUser(resJSON.user)
            await getUser()
            window.location.reload()
        }
        
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
            await getUser()
            window.location.reload()
        }
        
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
        window.location.reload()

    }

    const phones = async () => {
        const data = await (await fetch('https://gist.githubusercontent.com/kcak11/4a2f22fb8422342b3b3daa7a1965f4e4/raw/2cc0fcb49258c667f1bc387cfebdfd3a00c4a3d5/countries.json')).json();
        setInternationaPrefix(data)
    }


    //------------------------------------------------------------

    return (
        <div className="row container-fluid justify-content-center mt-5 mx-0">
            <div className="row col-12 col-md-11 col-lg-7 justify-content-center mb-5">
                <form className="row col-12 col-md-7 justify-content-center" name='formLogIn' id='formLogIn'>
                    <h2>Login usuario</h2>
                    <div className="col-11 mb-2 row justify-content-center">
                        <input className="mb-2" type="text" name="email" placeholder="email usuario" onChange={handleFormLogIn} />
                        <input className="mb-2" type="text" name="password" placeholder="Contraseña" onChange={handleFormLogIn} />
                        <button type='submit' className='mt-1 col-5 btnCheckout mx-2 mb-3 fs-4' id='btnLogIn' onClick={onHandleLogIn}>Log in</button>
                        <button type='submit' className='mt-1 col-5 btnCheckout mx-2 mb-3 fs-4' id='btnLogOut' onClick={onHandleLogOut}>Log out</button>
                    </div>
                </form>
                {errLogIn ? <div className="row justify-content-center text-center">Usuario o contraseña incorrecto!</div> : null}
            </div>

            <div className="row col-12 col-md-11 col-lg-7 justify-content-center">
                <form className="row col-10 col-md-7 justify-content-center" name='formLogIn' id='formLogIn'>
                    <h2>Registrarse</h2>
                    <div className="col-12 mb-2 row justify-content-center">
                        <input className="mb-2" type="text" name="firstName" placeholder="Nombre" onChange={handleFormSignUp} />
                        <input className="mb-2" type="text" name="lastName" placeholder="Apellido" onChange={handleFormSignUp} />
                        <input className="mb-2" type="text" name="direction" placeholder="Dirección" onChange={handleFormSignUp} />
                        <input className="mb-2" type="number" name="age" placeholder="Edad" onChange={handleFormSignUp} />
                        <select name="prefix" className="form-select mb-2" aria-label="Default select example" onChange={handleFormSignUp}>
                            <option defaultValue>Selecciona un país</option>
                            {internationalPrefix ? internationalPrefix.map(
                                (country) => (<option id={country.isoCode} key={country.isoCode} value={country.dialCode}>{country.name} ({country.dialCode})</option>)) : null}
                        </select>
                        <input className="mb-2" type="number" name="phone" placeholder="Teléfono" onChange={handleFormSignUp} />
                        <input className="mb-2" type="text" name="email" placeholder="e-mail" onChange={handleFormSignUp} />
                        <input className="mb-2" type="text" name="password" placeholder="Contraseña" onChange={handleFormSignUp} />
                        <button type='submit' className='mt-1 col-5 btnCheckout mb-3 fs-4' onClick={onHandleRegister}>Registrarse</button>
                    </div>
                </form>
                {errSignUp ? <div className="row justify-content-center text-center">Error al registrarse</div> : null}
            </div>

            {user ? 
            
            user.role==='admin' ?
                <div className="container mx-auto my-auto row justify-content-center">
                        <ProductForm />
                        <Chat />
                </div>
                : 
                <div className="container mx-auto my-auto row justify-content-center">
                    <h2 className="text-center">Hola! {user.name}</h2>
                    <Chat />
                    </div>   
                
            : null}
            
        </div>
    )
}