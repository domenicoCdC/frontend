import React from 'react'

const Search =()=>{
    return (
        <div className='Search'>
            <div className="searchForm">
                <input type="text" placeholder='find a user'/>
            </div>
            <div className="userChat">
                <div className="userChatInfo">
                    <span></span>
                </div>
            </div>
        </div>
    )
}
export default Search