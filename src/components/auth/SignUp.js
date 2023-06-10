import React, {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import auth from "../../firebase";
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
    const handleSignUp = async (e) => {
        setloading(true)
        e.preventDefault();
        try {
            //Creazione dell'utente nel database delle autenticazioni con registrazione sicura
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            //aggiorno il profilo creato inserendo il displayName
            await updateProfile(user, {
                displayName:firstName + " " + lastName
            })

            console.log(user);

            try{
                //inserisco l'utente nel databse

                const responseAddNewUserPostRequest = await axios.post(baseUsersApisUrl+"new", {
                    firstName: firstName,
                    lastName: lastName,
                    email:email,
                    uid: user.uid
                })
                //vedo a console la risposta della richiesta POST
                console.log(responseAddNewUserPostRequest.data)

                //const responseAddNewChatsPostRequest = await axios.post(baseChatsApisUrl+"newEmpty",{})
                //console.log(responseAddNewChatsPostRequest.data)
                navigate("/")

            } catch (err) {
                console.log(err)
                setError(true)
            }

        } catch(err) {
            console.log(err)
            setError(true)
        }


    }

    return (
        <div className="formContainer">
            <div className='formWrapper'>
            <span className='title'>Register</span>
            <form onSubmit={handleSignUp}>
                <input type="firstName" placeholder="Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                <input type="lastName" placeholder="Surname" value={lastName} onChange={e => setLastName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
                <p>Già iscritto? <Link to="/login">Login</Link></p>
                {error && <span>Qualcosa è andato storto</span>}
            </form>
            </div>
        </div>
    )
}