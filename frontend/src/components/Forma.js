import React, {useState} from 'react'
import './Forma.css'

const Forma = (props) => {
    const [unosDresa, setBrojDresa] = useState('');
    const [unosIme, setIme] = useState('');
    const [unosPrezime, setPrezime] = useState('');
    const [unosPozicija, setPozicija] = useState('');

    const onBrojDresaChange = (e) => {
        setBrojDresa((e.target.value).toString())
        console.log(unosDresa)
    }
    const onImeChange = (e) => {
        setIme((e.target.value).toString())
        console.log(unosIme)
    }
    const onPrezimeChange = (e) => {
        setPrezime((e.target.value).toString())
        console.log(unosPrezime)
    }
    const onPozicijaChange = (e) => {
        setPozicija((e.target.value).toString())
        console.log(unosPozicija)
    }

    const noviIgrac = (e) => {
        e.preventDefault();

        props.spremiIgraca({
            brojDresa: unosDresa,
            ime: unosIme,
            prezime: unosPrezime,
            pozicija: unosPozicija
        })

        setBrojDresa('')
        setIme('')
        setPrezime('')
        setPozicija('')
        /*const noviObjekt = {
            brojDresa:brojDresa,
            ime:ime,
            prezime:prezime,
            pozicija:pozicija
        }

        props.submit(noviObjekt); */
    }


    return (
        <div className='okvir'>
            <form onSubmit={noviIgrac}>
                <p>Igrač</p>
                <div className='unos'>
                    <div className='odabir'>
                        <label for="br_dresa">Broj dresa:</label>
                        <input id="br_dresa" value={unosDresa} onChange={onBrojDresaChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="ime">Ime:</label>
                        <input id="ime" type="text" value={unosIme} onChange={onImeChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="prezime">Prezime:</label>
                        <input id="prezime" type="text" value={unosPrezime} onChange={onPrezimeChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="pozicija">Pozicija:</label>
                        <input id="pozicija" type="text" value={unosPozicija} onChange={onPozicijaChange}></input>
                    </div>
                </div>
                <div className="tipke">
                    <button id="ok" type="submit"> Spremi</button>
                    <button id="odustani" onClick={props.odustani}>Odustani</button>    
                </div>
            </form>
        </div>
    )
}


export default Forma