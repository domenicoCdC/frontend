import {AuthContext} from "../../context/AuthContext";
import React, {useContext} from "react";


export default function Profile() {
    const {currentUser} = useContext(AuthContext);
    const fistName = currentUser.displayName.slice(0, currentUser.displayName.indexOf(" "));
    const lastName = currentUser.displayName.slice(currentUser.displayName.indexOf(" "));
    const email = currentUser.email;

    return (
            <div className='home'>
                    <div className="profile">
                        <span className="fullName">{fistName} {lastName}</span>
                        <span className="email">{email}</span>
                    </div>
            </div>

    )
}