import React, { useState } from "react"
import Igrac from "./components/Igrac"

const App = (props) => {
    const [igraci, postaviIgraca] = useState(props.igraci)
    const [unos, postaviUnos] = useState("Pretraži igrača...")
    const [ispisIme, postaviIspis] = useState("")
    
    const porukeZaIspis = ispisIme
    ? igraci
    : igraci.filter(ig => ig.i)
    
    const pretraziIgraca = () => {
        igraci.filter(ig => ig)
        
        postaviIgraca(igraci)
        postaviUnos('')
    }
    const promjenaUnosa = (e) => {
        console.log(e.target.value);
        postaviUnos(e.target.value)
    }
   

return (
    <div>
        <h1>NBA APP</h1>
        <ul>
            {igraci.map(i =>
            <Igrac key={i.br} igrac={i} /> 
            )}
        </ul>
        <form onSubmit={pretraziIgraca}>
            <input value={unos} onChange={promjenaUnosa} />
            <button type='submit'>Spremi</button>
        </form>
    </div>
)
}

export default App