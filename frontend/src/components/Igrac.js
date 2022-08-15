import React from "react"
import './Igrac.css'

const Igrac = (props) => {
    return (
        <tr>
            <td>{props.brojDresa}</td>
            <td>{props.ime}</td>
            <td>{props.prezime}</td>
            <td>{props.pozicija}</td>
            <td>
                <button onClick={props.brisi} id="button-brisi">Briši</button>
            </td>

        </tr>
        /*<li>
        {igrac.ime} 
        <button onClick={brisiIgraca}>X</button>
        </li>*/
    )
   }

export default Igrac