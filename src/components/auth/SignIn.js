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
                <form onSubmit={signIn}>
                    <h1>Log in</h1>

                    <input type="email" placeholder="Inserisci email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="password.." value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                    <p>You don't have an account? <Link to="/register">Registrati</Link></p>
                </form>
        </div>
    )
}
