const igraciRouter = require('express').Router()
const Igrac = require('../models/igrac')

//Dohvaćanje svih
igraciRouter.get('/', (req, res) =>{
    Igrac.find({}).then(rezultat => {
        res.json(rezultat)
    })
    
})

//Dohvaćanje jednog igrača
igraciRouter.get('/:id', (req, res, next) =>{
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
igraciRouter.delete('/:id', (req, res) => {
    Igrac.findByIdAndRemove(req.params.id)
    .then(rez => {
        res.status(204).end()
    })
    .catch(err => next(err))
})

//Dodavanje novog
igraciRouter.post('/', (req, res, next) => {
    const podatak = req.body
    //console.log(podatak)
    
    const igrac = new Igrac({
        brojDresa: podatak.brojDresa,
        ime: podatak.ime,
        prezime: podatak.prezime,
        pozicija: podatak.pozicija
    })


    igrac.save()
    .then(rezultat => {res.json(rezultat)})
    .catch(err => next(err)) 
})

module.exports = igraciRouter