import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth"
import auth from "../../firebase";



export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch(err => {
                console.log(err)
        })

    }


    return (
        <div className='sign-in-container'>
            <form onSubmit={signIn}>
                <h1>Log in</h1>
                <input type="email" placeholder="Inserisci email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password.." value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}