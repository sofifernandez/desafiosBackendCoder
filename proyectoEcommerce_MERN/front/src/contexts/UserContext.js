import { useContext } from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";

/*creo el context*/
const UserContext = createContext();

/*exporto el context como custom hook */
export const useUserContext = () => useContext(UserContext);

/* hago el return del provider */
export const UserProvider = ({ children }) => {
    //STATES
    const [user, setUser] = useState();


    useEffect(() => {
        getUser()
    }, []);


    const getUser = async () => {
        const res = await fetch('http://localhost:8080/api/user/verify', {
            withCredntials: true,
            credentials: 'include',
            method: 'POST'
        }).then(res => res.json())
        if (res.status === 401) {
            setUser(false)
            console.log('no user')
        } else {
            setUser(res.user)
        }
    }

    return (
        <UserContext.Provider value={{ getUser, user }}>
            {children}
        </UserContext.Provider>
    );
}