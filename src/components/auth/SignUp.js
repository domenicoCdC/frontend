import React, {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import auth from "../../firebase";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios"

export default function SignIn() {
    const [firstName, setFirstName] = useState('')
    const [lastName,setLastName] = useState('')

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate=useNavigate()

    const baseUrl = "http://localhost:3001/api/users/new";
    const signUp = async (e) => {
        e.preventDefault();
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(user, {
                displayName: firstName + " " + lastName
            })
            console.log(user);
            navigate("/")
            try{
                const responsePostRequest = await axios.post(baseUrl, {
                    firstName: firstName,
                    lastName: lastName,
                    email:email,
                    uid: user.uid
                })
                console.log(responsePostRequest.data)
            } catch (err) {
                console.log(err)
            }

        } catch(err) {
            console.log(err)
        }


    }

    return (
        <div className="formContainer">
            <div className='formWrapper'>
            <span className='title'>Register</span>
            <form onSubmit={signUp}>
                <input type="firstName" placeholder="Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                <input type="lastName" placeholder="Surname" value={lastName} onChange={e => setLastName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
                <p>Già iscritto? <Link to="/login">Login</Link></p>
            </form>
            </div>
        </div>
    )
}