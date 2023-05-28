/* module to use Firebase authentication */

import { auth, provider } from "../configs/firebaseConfig";
import { signInWithPopup } from "firebase/auth";


export const login = async (): Promise<{email: any}>=> {
    logout();
    const result = await signInWithPopup(auth, provider);
    if (result.user.email) {
        localStorage.setItem("userEmail", result.user.email)
        return {email: result.user.email}
    } else {
        return {email: null}
    }
}

export const logout = () => {
    localStorage.clear();
}

interface userStatus {
    loggedIn: boolean;
    email: string | null;
}

export const checkLogin = async (): Promise<userStatus> => {
    const status: userStatus = {
        loggedIn: false,
        email: null
    }

    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
        status.loggedIn = true;
        status.email = userEmail;
    }

    return status;
}
