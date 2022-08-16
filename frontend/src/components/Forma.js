import React, {useState} from 'react'
import './Forma.css'

const Forma = (props) => {
    const [brojDresa, setBrojDresa] = useState();
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [pozicija, setPozicija] = useState('');

    const onBrojDresaChange = (e) => {setBrojDresa((e.target.value).toString())}
    const onImeChange = (e) => {setIme((e.target.value).toString())}
    const onPrezimeChange = (e) => {setPrezime((e.target.value).toString())}
    const onPozicijaChange = (e) => {setPozicija((e.target.value).toString())}

    const onFormaSubmit = (e) => {
        e.preventDeafault();

        const noviObjekt = {
            brojDresa:brojDresa,
            ime:ime,
            prezime:prezime,
            pozicija:pozicija
        }

        props.submit(noviObjekt);
    }


    return (
        <div className='okvir'>
            <form onSubmit={onFormaSubmit}>
                <p>Igrač</p>
                <div className='unos'>
                    <div className='odabir'>
                        <label for="br_dresa">Broj dresa:</label>
                        <input id="br_dresa" type="text" value={brojDresa} onChange={onBrojDresaChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="ime">Ime:</label>
                        <input id="ime" type="text" value={ime} onChange={onImeChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="prezime">Prezime:</label>
                        <input id="prezime" type="text" value={prezime} onChange={onPrezimeChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="pozicija">Pozicija:</label>
                        <input id="pozicija" type="text" value={pozicija} onChange={onPozicijaChange}></input>
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