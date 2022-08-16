let igraci = [
    {
        br: 30,
        ime: 'Stephen',
        prezime: 'Curry',
        pozicija: 'PointGuard'
    },
    {
        br: 11,
        ime: 'Kyrie',
        prezime: 'Irving',
        pozicija: 'Shooter'
    },
    {
        br: 3,
        ime: 'Kevin',
        prezime: 'Durant',
        pozicija: 'Center'
    }
]
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

//Početna stranica
app.get('/', (req, res) =>{
 res.send('<h1>Dobrodošli na NBA stranicu!</h1>')
})

//Dohvaćanje svih
app.get('/api/igraci', (req, res) =>{
 res.json(igraci)
})


//Dohvaćanje jednog igrača
app.get('/api/igraci/:id', (req, res) =>{
    const id = Number(req.params.id)
    const igrac = igraci.find(p => p.br === id)
   
    if (igrac){
    res.json(igrac)
    } else {
    res.status(404).end()
    }
})

//Brisanje
app.delete('/api/igraci/:id', (req, res) => {
    const id = Number(req.params.id)
    igraci = igraci.filter(p => p.br !== id)
    res.status(204).end()
})

//Dodavanje novog
app.post('/api/igraci', (req, res) => {
    const podatak = req.body
    
    if (!podatak.brojDresa) {
        return res.status(400).json({
            error: 'Nedostaje ime'
        })
    }
    if (!podatak.ime) {
        return res.status(400).json({
            error: 'Nedostaje ime'
        })
    }
    if (!podatak.prezime) {
        return res.status(400).json({
            error: 'Nedostaje prezime'
        })
    }
    if (!podatak.pozicija) {
        return res.status(400).json({
            error: 'Nedostaje pozicija'
        })
    }

    let igrac = {
        brojDresa:podatak.brojDresa,
        ime: podatak.ime,
        prezime: podatak.prezime,
        pozicija: podatak.pozicija
    }

    igrac = igraci.concat(igrac)

    res.json(igrac)
})



//PORT
const PORT = 3001
app.listen(PORT, () => {
 console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})
