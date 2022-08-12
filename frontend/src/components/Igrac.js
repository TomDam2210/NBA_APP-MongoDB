import React from "react"

const Igrac = ({igrac}) => {
    return (
        <li>{igrac.first_name + " " + igrac.last_name} </li>
    )
   }

export default Igrac