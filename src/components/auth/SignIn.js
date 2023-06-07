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

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                navigate("/");
            }).catch(err => {
            console.log(err)
        })
    }

    const handleSignInWithGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            .then((userCredential) => {
                const credential = userCredential.user;
                console.log(credential)

                axios.post(baseUrl,{
                    fistName: credential.displayName,
                    lastName: credential.displayName,
                    username: credential.displayName,
                    email: credential.email
                }).then(res => {
                    console.log(res.data)
                })



                navigate("/")
            }).catch(err => {
                console.log(err)
        })






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