/* let igraci = [
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
] */
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const Igrac = require('./models/Igrac')

//Početna stranica
app.get('/', (req, res) =>{
 res.send('<h1>Dobrodošli na NBA stranicu!</h1>')
})

//Dohvaćanje svih
app.get('/api/igraci', (req, res) =>{
    console.log(req.body)
    Igrac.find({}).then(rezultat => res.json(rezultat))
    
})


//Dohvaćanje jednog igrača
app.get('/api/igraci/:id', (req, res, next) =>{
    Igrac.findById(req.params.id)
    .then(rezultat =>{
        if(rezultat){
            res.json(rezultat)
        } else {
            res.status(404).end()
        }
    })
    .catch(err => next(err)) 
})

//Brisanje
app.delete('/api/igraci/:id', (req, res) => {
    Igrac.findByIdAndRemove(req.params.id)
    .then(rez => 
        res.status(204).end())
    .catch(err => next(err))
})

//Dodavanje novog
app.post('/api/igraci', (req, res, next) => {
    const podatak = req.body
    console.log(podatak)
    
    const noviIgrac = new Igrac({
        brojDresa: podatak.brojDresa,
        ime: podatak.ime,
        prezime: podatak.prezime,
        pozicija: podatak.pozicija
    })

    //igrac = igraci.concat(igrac)
    noviIgrac.save()
    .then(rezultat => {res.json(rezultat)})
    .catch(err => next(err)) 
})


const errorHandler = (err, req, res, next ) => {
    console.log(err.message);
    if (err.name === 'CastError') {
    return res.status(400).send({error: 'krivi format ID-a'})
    } else if (err.name === 'ValidationError'){
        return res.status(400).send({error: err.message})
    }
       
    next(err)
   }


function zadnjiErrorHandler (err, req, res, next) {
    res.status(500)
    res.send('error', { error: err })
   }
   
app.use(errorHandler)
app.use(zadnjiErrorHandler)


//PORT
const PORT = 3001
app.listen(PORT, () => {
 console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})


