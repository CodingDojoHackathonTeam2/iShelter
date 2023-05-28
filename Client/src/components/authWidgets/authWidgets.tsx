import React, { useEffect, useState } from "react"
import { login, logout, checkLogin } from "../../utils/authentication"

const AuthButton = ({clickHandler, children}) => {

    return (
        <button
            className="btn btn-accent bg-yellow-300 hover:bg-yellow-500 text-black font-bold"
            onClick={clickHandler}
            >
            {children}
        </button>
    )
}

export const LoginButton = (props) => {

    const loginAction = () => {
        login()
            .then(()=>{
                checkLogin()
                    .then((status)=>{
                        props.setState(status.loggedIn);
                    })
            })
    }

    return(
        <AuthButton clickHandler={loginAction}>
            Sign in with Google
        </AuthButton>
    )
}

export const LogoutButton = (props) => {

    const logoutAction = () => {
        logout();
        props.setState(false);
    }

    return (
        <AuthButton clickHandler={logoutAction}>
            Logout
        </AuthButton>
    )
}

export const AuthWidget = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        checkLogin()
            .then(status=>setLoggedIn(status.loggedIn))
    }, [loggedIn])

    return (
        <>
            {loggedIn ? 
                <LogoutButton setState={setLoggedIn} /> : 
                <LoginButton setState={setLoggedIn} />
                }
        </>
    )

}