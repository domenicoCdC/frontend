import {signOut} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";
import {useContext} from "react";

const NavBar =()=>{
    const {currentUser} = useContext(AuthContext);
    return (
        <div className='navbar'>
            <div className="user">
                <span>{currentUser && currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>logout</button>
            </div>
        </div>
    )
}
export default NavBar

/*<span>{currentUser.displayName}</span>
* NEL CASO DI AGGIUNTA DEL NOME NELLA REGISTRAZIONE
* */