import {signOut} from "firebase/auth";
import auth from "../../firebase";
//import {AuthContext} from "../context/AuthContext";
//import React, {useContext} from 'react'

const NavBar =()=>{
    //const {currentUser}=useContext(AuthContext)
    return (
        <div className='navbar'>
        <div className="user">

            <button onClick={()=>signOut(auth)}>logout</button>
        </div>
        </div>
    )
}
export default NavBar

/*<span>{currentUser.displayName}</span>
* NEL CASO DI AGGIUNTA DEL NOME NELLA REGISTRAZIONE
* */