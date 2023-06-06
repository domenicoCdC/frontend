import React from 'react'

const Input =()=>{
    return (
        <div className='input'>
            <input type="text" placeholder='Type something...'/>
            <div className="send">
                <input type="file " style={{display:"none"}} id="file"/>
                <label htmlFor="file">

                </label>
                <button> Send</button>
            </div>
        </div>
    )
}
export default Input