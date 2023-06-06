import React, {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import auth from "../../firebase";
import {Link, useNavigate} from "react-router-dom";

export default function SignIn() {
    const [firstName, setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate=useNavigate()

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                navigate("/");
            })
            .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="formContainer">
            <div className='formWrapper'>
            <span className='title'>Register</span>
            <form onSubmit={signUp}>
                <input type="firstName" placeholder="Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                <input type="lastName" placeholder="Surname" value={lastName} onChange={e => setLastName(e.target.value)}/>
                <input type="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
                <p>Do you already have an account? <Link to="/login">Login</Link></p>
            </form>
            </div>
        </div>
    )
}