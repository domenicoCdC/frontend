import React, {useState} from "react";
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,updateProfile} from "firebase/auth"
import {auth} from "../firebase";
import { GoogleButton } from 'react-google-button';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignIn() {
    const [error,setError] = useState(false)
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate=useNavigate()

    const baseUsersApisUrl = 'http://localhost:3001/api/users/';
    const baseChatsApisUrl="http://localhost:3001/api/chats/"

    const handleSignIn = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
            .then((user) => {
                console.log(user.user)
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
                setError(true)
            })
    }

    const handleSignInWithGoogle = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
            .then((user) => {
                //console.log(user.user)
                axios.post(baseUsersApisUrl+"new",{
                    firstName: user.user.displayName.slice(0,user.user.displayName.indexOf(" ")),
                    lastName: user.user.displayName.slice(user.user.displayName.indexOf(" ")+1,user.user.displayName.length),
                    email: user.user.email,
                    uid: user.user.uid
                })
                    .then((response) => {
                        console.log(response.data);
                        axios.post(baseChatsApisUrl+"newempty",{ userId: user.user.uid })
                            .then((response) => {
                                console.log(response.data)
                                navigate("/")
                            })
                            .catch((err) => {
                                setError(true);
                                console.log(err);
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                        setError(true)
                    })
            })
            .catch((err) => {
                console.log(err);
                setError(true)
            })
    }

    return (
        <div className="formContainer">
            <div className='formWrapper'>
                <span className='title'>Accedi</span>
                <form onSubmit={handleSignIn}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                    <GoogleButton label='Continua con Google' onClick={handleSignInWithGoogle} />
                    {error && <span>Qualcosa è andato storto</span>}
                    <p>Non hai un account? <Link to="/register">Registrati</Link></p>
                </form>
            </div>
        </div>
    )
}