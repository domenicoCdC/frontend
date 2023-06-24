import {signOut} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

const NavBar =()=>{
    const {currentUser} = useContext(AuthContext);
    const navigate=useNavigate();
    return (
        <div className='navbar'>
            <div className="user">
                <span>{currentUser && currentUser.displayName}</span>
                <button onClick={() => navigate("/profile")}>Profilo</button>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}
export default NavBar