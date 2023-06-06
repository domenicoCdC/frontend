import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import auth from "../../firebase";



export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch(err => {
            console.log(err)
        })

    }


    return (
        <div className='sign-up-container'>
            <form onSubmit={signUp}>
                <h1>Registrati</h1>
                <input type="email" placeholder="Inserisci email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password.." value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Registrati</button>
            </form>
        </div>
    )
}