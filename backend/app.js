const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const igraciRouter = require('./controllers/igraci')
const korisniciRouter = require('./controllers/korisnici')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Spajam se na', config.url)

mongoose.connect(config.url)
.then(result => {
    logger.info("Spojeni smo na bazu");
}).catch(error => {
    logger.greska("Greška pri spajanju", error.message);
})

app.use(cors())
app.use(express.json())
app.use(middleware.zahtjevInfo)

app.use('/api/igraci', igraciRouter)
app.use('/api/korisnici', korisniciRouter)
app.use('/api/login', loginRouter)

app.use(middleware.nepoznataRuta)
app.use(middleware.errorHandler)

module.exports = app