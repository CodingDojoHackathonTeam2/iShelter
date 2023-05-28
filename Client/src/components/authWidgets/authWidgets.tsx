import React, { useEffect, useState } from "react"
import { login, logout, checkLogin } from "../../utils/authentication"

export const AuthButton = ({clickHandler, children}) => {

    return (
        <button
            className="btn btn-accent bg-yellow-300 hover:bg-yellow-500 text-black font-bold"
            onClick={clickHandler}
            >
            {children ? children : "button text"}
        </button>
    )
}

const LoginButton = (props) => {

    const loginAction = () => {
        login()
            .then(()=>{
                checkLogin()
                    .then(status=>{
                        const state = {
                            status: status.loggedIn,
                            photoURL: ""
                        }
                        if (status.photoURL) {
                            state.photoURL = status.photoURL;
                        } 
                        props.setState(state)})
            })
    }

    return(
        <AuthButton clickHandler={loginAction}>
            Sign in with Google
        </AuthButton>
    )
}

const LogoutButton = (props) => {

    const logoutAction = () => {
        logout();
        props.setState({status: false, photoURL: ""});
    }

    return (
        <AuthButton clickHandler={logoutAction}>
            Logout
        </AuthButton>
    )
}

const LoggedInAs = () => {
    const photoURL = localStorage.getItem("userPhotoURL")
    const userName = localStorage.getItem("userName") ? localStorage.getItem("userName") : ""

    return (
        <div className="flex">
            
            <div className="px-3">
                <p>Logged In As</p>
                <p>{userName}</p>
            </div>
            {photoURL ? <img src={photoURL} alt="photo" className="rounded-full profile-pic"/> : <></>}
            
        </div>
    )

}

export const AuthWidget = (props) => {
    const [loggedIn, setLoggedIn] = useState({status: false, photoURL: ""});

    useEffect(()=>{
        checkLogin()
            .then(status=>{
                const state = {
                    status: status.loggedIn,
                    photoURL: ""
                }
                if (status.photoURL) {
                    state.photoURL = status.photoURL;
                } 
                setLoggedIn(state)

            })
    }, [])

    return (
        <>
            {loggedIn.status ? 
                <><LogoutButton setState={setLoggedIn} /><LoggedInAs/></> : 
                <LoginButton setState={setLoggedIn} />
                }
        </>
    )

}