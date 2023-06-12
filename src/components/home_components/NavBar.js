import {signOut} from "firebase/auth";
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";


const NavBar =()=>{
    const {auth}=useContext(AuthContext)
    return (
        <div className='navbar'>
        <div className="user">
            <span>{auth.currentUser && auth.currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>logout</button>
        </div>
        </div>
    )
}
export default NavBar

/*<span>{currentUser.displayName}</span>
* NEL CASO DI AGGIUNTA DEL NOME NELLA REGISTRAZIONE
* */