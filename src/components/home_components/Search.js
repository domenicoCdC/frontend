import {useContext, useState} from 'react'
import axios from "axios";

import { AuthContext} from "../../context/AuthContext";

const Search =()=>{


    const {auth} = useContext(AuthContext)
    const baseUsersApisUrl = "http://localhost:3001/api/users/"
    const baseUrlPostChats = "http://localhost:3001/api/chats/"


    const [username, setUsername] = useState("")
    const [userToSearch, setUserToSearch] = useState(null);
    const [err, setErr] = useState(false)


    const handleSearch =  () =>  {
        /*dall'username cercato dall'utente splitto in due variabili il suo nome e cognome
            e le utilizzo per chiamare l'api http://localhost:3001/api/users/?fullName
            ad esempio http....../users/Mario-Rossi mi restituirà l'user associato a mario rossi
         */
        const firstName = username.slice(0, username.indexOf(" "));
        const lastName = username.slice(username.indexOf(" ")+1,username.length)
        axios.get(baseUsersApisUrl+firstName+"/"+lastName)
            .then((res) => {
                console.log(res.data)
                setUserToSearch(res.data)
            })
            .catch((err) => {
                console.log(err)
                setErr(true)
            })
        setErr(false)
    }

    const handleKey = e => {
        e.code === "Enter" && handleSearch();
    }


    const handleSelect = () => {
        console.log(userToSearch)
        axios.put(baseUrlPostChats+"update", {
            userToChatId:userToSearch[0].uid,
            firstNameUserToChat: userToSearch[0].firstName,
            lastNameUserToChat: userToSearch[0].lastName,
            currentUserId: auth.currentUser.uid,
            firstNameCurrentUser:auth.currentUser.displayName.slice(0, auth.currentUser.displayName.indexOf(" ")),
            lastNameCurrentUser:auth.currentUser.displayName.slice(auth.currentUser.displayName.indexOf(" ") + 1,auth.currentUser.displayName.length)
        })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                setErr(true)
                console.log(err)
            })
        setUsername("")
        setUserToSearch(null);
        setErr(false);
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
            {err && <span>Utente non trovato!</span>}
            {userToSearch && (
                <div className="userChat" onClick={handleSelect}>
                    <div className="userChatInfo">
                        <span>{userToSearch[0].firstName +" "+userToSearch[0].lastName}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Search

