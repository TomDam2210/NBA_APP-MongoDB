import React from "react"

const Igrac = ({igrac, brisiIgraca}) => {
    return (
        <li>
        {igrac.ime} 
        <button onClick={brisiIgraca}>X</button>
        </li>
    )
   }

export default Igrac