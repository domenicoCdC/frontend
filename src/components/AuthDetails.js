import React,{useEffect,useState} from "react";
import {onAuthStateChanged, signOut} from 'firebase/auth'
import auth from "../firebase";

export default function AuthDetails() {
    const [authUser,setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth,(user) => {
            if (user){
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })
        return () => {
            listen();
        }
    },[])

    const userSignOut = () => {
        signOut(auth)
            .then(() => {console.log(`Logout eseguito correttamente`)})
            .catch((err) => {console.log(err)})
    }
    return(
        <div>
            {authUser ? <> <p>{`Sei loggato con ${authUser.email}`}</p><button onClick={userSignOut}>Logout</button></> : <p>Signed Out</p>}
        </div>
    )
}