import React, {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {auth} from "../firebase";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios"

export default function SignIn() {
    const [firstName, setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setloading] = useState(false);
    const [error,setError] = useState(false)
    const navigate=useNavigate();

    const baseUsersApisUrl = "http://localhost:3001/api/users/";
    const baseChatsApisUrl = "http://localhost:3001/api/chats/"
    const handleSignUp = (e) => {
        setloading(true)
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(user.user, {
                    displayName: firstName + " " + lastName
                }).then(r => {

                    axios.post(baseUsersApisUrl+"new", {
                        firstName: firstName,
                        lastName: lastName,
                        email:email,
                        uid: user.user.uid
                    })
                        .then((res) => {
                            console.log(res.data)
                            axios.post(baseChatsApisUrl+"newempty",{ userId: user.user.uid })
                                .then((res) => {
                                    console.log(res.data)
                                    setloading(false)
                                    navigate("/")
                                })
                                .catch((err) => {
                                    setError(true)
                                    setloading(false)
                                    console.log(err)
                                })
                        })
                        .catch((err) => {
                            setloading(false)
                            setError(true)
                            console.log(err)
                        })
                })
                    .catch((err) => {
                        setloading(false)
                        setError(true)
                        console.log(err)
                    })
            })
            .catch((err) => {
                setloading(false)
                setError(true)
                console.log(err)
            });
    }

    return (
        <div className="formContainer">
            <div className='formWrapper'>
            <span className='title'>Registrati</span>
            <form onSubmit={handleSignUp}>
                <input type="firstName" placeholder="Nome" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                <input type="lastName" placeholder="Cognome" value={lastName} onChange={e => setLastName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Registrati</button>
                {loading && <span>Attendere prego...</span>}
                <p>Hai già un account? <Link to="/login">Accedi</Link></p>
                {error && <span>Qualcosa è andato storto</span>}
            </form>
            </div>
        </div>
    )
}