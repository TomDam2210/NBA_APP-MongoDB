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


app.get('/', (req, res) =>{
 res.send('<h1>Dobrodošli na NBA stranicu!</h1>')
})

app.get('/api/igraci', (req, res) =>{
 res.json(igraci)
})

app.get('/api/igraci/:id', (req, res) =>{
    const id = Number(req.params.id)
    const igrac = igraci.find(p => p.br === id)
   
    if (igrac){
    res.json(igrac)
    } else {
    res.status(404).end()
    }
})


app.delete('/api/igraci/:id', (req, res) => {
    const id = Number(req.params.id)
    igraci = igraci.filter(p => p.br !== id)
    res.status(204).end()
})
   
   
const PORT = 3001
app.listen(PORT, () => {
 console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})
