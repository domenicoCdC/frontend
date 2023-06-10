import React, {useState} from "react";
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,updateProfile} from "firebase/auth"
import auth from "../../firebase";
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
        try{
            const {user} = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
            navigate("/")
        }catch (err) {
            console.log(err)
            setError(true)
        }
    }

    const handleSignInWithGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try{
            const {user} = await signInWithPopup(auth, provider);

            console.log(user)
            try {
                const responsePostRequest = await  axios.post(baseUsersApisUrl+"new",{
                    fistName: user.displayName.slice(0, user.displayName.indexOf(" ")),
                    lastName: user.displayName.slice(user.displayName.indexOf(" ") + 1),
                    email: user.email,
                    uid: user.uid,
                })
                const responseAddNewChatsPostRequest = await axios.post(baseChatsApisUrl+"newempty",{})
                console.log(responseAddNewChatsPostRequest.data)

                navigate("/")
                console.log(responsePostRequest.data)
            } catch (errore) {
                console.log(errore)
            }
        } catch (err) {
            console.log(err)
            setError(true)
        }

    }

    return (
        <div className="formContainer">
            <div className='formWrapper'>
                <span className='title'>Login</span>
                <form onSubmit={handleSignIn}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                    <GoogleButton label='Continua con Google' onClick={handleSignInWithGoogle} />
                    {error && <span>Qualcosa è andato storto</span>}
                    <p>Don't you have an account? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    )
}