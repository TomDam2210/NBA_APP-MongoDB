import React, { useEffect, useState } from "react"
import './App.css'

//Import komponenti
import Igrac from "./components/Igrac"
import Forma from './components/Forma'
import LoginForma from "./components/LoginForma"
import Tipka from './components/Tipka'

//Import servisa
import igraciAkcije from './service/igraci'
import prijavaAkcije from './service/login'


const App = (props) => {
    //Prikaz forme
    const [prikazForme, setPrikazForme] = useState(true);
    const setPrikazFormeHandler = () => {
        setPrikazForme(!prikazForme);
    }

    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [korisnik, setKorisnik] = useState(null)

    const [igraci, postaviIgraca] = useState([])


    const userLogin = async (e) => {
        e.preventDefault()
        try{
            const korisnik = await prijavaAkcije.prijava({
                username, pass
            })
            setKorisnik(korisnik)
            igraciAkcije.postaviToken(korisnik.token);
            window.localStorage.setItem(
                'prijavljenKorisnik',
                JSON.stringify(korisnik)
            );

            setUsername('')
            setPass('')
        } catch (exception) {
            alert('Neispravni podaci')
        }
    
    }
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

    

    useEffect( () => {
        const logiraniKorisnikJSON = window.localStorage.getItem('prijavljenKorisnik')
        if (logiraniKorisnikJSON) {
            const korisnik = JSON.parse(logiraniKorisnikJSON)
            setKorisnik(korisnik)
            igraciAkcije.postaviToken(korisnik.token)
        }
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
    const noviIgrac = (noviObjekt) => {
        igraciAkcije.stvori(noviObjekt)
        .then((res) => {
            postaviIgraca(igraci.concat(res.data));
        });

        

    };

    const loginForma = () => {
        return (
              <LoginForma
                username={username}
                pass={pass}
                promjenaImena={({ target }) => setUsername(target.value)}
                promjenaLozinke={({ target }) => setPass(target.value)}
                userLogin={userLogin}
            />
      )
           
    }

    /*const promjenaUnosa = (e) => {
        console.log(e.target.value);
        postaviUnos(e.target.value)
    } */
   

return (
    <div>
        {korisnik === null
        ? <div>
            <Tipka naslov="PRIJAVA" klik={setPrikazFormeHandler} />
            {prikazForme
            ? loginForma ()
            : null
            }
          </div>

        : <div>
            <p>Prijavljeni ste kao: {korisnik.ime}</p>
            <Tipka naslov="Novi igrač" klik={setPrikazFormeHandler}/>
            {prikazForme 
            ? <Forma odustani={setPrikazFormeHandler} spremiIgraca={noviIgrac} /> 
            : null}

          </div>
        }
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