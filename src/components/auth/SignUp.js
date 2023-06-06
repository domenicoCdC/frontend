import React, {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import auth from "../../firebase";
import {Link, useNavigate} from "react-router-dom";



export default function SignIn() {
    //const [name, setName]=useState('')
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
            <form onSubmit={signUp}>

                <h1>Registrati</h1>

                    <input type="email" placeholder="Inserisci email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="password.." value={password} onChange={e => setPassword(e.target.value)}/>

                    <button> Registrati</button>
                <p>Hai già un account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )



}

/* <input type="name" placeholder="inserisci il tuo nome.." value={name} onChange={e => setName(e.target.value)}/>
* DA INSERIRE COME INPUT IN CASO VOGLIAMO AGGIUNGERLO ALLA REGISTRAZIONE
* */