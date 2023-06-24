import {useContext, useState} from 'react'
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const Search =()=>{

    const {currentUser} = useContext(AuthContext)
    const baseUsersApisUrl = "http://localhost:3001/api/users/"
    const baseUrlPostChats = "http://localhost:3001/api/chats/"

    const [username, setUsername] = useState("");
    const [userToSearch, setUserToSearch] = useState(null);
    const [err, setErr] = useState(false)

    const handleSearch =  () =>  {
        /*dall'username cercato dall'utente splitto in due variabili il suo nome e cognome
            e le utilizzo per chiamare l'api http://localhost:3001/api/users/?fullName
            ad esempio http....../users/Mario-Rossi mi restituirà l'user associato a mario rossi
         */
        setErr(false)
        const firstName = username.slice(0, username.indexOf(" "));
        const lastName = username.slice(username.indexOf(" ")+1,username.length)
        axios.get(baseUsersApisUrl+firstName+"/"+lastName)
            .then((res) => {
                console.log(res.data)
                setUserToSearch(res.data)
                setErr(false)
            })
            .catch((err) => {
                console.log(err)
                setErr(true)
            })

        setUsername("")

    }

    const handleKey = e => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = () => {
        const [currentFirstName,currentLastName] = currentUser.displayName.split(" ");
        axios.put(baseUrlPostChats+"update", {
            userToChatId:userToSearch.uid,
            firstNameUserToChat: userToSearch.firstName,
            lastNameUserToChat: userToSearch.lastName,
            currentUserId: currentUser.uid,
            firstNameCurrentUser: currentFirstName,
            lastNameCurrentUser: currentLastName
        })
            .then((response) => {
                console.log(response.data)

            })
            .catch((err) => {
                setErr(true)
                console.log(err.data)
                setUsername("")
            });

        setUserToSearch(null);
        setErr(false);
    }

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Cerca un utente..."
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>Utente non trovato!</span>}
            {userToSearch && (
                <div className="userChat" onClick={handleSelect}>
                    <div className="userChatInfo">
                        <span>{userToSearch.firstName +" "+userToSearch.lastName}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Search