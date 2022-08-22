const igraciRouter = require('express').Router()
const Igrac = require('../models/igrac')
const Korisnik = require('../models/korisnik')
const jwt = require('jsonwebtoken')

const dohvatiToken = (req) => {
    const auth = req.get('Authorization')
    if (auth && auth.toLowerCase().startsWith("bearer")){
        return auth.substring(7)
    }
    
    return null
}

//Dohvaćanje svih
igraciRouter.get('/', async (req, res) => {
    const igraci = await Igrac.find({})
    .populate('korisnik', {username: 1, ime: 1})
    res.json(igraci)
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
igraciRouter.post('/', async (req, res, next) => {
    const podatak = req.body
    const token = dohvatiToken(req)

    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id){
        return res.status(401).json({error: "Neispravni token"})
    }

    const korisnik = await Korisnik.findById(dekToken.id)
    
    
    const igrac = new Igrac({
        brojDresa: podatak.brojDresa,
        ime: podatak.ime,
        prezime: podatak.prezime,
        pozicija: podatak.pozicija,
        korisnik: korisnik._id
    })

    
    const noviIgrac = await igrac.save()
    korisnik.igraci = korisnik.igraci.concat(noviIgrac._id)
    await korisnik.save()
    
    res.json(noviIgrac)
    


    /*igrac.save()
    .then(rezultat => {res.json(rezultat)})
    .catch(err => next(err)) */
})

module.exports = igraciRouter