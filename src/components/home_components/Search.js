import {useContext, useState} from 'react'
import axios from "axios";

import { AuthContext} from "../../context/AuthContext";

const Search =()=>{

    const {currentUser} = useContext(AuthContext)
    const baseUrlUsers = "http://localhost:3001/api/users/"
    const baseUrlPostChats = "http://localhost:3000/api/chats/update"

    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false)


    const handleSearch = async () =>  {
        try {
            const firstName = username.slice(0, username.indexOf("-"));
            const lastName = username.slice(username.indexOf("-")+1)
            const response = await axios.get(baseUrlUsers+firstName+"-"+lastName);
            setUser(response.data)
            console.log(user)
            console.log(currentUser)
        } catch (error)  {
            setErr(true)
            console.log(error)
        }
    }

    const handleKey = e => {
        e.code === "Enter" && handleSearch();
    }


    const handleSelect = async () => {

        const response = await axios.post(baseUrlPostChats, {
            userFindId:user.uid,
            firstNameUserFind: user.firstName,
            lastNameUserFind: user.lastName,
            currentUserId: currentUser.uid,
            firstNameCurrentUser:currentUser.displayName.slice(0, currentUser.displayName.indexOf(" ")),
            lastNameCurrentUser:currentUser.displayName.slice(currentUser.displayName.indexOf(" ") + 1)
        })
        console.log(response)

        setUser(null);
    }

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="userChat" onClick={handleSelect}>

                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Search

/*
<img src={user.photoURL} alt="" />
 */