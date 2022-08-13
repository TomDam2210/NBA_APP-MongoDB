import React, { useEffect, useState } from "react"
import Igrac from "./components/Igrac"
import axios from 'axios'

const App = (props) => {
    const [igraci, postaviIgraca] = useState([])
    const [unos, postaviUnos] = useState("Pretraži igrača...")
    const [ispisIme, postaviIspis] = useState("")
    
    const porukeZaIspis = ispisIme
    ? igraci
    : igraci.filter(ig => ig.i)

    useEffect( () => {
        axios.get("http://localhost:3001/api/igraci")//.then(res => {console.log(res.data.data)})// https://www.balldontlie.io/api/v1/players
        .then(res => {postaviIgraca(res.data)})
    }, [])
    
    const brisiIgraca = (id) => {
        axios.delete(`http://localhost:3001/api/igraci/${id}`)
          .then(response => {
            console.log(response);
            postaviIgraca(igraci.filter(i => i.id !== id))
          })
      }
    
    const pretraziIgraca = ({unos}) => {
        
        
        //postaviUnos("")
    }
    const promjenaUnosa = (e) => {
        console.log(e.target.value);
        postaviUnos(e.target.value)
    }
   

return (
    <div className="nav">
        <h1>NBA APP</h1>
        <ul>
            {igraci.map(i =>
            <Igrac key={i.id} 
            igrac={i}
            brisiIgraca = {() => brisiIgraca(i.id)} /> 
            )}
        </ul>
        <form onSubmit={pretraziIgraca}>
            <input className="input" 
                type="text"
                value={unos} 
                onChange={promjenaUnosa}
            />
            <button className="botun1" type='submit'>Pretraži</button>
        </form>
        <div className="sredina">
            <div className="sredina-tekst">
                Pretražite igrače kako bi usporedili prosjeke sezone!
            </div>
        </div>
    </div>
)
}

export default App