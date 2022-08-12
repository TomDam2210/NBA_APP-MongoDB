const express = require('express')
const app = express()

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
app.get('/', (req, res) =>{
 res.send('<h1>Dobrodošli na NBA stranicu!</h1>')
})
app.get('/api/igraci', (req, res) =>{
 res.json(igraci)
})
const PORT = 3001
app.listen(PORT, () => {
 console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})
