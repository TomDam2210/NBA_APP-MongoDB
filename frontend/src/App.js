import React, { useEffect, useState } from "react"
import './App.css'

//Import komponenti
import Igrac from "./components/Igrac"
import Forma from './components/Forma'
import Tipka from './components/Tipka'

//Import servisa
import igraciAkcije from './service/igraci'

const App = () => {
    //Prikaz forme
    const [prikazForme, setPrikazForme] = useState(true);
    const setPrikazFormeHandler = () => {
        setPrikazForme(!prikazForme);
    }

    const [igraci, postaviIgraca] = useState([])
    /*const [unos, postaviUnos] = useState("Pretraži igrača...")
    const [ispisIme, postaviIspis] = useState("")
    
    const porukeZaIspis = ispisIme
    ? igraci
    : igraci.filter(ig => ig.i)
    */

    //Dohvat svih igraca
    useEffect( () => {
        //axios.get("http://localhost:3001/api/igraci")//.then(res => {console.log(res.data.data)})// https://www.balldontlie.io/api/v1/players
        igraciAkcije.dohvatiSve()
        .then(res => {postaviIgraca(res.data)})
    }, [])
    
    //Brisanje jednog igraca
    const brisiIgraca = (id) => {
        //axios.delete(`http://localhost:3001/api/igraci/${id}`)
        igraciAkcije.brisi(id)  
        .then(response => {
            console.log(response);
            postaviIgraca(igraci.filter(i => i.id !== id))
          })
      }
    
    //Pretraživanje igraca
    /*const pretraziIgraca = ({unos}) => {
        
        
        //postaviUnos("")
    } */

    //Dodavanje novog igraca
    const submit = (objekt) => {
        igraciAkcije.stvori(objekt)
        .then(res => {
            postaviIgraca(igraci.concat(res.data))
        })

        setPrikazFormeHandler();

    }

    /*const promjenaUnosa = (e) => {
        console.log(e.target.value);
        postaviUnos(e.target.value)
    } */
   

return (
    <div>
        <Tipka naslov="Novi igrač" klik={setPrikazFormeHandler}/>
        {prikazForme ? <Forma odustani={setPrikazFormeHandler} submit={submit} /> : null}
        <table>
            <thead>
                <tr>
                    <th className="th">BROJ_DRESA</th>
                    <th className="th">IME</th>
                    <th className="th">PREZIME</th>
                    <th className="th">POZICIJA</th>
                </tr>
            </thead>
            <tbody>
                {igraci.map(i =>
                    <Igrac key={i.id} brojDresa={i.brojDresa} ime={i.ime} prezime={i.prezime} pozicija={i.pozicija}
                        brisi={() => brisiIgraca(i.id)}
                    />)}
            </tbody>
        </table>
    </div>
)
}

export default App