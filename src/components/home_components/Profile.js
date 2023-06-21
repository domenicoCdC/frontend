import {AuthContext} from "../../context/AuthContext";
import React, {useContext} from "react";


export default function Profile() {
    const {currentUser} = useContext(AuthContext);
    const fistName = currentUser.displayName.slice(0, currentUser.displayName.indexOf(" "));
    const lastName = currentUser.displayName.slice(currentUser.displayName.indexOf(" "));
    return (
            <div className='home'>
                    <div className="profile">

                        <span>Nome:{fistName}</span>
                        <span>Cognome: {lastName}</span>

                    </div>
            </div>

    )
}