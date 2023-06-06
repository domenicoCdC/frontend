import React, {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth"
import auth from "../../firebase";
import {Link, useNavigate} from "react-router-dom";

export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate=useNavigate()
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

    return (
        <div className="formContainer">
            <div className='formWrapper'>
                <span className='title'>Login</span>
                <form onSubmit={signIn}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                    <p>Don't you have an account? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    )
}