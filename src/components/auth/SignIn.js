import React, {useState} from "react";
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import auth from "../../firebase";
import { GoogleButton } from 'react-google-button';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate=useNavigate()


    const baseUrl = 'http://localhost:3001/api/users/new';

    const signIn = async (e) => {
        e.preventDefault();
        try{
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            navigate("/")
        }catch (err) {
            console.log(err)
        }
    }

    const handleSignInWithGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try{
            const userCredential = (await signInWithPopup(auth, provider)).user
            console.log(userCredential)
            try {
                const responsePostRequest = await  axios.post(baseUrl,{
                    fistName: userCredential.displayName,
                    lastName: userCredential.displayName,
                    username: userCredential.displayName,
                    email: userCredential.email,
                    uid: userCredential.uid,
                })
                navigate("/")
                console.log(responsePostRequest)
            } catch (errore) {
                console.log(errore)
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="formContainer">
            <div className='formWrapper'>
                <span className='title'>Login</span>
                <form onSubmit={signIn}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                    <GoogleButton label='Continua con Google' onClick={handleSignInWithGoogle} />
                    <p>Don't you have an account? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    )
}