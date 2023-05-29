/* module to use Firebase authentication */

import { auth, provider } from "../configs/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { Host } from "../models/hostProfile";



export const login = async (): Promise<{uid: any, photoURL: any}>=> {
    logout();
    const result = await signInWithPopup(auth, provider);
    console.log("login result", result)
    localStorage.setItem("userName", "");
    localStorage.setItem("email", "");
    if (result.user.displayName){
        localStorage.setItem("userName", result.user.displayName);
    }
    if (result.user.email){
        localStorage.setItem("email", result.user.email)
    }
    if (result.user.uid) {
        console.log("We're logged in with this ID:", result.user.uid)
        localStorage.setItem("userUID", result.user.uid)
        if (! await Host.getByUserId(result.user.uid)) {
            const hostProfile: Host = new Host({"hostUid": result.user.uid});
            hostProfile.create()
                .then(res=>{console.log("Saved new profile: ", res)})
        }
        if (result.user.photoURL) {
            localStorage.setItem("userPhotoURL", result.user.photoURL)
        }
        return {uid: result.user.uid, photoURL: result.user.photoURL}
    } else {
        return {uid: null, photoURL: null}
    }
}

export const logout = () => {
    localStorage.clear();
}

interface userStatus {
    loggedIn: boolean;
    email: string | null;
    photoURL: string | null;
}

export const checkLogin = async (): Promise<userStatus> => {
    const status: userStatus = {
        loggedIn: false,
        email: null,
        photoURL: null
    }

    const loggedIn = localStorage.getItem("userUID");
    if (loggedIn) {
        status.loggedIn = true;
        status.photoURL = localStorage.getItem("userPhotoURL")
    }

    return status;
}
