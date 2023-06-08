{/*import React, { useContext, useState } from "react";
import {

    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import  db  from "../../firebase";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";




export default function Search() {

    const baseUrl = "http://localhost:3001/api/users/"

    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false)
    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () =>  {
        try {
            const response = await axios.get(baseUrl+username);
            setUser(response.data)
            console.log(user)
        } catch (error)  {
            setErr(true)
        }
    }
    const handleSelect= async ()=>{
        const combinedId = currentUser.uid>user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {

                await setDoc(doc(db, "chats", combinedId), { messages: [] });
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        firstName: user.firstName,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        firstName: currentUser.firstName,

                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }


        } catch (err){}
    }

    const handleKey = e => {
        e.code === "Enter" && handleSearch();
    }

    return (
        <div className='Search'>
            <div className="searchForm">
                <input
                    type="text"
                    placeholder='find a user'
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={handleKey}
                    onChange={(e)=> setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>UTENTE NON TROVATO</span>}
            {user && <div className="userChat" onClick={handleSelect}>

                <div className="userChatInfo">
                    <span>{user.firstName}</span>
                </div>
            </div>}
        </div>
    )
}*/}